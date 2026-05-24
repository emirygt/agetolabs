import type { Metadata } from 'next';
import { getCaseStudy, caseStudies } from '@/constants/case-studies';

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: 'Case study not found' };
  }
  const title = `${study.brand} · Case Study`;
  const description = study.en.summary;
  return {
    title,
    description,
    openGraph: { title: `${title} · agetolabs`, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
