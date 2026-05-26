import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Ecosystem',
    description:
      'The agetolabs product ecosystem — modular standalone products that combine into a unified Autonomous Operating System for your company.',
    alternates: {
      canonical: `/${locale}/ecosystem`,
      languages: {
        tr: '/tr/ecosystem',
        en: '/en/ecosystem',
        'x-default': '/tr/ecosystem',
      },
    },
    openGraph: {
      title: 'agetolabs Ecosystem',
      description:
        'Unified power, modular freedom — explore how our products compose into a 24/7 autonomous OS.',
      url: `/${locale}/ecosystem`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
