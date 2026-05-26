import type { Metadata } from 'next';
import { faqCategories } from '@/constants/faq';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const useTr = locale === 'tr';
  const title = 'FAQ';
  const description = useTr
    ? 'Ürünler, entegrasyon, angajman modeli ve lansman sonrası operasyon hakkında en sık gelen sorular.'
    : 'Answers to common questions about agetolabs — products, integrations, engagement models, and post-launch operations.';
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        tr: '/tr/faq',
        en: '/en/faq',
        'x-default': '/tr/faq',
      },
    },
    openGraph: {
      title: `${title} · agetolabs`,
      description,
      locale: useTr ? 'tr_TR' : 'en_US',
    },
  };
}

export default async function FAQLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const useTr = locale === 'tr';

  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: useTr ? item.qTr : item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: useTr ? item.aTr : item.a,
        },
      }))
    ),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: useTr ? 'Anasayfa' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${siteUrl}/${locale}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
