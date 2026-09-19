import type { ArticleUiCopy, TranslatedArticleSlug } from '../article-localizations';
import type { ArticleExtras } from '../article-ui';
import type { SubscriptionCopy } from '../subscription/copy';
import type { PlanId } from '../subscription/merchant';

type Pair = { title: string; body: string };

// Everything the redesigned site says, in one language. English and Russian
// are the sources; every other language is a translation of this shape.
export type HomeCopy = {
  nav: { plan: string; features: string; guides: string; faq: string; download: string };
  hero: { badge: string; title: string; body: string; primary: string; secondary: string };
  stats: [string, string, string];
  plan: { eyebrow: string; title: string; body: string; steps: string[] };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  cta: { badge: string; title: string; body: string; action: string };
  footer: string;
  features: [Pair, Pair, Pair, Pair];
  notes: { hero: string; coach: string; cta: string };
  more: string;
  reviews: Pair;
  pricing: { secure: string; activates: string; questions: string };
  // Two exact pieces of hero.title painted lavender and amber.
  highlight: { soft: string; warm: string };
  screenAlt: string;
  showcaseAlt: { progress: string; bedtime: string; coach: string };
  // In place of the plans for visitors whose country buys in the App Store.
  appStore: { title: string; body: string };
};

// The article every topic falls back to when it has no hand-written
// translation: seven sections, reference rows, checklist and FAQ.
export type SharedArticleCopy = {
  category: string;
  readTime: string;
  description: (topic: string) => string;
  intro: (topic: string) => string;
  sectionHeadings: [string, string, string, string, string, string, string];
  sectionBodies: [string, string, string, string, string, string, string];
  rows: [string, string, string, string, string, string, string];
  checklist: [string, string, string, string, string, string];
  questions: [string, string, string, string];
  answers: [string, string, string, string];
  appHeading: string;
  appBody: [string, string];
};

export type SceneName =
  | 'star-mascot'
  | 'scene-bottle'
  | 'scene-sun-moon'
  | 'scene-nightlight'
  | 'scene-clock'
  | 'scene-phone'
  | 'scene-noise'
  | 'scene-calendar'
  | 'scene-book'
  | 'scene-tea'
  | 'scene-bath'
  | 'scene-crib'
  | 'scene-bunny';

export type SiteTranslation = {
  home: HomeCopy;
  guides: { eyebrow: string; title: string; body: string };
  articleUi: ArticleUiCopy;
  articleExtras: Omit<ArticleExtras, 'notes'> & { notes: NonNullable<ArticleExtras['notes']> };
  // Hand-written line beside each section illustration.
  sceneNotes: Record<SceneName, string>;
  sharedArticle: SharedArticleCopy;
  subscription: Pick<SubscriptionCopy, 'nav' | 'plans' | 'account' | 'checkout' | 'terms' | 'currency' | 'docs' | 'home' | 'proof' | 'footer'>;
  plans: Record<PlanId, { title: string; forPeriod: string; days: string; purpose: string }>;
  // The three parent quotes (subscription/testimonials.ts), in that order.
  testimonials: [string, string, string];
  footerLabels: { product: string; features: string; guides: string; support: string; write: string; badgeTop: string };
  // Under the acceptance box when the documents are not in this language.
  docsNote: string;
  // Short article titles in this language (the Russian ones are the model).
  topics?: Record<TranslatedArticleSlug, string>;
};
