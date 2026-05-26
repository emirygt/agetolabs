import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Case Studies',
    description:
      'How agetolabs delivers enterprise e-commerce and AI orchestration for leading brands.',
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: {
        tr: '/tr/case-studies',
        en: '/en/case-studies',
        'x-default': '/tr/case-studies',
      },
    },
    openGraph: {
      title: 'Case Studies · agetolabs',
      description:
        'How agetolabs delivers enterprise e-commerce and AI orchestration for leading brands.',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
