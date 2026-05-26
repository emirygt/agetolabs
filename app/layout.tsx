import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import { LanguageProvider } from '@/components/LanguageContext';
import { CookieConsentLoader } from '@/components/CookieConsentLoader';

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
  keywords: [
    'agetolabs',
    'autonomous AI',
    'AI agents',
    'e-commerce',
    'enterprise AI',
    'AI orchestration',
    'Structa AI',
    'Pharma AI',
    'WhatsApp sales automation',
  ],
  authors: [{ name: 'agetolabs' }],
  creator: 'agetolabs',
  publisher: 'agetolabs',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    url: siteUrl,
    siteName: 'agetolabs',
    title: 'agetolabs — Orchestrating Autonomous Intelligence',
    description:
      'Autonomous AI ecosystems for enterprise operations — sales agents, content studios, e-commerce orchestration.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'agetolabs — Orchestrating Autonomous Intelligence',
    description:
      'Autonomous AI ecosystems for enterprise operations — sales agents, content studios, e-commerce orchestration.',
  },
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

// Schema.org Organization — surfaces in Google rich results / knowledge panel.
// Pure SEO win; renders nothing visible, no runtime cost.
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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
        <LanguageProvider>
          {children}
          <CookieConsentLoader />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
