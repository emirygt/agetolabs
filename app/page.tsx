'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { AiHubOrb } from '@/components/AiHubOrb';
import { topCards, bottomCards } from '@/constants/products';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Subtle background glow (Optimized with radial gradients instead of blur) */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.15) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142, 240, 181, 0.05) 0%, transparent 40%)' }}>
      </div>

      <Header />
      
      <main className="pt-32 pb-8 relative z-10 max-w-[1600px] mx-auto px-8">
        
        {/* Top Section: Text, Orb, 2x2 Grid */}
        <div className="flex flex-row items-center justify-between gap-12 mt-8">
          
          {/* Left: Text Content */}
          <div className="flex-1 max-w-xl flex flex-col items-start gap-6">
            <h1 className="text-7xl font-bold tracking-tight leading-[1.1] text-white">
              {t('heroTitle1')} <br />
              {t('heroTitle2')} <br />
              {t('heroTitle3')}
            </h1>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              {t('heroDesc')}
            </p>
            <Link 
              href="/ecosystem" 
              className="mt-4 h-12 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-base font-semibold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_20px_rgba(110,231,183,0.3)] hover:shadow-[0_0_30px_rgba(110,231,183,0.5)]"
            >
              {t('exploreEcosystem')}
            </Link>
          </div>

          {/* Center: AI Hub Orb */}
          <div className="flex-1 flex justify-center items-center relative min-h-[400px]">
            <AiHubOrb />
          </div>

          {/* Right: 2x2 Grid */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {topCards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

        {/* Bottom Section: 3-Column Row */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {bottomCards.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
