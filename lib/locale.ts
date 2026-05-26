export type Locale = 'tr' | 'en';

export const LOCALES: Locale[] = ['tr', 'en'];
export const DEFAULT_LOCALE: Locale = 'tr';

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'tr' || value === 'en';
}

export function detectLocaleFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (/^\/en(\/|$)/.test(pathname)) return 'en';
  return 'tr';
}

export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(tr|en)(?=\/|$)/, '') || '/';
}

export function localizedHref(path: string, locale: Locale): string {
  if (path.startsWith('http')) return path;
  if (path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return `/${locale}`;
  return `/${locale}${cleanPath}`;
}
