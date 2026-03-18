'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hammer } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function ComingSoon({ title }: { title: string }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-purple-500/30 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-8 text-center relative z-10">
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 border border-white/10 text-purple-400">
            <Hammer size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            {title} - {t('comingSoon')}
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mb-8">
            {t('comingSoonDesc')}
          </p>
          <Link 
            href="/" 
            className="h-12 inline-flex items-center justify-center rounded-full bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20 transition-all"
          >
            {t('backToHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
