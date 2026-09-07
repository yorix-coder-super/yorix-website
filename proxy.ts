import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;
  const isYandexVerification =
    pathname.startsWith('/yandex_') && pathname.endsWith('.html');

  if (hostname === 'www.yorix.website' && !isYandexVerification) {
    const url = request.nextUrl.clone();
    url.hostname = 'yorix.website';

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
