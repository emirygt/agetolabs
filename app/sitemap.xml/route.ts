import { topCards, bottomCards } from '@/constants/products';
import { caseStudies } from '@/constants/case-studies';
import { blogPosts } from '@/constants/blog-posts';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/locale';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

type Frequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

type StaticEntry = {
  path: string;
  changefreq: Frequency;
  priority: number;
};

const STATIC_ENTRIES: StaticEntry[] = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/products', changefreq: 'weekly', priority: 0.9 },
  { path: '/hizmetler', changefreq: 'monthly', priority: 0.8 },
  { path: '/hizmetler/eticaret-dijitallesme', changefreq: 'monthly', priority: 0.9 },
  { path: '/hizmetler/e-ticaret-sitesi-kurma', changefreq: 'monthly', priority: 0.9 },
  { path: '/ecosystem', changefreq: 'monthly', priority: 0.7 },
  { path: '/about', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact', changefreq: 'yearly', priority: 0.8 },
  { path: '/case-studies', changefreq: 'monthly', priority: 0.7 },
  { path: '/blog', changefreq: 'weekly', priority: 0.7 },
  { path: '/faq', changefreq: 'monthly', priority: 0.5 },
];

type Entry = {
  path: string;
  lastmod: string;
  changefreq: Frequency;
  priority: number;
};

function buildEntries(): Entry[] {
  const now = new Date().toISOString();
  const entries: Entry[] = [];

  for (const e of STATIC_ENTRIES) {
    entries.push({ path: e.path, lastmod: now, changefreq: e.changefreq, priority: e.priority });
  }

  for (const p of [...topCards, ...bottomCards]) {
    entries.push({
      path: `/products/${p.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  for (const c of caseStudies) {
    entries.push({
      path: `/case-studies/${c.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  for (const post of blogPosts) {
    entries.push({
      path: `/blog/${post.slug}`,
      lastmod: new Date(post.publishedAt).toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderUrl(loc: string, lastmod: string, changefreq: Frequency, priority: number, path: string): string {
  const alternates = LOCALES.map(
    (lc) =>
      `    <xhtml:link rel="alternate" hreflang="${lc}" href="${escapeXml(`${siteUrl}/${lc}${path}`)}"/>`
  ).join('\n');
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}/${DEFAULT_LOCALE}${path}`)}"/>`;
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
${alternates}
${xDefault}
  </url>`;
}

export function GET() {
  const entries = buildEntries();
  const urlElements: string[] = [];

  for (const entry of entries) {
    for (const locale of LOCALES) {
      const loc = `${siteUrl}/${locale}${entry.path}`;
      urlElements.push(renderUrl(loc, entry.lastmod, entry.changefreq, entry.priority, entry.path));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
