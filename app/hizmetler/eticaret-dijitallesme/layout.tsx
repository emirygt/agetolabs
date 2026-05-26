import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-commerce & Digital Transformation',
  description:
    'Enterprise-grade e-commerce architecture: ERP / CRM / OMS / WMS integration, marketplace orchestration, end-to-end project management. 100+ enterprise projects across 9+ years.',
  alternates: { canonical: '/hizmetler/eticaret-dijitallesme' },
  openGraph: {
    title: 'E-commerce & Digital Transformation — agetolabs',
    description:
      'Integration, marketplaces, project management and process audits for high-traffic e-commerce operations.',
    url: '/hizmetler/eticaret-dijitallesme',
  },
};

export default function EticaretLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
