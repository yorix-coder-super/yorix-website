import type { Locale } from '../locales';
import type { Lang } from '../subscription/i18n';
import { translation as ar } from './ar';
import { translation as cs } from './cs';
import { translation as da } from './da';
import { translation as de } from './de';
import { translation as en } from './en';
import { translation as es } from './es';
import { translation as fr } from './fr';
import { translation as he } from './he';
import { translation as hi } from './hi';
import { translation as id } from './id';
import { translation as it } from './it';
import { translation as ja } from './ja';
import { translation as ms } from './ms';
import { translation as nl } from './nl';
import { translation as no } from './no';
import { translation as pl } from './pl';
import { translation as pt } from './pt';
import { translation as ru } from './ru';
import { translation as sv } from './sv';
import { translation as th } from './th';
import { translation as tr } from './tr';
import { translation as uk } from './uk';
import { translation as vi } from './vi';
import type { SiteTranslation } from './types';

export type SiteLocale = Locale | 'en';

const translations: Record<SiteLocale, SiteTranslation> = { en, ru, tr, fr, de, nl, it, pt, es, th, sv, id, ja, pl, cs, no, ar, da, he, uk, vi, ms, hi };

export function siteCopy(locale: SiteLocale = 'en'): SiteTranslation {
  return translations[locale];
}

export function isRtl(locale: SiteLocale) {
  return locale === 'ar' || locale === 'he';
}

// The app itself speaks 15 of the site's languages; the others show the
// English screenshots.
const shotLocales = new Set<SiteLocale>(['en', 'ru', 'tr', 'fr', 'de', 'nl', 'it', 'pt', 'es', 'th', 'id', 'ja', 'pl', 'ar', 'uk', 'vi', 'hi']);

export function shotLocale(locale: SiteLocale): SiteLocale {
  return shotLocales.has(locale) ? locale : 'en';
}

// The subscription documents exist in Russian (binding) and English.
export function docsLang(locale: SiteLocale): Lang {
  return locale === 'ru' ? 'ru' : 'en';
}
