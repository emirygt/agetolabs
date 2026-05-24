import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecosystem',
  description:
    'The agetolabs product ecosystem — modular standalone products that combine into a unified Autonomous Operating System for your company.',
  alternates: { canonical: '/ecosystem' },
  openGraph: {
    title: 'agetolabs Ecosystem',
    description:
      'Unified power, modular freedom — explore how our products compose into a 24/7 autonomous OS.',
    url: '/ecosystem',
  },
};

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
