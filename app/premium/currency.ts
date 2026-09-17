import type { Lang } from './i18n';

// The card is charged in BYN by WebPay. Everyone else sees the same amount
// converted at the National Bank of Belarus rate, marked as approximate,
// with the exact BYN charge beside it — the number on the screen must
// never disagree with the receipt.
export type Currency = 'BYN' | 'RUB' | 'EUR' | 'USD';

export const currencies: Currency[] = ['BYN', 'RUB', 'EUR', 'USD'];

/** BYN per one unit of the currency (NBRB, refreshed by the worker). */
export type Rates = { RUB: number; EUR: number; USD: number };

export const fallbackRates: Rates = { RUB: 0.036018, EUR: 3.4879, USD: 3.0228 };

const EURO_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', 'CH', 'GB', 'UA', 'MD', 'RS', 'ME', 'MK', 'AL', 'BA', 'XK', 'AD', 'MC', 'SM', 'VA', 'GE', 'AM',
]);

export function currencyForCountry(country: string | null | undefined): Currency {
  const cc = (country ?? '').toUpperCase();
  if (cc === 'BY') return 'BYN';
  if (cc === 'RU') return 'RUB';
  if (EURO_COUNTRIES.has(cc)) return 'EUR';
  return 'USD';
}

export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && (currencies as string[]).includes(value);
}

/** Amount in the display currency, unrounded. */
export function convert(kopecksByn: number, currency: Currency, rates: Rates): number {
  const byn = kopecksByn / 100;
  if (currency === 'BYN') return byn;
  return byn / rates[currency];
}

const symbol: Record<Currency, string> = { BYN: 'BYN', RUB: '₽', EUR: '€', USD: '$' };

export function formatMoney(amount: number, currency: Currency, lang: Lang, approx = false): string {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  let text: string;
  if (currency === 'RUB') {
    text = `${Math.round(amount).toLocaleString(locale)} ₽`;
  } else if (currency === 'BYN') {
    const hasKopecks = Math.round(amount * 100) % 100 !== 0;
    text = `${amount.toLocaleString(locale, { minimumFractionDigits: hasKopecks ? 2 : 0, maximumFractionDigits: 2 })} Br`;
  } else {
    const rounded = Math.round(amount * 100) / 100;
    const hasCents = Math.round(rounded * 100) % 100 !== 0;
    text = `${symbol[currency]}${rounded.toLocaleString('en-US', { minimumFractionDigits: hasCents ? 2 : 0, maximumFractionDigits: 2 })}`;
  }
  return approx ? `≈ ${text}` : text;
}

/** Price of a pass as shown on a card: local currency first, BYN charge for non-residents. */
export function displayPrice(kopecksByn: number, currency: Currency, rates: Rates, lang: Lang) {
  const local = formatMoney(convert(kopecksByn, currency, rates), currency, lang, currency !== 'BYN');
  const charge = currency === 'BYN' ? null : formatMoney(kopecksByn / 100, 'BYN', lang);
  return { local, charge };
}
