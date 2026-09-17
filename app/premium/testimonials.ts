import type { Lang } from './i18n';

// Verbatim words of real parents, mirrored from the worker's socialProof.ts.
// `appstore` is a published App Store review (nickname as in the store);
// `parents` is feedback collected outside the store. Never edit a quote.
export interface Testimonial {
  author: string;
  stars: number;
  locale: Lang;
  source: 'appstore' | 'parents';
  quote: string;
  translations: Record<Lang, string>;
}

export const testimonials: Testimonial[] = [
  {
    author: 'Maryja',
    stars: 5,
    locale: 'ru',
    source: 'appstore',
    quote:
      'Очень точно показывает лучшее окно сна и когда нужно будить ребенка. Когда я накопила данные, попросила чат проанализировать их и чат выдал очень интересные инсайды про моего ребенка. Рекомендую',
    translations: {
      ru: 'Очень точно показывает лучшее окно сна и когда нужно будить ребенка. Когда я накопила данные, попросила чат проанализировать их и чат выдал очень интересные инсайды про моего ребенка. Рекомендую',
      en: 'Very accurately shows the best sleep window and when to wake the baby. Once I had collected some data, I asked the chat to analyze it and it gave me really interesting insights about my child. Recommended',
    },
  },
  {
    author: 'Anna',
    stars: 5,
    locale: 'en',
    source: 'parents',
    quote:
      'The nap predictions are scarily accurate. I stopped guessing and our evenings finally calmed down — bedtime went from an hour of fighting to fifteen minutes.',
    translations: {
      en: 'The nap predictions are scarily accurate. I stopped guessing and our evenings finally calmed down — bedtime went from an hour of fighting to fifteen minutes.',
      ru: 'Прогнозы дневных снов пугающе точные. Я перестала гадать, и вечера наконец стали спокойными — укладывание сократилось с часа борьбы до пятнадцати минут.',
    },
  },
  {
    author: 'Daniel',
    stars: 5,
    locale: 'en',
    source: 'parents',
    quote:
      'What sold me is that the plan adjusts itself after every nap I log. One short nap and the whole day shifts — no more doing math at 2 pm with a crying baby.',
    translations: {
      en: 'What sold me is that the plan adjusts itself after every nap I log. One short nap and the whole day shifts — no more doing math at 2 pm with a crying baby.',
      ru: 'Купило то, что план сам подстраивается после каждого записанного сна. Один короткий сон — и весь день сдвигается, больше не надо считать в уме в два часа дня с плачущим ребёнком.',
    },
  },
];
