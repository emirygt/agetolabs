import type { Metadata } from 'next';
import { topCards, bottomCards } from '@/constants/products';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = [...topCards, ...bottomCards].find((p) => p.slug === slug);
  if (!product) {
    return {
      title: 'Product not found',
      description: 'The product you are looking for could not be found.',
    };
  }
  const useTr = locale === 'tr';
  const name = useTr && product.nameTr ? product.nameTr : product.name;
  const description = useTr && product.descriptionTr ? product.descriptionTr : product.description;
  return {
    title: name,
    description,
    alternates: {
      canonical: `/${locale}/products/${product.slug}`,
      languages: {
        tr: `/tr/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
        'x-default': `/tr/products/${product.slug}`,
      },
    },
    openGraph: {
      title: `${name} — agetolabs`,
      description,
      url: `/${locale}/products/${product.slug}`,
      locale: useTr ? 'tr_TR' : 'en_US',
    },
  };
}

export default async function ProductSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = [...topCards, ...bottomCards].find((p) => p.slug === slug);

  if (!product) return <>{children}</>;

  const useTr = locale === 'tr';
  const name = useTr && product.nameTr ? product.nameTr : product.name;
  const description = useTr && product.descriptionTr ? product.descriptionTr : product.description;

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${siteUrl}/${locale}/products/${product.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'agetolabs',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/${locale}/contact`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: useTr ? 'Anasayfa' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: useTr ? 'Ürünler' : 'Products', item: `${siteUrl}/${locale}/products` },
      { '@type': 'ListItem', position: 3, name, item: `${siteUrl}/${locale}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
