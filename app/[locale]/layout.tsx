import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LanguageProvider } from '@/components/LanguageContext';
import { CookieConsentLoader } from '@/components/CookieConsentLoader';
import { LOCALES, isLocale, type Locale } from '@/lib/locale';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agetolabs.com';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isTurkish = locale === 'tr';
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: '/tr',
        en: '/en',
        'x-default': '/tr',
      },
    },
    openGraph: {
      type: 'website',
      locale: isTurkish ? 'tr_TR' : 'en_US',
      alternateLocale: isTurkish ? ['en_US'] : ['tr_TR'],
      url: `${siteUrl}/${locale}`,
      siteName: 'agetolabs',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LanguageProvider initialLocale={locale as Locale}>
      {children}
      <CookieConsentLoader />
    </LanguageProvider>
  );
}
