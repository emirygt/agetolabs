import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'E-commerce & Digital Transformation',
    description:
      'Enterprise-grade e-commerce architecture: ERP / CRM / OMS / WMS integration, marketplace orchestration, end-to-end project management. 100+ enterprise projects across 9+ years.',
    alternates: {
      canonical: `/${locale}/hizmetler`,
      languages: {
        tr: '/tr/hizmetler',
        en: '/en/hizmetler',
        'x-default': '/tr/hizmetler',
      },
    },
    openGraph: {
      title: 'E-commerce & Digital Transformation — agetolabs',
      description:
        'Integration, marketplaces, project management and process audits for high-traffic e-commerce operations.',
      url: `/${locale}/hizmetler`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
