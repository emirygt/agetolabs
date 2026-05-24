'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';
import { blogPosts } from '@/constants/blog-posts';
import { useLanguage } from '@/components/LanguageContext';

function formatDate(iso: string, lang: 'en' | 'tr') {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogIndexPage() {
  const { lang } = useLanguage();

  const sorted = [...blogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      <Header />
      <RobotCompanion />

      <main className="flex-1 pt-32 pb-24 max-w-[1200px] mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/70 mb-6"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {lang === 'tr' ? 'Yazılar' : 'Writings'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl"
        >
          {lang === 'tr' ? 'Sistem üzerine notlar.' : 'Notes from the system.'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed"
        >
          {lang === 'tr'
            ? 'Otonom ajanlar, kurumsal e-ticaret ve production sistemlerinin mimarisi üzerine ekibimizden yazılar.'
            : 'Writing from the team on autonomous agents, enterprise e-commerce and the architecture behind production systems.'}
        </motion.p>

        <ul className="mt-16 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {sorted.map((post, i) => {
            const content = lang === 'tr' ? post.tr : post.en;
            const category = lang === 'tr' ? post.categoryTr : post.category;
            return (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 md:py-10"
                >
                  <div className="md:w-44 shrink-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8EF0B5]/80">
                      {category}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {formatDate(post.publishedAt, lang as 'en' | 'tr')}
                      {' · '}
                      {post.readingMinutes}{' '}
                      {lang === 'tr' ? 'dk okuma' : 'min read'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#8EF0B5] transition-colors flex items-start gap-3">
                      <span>{content.title}</span>
                      <ArrowUpRight
                        size={20}
                        className="mt-1.5 text-gray-500 group-hover:text-[#8EF0B5] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </h2>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed max-w-2xl">
                      {content.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
