import { isIP } from 'node:net';
import { NextResponse } from 'next/server';

import { parseDomain, type DomainLookupResponse, type SupportedTld } from '@/lib/domain';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Verisign's public RDAP service. Its terms of use forbid high-volume
// automated querying, so lookups are single-domain, cached, and capped both
// per client and globally. State is in-memory, so every server instance
// (each PM2 process, each warm Vercel function) keeps its own budget.
const RDAP_BASE: Record<SupportedTld, string> = {
  com: 'https://rdap.verisign.com/com/v1/domain/',
  net: 'https://rdap.verisign.com/net/v1/domain/',
};

const UPSTREAM_TIMEOUT_MS = 6000;
const CLIENT_LIMIT = { max: 20, windowMs: 60_000 };
const UPSTREAM_LIMIT = { max: 60, windowMs: 60_000 };
const CACHE_TTL_MS = { registered: 10 * 60_000, not_found: 2 * 60_000 };
const CACHE_MAX_ENTRIES = 1000;
const DEFAULT_BACKOFF_MS = 60_000;

type Outcome = Extract<
  DomainLookupResponse,
  { status: 'registered' | 'not_found' | 'rate_limited' | 'error' }
>;

const cache = new Map<string, { value: Outcome; expires: number }>();
const inFlight = new Map<string, Promise<Outcome>>();
const clientHits = new Map<string, number[]>();
let upstreamHits: number[] = [];
let upstreamBlockedUntil = 0;

function allowClient(key: string | null, now: number) {
  if (!key) return true;
  const recent = (clientHits.get(key) ?? []).filter((t) => now - t < CLIENT_LIMIT.windowMs);
  if (recent.length >= CLIENT_LIMIT.max) {
    clientHits.set(key, recent);
    return false;
  }
  recent.push(now);
  clientHits.set(key, recent);
  if (clientHits.size > 5000) {
    for (const [key, hits] of clientHits) {
      if (hits.every((t) => now - t >= CLIENT_LIMIT.windowMs)) clientHits.delete(key);
    }
  }
  return true;
}

function allowUpstream(now: number) {
  if (now < upstreamBlockedUntil) return false;
  upstreamHits = upstreamHits.filter((t) => now - t < UPSTREAM_LIMIT.windowMs);
  if (upstreamHits.length >= UPSTREAM_LIMIT.max) return false;
  upstreamHits.push(now);
  return true;
}

function readCache(domain: string, now: number) {
  const entry = cache.get(domain);
  if (!entry) return null;
  if (entry.expires <= now) {
    cache.delete(domain);
    return null;
  }
  return entry.value;
}

function writeCache(domain: string, value: Outcome) {
  if (value.status !== 'registered' && value.status !== 'not_found') return;
  if (cache.size >= CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(domain, { value, expires: Date.now() + CACHE_TTL_MS[value.status] });
}

function parseRetryAfter(header: string | null) {
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds > 0) return Math.min(seconds * 1000, 10 * 60_000);
  return DEFAULT_BACKOFF_MS;
}

function eventDate(events: unknown, action: string) {
  if (!Array.isArray(events)) return null;
  const match = events.find(
    (e) => e && typeof e === 'object' && (e as { eventAction?: unknown }).eventAction === action
  ) as { eventDate?: unknown } | undefined;
  const date = typeof match?.eventDate === 'string' ? match.eventDate : null;
  return date && !Number.isNaN(Date.parse(date)) ? date : null;
}

