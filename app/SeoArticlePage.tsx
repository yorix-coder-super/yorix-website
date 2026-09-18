import { ArrowLeft, ArrowRight, BookOpen, Clock, ExternalLink, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { getArticleUiCopy, getLocalizedTopicPages, type ArticleUiCopy } from './article-localizations';
import { articleExtras, articleHero, formatArticleDate, itemIcon, sectionScenes, splitLead, timelineIcon } from './article-ui';
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
const takeawayColumns: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 xl:grid-cols-4' };
const glass = 'rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl';
const h2 = 'text-[1.5rem] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[1.75rem]';
const para = 'mt-4 text-[17px] leading-8 text-white/75';

function anchorId(text: string, fallback: string) {
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return id || fallback;
}

// One template for every article in every language, on the night sky: a hero
// with the topic's illustration, the short answer, numbered sections each
// with its own 3D scene and a hand-written line, tip and important callouts,
// then the reference strip, the example-day timeline, «if → then» cards, the
// plan, a tickable checklist, FAQ and sources. The side rail follows the
// reader (progress + the guide as a stepper) and ends with the app card.
// Blocks without real content are left out.
export function SeoArticlePage({ page, locale, ui = getArticleUiCopy(locale) }: SeoArticlePageProps) {
  const extra = articleExtras(locale);
  const own = !locale || locale === 'ru';
  const shotLang = locale === 'ru' ? 'ru' : 'en';
  const guidePath = locale ? `/${locale}/guides` : '/guides';
  const homePath = locale ? `/${locale}` : '/';
  const relatedSource = locale ? getLocalizedTopicPages(locale) : topicPages;
  const relatedPages = relatedSource.filter((item) => item.slug !== page.slug).slice(0, 3);
  const sections = page.sections.map((section, index) => ({ ...section, id: anchorId(section.heading, `section-${index + 1}`) }));
  const scenes = sectionScenes(page.sections.map((section) => section.heading), locale);
  const hero = articleHero(page.slug);
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
  const promo = own ? { title: extra.promoTitle, body: extra.promoBody, tagline: extra.promoTagline } : { title: ui.personalizedSupport, body: ui.ctaBody, tagline: null };
  const guideTitle = own ? extra.inThisGuide : ui.inThisArticle;
  const toc: TocItem[] = [
    ...sections.map((section, index) => ({ id: section.id, label: section.heading, number: index + 1 })),
    { id: 'reference', label: ui.quickReference },
    ...(scenarioRows.length ? [{ id: 'example-day', label: extra.exampleDay }] : []),
    ...(challenges.length ? [{ id: 'challenges', label: extra.commonChallenges }] : []),
    { id: 'plan', label: extra.planToday },
    { id: 'faq', label: ui.commonQuestions },
    ...(page.sources?.length ? [{ id: 'sources', label: ui.sources }] : []),
  ];
  const important = (
    <Callout icon="icon-shield" title={extra.important} tone="important">
      {safetyNote}
    </Callout>
  );

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white">
      <ScrollProgress />
      <StarField />
      <SiteHeader locale={locale ?? 'en'} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-6 pt-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10">
        <article className="min-w-0">
          <header className="grid items-center gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C7D2FE] transition hover:text-white" href={guidePath}>
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {ui.backToGuides}
              </a>
              <div className="mb-5 flex flex-wrap gap-2 text-sm font-medium">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] py-1 pl-1.5 pr-3.5 text-white">
                  <Art className="h-6 w-6 object-contain" height={192} name={guideIcon(page.slug)} width={192} />
                  {page.category}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1 text-white/75">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {page.readTime}
                </span>
              </div>
              <h1 className="bg-gradient-to-b from-white to-[#C7D2FE] bg-clip-text text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-transparent sm:text-[3.1rem] lg:text-[3.4rem]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-8 text-[#E0E7FF] sm:text-[1.3rem]">{ui.practicalGuide}</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{page.intro}</p>
              <p className="mt-4 text-sm text-white/45">
                {ui.published} {formatArticleDate(page.date, locale)}
              </p>
            </div>
            <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[400px]">
              <div aria-hidden="true" className="absolute inset-x-[10%] top-[16%] h-[62%] rounded-full bg-[#FDE68A]/15 blur-3xl" />
              <Reveal animation="zoomIn" className="absolute inset-x-[2%] top-[2%]" delay={120} load>
                <div className="float-slow">
                  <Art className="h-auto w-full drop-shadow-[0_30px_60px_rgb(15_16_34/45%)]" height={hero.height} name={hero.name} priority width={hero.width} />
                </div>
              </Reveal>
              {extra.notes ? (
                <Reveal animation="fadeIn" className="absolute right-[-4%] top-[2%] z-10 hidden w-[32%] sm:block" delay={600} load>
                  <Hand className="rotate-[-10deg] text-right text-[1.6rem] text-[#C7D2FE] lg:text-[1.75rem]">
                    {extra.notes.hero} <DoodleHeart className="h-5 w-5 text-[#FDE68A]" />
                  </Hand>
                </Reveal>
              ) : null}
              <Sparkle className="left-[2%] top-[14%] w-4" delay={0} />
              <Sparkle className="bottom-[16%] right-[4%] w-3" delay={900} tone="lavender" />
            </div>
          </header>

          <Reveal>
            <section className={`${glass} mt-8 p-5 sm:p-7`} id="short-answer">
              <div className="flex items-start justify-between gap-4">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Art className="h-8 w-8 object-contain" height={192} name="icon-bolt" width={152} />
                  {extra.shortAnswer}
                </h2>
                {extra.notes ? <Hand className="hidden max-w-[15rem] rotate-[-4deg] text-right text-[1.4rem] text-[#C7D2FE] sm:block">{extra.notes.shortAnswer}</Hand> : null}
              </div>
              <div className={`mt-5 grid gap-3 ${takeawayColumns[takeaways.length] ?? ''}`}>
                {takeaways.map((item, index) => (
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={`${index}-${item.body}`}>
                    <Art className="h-12 w-12 shrink-0 object-contain" height={192} name={takeawayIcons[index % takeawayIcons.length]} width={192} />
                    <div>
                      {item.title ? <p className="text-[15px] font-semibold leading-5 text-white">{item.title}</p> : null}
                      <p className={`${item.title ? 'mt-1.5' : ''} text-sm leading-6 text-white/70`}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <details className={`${glass} group mt-6 lg:hidden`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#A5B4FC]" aria-hidden="true" />
                {guideTitle}
              </span>
              <Plus className="h-5 w-5 text-[#A5B4FC] transition group-open:rotate-45" aria-hidden="true" />
            </summary>
            <ol className="grid gap-1 px-5 pb-5">
              {toc.map((item) => (
                <li key={item.id}>
                  <a className="flex gap-3 py-1 text-sm text-white/75 hover:text-white" href={`#${item.id}`}>
                    <span className="w-5 text-right text-[#A5B4FC]">{item.number ?? '·'}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <div className="mt-14 space-y-16" id="article-body">
            {sections.map((section, index) => {
              const scene = scenes[index];
              return (
                <section className="grid scroll-mt-24 gap-6 md:grid-cols-[minmax(0,1fr)_210px] md:items-start" id={section.id} key={section.id}>
                  <div className="min-w-0">
                    <h2 className={`flex items-start gap-4 ${h2}`}>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#818CF8,#4F46E5)] text-lg font-semibold shadow-[0_0_30px_rgb(99_102_241/45%)]">
                        {index + 1}
                      </span>
                      <span className="pt-1.5">{section.heading}</span>
                    </h2>
                    <div className="md:pl-16">
                      {section.body.map((paragraph) => (
                        <p className={para} key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                      {index === 0 && tip ? (
                        <div className="mt-6">
                          <Callout icon="icon-bulb" title={extra.tip} tone="tip">
                            {tip.observation} {tip.action}
                          </Callout>
                        </div>
                      ) : null}
                      {index === 1 ? <div className="mt-6">{important}</div> : null}
                    </div>
                  </div>
                  {scene ? (
                    <figure aria-hidden="true" className="relative mx-auto w-40 md:mt-2 md:w-full">
                      {scene.note ? (
                        <Hand className="mb-1 rotate-[-8deg] text-right text-[1.35rem] text-[#C7D2FE]">
                          {scene.note} <DoodleHeart className="h-4 w-4 text-[#FDE68A]" />
                        </Hand>
                      ) : null}
                      <div className="float-slow">
                        <Art className="h-auto w-full" height={scene.height} name={scene.name} width={scene.width} />
                      </div>
                      <Sparkle className="-left-2 top-1/2 w-3" delay={index * 500} />
                    </figure>
                  ) : null}
                </section>
              );
            })}

            {sections.length < 2 ? important : null}

            <section className="scroll-mt-24" id="reference">
              <h2 className={h2}>{ui.quickReference}</h2>
              <ol className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                {page.sampleRows.map((row) => (
                  <li className="flex flex-col items-center bg-[#1B1947] p-5 text-center" key={`${row.label}-${row.value}`}>
                    <Art className="h-12 w-12 object-contain" height={192} name={namedRows ? itemIcon(row.label, row.value) : 'icon-sparkle'} width={192} />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#A5B4FC]">{row.label}</p>
                    <p className="mt-1 text-lg font-semibold leading-6 text-white">{row.value}</p>
                    <p className="mt-1.5 text-xs leading-5 text-white/55">{row.note}</p>
                  </li>
                ))}
              </ol>
            </section>

            {scenarioRows.length ? (
              <section className="scroll-mt-24" id="example-day">
                <h2 className={h2}>{extra.exampleDay}</h2>
                <ol className={`${glass} mt-5 px-2`}>
                  {scenarioRows.map((row) => (
                    <li className="grid grid-cols-[44px_1fr] gap-x-4 gap-y-1 border-b border-white/10 px-3 py-4 last:border-b-0 sm:grid-cols-[48px_104px_1fr]" key={`${row.time}-${row.event}`}>
                      <span className="row-span-2 grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.07] sm:row-span-1">
                        <Art className="h-7 w-7 object-contain" height={192} name={timelineIcon(row.time, row.event)} width={192} />
                      </span>
                      <p className="text-sm font-semibold text-[#A5B4FC] sm:pt-2.5">{row.time}</p>
                      <div className="col-start-2 sm:col-start-3 sm:row-start-1">
                        <p className="font-semibold leading-6 text-white">{row.event}</p>
                        <p className="mt-0.5 text-sm leading-6 text-white/70">{row.watch}</p>
                        <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#C4B5FD]">
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
                    <article className={`${glass} p-5 sm:p-6`} key={row.observation}>
                      <h3 className="flex items-start gap-3 text-[17px] font-semibold leading-6 text-white">
                        <Art className="h-7 w-7 shrink-0 object-contain" height={192} name="icon-question" width={191} />
                        {row.observation}
                      </h3>
                      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#6366F1]/15 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-[#A5B4FC]">{extra.likelyReason}</dt>
                          <dd className="mt-1.5 text-sm leading-6 text-white/80">{row.explanation}</dd>
                        </div>
                        <div className="rounded-2xl bg-[#34D399]/12 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-[#6EE7B7]">{extra.tryFirst}</dt>
                          <dd className="mt-1.5 text-sm leading-6 text-white/80">{row.action}</dd>
                        </div>
                        <div className="rounded-2xl bg-[#FBBF24]/12 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-[#FCD34D]">{extra.howToCheck}</dt>
                          <dd className="mt-1.5 text-sm leading-6 text-white/80">{row.check}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="scroll-mt-24" id="plan">
              <h2 className={h2}>{extra.planToday}</h2>
              <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
                <ol className="relative grid gap-5 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-0.5 before:bg-white/15">
                  {actionPlan.map((item, index) => (
                    <li className="relative grid grid-cols-[40px_1fr] items-start gap-4" key={item}>
                      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-semibold text-white shadow-[0_0_20px_rgb(99_102_241/45%)]">
                        {index + 1}
                      </span>
                      <p className="pt-2 text-base leading-7 text-white/80">{item}</p>
                    </li>
                  ))}
                </ol>
                <Checklist items={page.checklist} storageKey={`yorix-checklist:${locale ?? 'en'}:${page.slug}`} title={own ? extra.checklist : ui.checklist} />
              </div>
            </section>

            {page.appTieIn ? (
              <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgb(99_102_241/0.28),rgb(167_139_250/0.10))] p-6 sm:p-8 sm:pr-64">
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
                  <details className="group rounded-2xl border border-white/12 bg-white/[0.05] transition open:bg-white/[0.08] hover:border-white/25" key={faq.question}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold leading-6 text-white focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white transition duration-300 group-open:rotate-45">
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-[15px] leading-7 text-white/70">{faq.answer}</p>
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
                      <a className="inline-flex items-start gap-2 text-sm font-medium leading-6 text-[#A5B4FC] underline-offset-4 hover:text-white hover:underline" href={source.href} rel="noopener noreferrer" target="_blank">
                        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {safetyNote !== ui.disclaimer ? <p className="text-sm leading-6 text-white/50">{ui.disclaimer}</p> : null}
          </div>

          <div className="mt-12 lg:hidden">
            <PromoCard action={ui.download} body={promo.body} shot={`/shots/${shotLang}-today.webp`} tagline={promo.tagline} title={promo.title} />
          </div>

          {relatedPages.length ? (
            <section className="mt-16">
              <h2 className={h2}>{ui.relatedGuides}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedPages.map((related) => (
                  <a className={`${glass} group flex flex-col p-5 transition hover:-translate-y-1 hover:border-white/25`} href={locale ? `/${locale}/${related.slug}` : `/${related.slug}`} key={related.slug}>
                    <Art className="h-12 w-12 object-contain transition duration-300 group-hover:scale-110" height={192} name={guideIcon(related.slug)} width={192} />
                    <h3 className="mt-4 font-semibold leading-6 text-white">{related.shortTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{related.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <ArticleToc bodyId="article-body" items={toc} progressLabel={extra.readingProgress} title={guideTitle}>
              <PromoCard action={ui.download} body={promo.body} shot={`/shots/${shotLang}-today.webp`} tagline={promo.tagline} title={promo.title} />
            </ArticleToc>
          </div>
        </aside>
      </div>

      <CtaBand action={ui.download} body={ui.ctaBody} title={ui.ctaTitle} />
      <SellerFooter home={homePath} lang={locale === 'ru' ? 'ru' : 'en'} note={ui.footer} />
    </main>
  );
}

function Callout({ tone, icon, title, children }: { tone: 'important' | 'tip'; icon: string; title: string; children: ReactNode }) {
  const style =
    tone === 'tip'
      ? { box: 'border-[#FBBF24]/35 bg-[linear-gradient(135deg,rgb(251_191_36/0.14),rgb(251_191_36/0.04))]', title: 'text-[#FCD34D]' }
      : { box: 'border-[#F472B6]/35 bg-[linear-gradient(135deg,rgb(244_114_182/0.16),rgb(244_114_182/0.04))]', title: 'text-[#F9A8D4]' };
  return (
    <aside className={`flex gap-4 rounded-2xl border p-5 ${style.box}`}>
      <Art className="h-10 w-10 shrink-0 object-contain" height={192} name={icon} width={192} />
      <div>
        <p className={`font-semibold ${style.title}`}>{title}</p>
        <p className="mt-1 text-[15px] leading-7 text-white/80">{children}</p>
      </div>
    </aside>
  );
}

function PromoCard({ title, body, tagline, action, shot }: { title: string; body: string; tagline: string | null; action: string; shot: string }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgb(99_102_241/0.38),rgb(30_27_75/0.35))] p-5 pb-4">
      <p className="flex items-start gap-2 pr-24 text-[15px] font-semibold leading-5 text-white">
        <Art className="h-6 w-6 shrink-0 object-contain" height={127} name="star" width={128} />
        {title}
      </p>
      <p className="mt-3 pr-20 text-sm leading-6 text-white/75">{body}</p>
      <div aria-hidden="true" className="pointer-events-none absolute -right-7 top-4 w-28 rotate-[12deg]">
        <PhoneFrame alt="" src={shot} />
      </div>
      <a
        className="relative mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] shadow-[0_18px_40px_rgb(0_0_0/25%)] transition hover:bg-[#EEF2FF]"
        href={appDownloadUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <AppleGlyph className="h-4 w-4" />
        {action}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      {tagline ? <p className="relative mt-3 text-center text-xs text-white/65">{tagline}</p> : null}
    </div>
  );
}
