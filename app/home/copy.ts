import { localeCopy, type LocaleCopy } from '../locales';

// The redesigned home ships in English and Russian first; the other locales
// keep the previous layout until their strings are translated.
export type HomeLocale = 'en' | 'ru';

type Pair = { title: string; body: string };

// Strings the home layout needs beyond the shared locale copy: the four
// feature tiles under the hero, the hand-written notes around the art and a
// few labels. Claims stay honest: no parent counts, no "written by
// pediatricians" — the guides are evidence-aware, not authored by doctors.
export type HomeExtras = {
  features: [Pair, Pair, Pair, Pair];
  notes: { hero: string; coach: string; cta: string };
  more: string;
  reviews: Pair;
  allQuestions: string;
  pricing: { secure: string; activates: string; questions: string };
};

type HomeBase = Pick<LocaleCopy, 'nav' | 'hero' | 'stats' | 'plan' | 'faq' | 'cta' | 'footer'>;

const enBase: HomeBase = {
  nav: { plan: 'Plan', features: 'Features', guides: 'Guides', faq: 'FAQ', download: 'Get the app' },
  hero: {
    badge: 'Baby sleep tracker with a plan that re-plans itself',
    title: 'Know when your baby’s next sleep is due — before the fussing starts.',
    body: 'Yorix computes the next nap window and bedtime from your baby’s real day and re-plans the moment a nap runs short. Log sleep, feeds and care in one tap, and ask the coach that knows your diary — any hour of the night.',
    primary: 'Get my baby’s plan',
    secondary: 'Read sleep guides',
  },
  stats: ['languages', 'ads in your routine', 'AI coach'],
  plan: {
    eyebrow: 'Your baby has a plan',
    title: 'From sleepy cues to a clear next step.',
    body: 'Yorix is built around the question every tired parent asks: when should my baby sleep next? The app watches the day unfold and keeps the plan flexible.',
    steps: [
      'Build a routine that works for everyone',
      'Prevent overtired meltdowns before bedtime',
      'Learn from real sleep, feeding, and care patterns',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Baby sleep questions, answered calmly.',
    items: [
      {
        question: 'What makes Yorix different from a baby sleep chart?',
        answer: 'A chart gives average ranges. Yorix uses your baby’s real naps, wake windows, night wakings, feeds, and routine history to adjust the next sleep window.',
      },
      {
        question: 'Can I use Yorix with a newborn?',
        answer: 'Yes. In the newborn stage, Yorix is most useful as a simple sleep, feeding, diaper, and care log. The routine becomes more predictive as patterns emerge.',
      },
      {
        question: 'Does Yorix replace medical advice?',
        answer: 'No. Yorix is a routine helper, not a medical service. Feeding, growth, breathing, fever, symptoms, or safety concerns should be discussed with a qualified clinician.',
      },
    ],
  },
  cta: {
    badge: 'Built for real family life',
    title: 'Log one nap tonight. Tomorrow’s plan is already there.',
    body: 'The diary is free forever. Sleep, feeds, diapers, growth and care in one tap — and a plan for tomorrow built from what you logged.',
    action: 'Download Yorix',
  },
  footer: 'Yorix is a routine helper for parents. It does not provide medical diagnosis or emergency advice.',
};

const extras: Record<HomeLocale, HomeExtras> = {
  en: {
    features: [
      { title: 'Accurate sleep forecasts', body: 'Built on your baby’s real data' },
      { title: 'Growth and development', body: 'Sleep, feeds and care in one place' },
      { title: 'AI coach 24/7', body: 'Answers to any sleep question' },
      { title: 'Sleep guides', body: 'Advice for every age, grounded in research' },
    ],
    notes: { hero: 'Calm babies, happy parents', coach: 'Support at any hour', cta: 'The best is ahead' },
    more: 'Learn more',
    reviews: { title: 'Real parents. Real stories.', body: 'Unedited words from parents — nothing polished, nothing invented.' },
    allQuestions: 'All questions',
    pricing: { secure: 'Secure card payment via WebPay', activates: 'The subscription turns on in the app right after payment', questions: 'Questions? Write to us' },
  },
  ru: {
    features: [
      { title: 'Точные прогнозы сна', body: 'На основе реальных данных вашего малыша' },
      { title: 'Аналитика роста и развития', body: 'Сон, кормления, уход в одном месте' },
      { title: 'ИИ-коуч 24/7', body: 'Ответы на любые вопросы о сне' },
      { title: 'Гайды по сну', body: 'Советы для каждого возраста с опорой на исследования' },
    ],
    notes: { hero: 'Спокойные малыши — счастливые родители', coach: 'Поддержка в любое время', cta: 'Лучшее впереди' },
    more: 'Узнать больше',
    reviews: { title: 'Реальные родители. Реальные истории.', body: 'Настоящие слова родителей — без правок и выдумок.' },
    allQuestions: 'Все вопросы',
    pricing: { secure: 'Безопасная оплата картой через WebPay', activates: 'Подписка включается в приложении сразу после оплаты', questions: 'Есть вопросы? Напишите нам' },
  },
};

export function homeCopy(locale: HomeLocale): HomeBase & HomeExtras {
  const base = locale === 'en' ? enBase : localeCopy.ru;
  return { ...base, ...extras[locale] };
}

// The concept paints the tail of the headline: after the dash, the first word
// in lavender and the last two in amber ("— раньше, чем начнутся капризы.").
// Titles without a dash get the amber on their last two words.
export function headlineTones(title: string): string[] {
  const words = title.split(' ');
  const tones = words.map(() => '');
  const dash = words.findIndex((word) => word === '—' || word === '-');
  const amberFrom = dash >= 0 ? Math.max(dash + 3, words.length - 2) : words.length - 2;
  if (dash >= 0 && dash + 1 < words.length) tones[dash + 1] = 'text-[#A5B4FC]';
  for (let i = amberFrom; i < words.length; i += 1) tones[i] = 'text-[#FDE68A]';
  return tones;
}
