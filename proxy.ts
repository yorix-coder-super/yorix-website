import { NextResponse, type NextRequest } from 'next/server';

const apiHost = process.env.NEXT_PUBLIC_YORIX_API ?? 'https://babysleepcoach-ai-proxy.babysleepcoach.workers.dev';

// Enforced everywhere: nothing here can break rendering, and framing the
// checkout from another origin is the one thing we must never allow.
const enforcedPolicy = ["frame-ancestors 'self'", "base-uri 'self'", "object-src 'none'"].join('; ');

// Report-only first: vinext hydration and the Firebase popup flow decide the
// final allow-list. Promote to Content-Security-Policy after a clean window.
const reportOnlyPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://apis.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${apiHost} https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://apis.google.com`,
  'frame-src https://yorix-app.firebaseapp.com https://accounts.google.com https://appleid.apple.com',
  "form-action 'self' https://payment.webpay.by https://securesandbox.webpay.by",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'report-uri /csp-report',
  'report-to csp',
].join('; ');

const legacyPages: Record<string, string> = { oplata: '/payment', oferta: '/offer', konfidencialnost: '/privacy' };

function withSecurityHeaders(response: NextResponse) {
  response.headers.set('Content-Security-Policy', enforcedPolicy);
  response.headers.set('Reporting-Endpoints', 'csp="/csp-report"');
  response.headers.set('Content-Security-Policy-Report-Only', reportOnlyPolicy);
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  return response;
}

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;
  const isYandexVerification = pathname.startsWith('/yandex_') && pathname.endsWith('.html');

  if (hostname === 'www.yorix.website' && !isYandexVerification) {
    const url = request.nextUrl.clone();
    url.hostname = 'yorix.website';

    return withSecurityHeaders(NextResponse.redirect(url, 308));
  }

  // The subscription section was called «Premium» until 2026-09-18; the old
  // links live in mails and the app store review notes.
  const renamed = pathname.match(/^\/(?:(en|ru)\/)?(premium|podpiska|subscription)(\/.*)?$/);
  if (renamed) {
    const rest = (renamed[3] ?? '').replace(/^\/(oplata|oferta|konfidencialnost)$/, (_, page: string) => legacyPages[page]);
    const russian = renamed[1] === 'ru' || (!renamed[1] && renamed[2] !== 'subscription');
    const target = `${russian ? '/ru/subscription' : '/subscription'}${rest}`;
    if (target !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = target;

      return withSecurityHeaders(NextResponse.redirect(url, 308));
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: '/:path*',
};
