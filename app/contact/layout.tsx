import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the agetolabs team to discuss autonomous AI, request a demo, or plan a custom integration. info@agetolabs.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact agetolabs',
    description:
      "Let's plan your autonomous future. Reach us at info@agetolabs.com.",
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
