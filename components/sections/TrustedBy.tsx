'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageContext';

const BRANDS = [
  'Turkcell Pasaj',
  'Samsung',
  'Lacoste',
  'Converse',
  'Vatan Bilgisayar',
  'English Home',
  'GS Store',
];

export function TrustedBy() {
  const { t, lang } = useLanguage();

  const stats = [
    { value: t('trusted_stat_projects_value'), label: t('trusted_stat_projects_label') },
    { value: t('trusted_stat_years_value'),    label: t('trusted_stat_years_label') },
    { value: t('trusted_stat_products_value'), label: t('trusted_stat_products_label') },
    { value: t('trusted_stat_uptime_value'),   label: t('trusted_stat_uptime_label') },
  ];

  return (
    <section className="relative z-10 border-y border-white/[0.06] bg-[#0B0C10]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70 mb-6"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {t('trusted_eyebrow')}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl"
        >
          {t('trusted_heading')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed"
        >
          {t('trusted_desc')}
        </motion.p>

        {/* Brand wall — typography only, no logo files required */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-5"
        >
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="flex items-center justify-center text-center font-mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-gray-400/80 hover:text-white transition-colors py-3 border border-white/5 rounded-lg bg-white/[0.015] backdrop-blur-sm"
            >
              {brand}
            </li>
          ))}
        </motion.ul>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 overflow-hidden group"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(60% 60% at 100% 0%, rgba(142,240,181,0.10) 0%, transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-[#8EF0B5] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default TrustedBy;
