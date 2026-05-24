import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore the agetolabs autonomous AI ecosystem — Structa AI, Pharma AI, Agento Flow, priceCompare, Autonomous Agent, Eczaport and WhatsApp Sales Automation.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'agetolabs Products — Autonomous AI Ecosystem',
    description:
      'Seven autonomous products: content studio, pharma platform, enterprise orchestration, price intelligence, e-commerce agent, pharmacy B2B, WhatsApp sales.',
    url: '/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
