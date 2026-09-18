import { ScrollProgress } from './subscription/ScrollProgress';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  ListChecks,
  Moon,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Table2,
} from 'lucide-react';
import { Art, guideIcon, Sparkle } from './home/art';
import { CtaBand } from './home/CtaBand';
import { SellerFooter } from './SellerFooter';
import { SiteHeader } from './SiteHeader';
import { StarField } from './subscription/StarField';
import { getArticleUiCopy, getLocalizedTopicPages, type ArticleUiCopy } from './article-localizations';
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
  const articleAnchors = page.sections.map((section, index) => {
    const id = section.heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      id: id || `section-${index + 1}`,
      label: section.heading,
    };
  });
  const quickAnswer = page.quickAnswer ?? [
    page.description,
    ...page.checklist.slice(0, 3),
  ];
  const scenarioRows = page.scenarioRows ?? page.sampleRows.slice(0, 5).map((row, index) => ({
    time: index === 0 ? 'Morning' : index === 1 ? 'First nap' : index === 2 ? 'Midday' : index === 3 ? 'Evening' : 'Bedtime',
    event: row.label,
    watch: row.note,
    yorix: `Uses ${row.value.toLowerCase()} as context for the next plan.`,
  }));
  const diagnosticRows = page.diagnosticRows ?? [
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
  ];
  const actionPlan = page.actionPlan ?? page.checklist;
  const safetyNote = page.safetyNote ?? ui.disclaimer;

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white">
      <ScrollProgress />
      <StarField />
      <SiteHeader locale={locale ?? 'en'} />

      <article className="relative">
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <a
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#C7D2FE] transition hover:text-white"
            href={guidePath}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {ui.backToGuides}
          </a>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2 text-sm font-semibold">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] px-4 py-2 text-white">
                  <Moon className="h-4 w-4" aria-hidden="true" />
                  {page.category}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-white/70">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {page.readTime}
                </span>
              </div>
              <h1 className="max-w-4xl text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.3rem]">
                {page.title}
              </h1>
              <p className="mt-5 text-sm font-medium text-white/50">
                {ui.published} {page.date}
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
                {page.intro}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_20px_60px_rgb(0_0_0/20%)] backdrop-blur-xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Art className="h-7 w-7 object-contain" height={192} name="icon-sparkle" width={192} />
                {ui.personalizedSupport}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {ui.ctaBody}
              </p>
              <a
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
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
            className={`article-hero-card relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${page.coverClass} p-6 text-white shadow-[0_24px_80px_rgb(0_0_0/28%)] ring-1 ring-white/15 sm:p-8`}
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
              <div aria-hidden="true" className="relative mx-auto h-36 w-36 md:h-44 md:w-44">
                <div className="float-slow">
                  <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/45%)]" height={192} name={guideIcon(page.slug)} priority width={192} />
                </div>
                <Sparkle className="-left-3 top-2 w-3" delay={400} tone="lavender" />
                <Sparkle className="-right-2 bottom-6 w-4" delay={1300} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 rounded-[2rem] bg-white px-5 py-10 text-[#1E1B4B] shadow-[0_30px_90px_rgb(0_0_0/28%)] sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-10">
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
                {safetyNote}
              </p>

              <section className="rounded-lg border border-[#C7D2FE] bg-[#F5F3FF] p-6 shadow-sm">
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#4F46E5]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Quick answer
                </p>
                <div className="mt-4 grid gap-3">
                  {quickAnswer.slice(0, 4).map((answer, index) => (
                    <p
                      className="rounded-lg bg-white p-4 text-sm leading-7 text-[#1E1B4B] ring-1 ring-[#E0E7FF]"
                      key={`${answer}-${index}`}
                    >
                      {answer}
                    </p>
                  ))}
                </div>
              </section>

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

              <section>
                <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-[#1E1B4B]">
                  <Table2 className="h-6 w-6 text-[#6366F1]" aria-hidden="true" />
                  Example day scenario
                </h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-sm">
                  <div className="hidden grid-cols-[120px_1fr_1fr_1fr] gap-4 border-b border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs font-semibold uppercase text-[#64748B] md:grid">
                    <span>Time</span>
                    <span>Event</span>
                    <span>What to watch</span>
                    <span>How Yorix adapts</span>
                  </div>
                  {scenarioRows.map((row) => (
                    <div
                      className="grid gap-3 border-b border-[#E2E8F0] p-4 last:border-b-0 md:grid-cols-[120px_1fr_1fr_1fr]"
                      key={`${row.time}-${row.event}`}
                    >
                      <strong className="text-sm text-[#4F46E5]">{row.time}</strong>
                      <span className="text-sm font-semibold text-[#1E1B4B]">{row.event}</span>
                      <span className="text-sm leading-6 text-[#64748B]">{row.watch}</span>
                      <span className="text-sm leading-6 text-[#64748B]">{row.yorix}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-[#1E1B4B]">
                  <SearchCheck className="h-6 w-6 text-[#6366F1]" aria-hidden="true" />
                  Diagnostic matrix
                </h2>
                <div className="mt-4 grid gap-3">
                  {diagnosticRows.map((row) => (
                    <article
                      className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-sm"
                      key={row.observation}
                    >
                      <h3 className="font-semibold text-[#1E1B4B]">{row.observation}</h3>
                      <div className="mt-3 grid gap-3 text-sm leading-6 text-[#64748B] md:grid-cols-3">
                        <p><strong className="block text-[#4F46E5]">Likely explanation</strong>{row.explanation}</p>
                        <p><strong className="block text-[#4F46E5]">First action</strong>{row.action}</p>
                        <p><strong className="block text-[#4F46E5]">Check result</strong>{row.check}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm">
                <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-[#1E1B4B]">
                  <ListChecks className="h-6 w-6 text-[#6366F1]" aria-hidden="true" />
                  Plan for today
                </h2>
                <ol className="mt-4 grid gap-3">
                  {actionPlan.slice(0, 6).map((item, index) => (
                    <li
                      className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-[#1E1B4B]"
                      key={item}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF2FF] text-sm font-semibold text-[#4F46E5]">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-lg border border-[#CBD5E1] bg-white p-6 shadow-sm">
                <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-[#1E1B4B]">
                  <ShieldCheck className="h-6 w-6 text-[#22C55E]" aria-hidden="true" />
                  Safety note
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">
                  {ui.disclaimer}
                </p>
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

        <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold text-white">
            {ui.relatedGuides}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {relatedPages.map((related) => (
              <a
                className="group rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25"
                href={locale ? `/${locale}/${related.slug}` : `/${related.slug}`}
                key={related.slug}
              >
                <Art className="h-12 w-12 object-contain transition duration-300 group-hover:scale-110" height={192} name={guideIcon(related.slug)} width={192} />
                <h3 className="mt-4 font-semibold text-white">
                  {related.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {related.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </article>

      <CtaBand action={ui.download} body={ui.ctaBody} title={ui.ctaTitle} />
      <SellerFooter home={homePath} lang={locale === 'ru' ? 'ru' : 'en'} note={ui.footer} />
    </main>
  );
}
