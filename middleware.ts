import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['tr', 'en'] as const;
const DEFAULT_LOCALE = 'tr';

// Pages that already exist as routes and need locale-prefix redirects.
// Hits like /about, /blog/foo, /hizmetler/x → /tr/about, /tr/blog/foo, /tr/hizmetler/x
const LEGACY_ROUTE_PREFIXES = [
  '/about',
  '/blog',
  '/case-studies',
  '/contact',
  '/ecosystem',
  '/faq',
  '/hizmetler',
  '/legal',
  '/products',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Inject pathname header so root layout can read it for <html lang>.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Skip middleware for static assets, API, Next internals, special files.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.[a-zA-Z0-9]+$/) // file extension (svg, png, xml, etc.)
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Already locale-prefixed → pass through.
  if (SUPPORTED_LOCALES.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Root → redirect to default locale.
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url), 301);
  }

  // Legacy unprefixed paths → redirect to default locale prefix.
  if (LEGACY_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url), 301);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // Run on all paths except static assets and Next internals.
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
