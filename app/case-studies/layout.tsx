import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'How agetolabs delivers enterprise e-commerce and AI orchestration for leading brands.',
  openGraph: {
    title: 'Case Studies · agetolabs',
    description:
      'How agetolabs delivers enterprise e-commerce and AI orchestration for leading brands.',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
