'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/LanguageContext';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';

const CHART_BARS = [38, 62, 48, 80, 54, 70, 46, 90, 60, 74];

/**
 * Flagship hero band for AgetoBI — same beat as Odoo's app showcase:
 * decorative spark lines + headline/CTAs on one side, a dashboard
 * mockup card on the other. No real screenshot/video yet, so the
 * mockup is built from CSS — swap `MockupCard` for an <Image>/<video>
 * once real AgetoBI footage exists.
 */
export function AgetoBIShowcase() {
  const { lang } = useLanguage();

  return (
    <section className="relative w-full py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
          {/* ambient glow */}
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] bg-[#8EF0B5]/10 blur-[120px] rounded-full pointer-events-none" />

          {/* decorative spark lines, Odoo-style */}
          <SparkBurst className="absolute top-10 left-8 text-blue-400/60 hidden md:block" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-14 items-center">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-400/80 mb-6">
                <span className="block w-8 h-px bg-blue-400/60" />
                {lang === 'tr' ? 'AgetoBI · Amiral Gemisi' : 'AgetoBI · Flagship'}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                {lang === 'tr' ? (
                  <>Sipariş, Rapor ve GA4 Trafiğinizi <span className="text-[#8EF0B5]">Tek Panelde</span> Yönetin</>
                ) : (
                  <>Run Orders, Reports and GA4 Traffic from <span className="text-[#8EF0B5]">One Panel</span></>
                )}
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-[52ch]">
                {lang === 'tr'
                  ? 'AgetoBI; sipariş, ürün, müşteri, dinamik rapor, dashboard, alarm, kargo ve GA4 trafik verilerini tek platformda birleştiren iç operasyon sistemidir. Dağınık tablolar yerine ekiplerin güvenebileceği canlı bir görünüm sunar.'
                  : 'AgetoBI unifies orders, products, customers, dynamic reports, dashboards, alerts, shipping and GA4 traffic data in one system — a live view teams can trust instead of scattered spreadsheets.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <FlyingIconsButton href={`/${lang}/contact`} paddingY={12} paddingX={28}>
                  {lang === 'tr' ? 'Demo Talep Et' : 'Request Demo'}
                </FlyingIconsButton>
                <Link
                  href={`/${lang}/products/agento-bi`}
                  className="h-12 inline-flex items-center justify-center rounded-full bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20 transition-all"
                >
                  {lang === 'tr' ? 'Ürünü İncele' : 'Explore Product'}
                </Link>
              </div>
            </div>

            <DashboardMockup lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup({ lang }: { lang: string }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#0d0e12] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-gray-500 font-mono">AgetoBI · {lang === 'tr' ? 'canlı panel' : 'live panel'}</span>
      </div>

      <div className="p-6 space-y-6">
        {/* stat tiles */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: '1.248', l: lang === 'tr' ? 'Sipariş' : 'Orders', c: 'text-[#8EF0B5]' },
            { v: '%3.4', l: lang === 'tr' ? 'Dönüşüm' : 'Conversion', c: 'text-blue-400' },
            { v: '42K', l: 'GA4 · ' + (lang === 'tr' ? 'Oturum' : 'Sessions'), c: 'text-purple-400' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
              <div className="text-[10px] text-gray-500 font-medium">{s.l}</div>
            </div>
          ))}
        </div>

        {/* bar chart */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-end gap-1.5 h-28">
            {CHART_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500/60 to-[#8EF0B5]/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* fake table rows */}
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" />
              <div className="h-2.5 flex-1 rounded bg-white/10" />
              <div className="h-2.5 w-12 rounded bg-[#8EF0B5]/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparkBurst({ className }: { className?: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className={className} aria-hidden>
      <path d="M45 10 L45 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 26 L30 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 58 L30 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
