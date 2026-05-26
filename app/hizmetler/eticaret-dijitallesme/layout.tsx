import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

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

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'E-ticaret ve Dijital Dönüşüm',
  name: 'E-ticaret Çözümleri ve Dijital Dönüşüm Danışmanlığı',
  description:
    'Kurumsal e-ticaret entegrasyonu, ERP/CRM/OMS bağlantıları, pazaryeri orkestrasyonu ve uçtan uca dijital dönüşüm danışmanlığı.',
  url: `${siteUrl}/hizmetler/eticaret-dijitallesme`,
  provider: {
    '@type': 'Organization',
    name: 'agetolabs',
    url: siteUrl,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  inLanguage: 'tr',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteUrl}/hizmetler` },
    { '@type': 'ListItem', position: 3, name: 'E-ticaret ve Dijitalleşme', item: `${siteUrl}/hizmetler/eticaret-dijitallesme` },
  ],
};

export default function EticaretDijitallesmeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
