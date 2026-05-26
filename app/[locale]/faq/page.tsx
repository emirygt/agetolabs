'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { faqCategories } from '@/constants/faq';
import { useLanguage } from '@/components/LanguageContext';

export default function FAQPage() {
  const { lang } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      <Header />
      <RobotCompanion />

      <main className="flex-1 pt-32 pb-24 max-w-[1100px] mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70 mb-6"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {lang === 'tr' ? 'Sıkça Sorulanlar' : 'Frequently Asked'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl"
        >
          {lang === 'tr' ? 'Sıkça sorulan sorular.' : 'Questions, answered.'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed"
        >
          {lang === 'tr'
            ? 'Ürünler, entegrasyon, angajman modeli ve lansman sonrası operasyon hakkında en sık gelen sorular.'
            : 'The questions that come up most often about our products, integrations, engagement model and post-launch operations.'}
        </motion.p>

        <div className="mt-16 space-y-16">
          {faqCategories.map((cat) => (
            <section key={cat.id}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                {lang === 'tr' ? cat.titleTr : cat.title}
              </h2>
              <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {cat.items.map((item, i) => {
                  const key = `${cat.id}-${i}`;
                  const open = openKey === key;
                  const q = lang === 'tr' ? item.qTr : item.q;
                  const a = lang === 'tr' ? item.aTr : item.a;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
                        aria-expanded={open}
                        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                      >
                        <span className="text-base md:text-lg font-medium text-white group-hover:text-[#8EF0B5] transition-colors">
                          {q}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${
                            open ? 'rotate-180 text-[#8EF0B5]' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-12 text-gray-300 leading-relaxed">
                              {a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 80% at 100% 0%, rgba(142,240,181,0.08) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8EF0B5]/80 mb-3">
              {lang === 'tr' ? 'Listede yok mu?' : "Don't see your question?"}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              {lang === 'tr' ? 'Konuşalım.' : "Let's talk."}
            </h3>
            <p className="mt-3 text-gray-400">
              {lang === 'tr'
                ? 'Spesifik bir sistem veya kullanım senaryosu için en hızlı yol — bize doğrudan yazın.'
                : 'For a specific system or use case, the fastest path is to reach out directly.'}
            </p>
          </div>
          <div className="relative">
            <FlyingIconsButton href={`/${lang}/contact`} paddingY={14} paddingX={28}>
              {lang === 'tr' ? 'İletişime Geç' : 'Get in touch'}
            </FlyingIconsButton>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          {lang === 'tr' ? (
            <>
              Ürün detayları için{' '}
              <Link href={`/${lang}/products`} className="text-[#8EF0B5] hover:text-white transition-colors">
                ürünler
              </Link>
              {' '}veya{' '}
              <Link href={`/${lang}/case-studies`} className="text-[#8EF0B5] hover:text-white transition-colors">
                vaka çalışmaları
              </Link>
              {' '}sayfasına göz atın.
            </>
          ) : (
            <>
              For product details, see{' '}
              <Link href={`/${lang}/products`} className="text-[#8EF0B5] hover:text-white transition-colors">
                products
              </Link>
              {' '}or{' '}
              <Link href={`/${lang}/case-studies`} className="text-[#8EF0B5] hover:text-white transition-colors">
                case studies
              </Link>
              .
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
