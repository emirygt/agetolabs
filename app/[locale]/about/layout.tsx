import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About',
    description:
      'agetolabs designs autonomous AI ecosystems that eliminate manual workloads and turn data into real-time decisions for enterprise teams.',
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        tr: '/tr/about',
        en: '/en/about',
        'x-default': '/tr/about',
      },
    },
    openGraph: {
      title: 'About agetolabs',
      description:
        'We build autonomous AI departments — not co-pilots, auto-pilots.',
      url: `/${locale}/about`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
