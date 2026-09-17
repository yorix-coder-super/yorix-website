import type { Lang } from './i18n';

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
  hoursNote: {
    ru: 'заявки по e-mail принимаются круглосуточно',
    en: 'orders by e-mail are accepted around the clock',
  },
  activationHours: 24,
  tradeRegister: '',
  // WebPay ships a separate logo strip for МТБанк; every other acquirer uses the generic one.
  acquirer: 'other' as 'mtbank' | 'other',
  // «Мир» is absent from WebPay's logo packs — add it only once the acquirer confirms it.
  cards: ['Visa', 'Mastercard', 'Белкарт'],
};

export type PlanId = 'week' | 'month' | 'year';

export type Plan = {
  id: PlanId;
  days: number;
  priceByn: number;
};

export const plans: Plan[] = [
  { id: 'week', days: 7, priceByn: 11.9 },
  { id: 'month', days: 30, priceByn: 22.9 },
  { id: 'year', days: 365, priceByn: 109 },
];

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

// The account code is the Firebase uid the buyer sees after signing in; it
// names the account to grant without asking for an e-mail address.
export function orderTemplate(lang: Lang, plan?: Plan, accountCode?: string) {
  const code = accountCode ?? '';
  if (lang === 'en') {
    return [
      'Hello!',
      '',
      `I would like a Yorix subscription ${plan ? `${planCopy.en[plan.id].forPeriod} — ${formatByn(plan.priceByn, 'en', 'code')}` : '(week / month / year)'}`,
      `Account code (Settings → Account in the app): ${code}`,
    ].join('\n');
  }
  return [
    'Здравствуйте!',
    '',
    `Хочу подписку Yorix ${plan ? `${planCopy.ru[plan.id].forPeriod} — ${formatByn(plan.priceByn, 'ru', 'code')}` : '(неделя / месяц / год)'}`,
    `Код аккаунта (Настройки → Аккаунт в приложении): ${code}`,
  ].join('\n');
}

export function mailtoOrder(lang: Lang, plan?: Plan, accountCode?: string) {
  const subject =
    lang === 'en'
      ? `Yorix subscription order${plan ? ` ${planCopy.en[plan.id].forPeriod}` : ''}`
      : `Заказ подписки Yorix${plan ? ` ${planCopy.ru[plan.id].forPeriod}` : ''}`;
  return `mailto:${merchant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderTemplate(lang, plan, accountCode))}`;
}

export function listJoin(items: string[], lang: Lang) {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${lang === 'ru' ? 'и' : 'and'} ${items[items.length - 1]}`;
}
