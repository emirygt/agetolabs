import type { Metadata } from 'next';
import { blogPosts, getBlogPost } from '@/constants/blog-posts';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post not found' };
  const title = post.en.title;
  const description = post.en.excerpt;
  return {
    title,
    description,
    openGraph: {
      title: `${title} · agetolabs`,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
