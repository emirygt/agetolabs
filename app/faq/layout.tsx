import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about agetolabs — products, integrations, engagement models, and post-launch operations.',
  openGraph: {
    title: 'FAQ · agetolabs',
    description:
      'Answers to common questions about agetolabs — products, integrations, engagement models, and post-launch operations.',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
