import { getArticleUiCopy, getLocalizedTopicPages } from './article-localizations';
import { GuidesIndex } from './home/GuidesIndex';
import { type Locale, localeCopy } from './locales';

export function LocalizedGuidesPage({ locale }: { locale: Locale }) {
  const copy = localeCopy[locale];
  const ui = getArticleUiCopy(locale);

  return (
    <GuidesIndex
      body={copy.guides.body}
      cta={copy.cta}
      eyebrow={copy.guides.eyebrow}
      footer={ui.footer}
      guides={getLocalizedTopicPages(locale).map((page) => ({ ...page, href: `/${locale}/${page.slug}` }))}
      home={`/${locale}`}
      locale={locale}
      title={copy.guides.title}
    />
  );
}
