import { siteCopy, type SiteLocale } from '../i18n';
import type { HomeCopy } from '../i18n/types';

export type HomeLocale = SiteLocale;

export function homeCopy(locale: HomeLocale): HomeCopy {
  return siteCopy(locale).home;
}

// The concept paints the tail of the headline: one phrase in lavender, the
// closing words in amber ("— раньше, чем начнутся капризы."). Each language
// names both pieces (`highlight`), so scripts without spaces work too; when a
// piece is missing from the title, the old word-based rule takes over.
export function headlineParts(title: string, highlight?: { soft: string; warm: string }): { text: string; tone: string }[] {
  if (highlight) {
    const soft = title.indexOf(highlight.soft);
    const warm = title.indexOf(highlight.warm, soft >= 0 ? soft + highlight.soft.length : 0);
    if (soft >= 0 && warm >= 0) {
      return [
        { text: title.slice(0, soft), tone: '' },
        { text: highlight.soft, tone: 'text-[#A5B4FC]' },
        { text: title.slice(soft + highlight.soft.length, warm), tone: '' },
        { text: highlight.warm, tone: 'text-[#FDE68A]' },
        { text: title.slice(warm + highlight.warm.length), tone: '' },
      ].filter((part) => part.text);
    }
  }
  const words = title.split(' ');
  const tones = headlineTones(title);
  return words.map((word, index) => ({ text: index < words.length - 1 ? `${word} ` : word, tone: tones[index] }));
}

export function headlineTones(title: string): string[] {
  const words = title.split(' ');
  const tones = words.map(() => '');
  const dash = words.findIndex((word) => word === '—' || word === '-');
  const amberFrom = dash >= 0 ? Math.max(dash + 3, words.length - 2) : words.length - 2;
  if (dash >= 0 && dash + 1 < words.length) tones[dash + 1] = 'text-[#A5B4FC]';
  for (let i = Math.max(0, amberFrom); i < words.length; i += 1) tones[i] = 'text-[#FDE68A]';
  return tones;
}
