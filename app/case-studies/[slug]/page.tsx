'use client';

import Link from 'next/link';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { caseStudies, getCaseStudy } from '@/constants/case-studies';
import { useLanguage } from '@/components/LanguageContext';

export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { lang } = useLanguage();
  const content = lang === 'tr' ? study.tr : study.en;
  const industry = lang === 'tr' ? study.industryTr : study.industry;
  const scope = lang === 'tr' ? study.scopeTr : study.scope;

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextStudy =
    caseStudies[(currentIndex + 1) % caseStudies.length] ?? null;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      <Header />
      <RobotCompanion />

      <main className="flex-1 pt-32 pb-20 max-w-[1100px] mx-auto px-4 sm:px-8 w-full">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          {lang === 'tr' ? 'Tüm vaka çalışmaları' : 'All case studies'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/80"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {industry}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 text-4xl md:text-6xl font-bold tracking-tight"
        >
          {study.brand}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-xl md:text-2xl text-[#8EF0B5] font-medium tracking-tight max-w-3xl"
        >
          {content.eyebrow}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-3xl text-lg text-gray-300 leading-relaxed"
        >
          {content.summary}
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-2">
          {scope.map((s) => (
            <span
              key={s}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-gray-300"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
              {lang === 'tr' ? 'Problem' : 'Problem'}
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">{content.problem}</p>
          </section>
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8EF0B5]/80">
              {lang === 'tr' ? 'Yaklaşım' : 'Approach'}
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">{content.approach}</p>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-[#8EF0B5]/20 bg-[#8EF0B5]/[0.04] p-7 md:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8EF0B5]">
            {lang === 'tr' ? 'Sonuç' : 'Outcome'}
          </div>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.outcome.map((o, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-white/90"
              >
                <span
                  aria-hidden
                  className="mt-2 block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shrink-0"
                />
                <span className="leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        <blockquote className="mt-14 md:mt-20 max-w-3xl">
          <div className="font-serif text-3xl md:text-4xl font-medium leading-snug tracking-tight">
            &ldquo;{content.pullQuote}&rdquo;
          </div>
        </blockquote>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 border-t border-white/[0.08] pt-10">
          <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
            {lang === 'tr' ? 'Benzer bir proje konuşalım' : 'Discuss a similar project'}
          </FlyingIconsButton>
          {nextStudy && nextStudy.slug !== slug && (
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gray-400 hover:text-white transition-colors"
            >
              {lang === 'tr' ? 'Sonraki:' : 'Next:'} {nextStudy.brand}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
