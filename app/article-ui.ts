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
  shortAnswer: string;
  inThisGuide: string;
  promoTitle: string;
  promoBody: string;
  promoTagline: string;
  checklist: string;
  notes: { hero: string; inline: string; promo: string; shortAnswer: string } | null;
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
  readingProgress: 'Reading progress',
  tryInApp: 'Try it in Yorix',
  shortAnswer: 'The short answer',
  inThisGuide: 'In this guide',
  promoTitle: 'Turn insights into better days',
  promoBody: 'Track sleep and feeds, and get personal next steps for your baby.',
  promoTagline: 'A calmer tomorrow, in your pocket.',
  checklist: 'Quick routine checklist',
  notes: { hero: 'Small steps, brighter days', inline: 'Small steps, big progress', promo: 'You’re doing a great job already', shortAnswer: 'Less guessing. More good days.' },
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
  readingProgress: 'Прогресс чтения',
  tryInApp: 'Попробуйте в Yorix',
  shortAnswer: 'Коротко',
  inThisGuide: 'В этом гайде',
  promoTitle: 'Превратите наблюдения в спокойные дни',
  promoBody: 'Записывайте сон и кормления — и получайте персональные следующие шаги для малыша.',
  promoTagline: 'Спокойное завтра — в вашем кармане.',
  checklist: 'Короткий чек-лист',
  notes: { hero: 'Маленькие шаги — светлее дни', inline: 'Маленькие шаги — большой прогресс', promo: 'Вы уже отлично справляетесь', shortAnswer: 'Меньше догадок. Больше хороших дней.' },
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

// The hero picture of an article, by its topic.
const heroRules: [RegExp, { name: string; width: number; height: number }][] = [
  [/feed/, { name: 'hero-feeding', width: 731, height: 820 }],
  [/wake/, { name: 'hero-morning', width: 809, height: 820 }],
  [/night/, { name: 'hero-night', width: 820, height: 745 }],
  [/noise|sound/, { name: 'hero-noise', width: 820, height: 752 }],
  [/ferber|train/, { name: 'hero-book', width: 735, height: 820 }],
  [/stress/, { name: 'cta-baby-star', width: 503, height: 560 }],
  [/newborn/, { name: 'hero-baby-moon', width: 817, height: 900 }],
];

export function articleHero(slug: string) {
  return heroRules.find(([pattern]) => pattern.test(slug))?.[1] ?? { name: 'article-hero-cloud', width: 820, height: 806 };
}

type Scene = { name: string; width: number; height: number; match: RegExp; note: { en: string; ru: string } };

// Spot illustrations beside the sections, matched to what a section is about
// (English and Russian headings); every article uses each picture once.
const scenes: Scene[] = [
  { name: 'scene-bottle', width: 372, height: 440, match: /feed|bottle|milk|breast|корм|молок|груд|бутыл/i, note: { en: 'Same day. A clearer picture.', ru: 'Тот же день — картина яснее' } },
  { name: 'scene-sun-moon', width: 440, height: 380, match: /day-night|day and night|cue|rhythm|день|ритм|сигнал/i, note: { en: 'Bright days, quiet nights', ru: 'Светлые дни, тихие ночи' } },
  { name: 'scene-nightlight', width: 390, height: 440, match: /night|waking|ночн|ночь|пробужд/i, note: { en: 'Quiet, dim and gentle', ru: 'Тихо, неярко и бережно' } },
  { name: 'scene-clock', width: 436, height: 440, match: /window|wake|time|clock|short nap|окн|бодрств|время|коротк/i, note: { en: 'Watch the baby, not the clock', ru: 'Смотрите на малыша, а не на часы' } },
  { name: 'scene-phone', width: 408, height: 440, match: /app|track|log|yorix|приложен|отслеж|запис|дневник/i, note: { en: 'Your diary does the math', ru: 'Дневник считает за вас' } },
  { name: 'scene-noise', width: 428, height: 440, match: /noise|sound|шум|звук/i, note: { en: 'Soft, steady, familiar', ru: 'Мягко, ровно, привычно' } },
  { name: 'scene-calendar', width: 436, height: 440, match: /month|schedule|\bage\b|plan|месяц|возраст|режим|расписан|план/i, note: { en: 'Plans that grow with your baby', ru: 'План растёт вместе с малышом' } },
  { name: 'scene-book', width: 426, height: 440, match: /method|training|ferber|learn|метод|обучен|школ/i, note: { en: 'Pick what fits your family', ru: 'Выбирайте то, что подходит вашей семье' } },
  { name: 'scene-tea', width: 396, height: 440, match: /parent|stress|yourself|родител|стресс|себ|устал/i, note: { en: 'Rest counts for you too', ru: 'Отдых нужен и вам' } },
  { name: 'scene-bath', width: 440, height: 410, match: /bath|routine|bedtime|wind-down|купан|ритуал|отбой|укладыв/i, note: { en: 'Same steps every evening', ru: 'Каждый вечер — одни и те же шаги' } },
  { name: 'scene-crib', width: 370, height: 440, match: /crib|safe|space|кроват|безопас/i, note: { en: 'A calm, safe place to sleep', ru: 'Спокойное и безопасное место для сна' } },
  { name: 'scene-bunny', width: 408, height: 440, match: /sooth|calm|comfort|expect|успок|спокой|ожидан/i, note: { en: 'Calm is contagious', ru: 'Спокойствие передаётся' } },
];

const starScene = { name: 'star-mascot', width: 410, height: 420, note: { en: 'Every baby has their own rhythm', ru: 'У каждого малыша свой ритм' } };

export function sectionScenes(headings: string[], locale?: Locale) {
  const used = new Set<string>();
  const lang = locale === 'ru' ? 'ru' : locale ? null : 'en';
  // The first section always gets the star: «every baby has their own rhythm».
  return headings.map((heading, index) => {
    const matched = index === 0 ? starScene : scenes.find((scene) => !used.has(scene.name) && scene.match.test(heading));
    const scene = matched ?? scenes.find((candidate) => !used.has(candidate.name)) ?? starScene;
    used.add(scene.name);
    return { name: scene.name, width: scene.width, height: scene.height, note: lang ? scene.note[lang] : null };
  });
}
