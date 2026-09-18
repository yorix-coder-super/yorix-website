import { getLocalizedTopicPages } from './article-localizations';
import { GuidesIndex } from './home/GuidesIndex';
import { siteCopy } from './i18n';
import type { Locale } from './locales';

export function LocalizedGuidesPage({ locale }: { locale: Locale }) {
  const copy = siteCopy(locale);

  return (
    <GuidesIndex
      body={copy.guides.body}
      cta={copy.home.cta}
      eyebrow={copy.guides.eyebrow}
      footer={copy.articleUi.footer}
      guides={getLocalizedTopicPages(locale).map((page) => ({ ...page, href: `/${locale}/${page.slug}` }))}
      home={`/${locale}`}
      locale={locale}
      title={copy.guides.title}
    />
  );
}
