import type { Metadata } from 'next';
import { topCards, bottomCards } from '@/constants/products';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = [...topCards, ...bottomCards].find((p) => p.slug === slug);
  if (!product) {
    return {
      title: 'Product not found',
      description: 'The product you are looking for could not be found.',
    };
  }
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — agetolabs`,
      description: product.description,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = [...topCards, ...bottomCards].find((p) => p.slug === slug);

  if (!product) return <>{children}</>;

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    url: `${siteUrl}/products/${product.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
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
      url: `${siteUrl}/contact`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${siteUrl}/products/${product.slug}` },
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
