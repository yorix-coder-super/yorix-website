import { NextResponse, type NextRequest } from 'next/server';
import { legacyHosts, siteUrl } from './app/content';
import { isSiteLang, LANG_COOKIE, localizedPath, preferredLanguage, type SiteLang } from './app/language';
import { currencyForVisitor, sellsOnWeb } from './app/subscription/currency';
import { codeFromInput, formatGiftCode } from './app/subscription/gift/code';

const apiHost = process.env.NEXT_PUBLIC_YORIX_API ?? 'https://babysleepcoach-ai-proxy.babysleepcoach.workers.dev';
// Cloudflare Turnstile on the contact form: allowed only while it is configured.
const turnstile = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? ' https://challenges.cloudflare.com' : '';

// Enforced on every page: scripts run only with this response's nonce (vinext
// puts it on its own tags) or when a trusted script loads them ('strict-dynamic'
// — how Firebase brings in Google's sign-in loader). An injected script cannot
// run, and nothing can phone home to a foreign host or frame the checkout.
function contentPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://apis.google.com${turnstile}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${apiHost} https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://apis.google.com`,
    `frame-src https://yorix-app.firebaseapp.com https://accounts.google.com https://appleid.apple.com${turnstile}`,
    "form-action 'self' https://payment.webpay.by https://securesandbox.webpay.by https://yoomoney.ru https://yookassa.ru",
    "frame-ancestors 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    'report-uri /csp-report',
    'report-to csp',
  ].join('; ');
}

function newNonce() {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
}

function withSecurityHeaders(response: NextResponse, nonce = newNonce()) {
  response.headers.set('Content-Security-Policy', contentPolicy(nonce));
  response.headers.set('Reporting-Endpoints', 'csp="/csp-report"');
  // Keeps the Firebase sign-in popup able to report back, and cuts every other window's handle on this one.
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
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
// the app's showcase with one way on — the App Store button. The storefront,
// the offer, the payment terms and the gift shop send those visitors home.
// What stays reachable is not a sales page: the terms of use and the privacy
// policy, which the App Store requires of the app itself; the acquirer's
// return pages; and the whole redeem path — /gift, /gift/<code>, /g/<code>.
// A gift is bought in Belarus or Russia and opened wherever the family is,
// and every printed card carries that address, so blocking it would kill a
// gift already paid for.
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

// Short gift links (yorix-app.com/g/<code>) open the redeem page in the
// visitor's language. Link-preview bots get Russian: gifts are bought in
// Belarus and Russia. Only the code's own characters reach the new path.
const SHORT_GIFT = /^\/g\/([A-Za-z0-9-]{12,20})\/?$/;

function shortGiftRedirect(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const match = SHORT_GIFT.exec(request.nextUrl.pathname);
  if (!match) return null;
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  const lang = isSiteLang(saved)
    ? saved
    : CRAWLER.test(request.headers.get('user-agent') ?? '')
      ? 'ru'
      : preferredLanguage(request.headers.get('accept-language'), request.headers.get('cf-ipcountry'));
  const target = request.nextUrl.clone();
  // The recipient is wherever the buyer sent the link, so the short link opens
  // in their own language — not in the language of the seller's contract.
  const prefix = lang === 'en' ? '' : lang === 'ru' ? '/ru' : `/${lang}`;
  target.pathname = `${prefix}/gift/${formatGiftCode(codeFromInput(match[1]))}`;
  target.search = '';
  const response = NextResponse.redirect(target, 302);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

const CANONICAL_HOST = new URL(siteUrl).hostname;
const OLD_HOSTS = new Set<string>([`www.${CANONICAL_HOST}`, ...legacyHosts]);

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;
  const isYandexVerification = pathname.startsWith('/yandex_') && pathname.endsWith('.html');

  // One canonical host. `www` and any host the site used to live on answer with
  // a permanent redirect to the same path, so links keep working and a search
  // engine moves the page's standing to the new address instead of indexing two
  // copies of it. Yandex's verification file must stay reachable on the host the
  // verification was started from, so it is the one exception.
  if (hostname !== CANONICAL_HOST && !isYandexVerification && OLD_HOSTS.has(hostname)) {
    const url = request.nextUrl.clone();
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    url.port = '';
    return withSecurityHeaders(NextResponse.redirect(url, 308));
  }

  const redirect = shortGiftRedirect(request) ?? salesRedirect(request) ?? languageRedirect(request);
  if (redirect) return withSecurityHeaders(redirect);

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: '/:path*',
};
