import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Moon, Sparkles } from 'lucide-react';
import { getArticleUiCopy, getLocalizedTopicPages, type ArticleUiCopy } from './article-localizations';
import { BrandLogo } from './BrandLogo';
import { appDownloadUrl, type TopicPage, topicPages } from './content';
import { type Locale } from './locales';

type SeoArticlePageProps = {
  page: TopicPage;
  locale?: Locale;
  ui?: ArticleUiCopy;
};

export function SeoArticlePage({ page, locale, ui = getArticleUiCopy(locale) }: SeoArticlePageProps) {
  const guidePath = locale ? `/${locale}/guides` : '/guides';
  const homePath = locale ? `/${locale}` : '/';
  const relatedSource = locale ? getLocalizedTopicPages(locale) : topicPages;
  const relatedPages = relatedSource
    .filter((item) => item.slug !== page.slug)
    .slice(0, 3);
  const articleAnchors = page.sections.map((section) => ({
    id: section.heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    label: section.heading,
  }));

  return (
    <main className="brand-page article-page min-h-screen text-[#1E1B4B]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a
          className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]"
          href={homePath}
          aria-label="Back to Yorix home"
        >
          <BrandLogo size="sm" />
        </a>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1E1B4B] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {ui.getApp}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <article>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <a
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1] transition hover:text-[#4F46E5]"
            href={guidePath}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {ui.backToGuides}
          </a>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2 text-sm font-semibold">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-4 py-2 text-[#4F46E5]">
                  <Moon className="h-4 w-4" aria-hidden="true" />
                  {page.category}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#64748B] ring-1 ring-[#E2E8F0]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {page.readTime}
                </span>
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] text-[#1E1B4B] sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 text-sm font-medium text-[#64748B]">
                {ui.published} {page.date}
              </p>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#64748B]">
                {page.intro}
              </p>
            </div>

            <div className="rounded-lg border border-[#C7D2FE] bg-white/78 p-5 shadow-[0_20px_60px_rgb(99_102_241/12%)] backdrop-blur">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {ui.personalizedSupport}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                {ui.ctaBody}
              </p>
              <a
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-5 text-sm font-semibold text-white transition hover:bg-[#312E81] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
                href={appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {ui.download}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 lg:px-10">
          <div
            className={`article-hero-card relative overflow-hidden rounded-lg bg-gradient-to-br ${page.coverClass} p-6 text-white shadow-[0_24px_80px_rgb(49_46_129/20%)] sm:p-8`}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-white/70">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                  {ui.practicalGuide}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {page.sampleRows.slice(0, 3).map((row) => (
                    <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15" key={row.label}>
                      <p className="text-xs font-semibold uppercase text-[#C7D2FE]">
                        {row.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src="/app-icon.png"
                alt="Yorix app icon"
                className="mx-auto h-36 w-36 rounded-[34px] shadow-2xl md:h-44 md:w-44"
                width="1024"
                height="1024"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#E2E8F0] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-10">
            <div className="grid gap-7">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1E1B4B]">
                  {ui.inThisArticle}
                </h2>
                <ol className="mt-4 grid gap-2">
                  {articleAnchors.map((anchor) => (
                    <li key={anchor.id}>
                      <a
                        className="text-sm font-medium leading-6 text-[#6366F1] transition hover:text-[#4F46E5]"
                        href={`#${anchor.id}`}
                      >
                        {anchor.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-5 text-sm leading-7 text-[#1E1B4B] shadow-sm">
                {ui.disclaimer}
              </p>

              {page.sections.map((section, index) => (
                <section key={section.heading} id={articleAnchors[index].id}>
                  <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p
                      className="mt-3 text-base leading-8 text-[#64748B]"
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                  {ui.quickReference}
                </h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-[#E2E8F0]">
                  {page.sampleRows.map((row) => (
                    <div
                      className="grid gap-2 border-b border-[#E2E8F0] bg-white p-4 last:border-b-0 sm:grid-cols-[150px_160px_1fr]"
                      key={row.label}
                    >
                      <strong className="text-sm text-[#1E1B4B]">
                        {row.label}
                      </strong>
                      <span className="text-sm font-semibold text-[#6366F1]">
                        {row.value}
                      </span>
                      <span className="text-sm leading-6 text-[#64748B]">
                        {row.note}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {page.appTieIn ? (
                <section className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-6">
                  <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                    {page.appTieIn.heading}
                  </h2>
                  {page.appTieIn.body.map((paragraph) => (
                    <p
                      className="mt-3 text-base leading-8 text-[#64748B]"
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ) : null}

              {page.sources?.length ? (
                <section>
                  <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                    {ui.sources}
                  </h2>
                  <ul className="mt-4 grid gap-2">
                    {page.sources.map((source) => (
                      <li key={source.href}>
                        <a
                          className="text-sm font-medium leading-6 text-[#6366F1] underline-offset-4 transition hover:text-[#4F46E5] hover:underline"
                          href={source.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                  {ui.commonQuestions}
                </h2>
                <div className="mt-4 grid gap-3">
                  {page.faqs.map((faq) => (
                    <article
                      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5"
                      key={faq.question}
                    >
                      <h3 className="font-semibold text-[#1E1B4B]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        {faq.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold">{ui.checklist}</h2>
              <ul className="mt-4 grid gap-3">
                {page.checklist.map((item) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-[#1E1B4B]"
                    key={item}
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="night-gradient rounded-lg p-7 text-white shadow-[0_22px_70px_rgb(49_46_129/22%)] sm:p-9">
            <p className="mb-2 text-sm font-semibold uppercase text-[#C7D2FE]">
              {ui.personalizedSupport}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold">
              {ui.ctaTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#E0E7FF]">
              {ui.ctaBody}
            </p>
            <a
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {ui.download}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-14 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold text-[#1E1B4B]">
            {ui.relatedGuides}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {relatedPages.map((related) => (
              <a
                className="rounded-lg border border-[#E2E8F0] bg-white p-5 transition hover:border-[#C7D2FE] hover:shadow-sm"
                href={locale ? `/${locale}/${related.slug}` : `/${related.slug}`}
                key={related.slug}
              >
                <h3 className="font-semibold text-[#1E1B4B]">
                  {related.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {related.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-[#E2E8F0] px-5 py-8 text-center text-sm text-[#64748B] sm:px-8">
        <p>
          {ui.footer}
        </p>
      </footer>
    </main>
  );
}
