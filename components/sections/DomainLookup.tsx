'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Globe, Loader2, Search, ShieldAlert } from 'lucide-react';

import { useLanguage } from '@/components/LanguageContext';
import { parseDomain, type DomainLookupResponse } from '@/lib/domain';

type ViewState =
  | { kind: 'idle' }
  | { kind: 'loading'; domain: string }
  | { kind: 'result'; data: DomainLookupResponse };

const COPY = {
  tr: {
    label: 'Alan Adı Sorgulama',
    title: (
      <>
        Alan adınız <span className="text-[#8EF0B5]">kayıtlı mı?</span>
      </>
    ),
    inputLabel: 'Alan adı',
    placeholder: 'ornek.com',
    submit: 'Sorgula',
    loading: 'Sorgulanıyor…',
    registered: 'Kayıtlı',
    registeredDesc: 'Bu alan adı Verisign kayıt veritabanında kayıtlı görünüyor.',
    registeredAt: 'Kayıt tarihi',
    expiresAt: 'Bitiş tarihi',
    notFound: 'Kayıt bulunamadı',
    notFoundDesc:
      'Verisign kayıt veritabanında bu alan adına ait bir kayıt bulunamadı. Bu, alan adının kesin olarak satın alınabileceği anlamına gelmez; alan adı rezerve edilmiş, kısıtlanmış veya özel statülü olabilir.',
    rateLimited: 'Sorgu limiti aşıldı',
    rateLimitedDesc: 'Kısa sürede çok fazla sorgu yapıldı. Lütfen bir dakika sonra tekrar deneyin.',
    error: 'Sorgulanamadı',
    errorDesc:
      'Kayıt servisine şu anda ulaşılamıyor veya beklenmeyen bir yanıt alındı. Alan adının durumu hakkında bir sonuç üretilmedi; lütfen daha sonra tekrar deneyin.',
    invalid: 'Geçersiz alan adı',
    invalidDesc: 'Lütfen alan adını ornek.com biçiminde, alt alan adı olmadan girin.',
    unsupported: 'Desteklenmeyen uzantı',
    unsupportedDesc: (tld: string) =>
      `.${tld} uzantısı henüz desteklenmiyor. Şu an yalnızca .com ve .net alan adları sorgulanabilir.`,
    source: 'Kaynak: Verisign RDAP · Sonuçlar bilgilendirme amaçlıdır.',
  },
  en: {
    label: 'Domain Lookup',
    title: (
      <>
        Is your domain <span className="text-[#8EF0B5]">registered?</span>
      </>
    ),
    inputLabel: 'Domain name',
    placeholder: 'example.com',
    submit: 'Check',
    loading: 'Checking…',
    registered: 'Registered',
    registeredDesc: 'This domain appears as registered in the Verisign registry database.',
    registeredAt: 'Registered on',
    expiresAt: 'Expires on',
    notFound: 'No registration found',
    notFoundDesc:
      'No registration record was found for this domain in the Verisign registry database. This does not guarantee the domain can be purchased; it may be reserved, restricted or have a special status.',
    rateLimited: 'Query limit reached',
    rateLimitedDesc: 'Too many lookups in a short time. Please try again in a minute.',
    error: 'Lookup failed',
    errorDesc:
      'The registry service is unreachable or returned an unexpected response. No result was produced for this domain; please try again later.',
    invalid: 'Invalid domain',
    invalidDesc: 'Please enter the domain as example.com, without a subdomain.',
    unsupported: 'Unsupported extension',
    unsupportedDesc: (tld: string) =>
      `.${tld} is not supported yet. Only .com and .net domains can be checked for now.`,
    source: 'Source: Verisign RDAP · Results are for information only.',
  },
};

