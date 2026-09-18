import type { Lang } from './i18n';

// Regional pricing, like the App Store: the visitor's country decides which
// price list they see (merchant.ts), and WebPay charges the BYN equivalent
// of exactly that price. The visitor cannot switch the currency by hand —
// that would be a price-shopping tool.
export type Currency = 'BYN' | 'RUB' | 'EUR' | 'USD';

const EURO_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', 'CH', 'GB', 'UA', 'MD', 'RS', 'ME', 'MK', 'AL', 'BA', 'XK', 'AD', 'MC', 'SM', 'VA', 'GE', 'AM',
]);

// Country first; when the connection comes from elsewhere (VPN exits are
// common among Belarusian and Russian parents) the browser language decides:
// a Russian-language browser is in the BYN/RUB market, and plain «ru» gets
// the currency the card is actually charged in.
export function currencyForVisitor(country: string | null | undefined, acceptLanguage?: string | null): Currency {
  const cc = (country ?? '').toUpperCase();
  if (cc === 'BY') return 'BYN';
  if (cc === 'RU') return 'RUB';
  const langs = (acceptLanguage ?? '').toLowerCase();
  if (/(^|,)\s*(ru-by|be)(-|;|,|$)/.test(langs)) return 'BYN';
  if (/(^|,)\s*ru-ru(;|,|$)/.test(langs)) return 'RUB';
  if (/(^|,)\s*ru(;|,|$)/.test(langs)) return 'BYN';
  if (EURO_COUNTRIES.has(cc)) return 'EUR';
  return 'USD';
}

const symbol: Record<Currency, string> = { BYN: 'BYN', RUB: '₽', EUR: '€', USD: '$' };

export function formatMoney(amount: number, currency: Currency, lang: Lang): string {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  if (currency === 'RUB') return `${Math.round(amount).toLocaleString(locale)}\u00A0₽`;
  if (currency === 'BYN') {
    const hasKopecks = Math.round(amount * 100) % 100 !== 0;
    return `${amount.toLocaleString(locale, { minimumFractionDigits: hasKopecks ? 2 : 0, maximumFractionDigits: 2 })}\u00A0Br`;
  }
  const rounded = Math.round(amount * 100) / 100;
  const hasCents = Math.round(rounded * 100) % 100 !== 0;
  return `${symbol[currency]}${rounded.toLocaleString('en-US', { minimumFractionDigits: hasCents ? 2 : 0, maximumFractionDigits: 2 })}`;
}
