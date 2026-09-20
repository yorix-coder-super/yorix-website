import type { Lang } from '../i18n';

// One edition date per document. It is shown on the page and sent with every
// order and request, so the seller can prove which text the buyer accepted
// (99-З ст. 5 п. 7 puts that burden on the operator).
export const legalVersion = {
  offer: '2026-09-21',
  payment: '2026-09-21',
  terms: '2026-09-21',
  privacy: '2026-09-21',
} as const;

export type LegalDoc = keyof typeof legalVersion;

export function editionLabel(doc: LegalDoc, lang: Lang) {
  const date = new Date(`${legalVersion[doc]}T12:00:00Z`);
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
