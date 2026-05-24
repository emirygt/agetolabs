import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from the agetolabs team on AI orchestration, autonomous agents, enterprise e-commerce and the architecture behind production systems.',
  openGraph: {
    title: 'Blog · agetolabs',
    description:
      'Notes from the agetolabs team on AI orchestration, autonomous agents, enterprise e-commerce and the architecture behind production systems.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
