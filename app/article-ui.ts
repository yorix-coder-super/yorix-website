import type { TopicPage } from './content';
import type { Locale } from './locales';

type DiagnosticRow = NonNullable<TopicPage['diagnosticRows']>[number];

// Labels and generic blocks of the article template beyond ArticleUiCopy.
// English and Russian first; other locales get the English labels and skip
// the generic blocks, which exist only in these two languages.
export type ArticleExtras = {
  keyTakeaways: string;
  important: string;
  tip: string;
  exampleDay: string;
  commonChallenges: string;
  likelyReason: string;
  tryFirst: string;
  howToCheck: string;
  planToday: string;
  readingProgress: string;
  tryInApp: string;
  notes: { hero: string; inline: string; promo: string } | null;
  scenarioTimes: string[];
  scenarioYorix: (value: string) => string;
  diagnosticRows: DiagnosticRow[];
};

const en: ArticleExtras = {
  keyTakeaways: 'Key takeaways',
  important: 'Important',
  tip: 'Tip',
  exampleDay: 'Example day',
  commonChallenges: 'Common challenges',
  likelyReason: 'Likely reason',
  tryFirst: 'Try first',
  howToCheck: 'How to check',
  planToday: 'Plan for today',
  readingProgress: 'Read',
  tryInApp: 'Try it in Yorix',
  notes: { hero: 'Better sleep, brighter days', inline: 'Small steps, big progress', promo: 'You’re doing a great job already' },
  scenarioTimes: ['Morning', 'First nap', 'Midday', 'Evening', 'Bedtime'],
  scenarioYorix: (value) => `Uses ${value.toLowerCase()} as context for the next plan.`,
  diagnosticRows: [
    {
      observation: 'The day changes after a short nap.',
      explanation: 'The next wake window may need to shorten.',
      action: 'Move the next wind-down earlier.',
      check: 'Compare the next 3 days, not one nap.',
    },
    {
      observation: 'Bedtime becomes harder after a late final nap.',
      explanation: 'Sleep pressure may be too low or the last window may be off.',
      action: 'Protect the bedtime anchor and adjust the final nap.',
      check: 'Watch bedtime settling time for several evenings.',
    },
    {
      observation: 'Night wakings increase suddenly.',
      explanation: 'Schedule, feeding, illness, development, or environment may have changed.',
      action: 'Review sleep, feeds, symptoms, and room conditions together.',
      check: 'Look for the same pattern across 3-7 days.',
    },
  ],
};

const ru: ArticleExtras = {
  keyTakeaways: 'Коротко о главном',
  important: 'Важно',
  tip: 'Совет',
  exampleDay: 'Пример дня',
  commonChallenges: 'Частые ситуации',
  likelyReason: 'Вероятная причина',
  tryFirst: 'Что попробовать',
  howToCheck: 'Как проверить',
  planToday: 'План на сегодня',
  readingProgress: 'Прочитано',
  tryInApp: 'Попробуйте в Yorix',
  notes: { hero: 'Лучше сон — светлее дни', inline: 'Маленькие шаги — большой прогресс', promo: 'Вы уже отлично справляетесь' },
  scenarioTimes: ['Утро', 'Первый сон', 'Середина дня', 'Вечер', 'Отбой'],
  scenarioYorix: (value) => `Учитывает «${value}» при расчёте следующего плана.`,
  diagnosticRows: [
    {
      observation: 'После короткого сна день идёт иначе.',
      explanation: 'Следующее окно бодрствования, возможно, стоит сократить.',
      action: 'Начните следующее укладывание раньше.',
      check: 'Сравните следующие 3 дня, а не один сон.',
    },
    {
      observation: 'После позднего последнего сна вечером труднее уложить.',
      explanation: 'Давление сна может быть слишком низким, или последнее окно подобрано неточно.',
      action: 'Сохраните привычное время отбоя и подвиньте последний дневной сон.',
      check: 'Несколько вечеров следите, сколько занимает укладывание.',
    },
    {
      observation: 'Ночных пробуждений резко стало больше.',
      explanation: 'Могли измениться режим, кормления, самочувствие, развитие или обстановка.',
      action: 'Посмотрите вместе на сон, кормления, симптомы и условия в комнате.',
      check: 'Ищите повторяющуюся картину за 3–7 дней.',
    },
  ],
};

export function articleExtras(locale?: Locale): ArticleExtras & { hasDefaults: boolean } {
  if (!locale) return { ...en, hasDefaults: true };
  if (locale === 'ru') return { ...ru, hasDefaults: true };
  return { ...en, notes: null, hasDefaults: false };
}

// A takeaway sentence becomes a card: the first short sentence is its title.
export function splitLead(text: string): { title: string; body: string } {
  const match = /^([\s\S]+?[.!?])\s+([\s\S]+)$/.exec(text);
  if (match && match[1].length <= 70) return { title: match[1].replace(/\.$/, ''), body: match[2] };
  return { title: '', body: text };
}

// 3D icon for a reference or timeline row, from its words (English and Russian).
const itemRules: [RegExp, string][] = [
  [/feed|bottle|milk|breast|корм|груд|молок|бутыл/i, 'icon-bottle'],
  [/diaper|подгуз/i, 'icon-diaper'],
  [/bath|купан|ванн/i, 'icon-bath'],
  [/walk|stroll|прогул|коляс/i, 'icon-stroller'],
  [/bedtime|night|evening|отбой|ноч|вечер/i, 'icon-moon-crescent'],
  [/wake|morning|утр|подъ[её]м|бодрств/i, 'icon-sun'],
  [/nap|sleep|сон|сна|дрем/i, 'icon-moon-full'],
  [/growth|weight|height|рост|вес/i, 'icon-chart'],
  [/window|clock|time|час|окн|врем/i, 'icon-clock'],
];

export function itemIcon(...texts: string[]) {
  const text = texts.join(' ');
  return itemRules.find(([pattern]) => pattern.test(text))?.[1] ?? 'icon-sparkle';
}

// Timeline rows are about the time of day first, the event second.
const timeRules: [RegExp, string][] = [
  [/morning|wake|утр|подъ[её]м/i, 'icon-sun'],
  [/bed|night|evening|отбой|ноч|вечер/i, 'icon-moon-crescent'],
  [/nap|сон/i, 'icon-moon-full'],
  [/day|noon|afternoon|день|дн[её]м|полд|середин/i, 'icon-sun'],
];

export function timelineIcon(time: string, event: string) {
  return timeRules.find(([pattern]) => pattern.test(time))?.[1] ?? itemIcon(event);
}

// Article dates are stored in English ("September 3, 2026"); show them the
// way the page's language writes dates.
export function formatArticleDate(date: string, locale?: Locale) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(locale ?? 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}
