import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 1. Force www → non-www redirect (canonical: alctrading.com)
  //    This catches Googlebot and any user hitting www.alctrading.com
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace(/^www\./, '');
    const redirectUrl = new URL(url.pathname + url.search, `https://${newHostname}`);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 2. Remove trailing slash (except for root "/")
  //    Prevents redirect loops between /path/ and /path
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const newPathname = url.pathname.replace(/\/+$/, '');
    const redirectUrl = new URL(newPathname + url.search, url.origin);
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static files, images, and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|xml|txt|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
