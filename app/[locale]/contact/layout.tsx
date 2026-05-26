import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact',
    description:
      'Reach the agetolabs team to discuss autonomous AI, request a demo, or plan a custom integration. info@agetolabs.com.',
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        tr: '/tr/contact',
        en: '/en/contact',
        'x-default': '/tr/contact',
      },
    },
    openGraph: {
      title: 'Contact agetolabs',
      description:
        "Let's plan your autonomous future. Reach us at info@agetolabs.com.",
      url: `/${locale}/contact`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
