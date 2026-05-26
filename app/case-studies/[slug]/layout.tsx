import type { Metadata } from 'next';
import { getCaseStudy, caseStudies } from '@/constants/case-studies';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: 'Case study not found' };
  }
  const title = `${study.brand} · Case Study`;
  const description = study.en.summary;
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: { title: `${title} · agetolabs`, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CaseStudyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return children;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${study.brand} · Case Study`,
    description: study.en.summary,
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
      '@id': `${siteUrl}/case-studies/${study.slug}`,
    },
    about: study.brand,
    articleSection: study.industry,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 3, name: study.brand, item: `${siteUrl}/case-studies/${study.slug}` },
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
