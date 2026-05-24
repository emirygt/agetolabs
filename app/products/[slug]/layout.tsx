import type { Metadata } from 'next';
import { topCards, bottomCards } from '@/constants/products';

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

export default function ProductSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
