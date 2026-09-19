import { NextResponse, type NextRequest } from 'next/server';
import { isSiteLang, LANG_COOKIE, localizedPath, preferredLanguage, type SiteLang } from './app/language';
import { currencyForVisitor, sellsOnWeb } from './app/subscription/currency';

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

// Crawlers index every language on its own URL (hreflang); they are never
// redirected by what their Accept-Language happens to say.
const CRAWLER = /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|embedly|whatsapp|telegram|vkshare|preview|lighthouse|headless/i;

// English default URLs send the visitor to the same page in their language
// (browser first, then country — see app/language.ts). A `?lang=` from the
// header menu is stored and wins from then on, so switching back sticks.
function languageRedirect(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const url = request.nextUrl;
  if (url.pathname.includes('.') || url.pathname.startsWith('/_next') || url.pathname === '/csp-report') return null;

  const choice = url.searchParams.get('lang');
  if (isSiteLang(choice)) {
    const clean = url.clone();
    clean.searchParams.delete('lang');
    const response = NextResponse.redirect(clean, 302);
    response.cookies.set(LANG_COOKIE, choice, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', secure: url.protocol === 'https:' });
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }

  const saved = request.cookies.get(LANG_COOKIE)?.value;
  let lang: SiteLang;
  if (isSiteLang(saved)) lang = saved;
  else if (CRAWLER.test(request.headers.get('user-agent') ?? '')) return null;
  else lang = preferredLanguage(request.headers.get('accept-language'), request.headers.get('cf-ipcountry'));
  if (lang === 'en') return null;

  const target = localizedPath(url.pathname, lang);
  if (!target) return null;
  const next = url.clone();
  next.pathname = target;
  const response = NextResponse.redirect(next, 302);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

// The site sells by card only to Belarus and Russia; for everyone else it is
// the app's showcase. The storefront, the offer and the payment terms send
// those visitors home. The privacy policy (the app's too) and the acquirer's
// return pages stay reachable.
const SALES_PAGE = /^\/(ru\/)?subscription(?:\/(?:offer|payment|gift))?\/?$/;

function salesRedirect(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const match = SALES_PAGE.exec(request.nextUrl.pathname);
  if (!match) return null;
  if (sellsOnWeb(currencyForVisitor(request.headers.get('cf-ipcountry'), request.headers.get('accept-language')))) return null;
  const home = request.nextUrl.clone();
  home.pathname = match[1] ? '/ru' : '/';
  home.search = '';
  const response = NextResponse.redirect(home, 302);
  response.headers.set('Vary', 'Accept-Language, CF-IPCountry');
  response.headers.set('Cache-Control', 'private, no-store');
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

  const redirect = salesRedirect(request) ?? languageRedirect(request);
  if (redirect) return withSecurityHeaders(redirect);

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: '/:path*',
};
