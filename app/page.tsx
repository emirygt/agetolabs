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
      
      <main className="pt-24 md:pt-32 pb-8 relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8">
        
        {/* Top Section: Text, Orb, 2x2 Grid */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 mt-4 md:mt-8">
          
          {/* Left: Text Content */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-center xl:items-start text-center xl:text-left gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              {t('heroTitle1')} <br className="hidden sm:block" />
              {t('heroTitle2')} <br className="hidden sm:block" />
              {t('heroTitle3')}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed">
              {t('heroDesc')}
            </p>
            <Link 
              href="/ecosystem" 
              className="mt-2 md:mt-4 h-12 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-base font-semibold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_20px_rgba(110,231,183,0.3)] hover:shadow-[0_0_30px_rgba(110,231,183,0.5)]"
            >
              {t('exploreEcosystem')}
            </Link>
          </div>

          {/* Center: AI Hub Orb */}
          <div className="flex-1 w-full flex justify-center items-center relative min-h-[300px] md:min-h-[400px]">
            <div className="scale-75 sm:scale-90 md:scale-100">
              <AiHubOrb />
            </div>
          </div>

          {/* Right: 2x2 Grid */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topCards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

        {/* Bottom Section: 3-Column Row */}
        <div className="mt-12 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:max-w-5xl xl:mx-auto">
          {bottomCards.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