async function queryRdap(domain: string, tld: SupportedTld): Promise<Outcome> {
  let res: Response;
  try {
    res = await fetch(RDAP_BASE[tld] + encodeURIComponent(domain), {
      headers: {
        Accept: 'application/rdap+json, application/json',
        'User-Agent': 'agetolabs-domain-lookup/1.0 (+https://agetolabs.com)',
      },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return { status: 'error' };
  }

  if (res.status === 404) {
    res.body?.cancel().catch(() => {});
    return { status: 'not_found', domain };
  }
  if (res.status === 429) {
    upstreamBlockedUntil = Date.now() + parseRetryAfter(res.headers.get('retry-after'));
    res.body?.cancel().catch(() => {});
    return { status: 'rate_limited' };
  }
  if (res.status !== 200) {
    res.body?.cancel().catch(() => {});
    return { status: 'error' };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return { status: 'error' };
  }

  const record = data as { objectClassName?: unknown; ldhName?: unknown; events?: unknown } | null;
  if (
    !record ||
    record.objectClassName !== 'domain' ||
    typeof record.ldhName !== 'string' ||
    record.ldhName.toLowerCase() !== domain
  ) {
    return { status: 'error' };
  }

  return {
    status: 'registered',
    domain,
    registeredAt: eventDate(record.events, 'registration'),
    expiresAt: eventDate(record.events, 'expiration'),
  };
}

// Only read a client-IP header that the edge in front of us overwrites;
// anything else is client-controlled and would let callers spoof their way
// past the limit. Vercel rewrites x-vercel-forwarded-for itself. A self-hosted
// deploy must opt in via TRUSTED_IP_HEADER once its proxy sets that header
// from the peer address (nginx: proxy_set_header X-Real-IP $remote_addr).
// Without a trusted IP there is no per-client limit rather than one shared
// bucket for everyone; the global upstream cap still applies.
function clientKey(req: Request) {
  const header = process.env.VERCEL ? 'x-vercel-forwarded-for' : process.env.TRUSTED_IP_HEADER;
  if (!header) return null;
  let ip = req.headers.get(header)?.split(',')[0].trim() ?? '';
  ip = ip.replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '');

  const version = isIP(ip);
  if (version === 4) return ip;
  if (version !== 6) return null;

  // A client typically controls a whole IPv6 /64, so key on that prefix.
  const [head, tail = ''] = ip.toLowerCase().split('%')[0].split('::');
  const headGroups = head ? head.split(':') : [];
  const tailGroups = tail ? tail.split(':') : [];
  const tailLen = tailGroups.reduce((n, g) => n + (g.includes('.') ? 2 : 1), 0);
  const groups = ip.includes('::')
    ? [...headGroups, ...Array(8 - headGroups.length - tailLen).fill('0'), ...tailGroups]
    : headGroups;
  return `${groups.slice(0, 4).map((g) => g.padStart(4, '0')).join(':')}::/64`;
}

function respond(body: DomainLookupResponse, status = 200, extra?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extra },
  });
}

export async function GET(req: Request) {
  const input = new URL(req.url).searchParams.get('domain') ?? '';
  const now = Date.now();

  const parsed = parseDomain(input);
  if (!parsed.ok) {
    return parsed.reason === 'unsupported_tld'
      ? respond({ status: 'unsupported_tld', tld: parsed.tld }, 400)
      : respond({ status: 'invalid' }, 400);
  }

  const { domain, tld } = parsed;
  const cached = readCache(domain, now);
  if (cached) return respond(cached);

  // Only lookups that would reach Verisign count against the client, so
  // users sharing an IP (office NAT, mobile CGNAT) aren't throttled by
  // each other's cached lookups.
  let pending = inFlight.get(domain);
  if (!pending) {
    if (!allowClient(clientKey(req), now)) {
      return respond({ status: 'rate_limited' }, 429, { 'Retry-After': '60' });
    }
    if (!allowUpstream(now)) {
      const retry =
        upstreamBlockedUntil > now ? Math.ceil((upstreamBlockedUntil - now) / 1000) : 60;
      return respond({ status: 'rate_limited' }, 429, { 'Retry-After': String(retry) });
    }
    pending = queryRdap(domain, tld)
      .then((outcome) => {
        writeCache(domain, outcome);
        return outcome;
      })
      .finally(() => inFlight.delete(domain));
    inFlight.set(domain, pending);
  }

  const outcome = await pending;
  if (outcome.status === 'rate_limited') return respond(outcome, 429, { 'Retry-After': '60' });
  if (outcome.status === 'error') return respond(outcome, 502);
  return respond(outcome);
}
