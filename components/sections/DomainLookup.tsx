'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
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
    desc: '.com ve .net alan adlarının kayıt durumunu Verisign RDAP kayıtlarından anlık olarak sorgulayın.',
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
    desc: 'Check the registration status of .com and .net domains live against Verisign RDAP records.',
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
    <section className="max-w-[1600px] mx-auto px-4 sm:px-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent"
      >
        <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] bg-[#8EF0B5]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-10 md:p-14 items-start">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70">
              <span className="block w-8 h-px bg-[#8EF0B5]/60" />
              {copy.label}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
              {copy.title}
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-[52ch]">
              {copy.desc}
            </p>
          </div>

          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
              <label htmlFor="domain-lookup-input" className="sr-only">
                {copy.inputLabel}
              </label>
              <div className="relative flex-1">
                <Globe
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-mono text-[15px]"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8EF0B5] px-7 py-3.5 text-[15px] font-semibold text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8EF0B5]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                {loading ? copy.loading : copy.submit}
              </button>
            </form>

            <div aria-live="polite" className="mt-5 min-h-[1px]">
              {view.kind === 'loading' && (
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-gray-300">
                  <Loader2 size={16} className="animate-spin text-[#8EF0B5]" />
                  <span className="font-mono break-all">{view.domain}</span>
                  <span className="text-gray-500">· {copy.loading}</span>
                </div>
              )}
              {view.kind === 'result' && (
                <ResultCard data={view.data} copy={copy} formatDate={formatDate} />
              )}
            </div>

            <p className="mt-4 font-mono text-[11px] tracking-wide text-gray-500">
              {copy.source}
            </p>
          </div>
        </div>
      </motion.div>
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
