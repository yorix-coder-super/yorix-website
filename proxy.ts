import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();

  if (hostname === 'www.yorix.website') {
    const url = request.nextUrl.clone();
    url.hostname = 'yorix.website';

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
