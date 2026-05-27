import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import { detectLocaleFromPath } from '@/lib/locale';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'agetolabs — Orchestrating Autonomous Intelligence',
    template: '%s · agetolabs',
  },
  description:
    'agetolabs builds autonomous AI ecosystems for enterprise operations — e-commerce integrations, sales agents, content studios.',
  applicationName: 'agetolabs',
  authors: [{ name: 'agetolabs' }],
  creator: 'agetolabs',
  publisher: 'agetolabs',
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'agetolabs',
  alternateName: 'Agetolabs Technology',
  url: siteUrl,
  logo: `${siteUrl}/sonlogo1.svg`,
  description:
    'Autonomous AI ecosystems for enterprise operations — sales agents, content studios, e-commerce orchestration.',
  email: 'info@agetolabs.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@agetolabs.com',
    availableLanguage: ['English', 'Turkish'],
  },
  areaServed: 'Worldwide',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'agetolabs',
  url: siteUrl,
  inLanguage: ['en', 'tr'],
  publisher: {
    '@type': 'Organization',
    name: 'agetolabs',
    url: siteUrl,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/';
  const locale = detectLocaleFromPath(pathname);

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body
        className={`${inter.className} bg-[#0A0A0B] text-white antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
