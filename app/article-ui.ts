import type { TopicPage } from './content';
import { siteCopy } from './i18n';
import type { SceneName } from './i18n/types';
import type { Locale } from './locales';

type DiagnosticRow = NonNullable<TopicPage['diagnosticRows']>[number];

// Labels and generic blocks of the article template beyond ArticleUiCopy,
// in every language (app/i18n).
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

export function articleExtras(locale?: Locale): ArticleExtras & { hasDefaults: boolean } {
  return { ...siteCopy(locale ?? 'en').articleExtras, hasDefaults: true };
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

type Scene = { name: SceneName; width: number; height: number; match: RegExp };

// Spot illustrations beside the sections, matched to what a section is about
// (English and Russian headings); every article uses each picture once.
// Their hand-written notes are translated in app/i18n.
const scenes: Scene[] = [
  { name: 'scene-bottle', width: 372, height: 440, match: /feed|bottle|milk|breast|корм|молок|груд|бутыл/i },
  { name: 'scene-sun-moon', width: 440, height: 380, match: /day-night|day and night|cue|rhythm|день|ритм|сигнал/i },
  { name: 'scene-nightlight', width: 390, height: 440, match: /night|waking|ночн|ночь|пробужд/i },
  { name: 'scene-clock', width: 436, height: 440, match: /window|wake|time|clock|short nap|окн|бодрств|время|коротк/i },
  { name: 'scene-phone', width: 408, height: 440, match: /app|track|log|yorix|приложен|отслеж|запис|дневник/i },
  { name: 'scene-noise', width: 428, height: 440, match: /noise|sound|шум|звук/i },
  { name: 'scene-calendar', width: 436, height: 440, match: /month|schedule|\bage\b|plan|месяц|возраст|режим|расписан|план/i },
  { name: 'scene-book', width: 426, height: 440, match: /method|training|ferber|learn|метод|обучен|школ/i },
  { name: 'scene-tea', width: 396, height: 440, match: /parent|stress|yourself|родител|стресс|себ|устал/i },
  { name: 'scene-bath', width: 440, height: 410, match: /bath|routine|bedtime|wind-down|купан|ритуал|отбой|укладыв/i },
  { name: 'scene-crib', width: 370, height: 440, match: /crib|safe|space|кроват|безопас/i },
  { name: 'scene-bunny', width: 408, height: 440, match: /sooth|calm|comfort|expect|успок|спокой|ожидан/i },
];

const starScene: Omit<Scene, 'match'> = { name: 'star-mascot', width: 410, height: 420 };

export function sectionScenes(headings: string[], locale?: Locale, matchHeadings: string[] = headings) {
  const used = new Set<SceneName>();
  const notes = siteCopy(locale ?? 'en').sceneNotes;
  // The first section always gets the star: «every baby has their own rhythm».
  return headings.map((_, index) => {
    const heading = matchHeadings[index] ?? '';
    const matched = index === 0 ? starScene : scenes.find((scene) => !used.has(scene.name) && scene.match.test(heading));
    const scene = matched ?? scenes.find((candidate) => !used.has(candidate.name)) ?? starScene;
    used.add(scene.name);
    return { name: scene.name, width: scene.width, height: scene.height, note: notes[scene.name] };
  });
}
