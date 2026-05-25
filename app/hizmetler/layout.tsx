import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetler — Kurumsal E-ticaret & Dijital Dönüşüm',
  description:
    'agetolabs hizmetleri: kurumsal e-ticaret altyapısı, ERP/CRM/OMS/WMS entegrasyonu, pazaryeri orkestrasyonu, Trendyol mağaza yönetimi ve uçtan uca proje yönetimi. 100+ kurumsal proje deneyimi.',
  alternates: { canonical: '/hizmetler' },
  openGraph: {
    title: 'Hizmetler — agetolabs',
    description:
      'Kurumsal e-ticaret altyapısı, entegrasyon, pazaryeri yönetimi ve dijital dönüşüm hizmetleri.',
    url: '/hizmetler',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmetler — agetolabs',
    description:
      'Kurumsal e-ticaret, entegrasyon, pazaryeri yönetimi ve dijital dönüşüm hizmetleri.',
  },
};

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
