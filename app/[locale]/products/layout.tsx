import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Products',
    description:
      'Explore the agetolabs autonomous AI ecosystem — Structa AI, Pharma AI, Agento Flow, priceCompare, Autonomous Agent, Eczaport and WhatsApp Sales Automation.',
    alternates: {
      canonical: `/${locale}/products`,
      languages: {
        tr: '/tr/products',
        en: '/en/products',
        'x-default': '/tr/products',
      },
    },
    openGraph: {
      title: 'agetolabs Products — Autonomous AI Ecosystem',
      description:
        'Seven autonomous products: content studio, pharma platform, enterprise orchestration, price intelligence, e-commerce agent, pharmacy B2B, WhatsApp sales.',
      url: `/${locale}/products`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
