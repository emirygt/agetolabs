import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal information for agetolabs.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
