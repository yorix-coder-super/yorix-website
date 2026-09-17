// Single source for everything the acquiring bank checks on the site:
// seller requisites, plan prices and the support promise. Empty fields are
// not rendered, so the page never shows a placeholder to a buyer.
export const merchant = {
  fullName: 'Базык Егор Юрьевич',
  shortName: 'Базык Е. Ю.',
  status: 'Физическое лицо — плательщик налога на профессиональный доход',
  unp: '',
  country: 'Республика Беларусь',
  postalAddress: '',
  phone: '',
  email: 'yorix2026@outlook.com',
  hours: 'Ежедневно с 10:00 до 20:00 (время минское)',
  hoursNote: 'Заявки по e-mail принимаются круглосуточно',
  activationWindow: 'в течение 24 часов',
  tradeRegister: '',
  // WebPay ships a separate logo strip for МТБанк; every other acquirer uses the generic one.
  acquirer: 'other' as 'mtbank' | 'other',
  // «Мир» is absent from WebPay's logo packs — add it only once the acquirer confirms it.
  cards: ['Visa', 'Mastercard', 'Белкарт'],
};

export type PlanId = 'week' | 'month' | 'year';

export type Plan = {
  id: PlanId;
  title: string;
  accusative: string;
  period: string;
  days: number;
  priceByn: number;
  useCase: string;
};

export const plans: Plan[] = [
  {
    id: 'week',
    title: 'Неделя',
    accusative: 'неделю',
    period: '7 дней',
    days: 7,
    priceByn: 11.9,
    useCase: 'Попробовать Premium или пережить скачок и регресс сна',
  },
  {
    id: 'month',
    title: 'Месяц',
    accusative: 'месяц',
    period: '30 дней',
    days: 30,
    priceByn: 22.9,
    useCase: 'Спокойно наладить режим дня и ночной сон',
  },
  {
    id: 'year',
    title: 'Год',
    accusative: 'год',
    period: '365 дней',
    days: 365,
    priceByn: 109,
    useCase: 'Весь год малыша: переходы между снами, прикорм, регрессы',
  },
];

export function formatByn(value: number) {
  const hasKopecks = Math.round(value * 100) % 100 !== 0;
  const amount = value.toLocaleString('ru-RU', {
    minimumFractionDigits: hasKopecks ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${amount} BYN`;
}

export function perWeek(plan: Plan) {
  return (plan.priceByn / plan.days) * 7;
}

export function perMonth(plan: Plan) {
  return (plan.priceByn / plan.days) * 30;
}

export function roundByn(value: number) {
  return Math.round(value * 100) / 100;
}

export function orderSubject(plan?: Plan) {
  return plan
    ? `Заказ Yorix Premium на ${plan.accusative} (${formatByn(plan.priceByn)})`
    : 'Заказ Yorix Premium';
}

export function orderTemplate(plan?: Plan) {
  return [
    'Здравствуйте!',
    '',
    `Хочу Yorix Premium: ${plan ? `на ${plan.accusative} — ${formatByn(plan.priceByn)}` : 'неделя / месяц / год'}`,
    'Apple ID для входа в Yorix: ',
  ].join('\n');
}

export function mailtoOrder(plan?: Plan) {
  return `mailto:${merchant.email}?subject=${encodeURIComponent(orderSubject(plan))}&body=${encodeURIComponent(orderTemplate(plan))}`;
}
