import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetler | E-ticaret Çözümleri ve Danışmanlık — agetolabs',
  description:
    'agetolabs hizmetleri: e-ticaret sitesi kurma, kurumsal e-ticaret entegrasyonu, ERP/pazaryeri yönetimi ve dijital dönüşüm danışmanlığı. Ücretsiz keşif görüşmesi.',
  alternates: { canonical: '/hizmetler/eticaret-dijitallesme' },
  openGraph: {
    title: 'Hizmetler — agetolabs',
    description:
      'E-ticaret sitesi kurma, kurumsal entegrasyon, pazaryeri yönetimi ve dijital dönüşüm hizmetleri.',
    url: '/hizmetler/eticaret-dijitallesme',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmetler — agetolabs',
    description:
      'E-ticaret sitesi kurma, kurumsal entegrasyon, pazaryeri yönetimi ve dijital dönüşüm.',
  },
};

export default function EticaretDijitallesmeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
