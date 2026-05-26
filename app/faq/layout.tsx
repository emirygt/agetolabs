import type { Metadata } from 'next';
import { faqCategories } from '@/constants/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about agetolabs — products, integrations, engagement models, and post-launch operations.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ · agetolabs',
    description:
      'Answers to common questions about agetolabs — products, integrations, engagement models, and post-launch operations.',
  },
};

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agetolabs.com/' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://agetolabs.com/faq' },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
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
