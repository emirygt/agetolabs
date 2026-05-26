'use client';

import dynamic from 'next/dynamic';

const CookieConsent = dynamic(
  () => import('./CookieConsent').then((m) => m.CookieConsent),
  { ssr: false }
);

export function CookieConsentLoader() {
  return <CookieConsent />;
}