export function DomainLookup() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewState>({ kind: 'idle' });
  const abortRef = useRef<AbortController | null>(null);

  const formatDate = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = parseDomain(query);
    if (!parsed.ok) {
      setView({
        kind: 'result',
        data:
          parsed.reason === 'unsupported_tld'
            ? { status: 'unsupported_tld', tld: parsed.tld }
            : { status: 'invalid' },
      });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setView({ kind: 'loading', domain: parsed.domain });

    try {
      const res = await fetch(`/api/domain-lookup?domain=${encodeURIComponent(parsed.domain)}`, {
        signal: controller.signal,
      });
      const data = (await res.json()) as DomainLookupResponse;
      if (!data || typeof data.status !== 'string') throw new Error('Malformed response');
      setView({ kind: 'result', data });
    } catch {
      if (controller.signal.aborted) return;
      setView({ kind: 'result', data: { status: 'error' } });
    }
  }

  const loading = view.kind === 'loading';

  return (
    <section className="relative z-20 pt-24 md:pt-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-md">
          <div className="absolute -top-24 -right-16 w-[280px] h-[280px] bg-[#8EF0B5]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8 p-4 md:px-6 md:py-5">
            <div className="shrink-0">
              <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8EF0B5]/70">
                <span className="block w-6 h-px bg-[#8EF0B5]/60" />
                {copy.label}
              </div>
              <h2 className="mt-1.5 text-lg md:text-xl font-bold tracking-tight text-white">
                {copy.title}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-1 gap-2" noValidate>
              <label htmlFor="domain-lookup-input" className="sr-only">
                {copy.inputLabel}
              </label>
              <div className="relative flex-1 min-w-0">
                <Globe
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  aria-hidden
                />
                <input
                  id="domain-lookup-input"
                  type="text"
                  inputMode="url"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={300}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={copy.placeholder}
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-mono text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                aria-label={loading ? copy.loading : copy.submit}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#8EF0B5] px-4 sm:px-5 py-2.5 text-sm font-semibold text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8EF0B5]"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                <span className="hidden sm:inline">{loading ? copy.loading : copy.submit}</span>
              </button>
            </form>
          </div>

          <div aria-live="polite">
            {view.kind === 'result' && (
              <div className="relative px-4 pb-4 md:px-6 md:pb-5">
                <ResultCard data={view.data} copy={copy} formatDate={formatDate} />
                <p className="mt-2 font-mono text-[10px] tracking-wide text-gray-500">{copy.source}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  data,
  copy,
  formatDate,
}: {
  data: DomainLookupResponse;
  copy: (typeof COPY)['tr'];
  formatDate: (iso: string | null) => string | null;
}) {
  switch (data.status) {
    case 'registered': {
      const registeredAt = formatDate(data.registeredAt);
      const expiresAt = formatDate(data.expiresAt);
      return (
        <div className="rounded-xl border border-[#8EF0B5]/30 bg-[#8EF0B5]/[0.06] px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-[#8EF0B5] font-semibold">
            <CheckCircle2 size={18} className="shrink-0" />
            {copy.registered}
            <span className="font-mono font-normal text-white break-all">· {data.domain}</span>
          </div>
          <p className="mt-2 text-sm text-gray-300">{copy.registeredDesc}</p>
          {(registeredAt || expiresAt) && (
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {registeredAt && (
                <div>
                  <dt className="text-gray-500">{copy.registeredAt}</dt>
                  <dd className="text-white">{registeredAt}</dd>
                </div>
              )}
              {expiresAt && (
                <div>
                  <dt className="text-gray-500">{copy.expiresAt}</dt>
                  <dd className="text-white">{expiresAt}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      );
    }
    case 'not_found':
      return (
        <div className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-white font-semibold">
            <Search size={18} className="shrink-0 text-gray-300" />
            {copy.notFound}
            <span className="font-mono font-normal text-gray-300 break-all">· {data.domain}</span>
          </div>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">{copy.notFoundDesc}</p>
        </div>
      );
    case 'rate_limited':
      return (
        <StatusNote tone="warn" icon={<ShieldAlert size={18} className="shrink-0" />} title={copy.rateLimited}>
          {copy.rateLimitedDesc}
        </StatusNote>
      );
    case 'invalid':
      return (
        <StatusNote tone="warn" icon={<AlertTriangle size={18} className="shrink-0" />} title={copy.invalid}>
          {copy.invalidDesc}
        </StatusNote>
      );
    case 'unsupported_tld':
      return (
        <StatusNote tone="warn" icon={<AlertTriangle size={18} className="shrink-0" />} title={copy.unsupported}>
          {copy.unsupportedDesc(data.tld)}
        </StatusNote>
      );
    default:
      return (
        <StatusNote tone="error" icon={<AlertTriangle size={18} className="shrink-0" />} title={copy.error}>
          {copy.errorDesc}
        </StatusNote>
      );
  }
}

function StatusNote({
  tone,
  icon,
  title,
  children,
}: {
  tone: 'warn' | 'error';
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const styles =
    tone === 'error'
      ? 'border-red-500/30 bg-red-500/[0.08] text-red-300'
      : 'border-amber-400/30 bg-amber-400/[0.06] text-amber-200';
  return (
    <div className={`rounded-xl border px-4 py-4 ${styles}`}>
      <div className="flex items-center gap-2 font-semibold">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm opacity-90 leading-relaxed">{children}</p>
    </div>
  );
}
