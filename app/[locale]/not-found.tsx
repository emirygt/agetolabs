'use client';

import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';

export default function NotFound() {
  const { lang } = useLanguage();
  const isTr = lang === 'tr';

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8EF0B5]/8 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B0C10_75%)]" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-32 pb-24">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#8EF0B5]/80 mb-8 flex items-center gap-3">
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {isTr ? 'Sinyal kaybedildi · 404' : 'Lost signal · 404'}
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
        </div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-none mb-6">
          <span className="bg-gradient-to-br from-white to-[#8EF0B5] bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold tracking-tight max-w-[22ch] leading-[1.15] text-white mb-5">
          {isTr
            ? 'Yörünge dışında bir sayfa aradın.'
            : 'You drifted off the trajectory.'}
        </h2>
        <p className="text-gray-400 max-w-[52ch] mb-12 text-base md:text-lg leading-relaxed">
          {isTr
            ? 'Bu sayfa ya henüz inşa edilmedi ya da galaksimizden ayrıldı. Buradan istasyona geri dönebilirsin.'
            : 'This page was either never built or has left our galaxy. Use the controls below to return to the station.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <FlyingIconsButton href={`/${lang}`} paddingY={10} paddingX={22}>
            {isTr ? 'Ana sayfaya dön' : 'Back to home'}
          </FlyingIconsButton>
          <Link
            href={`/${lang}/products`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white hover:border-[#8EF0B5]/50 hover:bg-white/[0.08] transition-colors"
          >
            <Compass size={16} strokeWidth={2.2} />
            {isTr ? 'Ürünleri keşfet' : 'Explore products'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
