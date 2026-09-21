import type { Lang } from './i18n';

// Regional pricing, like the App Store: the visitor's country decides which
// price list they are anchored to (merchant.ts), and they are shown — and
// charged — the equivalent of that price in the currency the acquirer settles
// in. The visitor cannot switch the currency by hand: that would be a
// price-shopping tool.
export type Currency = 'BYN' | 'RUB' | 'EUR' | 'USD';
export type WebCurrency = 'BYN' | 'RUB';

const EURO_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', 'CH', 'GB', 'UA', 'MD', 'RS', 'ME', 'MK', 'AL', 'BA', 'XK', 'AD', 'MC', 'SM', 'VA', 'GE', 'AM',
]);

// The languages a browser accepts; «q=0» means "not this one".
function acceptedLanguages(header: string | null | undefined): string[] {
  return (header ?? '')
    .toLowerCase()
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.split(';').map((piece) => piece.trim());
      const q = params.find((param) => param.startsWith('q='));
      return q && !(Number(q.slice(2)) > 0) ? '' : tag;
    })
    .filter(Boolean);
}

// The price list a Belarusian visitor is anchored to — not the currency they
// read, which is whatever the acquirer settles in. Belarus is a cheaper App
// Store tier than Russia, so pricing it off the rouble list would charge a
// Belarusian parent about half again what their own store asks.
// Mirrors BELARUS_TIER in the worker.
const BELARUS_TIER: Currency = 'BYN';

// The country decides, as Cloudflare sees it. When the connection comes from
// elsewhere (VPN exits are common among Belarusian and Russian parents), a
// Russian- or Belarusian-language browser may still buy — at the dearer of
// the two sellable tiers, because Accept-Language is the visitor's to set and
// only Cloudflare's country opens the cheaper Belarusian list.
// Mirrored by webRegion in the worker (CloudflareWorker/src/web/plans.ts).
export function currencyForVisitor(country: string | null | undefined, acceptLanguage?: string | null): Currency {
  const cc = (country ?? '').toUpperCase();
  if (cc === 'BY') return BELARUS_TIER;
  if (cc === 'RU') return 'RUB';
  if (acceptedLanguages(acceptLanguage).some((tag) => /^(ru|be)(-|$)/.test(tag))) return 'RUB';
  if (EURO_COUNTRIES.has(cc)) return 'EUR';
  return 'USD';
}

// The site sells by card to buyers in Belarus and Russia (and to Russian-
// language browsers elsewhere, which are priced like them). Everyone else
// subscribes in the app through the App Store and never sees web prices.
export function sellsOnWeb(currency: Currency): currency is WebCurrency {
  return currency === 'BYN' || currency === 'RUB';
}

const symbol: Record<Currency, string> = { BYN: 'BYN', RUB: '₽', EUR: '€', USD: '$' };

export function formatMoney(amount: number, currency: Currency, lang: Lang): string {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  if (currency === 'RUB') return `${Math.round(amount).toLocaleString(locale)} ₽`;
  if (currency === 'BYN') {
    const hasKopecks = Math.round(amount * 100) % 100 !== 0;
    return `${amount.toLocaleString(locale, { minimumFractionDigits: hasKopecks ? 2 : 0, maximumFractionDigits: 2 })} Br`;
  }
  const rounded = Math.round(amount * 100) / 100;
  const hasCents = Math.round(rounded * 100) % 100 !== 0;
  return `${symbol[currency]}${rounded.toLocaleString('en-US', { minimumFractionDigits: hasCents ? 2 : 0, maximumFractionDigits: 2 })}`;
}
