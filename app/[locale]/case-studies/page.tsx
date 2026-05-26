'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { caseStudies } from '@/constants/case-studies';
import { useLanguage } from '@/components/LanguageContext';

export default function CaseStudiesIndexPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      <Header />
      <RobotCompanion />

      <main className="flex-1 pt-32 pb-24 max-w-[1400px] mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70 mb-6"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {lang === 'tr' ? 'Vaka Çalışmaları' : 'Case Studies'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl"
        >
          {lang === 'tr'
            ? 'Lider markalarla nasıl çalışıyoruz.'
            : 'How we ship with leading brands.'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed"
        >
          {lang === 'tr'
            ? 'Pazaryeri orkestrasyonundan omnichannel ticarete, drop-day mağaza mühendisliğinden ERP entegrasyonuna — kurumsal işin gerçekten nasıl çalıştığı.'
            : 'From marketplace orchestration to omnichannel commerce, drop-day storefront engineering to ERP integration — how enterprise work actually ships.'}
        </motion.p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudies.map((c, i) => {
            const content = lang === 'tr' ? c.tr : c.en;
            const industry = lang === 'tr' ? c.industryTr : c.industry;
            const scope = lang === 'tr' ? c.scopeTr : c.scope;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              >
                <Link
                  href={`/${lang}/case-studies/${c.slug}`}
                  className="group block h-full p-7 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#8EF0B5]/30 transition-all relative overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(60% 80% at 100% 0%, rgba(142,240,181,0.08) 0%, transparent 60%)',
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8EF0B5]/80">
                        {industry}
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-gray-500 group-hover:text-[#8EF0B5] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                    <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">
                      {c.brand}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3">
                      {content.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {scope.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-gray-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
