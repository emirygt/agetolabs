'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/LanguageContext';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { AgetoBIReel } from '@/components/sections/AgetoBIReel';

/**
 * Flagship hero band for AgetoBI — same beat as Odoo's app showcase:
 * decorative spark lines + headline/CTAs on one side, a looping product
 * reel (AgetoBIReel) on the other.
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

            <AgetoBIReel />
          </div>
        </div>
      </div>
    </section>
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
