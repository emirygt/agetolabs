'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { AiHubOrb } from '@/components/AiHubOrb';
import { StarField } from '@/components/StarField';
import { topCards, bottomCards } from '@/constants/products';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] as any
    }
  },
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Star field background */}
      <StarField />

      {/* Subtle background glow — sits on top of stars */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.18) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142, 240, 181, 0.06) 0%, transparent 40%)' }}>
      </div>

      <Header />
      
      <main className="pt-24 md:pt-32 pb-8 relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8">
        
        {/* Top Section: Text, Orb, 2x2 Grid */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 mt-4 md:mt-8">
          
          {/* Left: Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 w-full max-w-xl flex flex-col items-center xl:items-start text-center xl:text-left gap-6"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {t('heroTitle1')} <br className="hidden sm:block" />
              {t('heroTitle2')} <br className="hidden sm:block" />
              <span className="text-[#8EF0B5]">{t('heroTitle3')}</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed">
              {t('heroDesc')}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                href="/ecosystem" 
                className="mt-2 md:mt-4 h-12 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-base font-semibold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_20px_rgba(110,231,183,0.3)] hover:shadow-[0_0_30px_rgba(110,231,183,0.5)] active:scale-95"
              >
                {t('exploreEcosystem')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Center: AI Hub Orb */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex-1 w-full flex justify-center items-center relative min-h-[350px] md:min-h-[450px]"
          >
            <div className="scale-90 sm:scale-100 md:scale-110">
              <AiHubOrb />
            </div>
          </motion.div>

          {/* Right: 2x2 Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {topCards.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Bottom Section: 3-Column Row */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-12 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:max-w-5xl xl:mx-auto"
        >
          {bottomCards.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
