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
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  blogPosts,
  getBlogPost,
  type BlogBlock,
} from '@/constants/blog-posts';
import { useLanguage } from '@/components/LanguageContext';

function formatDate(iso: string, lang: 'en' | 'tr') {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderBlock(b: BlogBlock, i: number) {
  if (b.type === 'h2') {
    return (
      <h2 key={i} className="mt-14 text-2xl md:text-3xl font-bold tracking-tight">
        {b.text}
      </h2>
    );
  }
  if (b.type === 'quote') {
    return (
      <blockquote
        key={i}
        className="mt-10 border-l-2 border-[#8EF0B5] pl-6 italic text-xl md:text-2xl leading-snug text-white/90"
      >
        &ldquo;{b.text}&rdquo;
      </blockquote>
    );
  }
  if (b.type === 'list') {
    return (
      <ul key={i} className="mt-6 space-y-3">
        {b.items.map((it, j) => (
          <li key={j} className="flex items-start gap-3 text-gray-300 leading-relaxed">
            <span
              aria-hidden
              className="mt-2.5 block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shrink-0"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="mt-6 text-lg text-gray-300 leading-relaxed">
      {b.text}
    </p>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { lang } = useLanguage();
  const content = lang === 'tr' ? post.tr : post.en;
  const category = lang === 'tr' ? post.categoryTr : post.category;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost =
    blogPosts.filter((p) => p.slug !== slug).sort(
      (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
    )[0] ?? null;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      <Header />
      <RobotCompanion />

      <main className="flex-1 pt-32 pb-24 max-w-[820px] mx-auto px-4 sm:px-8 w-full">
        <Breadcrumbs
          items={[
            { label: lang === 'tr' ? 'Anasayfa' : 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: content.title },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#8EF0B5]/80"
        >
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {category}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 text-3xl md:text-5xl font-bold tracking-tight leading-tight"
        >
          {content.title}
        </motion.h1>

        <div className="mt-5 text-sm text-gray-500">
          {formatDate(post.publishedAt, lang as 'en' | 'tr')}
          {' · '}
          {post.readingMinutes} {lang === 'tr' ? 'dk okuma' : 'min read'}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-xl text-white/90 leading-relaxed border-l-2 border-white/20 pl-5"
        >
          {content.excerpt}
        </motion.p>

        <article className="mt-12">
          {content.blocks.map((b, i) => renderBlock(b, i))}
        </article>

        <div className="mt-16 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
          <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
            {lang === 'tr' ? 'Bizimle bir proje konuşalım' : 'Talk to us about a project'}
          </FlyingIconsButton>
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gray-400 hover:text-white transition-colors"
            >
              {lang === 'tr' ? 'Sonraki yazı:' : 'Next post:'}{' '}
              {lang === 'tr' ? nextPost.tr.title : nextPost.en.title}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
