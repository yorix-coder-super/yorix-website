export const locales = [
  'tr', 'fr', 'de', 'ru', 'nl', 'it', 'pt', 'es', 'th', 'sv', 'id', 'ja',
  'pl', 'cs', 'no', 'ar', 'da', 'he', 'uk', 'vi', 'ms', 'hi',
] as const;

export type Locale = (typeof locales)[number];

// What the site says in each language lives in app/i18n; this is only how a
// language names itself and its Open Graph code.
export const localeCopy: Record<Locale, { name: string; nativeName: string; ogLocale: string }> = {
  tr: { name: 'Turkish', nativeName: 'Türkçe', ogLocale: 'tr_TR' },
  fr: { name: 'French', nativeName: 'Français', ogLocale: 'fr_FR' },
  de: { name: 'German', nativeName: 'Deutsch', ogLocale: 'de_DE' },
  ru: { name: 'Russian', nativeName: 'Русский', ogLocale: 'ru_RU' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', ogLocale: 'nl_NL' },
  it: { name: 'Italian', nativeName: 'Italiano', ogLocale: 'it_IT' },
  pt: { name: 'Portuguese', nativeName: 'Português', ogLocale: 'pt_PT' },
  es: { name: 'Spanish', nativeName: 'Español', ogLocale: 'es_ES' },
  th: { name: 'Thai', nativeName: 'ไทย', ogLocale: 'th_TH' },
  sv: { name: 'Swedish', nativeName: 'Svenska', ogLocale: 'sv_SE' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', ogLocale: 'id_ID' },
  ja: { name: 'Japanese', nativeName: '日本語', ogLocale: 'ja_JP' },
  pl: { name: 'Polish', nativeName: 'Polski', ogLocale: 'pl_PL' },
  cs: { name: 'Czech', nativeName: 'Čeština', ogLocale: 'cs_CZ' },
  no: { name: 'Norwegian', nativeName: 'Norsk', ogLocale: 'nb_NO' },
  ar: { name: 'Arabic', nativeName: 'العربية', ogLocale: 'ar' },
  da: { name: 'Danish', nativeName: 'Dansk', ogLocale: 'da_DK' },
  he: { name: 'Hebrew', nativeName: 'עברית', ogLocale: 'he_IL' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', ogLocale: 'uk_UA' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', ogLocale: 'vi_VN' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', ogLocale: 'ms_MY' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', ogLocale: 'hi_IN' },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeAlternates(path = '') {
  return Object.fromEntries(
    locales.map((locale) => [locale, `/${locale}${path}`]),
  );
}
