import type { WebCurrency } from './currency';
import type { Lang } from './i18n';
import { charges, chargesRub, plans, prices, type Plan, type PlanId } from './prices.generated';

// Single source for everything the acquiring bank checks on the site:
// seller requisites, plan prices and the support promise. Empty fields are
// not rendered, so the page never shows a placeholder to a buyer.
export const merchant = {
  fullName: 'Базык Егор Юрьевич',
  latinName: 'Yahor Bazyk',
  status: {
    ru: 'Физическое лицо — плательщик налога на профессиональный доход',
    en: 'Individual registered as a professional income tax payer',
  },
  unp: '',
  country: { ru: 'Республика Беларусь', en: 'Republic of Belarus' },
  postalAddress: '',
  phone: '',
  email: 'yorix2026@outlook.com',
  hours: {
    ru: 'Ежедневно с 10:00 до 20:00 (время минское)',
    en: 'Daily, 10:00–20:00 Minsk time',
  },
  tradeRegister: '',
};

export type Acquirer = 'webpay' | 'yookassa';

type AcquirerProfile = {
  id: Acquirer;
  /** The name every document and page prints. Nothing else names a bank. */
  name: { ru: string; en: string };
  /** The cards it takes, as the documents list them. */
  cards: { ru: string[]; en: string[] };
  /**
   * Its own logo, or null to list the card brands instead. `withMirMark`
   * appends NSPK's «Мир» mark: WebPay ships a strip of card logos with «Мир»
   * missing from its packs, while ЮKassa's is a plain wordmark that stands
   * on its own.
   */
  strip: { src: string; width: number; height: number; withMirMark: boolean } | null;
  /** Does the acquirer e-mail the buyer a card receipt? Only if it is given an address. */
  emailsReceipt: boolean;
  /** Its own site, linked from the payment terms. */
  site: string;
};

const ACQUIRERS: Record<Acquirer, AcquirerProfile> = {
  webpay: {
    id: 'webpay',
    name: { ru: 'WEBPAY', en: 'WEBPAY' },
    cards: { ru: ['Visa', 'Mastercard', 'Белкарт', 'Мир'], en: ['Visa', 'Mastercard', 'Belkart', 'Mir'] },
    strip: { src: '/payments/webpay-banks-white.svg', width: 7944, height: 550, withMirMark: true },
    emailsReceipt: true,
    site: 'https://www.webpay.by',
  },
  yookassa: {
    id: 'yookassa',
    name: { ru: 'ЮKassa', en: 'YooKassa' },
    // Белкарт is a Belarusian scheme; a Russian acquirer does not take it.
    cards: { ru: ['Visa', 'Mastercard', 'Мир'], en: ['Visa', 'Mastercard', 'Mir'] },
    // The white wordmark from ЮKassa's own guide (yookassa.ru/guide-instruction/#logos):
    // white on dark, blue-black on light — this site is dark everywhere.
    strip: { src: '/payments/yookassa-white.svg', width: 266, height: 64, withMirMark: false },
    // It e-mails a receipt only when given an address, and the checkout sends none.
    emailsReceipt: false,
    site: 'https://yookassa.ru',
  },
};

/**
 * THE SWITCH. One line changes every document, page and logo on the site.
 * Keep it in step with the worker's WEB_PAYMENT_PROVIDER — the site only
 * describes what the worker actually charges through.
 */
export const ACQUIRER: Acquirer = 'yookassa';

export const acquirer = ACQUIRERS[ACQUIRER];

// Plans, prices and both charge tables are generated from the worker's
// src/web/plans.ts, which is the authority on what the acquirer is asked to
// charge. Edit a price there and run `npm run sync:site-prices` in
// CloudflareWorker; its `npm test` fails while this site's copy is stale.
export { charges, chargesRub, plans, prices };
export type { Plan, PlanId };

/** What the card is actually charged, and in which currency. */
export function chargeFor(planId: PlanId, currency: WebCurrency, acquirer: Acquirer): { amount: number; currency: WebCurrency } {
  return acquirer === 'yookassa'
    ? { amount: chargesRub[planId][currency], currency: 'RUB' }
    : { amount: charges[planId][currency], currency: 'BYN' };
}

/**
 * The amount to spell out beside the price, or null when there is nothing to
 * say. Only a charge in Belarusian rubles is spelled out (owner, 2026-09-21):
 * its sentence names that currency, while a rouble amount would only repeat
 * the rouble price the buyer is already reading.
 */
export function chargeToSpellOut(planId: PlanId, currency: WebCurrency, acquirer: Acquirer): number | null {
  const charge = chargeFor(planId, currency, acquirer);
  return charge.currency === 'BYN' && charge.currency !== currency ? charge.amount : null;
}

export const planCopy: Record<Lang, Record<PlanId, { title: string; forPeriod: string; days: string; purpose: string }>> = {
  ru: {
    week: { title: 'Неделя', forPeriod: 'на неделю', days: '7 дней', purpose: 'Проверить прогноз на своём малыше' },
    month: { title: 'Месяц', forPeriod: 'на месяц', days: '30 дней', purpose: 'Пройти регресс или переход на один сон' },
    year: { title: 'Год', forPeriod: 'на год', days: '365 дней', purpose: 'От первых снов до режима с одним сном' },
  },
  en: {
    week: { title: 'Week', forPeriod: 'for a week', days: '7 days', purpose: 'Test the forecast on your own baby' },
    month: { title: 'Month', forPeriod: 'for a month', days: '30 days', purpose: 'Get through a regression or the two-to-one nap switch' },
    year: { title: 'Year', forPeriod: 'for a year', days: '365 days', purpose: 'From newborn naps to the one-nap routine' },
  },
};

export function formatByn(value: number, lang: Lang, unit: 'sign' | 'code' = 'sign') {
  const hasKopecks = Math.round(value * 100) % 100 !== 0;
  const amount = value.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    minimumFractionDigits: hasKopecks ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${amount} ${unit === 'code' ? 'BYN' : 'Br'}`;
}

export function perWeek(plan: Plan) {
  return Math.round((plan.priceByn / plan.days) * 7 * 100) / 100;
}

export function savingVsWeek(plan: Plan) {
  return Math.round((1 - perWeek(plan) / plans[0].priceByn) * 100);
}

export function listJoin(items: string[], lang: Lang) {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${lang === 'ru' ? 'и' : 'and'} ${items[items.length - 1]}`;
}
