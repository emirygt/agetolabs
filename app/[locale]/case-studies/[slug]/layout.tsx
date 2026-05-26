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
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: 'Case study not found' };
  }
  const useTr = locale === 'tr';
  const title = `${study.brand} · ${useTr ? 'Vaka Çalışması' : 'Case Study'}`;
  const description = useTr ? study.tr.summary : study.en.summary;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/case-studies/${study.slug}`,
      languages: {
        tr: `/tr/case-studies/${study.slug}`,
        en: `/en/case-studies/${study.slug}`,
        'x-default': `/tr/case-studies/${study.slug}`,
      },
    },
    openGraph: {
      title: `${title} · agetolabs`,
      description,
      locale: useTr ? 'tr_TR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CaseStudyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const study = getCaseStudy(slug);

  if (!study) return children;

  const useTr = locale === 'tr';
  const headline = `${study.brand} · ${useTr ? 'Vaka Çalışması' : 'Case Study'}`;
  const description = useTr ? study.tr.summary : study.en.summary;
  const industry = useTr ? study.industryTr : study.industry;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
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
      '@id': `${siteUrl}/${locale}/case-studies/${study.slug}`,
    },
    about: study.brand,
    articleSection: industry,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: useTr ? 'Anasayfa' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: useTr ? 'Vaka Çalışmaları' : 'Case Studies', item: `${siteUrl}/${locale}/case-studies` },
      { '@type': 'ListItem', position: 3, name: study.brand, item: `${siteUrl}/${locale}/case-studies/${study.slug}` },
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
