export const SUPPORTED_TLDS = ['com', 'net'] as const;
export type SupportedTld = (typeof SUPPORTED_TLDS)[number];

export type DomainParseResult =
  | { ok: true; domain: string; tld: SupportedTld }
  | { ok: false; reason: 'invalid' }
  | { ok: false; reason: 'unsupported_tld'; tld: string };

export type DomainLookupResponse =
  | {
      status: 'registered';
      domain: string;
      registeredAt: string | null;
      expiresAt: string | null;
    }
  | { status: 'not_found'; domain: string }
  | { status: 'rate_limited' }
  | { status: 'error' }
  | { status: 'invalid' }
  | { status: 'unsupported_tld'; tld: string };

const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

function isValidLabel(label: string) {
  if (!LABEL_RE.test(label)) return false;
  // RFC 5891: hyphens in positions 3-4 are reserved for A-labels (xn--).
  if (label.slice(2, 4) === '--' && !label.startsWith('xn--')) return false;
  return true;
}

/**
 * Normalises user input ("https://www.Örnek.com/path") to an ASCII
 * second-level domain ("xn--rnek-zoa.com"). Only `name.tld` is accepted —
 * subdomains are rejected rather than silently truncated.
 */
export function parseDomain(input: string): DomainParseResult {
  let raw = input.trim().toLowerCase();
  if (!raw || raw.length > 300) return { ok: false, reason: 'invalid' };

  raw = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//, '');
  raw = raw.split(/[/?#]/)[0].replace(/\.$/, '');
  if (raw.startsWith('www.')) raw = raw.slice(4);
  if (!raw || /[\s@:]/.test(raw)) return { ok: false, reason: 'invalid' };

  let ascii: string;
  try {
    // WHATWG URL performs IDNA → punycode conversion without a dependency.
    ascii = new URL(`http://${raw}`).hostname;
  } catch {
    return { ok: false, reason: 'invalid' };
  }

  const labels = ascii.split('.');
  if (labels.length < 2 || ascii.length > 253) return { ok: false, reason: 'invalid' };

  const tld = labels[labels.length - 1];
  if (!/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(tld)) return { ok: false, reason: 'invalid' };
  if (!(SUPPORTED_TLDS as readonly string[]).includes(tld)) {
    return { ok: false, reason: 'unsupported_tld', tld };
  }
  if (labels.length !== 2 || !isValidLabel(labels[0])) return { ok: false, reason: 'invalid' };

  return { ok: true, domain: ascii, tld: tld as SupportedTld };
}
