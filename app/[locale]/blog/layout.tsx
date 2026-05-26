import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog',
    description:
      'Notes from the agetolabs team on AI orchestration, autonomous agents, enterprise e-commerce and the architecture behind production systems.',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        tr: '/tr/blog',
        en: '/en/blog',
        'x-default': '/tr/blog',
      },
    },
    openGraph: {
      title: 'Blog · agetolabs',
      description:
        'Notes from the agetolabs team on AI orchestration, autonomous agents, enterprise e-commerce and the architecture behind production systems.',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
