import type { Metadata } from 'next';
import { blogPosts, getBlogPost } from '@/constants/blog-posts';
import { isLocale } from '@/lib/locale';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post not found' };
  const useTr = isLocale(locale) && locale === 'tr';
  const title = useTr ? post.tr.title : post.en.title;
  const description = useTr ? post.tr.excerpt : post.en.excerpt;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        tr: `/tr/blog/${post.slug}`,
        en: `/en/blog/${post.slug}`,
        'x-default': `/tr/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: `${title} · agetolabs`,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      locale: useTr ? 'tr_TR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) return children;

  const useTr = locale === 'tr';
  const headline = useTr ? post.tr.title : post.en.title;
  const description = useTr ? post.tr.excerpt : post.en.excerpt;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'agetolabs',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'agetolabs',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/sonlogo1.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: useTr ? 'Anasayfa' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: headline, item: `${siteUrl}/${locale}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
