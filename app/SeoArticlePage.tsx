import { ArrowLeft, ArrowRight, BookOpen, Clock, ExternalLink, Plus, Quote } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import { getArticleUiCopy, getLocalizedTopicPages, type ArticleUiCopy } from './article-localizations';
import { articleExtras, formatArticleDate, itemIcon, splitLead, timelineIcon } from './article-ui';
import { ArticleToc, type TocItem } from './article/ArticleToc';
import { Checklist } from './article/Checklist';
import { appDownloadUrl, type TopicPage, topicPages } from './content';
import { AppleGlyph, Art, DoodleHeart, guideIcon, Hand, PhoneFrame, Sparkle } from './home/art';
import { CtaBand } from './home/CtaBand';
import { type Locale } from './locales';
import { SellerFooter } from './SellerFooter';
import { SiteHeader } from './SiteHeader';
import { Reveal } from './subscription/Reveal';
import { ScrollProgress } from './subscription/ScrollProgress';
import { StarField } from './subscription/StarField';

type SeoArticlePageProps = {
  page: TopicPage;
  locale?: Locale;
  ui?: ArticleUiCopy;
};

const takeawayIcons = ['icon-moon-crescent', 'icon-sun', 'icon-heart', 'icon-chart'];
const takeawayColumns: Record<number, string> = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 xl:grid-cols-4' };
const card = 'rounded-3xl border border-[#E7E5FB] bg-white shadow-[0_10px_40px_rgb(30_27_75/6%)]';
const h2 = 'text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-[#1E1B4B] sm:text-[1.65rem]';
const para = 'mt-4 text-[17px] leading-8 text-[#3F4462]';

function anchorId(text: string, fallback: string) {
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return id || fallback;
}

