export type Lang = 'ru' | 'en';

export const premiumLangs: { code: Lang; label: string; short: string }[] = [
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
];

export type PremiumPage = '' | '/oplata' | '/oferta' | '/konfidencialnost' | '/return' | '/cancel';

export function premiumPath(lang: Lang, page: PremiumPage = '') {
  return lang === 'ru' ? `/premium${page}` : `/en/premium${page}`;
}

export function premiumAlternates(page: PremiumPage) {
  return { ru: premiumPath('ru', page), en: premiumPath('en', page) };
}

export function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
