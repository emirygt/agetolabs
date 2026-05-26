'use client';

import Link from 'next/link';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

import { topCards, bottomCards } from '@/constants/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { useLanguage } from '@/components/LanguageContext';
import {
  MountainShowcase,
  type ScatterItem,
} from '@/components/ui/mountain-showcase';
import {
  CardStack,
  type CardStackItem,
} from '@/components/ui/card-stack';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';

/* ============================================================
 * Per-product Unsplash imagery (reuses homepage map)
 * ============================================================ */
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

export default function ProductsPage() {
  const { t, lang } = useLanguage();
  const allProducts = [...topCards, ...bottomCards];

  /* Scattered chips across the mountain landscape — mix of products + service tags.
     Positions are hand-tuned %s so chips spread evenly and don't clip the centre.  */
  const scatterItems: ScatterItem[] = [
    // ----- Products (mint accent) -----
    {
      id: 'p-structa',
      label: lang === 'tr' ? 'Structa AI' : 'Structa AI',
      icon: 'PenTool',
      href: '/products/agento-struct-editor',
      x: 14,
      y: 32,
      size: 1.05,
      variant: 'card',
      accent: 'mint',
    },
    {
      id: 'p-pharma',
      label: lang === 'tr' ? 'Pharma AI' : 'Pharma AI',
      icon: 'FlaskConical',
      href: '/products/agento-pharm-ia',
      x: 30,
      y: 22,
      size: 1.05,
      variant: 'card',
      accent: 'mint',
    },
    {
      id: 'p-otonom',
      label: lang === 'tr' ? 'Autonomous Agent' : 'Autonomous Agent',
      icon: 'Bot',
      href: '/products/agento-otonom-agent',
      x: 48,
      y: 30,
      size: 1.05,
      variant: 'card',
      accent: 'mint',
    },
    {
      id: 'p-nexus',
      label: lang === 'tr' ? 'Agento Flow' : 'Agento Flow',
      icon: 'Waypoints',
      href: '/products/agento-company-flow',
      x: 66,
      y: 24,
      size: 1.05,
      variant: 'card',
      accent: 'purple',
    },
    {
      id: 'p-price',
      label: lang === 'tr' ? 'priceCompare' : 'priceCompare',
      icon: 'Search',
      href: '/products/agento-price-compare',
      x: 84,
      y: 32,
      size: 1.05,
      variant: 'card',
      accent: 'mint',
    },
    {
      id: 'p-ecza',
      label: lang === 'tr' ? 'Eczaport' : 'Eczaport',
      icon: 'Store',
      href: '/products/agento-eczaport',
      x: 22,
      y: 50,
      size: 1,
      variant: 'card',
      accent: 'purple',
    },
    {
      id: 'p-wa',
      label: lang === 'tr' ? 'WhatsApp Sales' : 'WhatsApp Sales',
      icon: 'MessageCircle',
      href: '/products/agento-wh-sales',
      x: 56,
      y: 56,
      size: 1,
      variant: 'card',
      accent: 'mint',
    },

    // ----- Service / capability tags (smaller chips) -----
    {
      id: 't-web',
      label: lang === 'tr' ? 'Web Siteleri' : 'Websites',
      icon: 'Globe',
      href: '/hizmetler',
      x: 40,
      y: 70,
      size: 0.92,
      variant: 'chip',
      accent: 'white',
    },
    {
      id: 't-eticaret',
      label: lang === 'tr' ? 'E-ticaret' : 'E-commerce',
      icon: 'ShoppingBag',
      href: '/hizmetler',
      x: 74,
      y: 50,
      size: 0.95,
      variant: 'chip',
      accent: 'mint',
    },
    {
      id: 't-erp',
      label: 'ERP Integration',
      icon: 'Database',
      href: '/hizmetler',
      x: 12,
      y: 68,
      size: 0.9,
      variant: 'chip',
      accent: 'white',
    },
    {
      id: 't-crm',
      label: 'CRM Sync',
      icon: 'Users',
      href: '/hizmetler',
      x: 88,
      y: 64,
      size: 0.9,
      variant: 'chip',
      accent: 'white',
    },
    {
      id: 't-market',
      label: lang === 'tr' ? 'Pazaryerleri' : 'Marketplaces',
      icon: 'Store',
      href: '/hizmetler',
      x: 28,
      y: 82,
      size: 0.9,
      variant: 'chip',
      accent: 'purple',
    },
    {
      id: 't-dash',
      label: lang === 'tr' ? 'Dashboardlar' : 'Dashboards',
      icon: 'LayoutDashboard',
      href: '/hizmetler',
      x: 62,
      y: 82,
      size: 0.9,
      variant: 'chip',
      accent: 'white',
    },
    {
      id: 't-agents',
      label: 'AI Agents',
      icon: 'Sparkles',
      href: '/products',
      x: 84,
      y: 78,
      size: 0.95,
      variant: 'chip',
      accent: 'mint',
    },
    {
      id: 't-auto',
      label: lang === 'tr' ? 'Otomasyon' : 'Automation',
      icon: 'Workflow',
      href: '/products',
      x: 6,
      y: 50,
      size: 0.9,
      variant: 'chip',
      accent: 'purple',
    },
  ];

  const stackItems: CardStackItem[] = allProducts.map((p) => ({
    id: p.id,
    title: lang === 'tr' ? (p.nameTr ?? p.name) : p.name,
    description:
      lang === 'tr' ? (p.descriptionTr ?? p.description) : p.description,
    imageSrc: PRODUCT_IMAGES[p.id],
    href: `/products/${p.slug}`,
    ctaLabel: t('products_view_details'),
  }));

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col relative overflow-x-clip">
      {/* Subtle ambient gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#8EF0B5]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
      </div>

      <Header />
      <RobotCompanion />

      <main className="flex-1 relative z-10 w-full pt-32 pb-32">
        {/* =====================================================
            Page header
        ===================================================== */}
        <div className="max-w-3xl mx-auto px-6 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-[#8EF0B5]">{t('products_page_title_a')}</span>{' '}
            {t('products_page_title_b')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            {t('products_page_subtitle')}
          </motion.p>
        </div>

        {/* =====================================================
            SHOWCASE — Mountain spotlight with scattered chips
        ===================================================== */}
        <section className="relative w-full mb-32">
          <div className="max-w-[1400px] mx-auto px-6 mb-10">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8EF0B5]/80">
              <span className="block w-8 h-px bg-[#8EF0B5]/60" />
              {t('products_flagship_eyebrow')}
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight max-w-[22ch]">
              {t('products_flagship_heading')}
            </h2>
            <p className="mt-3 text-gray-400 max-w-[58ch]">
              {t('products_flagship_desc')}
            </p>
          </div>

          <MountainShowcase items={scatterItems} />
        </section>

        {/* =====================================================
            EXPLORE ALL — Card Stack
        ===================================================== */}
        <section className="relative w-full">
          <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8EF0B5]/80">
              <span className="block w-8 h-px bg-[#8EF0B5]/60" />
              {t('products_explore_eyebrow')}
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight max-w-[22ch]">
              {t('products_explore_heading')}
            </h2>
            <p className="mt-3 text-gray-400 max-w-[58ch]">
              {t('products_explore_desc')}
            </p>
          </div>

          <ProductCardStack items={stackItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ============================================================
 * Card-Stack with brand-styled cards + CTA
 * ============================================================ */
function ProductCardStack({ items }: { items: CardStackItem[] }) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4">
      <CardStack
        items={items}
        cardWidth={520}
        cardHeight={340}
        loop
        showDots
        renderCard={(item, { active }) => (
          <div className="relative h-full w-full bg-[#0d0e12]">
            {/* image */}
            {item.imageSrc && (
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                draggable={false}
                priority={active}
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(13,14,18,0.15) 0%, rgba(13,14,18,0.75) 65%, rgba(13,14,18,0.95) 100%)',
              }}
            />

            {/* corner accent */}
            <span
              aria-hidden
              className="absolute top-0 left-0 h-[3px] w-1/3 bg-[#8EF0B5]"
              style={{ boxShadow: '0 0 16px rgba(142,240,181,0.7)' }}
            />

            <div className="relative z-10 flex h-full flex-col justify-end p-7">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-2 text-sm md:text-[15px] text-white/80 leading-relaxed line-clamp-3 max-w-[44ch]">
                  {item.description}
                </p>
              )}

              {active && item.href && (
                <div className="mt-5" onClick={(e) => e.stopPropagation()}>
                  <FlyingIconsButton href={item.href} paddingY={8} paddingX={18}>
                    {item.ctaLabel ?? t('products_view_details')}
                  </FlyingIconsButton>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
