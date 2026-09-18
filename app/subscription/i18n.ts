export type Lang = 'ru' | 'en';

export const subscriptionLangs: { code: Lang; label: string; short: string }[] = [
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
];

export type SubscriptionPage = '' | '/oplata' | '/oferta' | '/konfidencialnost' | '/return' | '/cancel';

export function subscriptionPath(lang: Lang, page: SubscriptionPage = '') {
  return lang === 'ru' ? `/ru/subscription${page}` : `/subscription${page}`;
}

export function subscriptionAlternates(page: SubscriptionPage) {
  return { ru: subscriptionPath('ru', page), en: subscriptionPath('en', page) };
}

export function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
