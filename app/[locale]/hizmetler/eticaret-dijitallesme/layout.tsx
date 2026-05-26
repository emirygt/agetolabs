import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Hizmetler | E-ticaret Çözümleri ve Danışmanlık — agetolabs',
    description:
      'agetolabs hizmetleri: e-ticaret sitesi kurma, kurumsal e-ticaret entegrasyonu, ERP/pazaryeri yönetimi ve dijital dönüşüm danışmanlığı. Ücretsiz keşif görüşmesi.',
    alternates: {
      canonical: `/${locale}/hizmetler/eticaret-dijitallesme`,
      languages: {
        tr: '/tr/hizmetler/eticaret-dijitallesme',
        en: '/en/hizmetler/eticaret-dijitallesme',
        'x-default': '/tr/hizmetler/eticaret-dijitallesme',
      },
    },
    openGraph: {
      title: 'Hizmetler — agetolabs',
      description:
        'E-ticaret sitesi kurma, kurumsal entegrasyon, pazaryeri yönetimi ve dijital dönüşüm hizmetleri.',
      url: `/${locale}/hizmetler/eticaret-dijitallesme`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hizmetler — agetolabs',
      description:
        'E-ticaret sitesi kurma, kurumsal entegrasyon, pazaryeri yönetimi ve dijital dönüşüm.',
    },
  };
}

export default async function EticaretDijitallesmeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'E-ticaret ve Dijital Dönüşüm',
    name: 'E-ticaret Çözümleri ve Dijital Dönüşüm Danışmanlığı',
    description:
      'Kurumsal e-ticaret entegrasyonu, ERP/CRM/OMS bağlantıları, pazaryeri orkestrasyonu ve uçtan uca dijital dönüşüm danışmanlığı.',
    url: `${siteUrl}/${locale}/hizmetler/eticaret-dijitallesme`,
    provider: {
      '@type': 'Organization',
      name: 'agetolabs',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    inLanguage: locale,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteUrl}/${locale}/hizmetler` },
      { '@type': 'ListItem', position: 3, name: 'E-ticaret ve Dijitalleşme', item: `${siteUrl}/${locale}/hizmetler/eticaret-dijitallesme` },
    ],
  };

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
