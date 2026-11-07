import type { Lang } from '../i18n';

// Edition dates are stored with each order as evidence of the accepted terms.
export const legalVersion = {
  offer: '2026-11-07',
  payment: '2026-11-07',
  terms: '2026-11-04',
  privacy: '2026-11-07',
} as const;

export type LegalDoc = keyof typeof legalVersion;

export function editionLabel(doc: LegalDoc, lang: Lang) {
  const date = new Date(`${legalVersion[doc]}T12:00:00Z`);
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
