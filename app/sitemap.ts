import type { MetadataRoute } from 'next';
import { topCards, bottomCards } from '@/constants/products';
import { caseStudies } from '@/constants/case-studies';
import { blogPosts } from '@/constants/blog-posts';
import { LOCALES } from '@/lib/locale';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

type StaticEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const STATIC_ENTRIES: StaticEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/hizmetler', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/eticaret-dijitallesme', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/hizmetler/e-ticaret-sitesi-kurma', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ecosystem', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/case-studies', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
];

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((loc) => [loc, `${siteUrl}/${loc}${path}`])
    ) as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const entry of STATIC_ENTRIES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteUrl}/${locale}${entry.path}`,
        lastModified: now,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: buildAlternates(entry.path),
      });
    }
  }

  const productPaths = [...topCards, ...bottomCards].map((p) => `/products/${p.slug}`);
  for (const path of productPaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: buildAlternates(path),
      });
    }
  }

  for (const c of caseStudies) {
    const path = `/case-studies/${c.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: buildAlternates(path),
      });
    }
  }

  for (const p of blogPosts) {
    const path = `/blog/${p.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(p.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: buildAlternates(path),
      });
    }
  }

  return entries;
}
