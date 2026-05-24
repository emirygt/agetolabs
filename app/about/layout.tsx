import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'agetolabs designs autonomous AI ecosystems that eliminate manual workloads and turn data into real-time decisions for enterprise teams.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About agetolabs',
    description:
      'We build autonomous AI departments — not co-pilots, auto-pilots.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
