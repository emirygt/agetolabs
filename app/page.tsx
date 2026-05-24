'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section';
import { TrustedBy } from '@/components/sections/TrustedBy';
import type { LinearCardItem } from '@/components/ui/linear-card';
import { topCards, bottomCards } from '@/constants/products';
import { useLanguage } from '@/components/LanguageContext';

const LINEAR_CARD_GRID =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

const LinearCardSkeleton = () => (
  <div className={LINEAR_CARD_GRID}>
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0d0e12]"
      >
        <div className="h-56 w-full bg-white/[0.04]" />
        <div className="flex items-end justify-between p-4">
          <div className="h-5 w-2/3 rounded bg-white/[0.06]" />
          <div className="h-9 w-9 rounded-full bg-[#8EF0B5]/15" />
        </div>
      </div>
    ))}
  </div>
);

const LinearCard = dynamic(() => import('@/components/ui/linear-card'), {
  ssr: true,
  loading: () => <LinearCardSkeleton />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// Per-product Unsplash imagery — each photo themed to the product's domain.
const PRODUCT_IMAGES: Record<string, string> = {
  'struct-ia-top':
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop',
  'pharm-ia-top':
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80&auto=format&fit=crop',
  'nexus-flow':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
  'price-compare':
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop',
  'otonom-agent':
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop',
  eczatrend:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
  'whatsapp-satis': '/products/whatsapp-sales.jpg',
};

const allProducts = [...topCards, ...bottomCards];

export default function Home() {
  const { t, lang } = useLanguage();

  const toItems = (products: typeof topCards): LinearCardItem[] =>
    products.map((p) => ({
      id: p.id,
      url: { src: PRODUCT_IMAGES[p.id] ?? '' },
      title: lang === 'tr' ? (p.nameTr ?? p.name) : p.name,
      description:
        lang === 'tr' ? (p.descriptionTr ?? p.description) : p.description,
    }));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-400/30 overflow-x-clip">
      <Header />
      <RobotCompanion />

      <HorizonHero />

      <TrustedBy />

      <main className="relative z-10 bg-black">
        <section className="max-w-[1600px] mx-auto px-4 sm:px-8 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
            className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70"
          >
            <span className="block w-8 h-px bg-[#8EF0B5]/60" />
            {t('homeProductsLabel')} · {allProducts.length}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={itemVariants}
          >
            <LinearCard
              items={toItems(allProducts)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