// One template for every article in every language: a night-sky hero with the
// sleeping baby, then a light reading sheet — key takeaways, a sticky table of
// contents with reading progress, numbered sections broken up by a pull quote,
// callouts and art, a day timeline, «if → then» cards, a stepper, FAQ — and a
// checklist the parent can tick. Blocks without real content are left out.
export function SeoArticlePage({ page, locale, ui = getArticleUiCopy(locale) }: SeoArticlePageProps) {
  const extra = articleExtras(locale);
  const shotLang = locale === 'ru' ? 'ru' : 'en';
  const guidePath = locale ? `/${locale}/guides` : '/guides';
  const homePath = locale ? `/${locale}` : '/';
  const relatedSource = locale ? getLocalizedTopicPages(locale) : topicPages;
  const relatedPages = relatedSource.filter((item) => item.slug !== page.slug).slice(0, 3);
  const sections = page.sections.map((section, index) => ({ ...section, id: anchorId(section.heading, `section-${index + 1}`) }));
  const takeaways = (page.quickAnswer ?? [page.description, ...page.checklist.slice(0, 3)]).slice(0, 4).map(splitLead);
  // Generic fallback articles number their reference rows; those rows carry
  // no time-of-day meaning, so they never become an example day.
  const namedRows = page.sampleRows.every((row) => !/^\d+$/.test(row.label));
  const scenarioRows =
    page.scenarioRows ??
    (extra.hasDefaults && namedRows
      ? page.sampleRows.slice(0, 5).map((row, index) => ({
          time: extra.scenarioTimes[index] ?? '',
          event: row.label,
          watch: row.note,
          yorix: extra.scenarioYorix(row.value),
        }))
      : []);
  const diagnosticRows = page.diagnosticRows ?? (extra.hasDefaults ? extra.diagnosticRows : []);
  const tip = diagnosticRows[0];
  const challenges = diagnosticRows.slice(1);
  const actionPlan = (page.actionPlan ?? page.checklist).slice(0, 6);
  const safetyNote = page.safetyNote ?? ui.disclaimer;
  const quoteSource = page.sections[0]?.body[1] ?? page.sections[0]?.body[0] ?? '';
  const quote = /^([\s\S]+?[.!?])(\s|$)/.exec(quoteSource)?.[1] ?? quoteSource;
  const toc: TocItem[] = [
    { id: 'takeaways', label: extra.keyTakeaways },
    ...sections.map((section) => ({ id: section.id, label: section.heading })),
    { id: 'reference', label: ui.quickReference },
    ...(scenarioRows.length ? [{ id: 'example-day', label: extra.exampleDay }] : []),
    ...(challenges.length ? [{ id: 'challenges', label: extra.commonChallenges }] : []),
    { id: 'plan', label: extra.planToday },
    { id: 'faq', label: ui.commonQuestions },
    ...(page.sources?.length ? [{ id: 'sources', label: ui.sources }] : []),
  ];

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white">
      <ScrollProgress />
      <StarField />
      <SiteHeader locale={locale ?? 'en'} />

      <article className="relative">
        <header className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-28 pt-2 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-36">
          <div className="relative z-10">
            <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C7D2FE] transition hover:text-white" href={guidePath}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {ui.backToGuides}
            </a>
            <div className="mb-5 flex flex-wrap gap-2 text-sm font-medium">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] py-1 pl-1.5 pr-3.5 text-white">
                <Art className="h-6 w-6 object-contain" height={192} name={guideIcon(page.slug)} width={192} />
                {page.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1 text-white/75">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {page.readTime}
              </span>
            </div>
            <h1 className="max-w-2xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.2rem] lg:text-[3.6rem]">{page.title}</h1>
            <p className="mt-5 max-w-xl text-xl leading-8 text-[#E0E7FF] sm:text-[1.4rem] sm:leading-9">{ui.practicalGuide}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{page.intro}</p>
            <p className="mt-4 text-sm text-white/45">
              {ui.published} {formatArticleDate(page.date, locale)}
            </p>
          </div>
          <div className="relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[420px] lg:h-[470px]">
            <div aria-hidden="true" className="absolute inset-x-[10%] top-[18%] h-[60%] rounded-full bg-[#818CF8]/25 blur-3xl" />
            <Reveal animation="zoomIn" className="absolute inset-x-[4%] top-[4%]" delay={120} load>
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_30px_60px_rgb(15_16_34/45%)]" height={806} name="article-hero-cloud" priority width={820} />
              </div>
            </Reveal>
            {extra.notes ? (
              <Reveal animation="fadeIn" className="absolute right-[-2%] top-[16%] z-10 hidden w-[28%] sm:block" delay={600} load>
                <Hand className="rotate-[8deg] text-[1.6rem] text-[#E0E7FF] lg:text-[1.8rem]">{extra.notes.hero}</Hand>
              </Reveal>
            ) : null}
            <Sparkle className="left-[4%] top-[8%] w-4" delay={0} />
            <Sparkle className="bottom-[22%] right-[6%] w-3" delay={900} tone="lavender" />
          </div>
        </header>

        <div className="relative rounded-t-[2.5rem] bg-[#F7F6FF] text-[#1E1B4B]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="relative -mt-20 grid gap-5 lg:-mt-28 lg:grid-cols-[minmax(0,1fr)_300px]">
              <Reveal>
                <section className={`${card} scroll-mt-24 p-5 sm:p-6`} id="takeaways">
                  <p className="flex items-center gap-2 text-base font-semibold">
                    <span className="rounded-md bg-[#EEF2FF] px-1.5 py-0.5 text-xs font-bold text-[#4F46E5]">TL;DR</span>
                    {extra.keyTakeaways}
                  </p>
                  <div className={`mt-4 grid gap-3 ${takeawayColumns[takeaways.length] ?? 'sm:grid-cols-2'}`}>
                    {takeaways.map((item, index) => (
                      <div className="rounded-2xl bg-[#F8F7FF] p-4 ring-1 ring-[#EEF0FF]" key={`${index}-${item.body}`}>
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-[#EEF0FF]">
                          <Art className="h-7 w-7 object-contain" height={192} name={takeawayIcons[index % takeawayIcons.length]} width={192} />
                        </span>
                        {item.title ? <p className="mt-3 text-[15px] font-semibold leading-5">{item.title}</p> : null}
                        <p className={`${item.title ? 'mt-1.5' : 'mt-3'} text-sm leading-6 text-[#475569]`}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
              <Reveal className="hidden lg:flex" delay={120}>
                <aside className={`${card} flex w-full flex-col p-5`}>
                  <p className="flex items-center gap-2 font-semibold">
                    <Art className="h-7 w-7 object-contain" height={192} name="icon-sun" width={189} />
                    {extra.tryInApp}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">{ui.ctaBody}</p>
                  <div className="relative mt-4 h-40 overflow-hidden">
                    <PhoneFrame alt="" className="mx-auto w-36" src={`/shots/${shotLang}-today.webp`} />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <a
                    className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1E1B4B] px-5 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                    href={appDownloadUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <AppleGlyph className="h-4 w-4" />
                    {ui.download}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </aside>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[210px_minmax(0,1fr)_300px]">
              <aside className="hidden xl:block">
                <div className="sticky top-6">
                  <ArticleToc bodyId="article-body" items={toc} progressLabel={extra.readingProgress} title={ui.inThisArticle} />
                </div>
              </aside>

              <div className="min-w-0 space-y-10" id="article-body">
                <details className={`${card} group xl:hidden`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-[#6366F1]" aria-hidden="true" />
                      {ui.inThisArticle}
                    </span>
                    <Plus className="h-5 w-5 text-[#6366F1] transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <ol className="grid gap-1 px-5 pb-5">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a className="block py-1 text-sm text-[#4F46E5] hover:underline" href={`#${item.id}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                <Callout icon="icon-shield" title={extra.important} tone="important">
                  {safetyNote}
                </Callout>

                {sections.map((section, index) => (
                  <Fragment key={section.id}>
                    <section className="scroll-mt-24" id={section.id}>
                      <h2 className={`flex items-start gap-3 ${h2}`}>
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-base font-semibold text-[#4F46E5] ring-1 ring-[#C7D2FE]">
                          {index + 1}
                        </span>
                        <span>{section.heading}</span>
                      </h2>
                      {section.body.map((paragraph) => (
                        <p className={para} key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    </section>
                    {index === 0 && quote ? <PullQuote text={quote} /> : null}
                    {index === 1 && tip ? (
                      <Callout icon="icon-bulb" title={extra.tip} tone="tip">
                        {tip.observation} {tip.action}
                      </Callout>
                    ) : null}
                    {index === 2 && extra.notes ? <InlineArt note={extra.notes.inline} /> : null}
                  </Fragment>
                ))}

                <section className="scroll-mt-24" id="reference">
                  <h2 className={h2}>{ui.quickReference}</h2>
                  <ol className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-[#E7E5FB] bg-[#EEF0FF] shadow-[0_10px_40px_rgb(30_27_75/6%)] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                    {page.sampleRows.map((row) => (
                      <li className="flex flex-col items-center bg-white p-5 text-center" key={`${row.label}-${row.value}`}>
                        <Art className="h-12 w-12 object-contain" height={192} name={namedRows ? itemIcon(row.label, row.value) : 'icon-sparkle'} width={192} />
                        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6366F1]">{row.label}</p>
                        <p className="mt-1 text-lg font-semibold leading-6">{row.value}</p>
                        <p className="mt-1.5 text-xs leading-5 text-[#64748B]">{row.note}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                {scenarioRows.length ? (
                  <section className="scroll-mt-24" id="example-day">
                    <h2 className={h2}>{extra.exampleDay}</h2>
                    <ol className={`${card} mt-5 px-2`}>
                      {scenarioRows.map((row) => (
                        <li className="grid grid-cols-[44px_1fr] gap-x-4 gap-y-1 border-b border-[#F0EFFB] px-3 py-4 last:border-b-0 sm:grid-cols-[48px_104px_1fr]" key={`${row.time}-${row.event}`}>
                          <span className="row-span-2 grid h-11 w-11 place-items-center rounded-2xl bg-[#F5F3FF] sm:row-span-1">
                            <Art className="h-7 w-7 object-contain" height={192} name={timelineIcon(row.time, row.event)} width={192} />
                          </span>
                          <p className="text-sm font-semibold text-[#4F46E5] sm:pt-2.5">{row.time}</p>
                          <div className="col-start-2 sm:col-start-3 sm:row-start-1">
                            <p className="font-semibold leading-6">{row.event}</p>
                            <p className="mt-0.5 text-sm leading-6 text-[#475569]">{row.watch}</p>
                            <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#6D28D9]">
                              <Art className="mt-1 h-4 w-4 shrink-0 object-contain" height={192} name="icon-sparkle" width={192} />
                              {row.yorix}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                {challenges.length ? (
                  <section className="scroll-mt-24" id="challenges">
                    <h2 className={h2}>{extra.commonChallenges}</h2>
                    <div className="mt-5 grid gap-4">
                      {challenges.map((row) => (
                        <article className={`${card} p-5 sm:p-6`} key={row.observation}>
                          <h3 className="flex items-start gap-3 text-[17px] font-semibold leading-6">
                            <Art className="h-7 w-7 shrink-0 object-contain" height={192} name="icon-question" width={191} />
                            {row.observation}
                          </h3>
                          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-[#F5F3FF] p-4">
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#6366F1]">{extra.likelyReason}</dt>
                              <dd className="mt-1.5 text-sm leading-6 text-[#334155]">{row.explanation}</dd>
                            </div>
                            <div className="rounded-2xl bg-[#ECFDF5] p-4">
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#047857]">{extra.tryFirst}</dt>
                              <dd className="mt-1.5 text-sm leading-6 text-[#334155]">{row.action}</dd>
                            </div>
                            <div className="rounded-2xl bg-[#FFFBEB] p-4">
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#B45309]">{extra.howToCheck}</dt>
                              <dd className="mt-1.5 text-sm leading-6 text-[#334155]">{row.check}</dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section className="scroll-mt-24" id="plan">
                  <h2 className={h2}>{extra.planToday}</h2>
                  <ol className="relative mt-5 grid gap-5 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-0.5 before:bg-[#E0E7FF]">
                    {actionPlan.map((item, index) => (
                      <li className="relative grid grid-cols-[40px_1fr] items-start gap-4" key={item}>
                        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-semibold text-white shadow-[0_6px_16px_rgb(99_102_241/35%)]">
                          {index + 1}
                        </span>
                        <p className="pt-2 text-base leading-7 text-[#334155]">{item}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                {page.appTieIn ? (
                  <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#EEF2FF,#E0E7FF)] p-6 ring-1 ring-[#E0E7FF] sm:p-8 sm:pr-64">
                    <h2 className={h2}>{page.appTieIn.heading}</h2>
                    {page.appTieIn.body.map((paragraph) => (
                      <p className={para} key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-10 hidden w-44 rotate-[6deg] sm:block">
                      <PhoneFrame alt="" src={`/shots/${shotLang}-progress.webp`} />
                    </div>
                  </section>
                ) : null}

                <section className="scroll-mt-24" id="faq">
                  <h2 className={h2}>{ui.commonQuestions}</h2>
                  <div className="mt-5 grid gap-3">
                    {page.faqs.map((faq) => (
                      <details className="group rounded-2xl border border-[#E7E5FB] bg-white transition open:shadow-[0_10px_30px_rgb(30_27_75/8%)]" key={faq.question}>
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold leading-6 focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                          {faq.question}
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#4F46E5] transition duration-300 group-open:rotate-45">
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </summary>
                        <p className="px-5 pb-5 text-[15px] leading-7 text-[#475569]">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>

                {page.sources?.length ? (
                  <section className="scroll-mt-24" id="sources">
                    <h2 className={h2}>{ui.sources}</h2>
                    <ul className="mt-4 grid gap-2">
                      {page.sources.map((source) => (
                        <li key={source.href}>
                          <a className="inline-flex items-start gap-2 text-sm font-medium leading-6 text-[#4F46E5] underline-offset-4 hover:underline" href={source.href} rel="noopener noreferrer" target="_blank">
                            <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {safetyNote !== ui.disclaimer ? <p className="text-sm leading-6 text-[#64748B]">{ui.disclaimer}</p> : null}
              </div>

              <aside className="min-w-0">
                <div className="grid gap-5 lg:sticky lg:top-6">
                  <Checklist items={page.checklist} storageKey={`yorix-checklist:${locale ?? 'en'}:${page.slug}`} title={ui.checklist} />
                  {extra.notes ? (
                    <a
                      className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#EEF2FF,#DDD6FE)] p-4 pr-12 ring-1 ring-[#E0E7FF] transition hover:-translate-y-0.5"
                      href={appDownloadUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="bob block w-24 shrink-0">
                        <Art className="h-auto w-full" height={420} name="star-mascot" width={410} />
                      </span>
                      <span className="font-hand text-[1.55rem] leading-[1] text-[#4338CA]">
                        {extra.notes.promo} <DoodleHeart className="h-5 w-5 text-[#A78BFA]" />
                      </span>
                      <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white text-[#4F46E5] shadow-sm">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">{ui.download}</span>
                      </span>
                    </a>
                  ) : null}
                </div>
              </aside>
            </div>

            {relatedPages.length ? (
              <section className="mt-16">
                <h2 className={h2}>{ui.relatedGuides}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {relatedPages.map((related) => (
                    <a className={`${card} group flex flex-col p-5 transition hover:-translate-y-1`} href={locale ? `/${locale}/${related.slug}` : `/${related.slug}`} key={related.slug}>
                      <Art className="h-12 w-12 object-contain transition duration-300 group-hover:scale-110" height={192} name={guideIcon(related.slug)} width={192} />
                      <h3 className="mt-4 font-semibold leading-6">{related.shortTitle}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569]">{related.description}</p>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <CtaBand action={ui.download} body={ui.ctaBody} title={ui.ctaTitle} />
        </div>
      </article>

      <SellerFooter home={homePath} lang={locale === 'ru' ? 'ru' : 'en'} note={ui.footer} />
    </main>
  );
}

function Callout({ tone, icon, title, children }: { tone: 'important' | 'tip'; icon: string; title: string; children: ReactNode }) {
  const style =
    tone === 'tip'
      ? { box: 'border-[#FDE68A] bg-[#FFFBEB]', title: 'text-[#B45309]', text: 'text-[#78350F]' }
      : { box: 'border-[#E9D5FF] bg-[#FAF5FF]', title: 'text-[#7C3AED]', text: 'text-[#3B2A6B]' };
  return (
    <aside className={`flex gap-4 rounded-3xl border p-5 sm:p-6 ${style.box}`}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-sm">
        <Art className="h-8 w-8 object-contain" height={192} name={icon} width={192} />
      </span>
      <div>
        <p className={`font-semibold ${style.title}`}>{title}</p>
        <p className={`mt-1 text-[15px] leading-7 ${style.text}`}>{children}</p>
      </div>
    </aside>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#F5F3FF_0%,#EEF2FF_100%)] p-6 pr-32 ring-1 ring-[#E4E1FF] sm:p-8 sm:pr-56">
      <Quote className="h-8 w-8 fill-[#818CF8] text-[#818CF8]" aria-hidden="true" />
      <blockquote className="mt-3 text-lg font-medium leading-8 text-[#1E1B4B] sm:text-xl">{text}</blockquote>
      <Art className="pointer-events-none absolute -bottom-4 right-2 w-32 sm:w-48" height={503} name="baby-tummy" width={520} />
    </figure>
  );
}

function InlineArt({ note }: { note: string }) {
  return (
    <figure aria-hidden="true" className="flex items-center justify-end gap-4">
      <Hand className="max-w-[12rem] -rotate-6 text-right text-[1.6rem] text-[#6366F1]">
        {note} <DoodleHeart className="h-5 w-5" />
      </Hand>
      <div className="float-slow w-48 shrink-0 sm:w-56">
        <Art className="h-auto w-full" height={900} name="hero-baby-moon" width={817} />
      </div>
    </figure>
  );
}
