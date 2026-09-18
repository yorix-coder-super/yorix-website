import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  LineChart,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Volume2,
} from 'lucide-react';
import { getLocalizedTopicPage, isTranslatedArticleSlug } from './article-localizations';
import { BrandLogo } from './BrandLogo';
import { headers } from 'next/headers';
import { SiteHeader } from './SiteHeader';
import { subscriptionPath } from './subscription/i18n';
import { Magnetic } from './subscription/Magnetic';
import { WordReveal } from './subscription/WordReveal';
import { HomeSubscriptionSection } from './subscription/HomeSubscriptionSection';
import { subscriptionCopy } from './subscription/copy';
import { Parallax } from './subscription/Parallax';
import { Reveal } from './subscription/Reveal';
import { StarField } from './subscription/StarField';
import { SellerFooter } from './SellerFooter';
import { appDownloadUrl, topicPages } from './content';
import { localeCopy, locales, type Locale } from './locales';

const storyAssets = [
  { image: '/screen-plan.png', icon: Bell },
  { image: '/screen-growth.png', icon: LineChart },
  { image: '/screen-coach.png', icon: MessageCircle },
  { image: '/screen-bedtime.png', icon: Volume2 },
];

const proofIcons = [Moon, MessageCircle, ShieldCheck];

export async function LocalizedHome({ locale }: { locale: Locale }) {
  const copy = localeCopy[locale];
  const subscriptionLang = locale === 'ru' ? 'ru' : 'en';
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');
  const guidePages = topicPages.slice(0, 6);
  const guideHref = (slug: string) =>
    isTranslatedArticleSlug(slug) && getLocalizedTopicPage(locale, slug)
      ? `/${locale}/${slug}`
      : `/${slug}`;

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={locale} dir={locale === 'ar' || locale === 'he' ? 'rtl' : undefined}>
      <StarField />
      <div className="relative z-10">
      <SiteHeader acceptLanguage={acceptLanguage} country={country} locale={locale} />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20">
        <div className="relative z-20 max-w-2xl">
          <Reveal load animation="fadeIn"><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] shadow-sm backdrop-blur-xl"><Sparkles className="h-4 w-4" aria-hidden="true" />{copy.hero.badge}</p></Reveal>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"><WordReveal delay={120} text={copy.hero.title} /></h1>
          <Reveal load delay={260}><p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{copy.hero.body}</p></Reveal>
          <Reveal load delay={400}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="flex"><a className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_22px_55px_rgb(99_102_241/34%)] transition hover:bg-[#4F46E5]" href={appDownloadUrl} rel="noopener noreferrer" target="_blank">{copy.hero.primary}<ArrowRight className="h-5 w-5" aria-hidden="true" /></a></Magnetic>
            <a className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/15" href={`/${locale}/guides`}>{copy.hero.secondary}<BookOpen className="h-5 w-5" aria-hidden="true" /></a>
          </div>
          </Reveal>
          <Reveal load delay={540}>
          <div className="mt-9 hidden max-w-xl gap-3 text-sm text-white/70 sm:grid sm:grid-cols-3">
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl"><strong className="block text-2xl text-white">20</strong>{copy.stats[0]}</div>
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl"><strong className="block text-2xl text-white">0</strong>{copy.stats[1]}</div>
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl"><strong className="block text-2xl text-white">24/7</strong>{copy.stats[2]}</div>
          </div>
          </Reveal>
        </div>
        <Reveal load animation="zoomIn" delay={160} className="sm:hidden"><div className="relative z-10 mx-auto w-full max-w-[300px]"><img src="/screen-today.png" alt="Yorix baby sleep schedule" className="h-auto w-full rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15" width="1206" height="2622" /></div></Reveal>
        <Reveal load animation="zoomIn" delay={200} className="hidden sm:block"><Parallax offset={['start start', 'end start']} scale={[1, 0.96]} y={[0, -80]}><div className="relative z-10 mx-auto h-[650px] w-full max-w-[620px] lg:h-[760px]">
          <div className="absolute inset-x-4 bottom-12 top-20 rounded-full bg-[#6366F1]/25 blur-3xl" />
          <img src="/screen-progress.png" alt="Yorix progress" className="absolute left-0 top-24 z-10 w-[34%] rotate-[-7deg] rounded-[2rem] shadow-2xl ring-1 ring-white/15" width="1206" height="2622" />
          <img src="/screen-today.png" alt="Yorix today" className="absolute left-1/2 top-0 z-30 w-[50%] -translate-x-1/2 rounded-[2rem] shadow-2xl ring-1 ring-white/15" width="1206" height="2622" fetchPriority="high" />
          <img src="/screen-coach.png" alt="Yorix AI coach" className="absolute right-0 top-32 z-20 w-[34%] rotate-[6deg] rounded-[2rem] shadow-2xl ring-1 ring-white/15" width="1206" height="2622" />
        </div></Parallax></Reveal>
      </section>

      <section className="relative border-y border-white/10 bg-[#161628]/70"><div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-10">{copy.proof.map((item, index) => { const Icon = proofIcons[index]; return <Reveal className="flex" delay={index * 120} key={item.title}><article className="group spotlight flex w-full gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25"><span className="relative inline-grid shrink-0 self-start"><span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#6366F1] opacity-30 blur-xl transition duration-500 group-hover:opacity-80" /><span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]"><Icon className="h-5 w-5" aria-hidden="true" /></span></span><div><h2 className="font-semibold text-white">{item.title}</h2><p className="mt-2 text-sm leading-6 text-white/60">{item.body}</p></div></article></Reveal>; })}</div></section>

      <section id="plan" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"><div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"><Reveal><p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">{copy.plan.eyebrow}</p><h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.plan.title}</h2></Reveal><Reveal delay={140}><p className="max-w-2xl text-lg leading-8 text-white/65">{copy.plan.body}</p></Reveal></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{copy.plan.steps.map((item, index) => <Reveal className="flex" delay={index * 130} key={item}><article className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-bold text-white">{index + 1}</span><h3 className="mt-5 text-xl font-semibold text-white">{item}</h3></article></Reveal>)}</div></section>

      <section id="features" className="grid gap-8 px-5 pb-12 sm:px-8 lg:px-10">{copy.stories.map((story, index) => { const asset = storyAssets[index]; const Icon = asset.icon; return <Reveal animation={index % 2 === 1 ? 'driftInRight' : 'driftInLeft'} className="mx-auto w-full max-w-7xl" key={story.title}><article className="grid w-full gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_90px_rgb(0_0_0/18%)] backdrop-blur-xl md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10"><div className={index % 2 === 1 ? 'md:order-2' : ''}><p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE]"><Icon className="h-4 w-4" aria-hidden="true" />{story.eyebrow}</p><h2 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{story.title}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/65">{story.body}</p><ul className="mt-7 grid gap-3">{story.points.map((point) => <li className="flex items-center gap-3 text-base font-semibold text-white" key={point}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#22C55E] text-white"><Check className="h-4 w-4" aria-hidden="true" /></span>{point}</li>)}</ul></div><div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#1E1B4B] sm:min-h-[650px] md:min-h-[590px]"><Parallax className="absolute left-1/2 top-8 w-[70%] max-w-[330px] -translate-x-1/2" scale={[0.94, 1]} y={[72, -48]}><img src={asset.image} alt="Yorix app feature" className="h-auto w-full rounded-[2rem] shadow-[0_32px_85px_rgb(0_0_0/42%)] ring-1 ring-white/15" width="1206" height="2622" /></Parallax></div></article></Reveal>; })}</section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><Reveal><p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">{copy.trust.eyebrow}</p><h2 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.trust.title}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/65">{copy.trust.body}</p></Reveal><div className="grid gap-4 md:grid-cols-3">{copy.trust.cards.map((item, index) => <Reveal className="flex" delay={index * 120} key={item.title}><article className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25"><div className="mb-5 flex gap-1 text-[#F59E0B]">{Array.from({ length: 5 }).map((_, index) => <Star className="h-4 w-4 fill-current" aria-hidden="true" key={index} />)}</div><h3 className="text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{item.body}</p></article></Reveal>)}</div></div></section>

      <section id="guides" className="border-y border-white/10 bg-[#0F1022]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"><Reveal><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">{copy.guides.eyebrow}</p><h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.guides.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/60">{copy.guides.body}</p></div><a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF]" href={`/${locale}/guides`}>{copy.guides.action}<ArrowRight className="h-5 w-5" aria-hidden="true" /></a></div></Reveal><div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{guidePages.map((page, index) => { const translated = isTranslatedArticleSlug(page.slug) ? getLocalizedTopicPage(locale, page.slug) : undefined; return <Reveal className="flex" delay={index * 80} key={page.slug}><a className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/15" href={guideHref(page.slug)}><p className="text-sm font-semibold text-[#C7D2FE]">{translated?.category ?? page.category} · {translated?.readTime ?? page.readTime}</p><h3 className="mt-4 text-xl font-semibold leading-tight text-white">{translated?.title ?? copy.guides.articles[index].title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{translated?.description ?? copy.guides.articles[index].body}</p></a></Reveal>; })}</div></div></section>

      <HomeSubscriptionSection lang={subscriptionLang} />

      <section id="faq" className="mx-auto max-w-5xl px-5 py-16 sm:px-8"><Reveal><p className="mb-3 text-center text-sm font-semibold uppercase text-[#A78BFA]">{copy.faq.eyebrow}</p><h2 className="text-center text-4xl font-semibold text-white sm:text-5xl">{copy.faq.title}</h2></Reveal><div className="mt-8 grid gap-4">{copy.faq.items.map((item, index) => <Reveal animation="fadeIn" delay={index * 90} key={item.question}><article className="spotlight rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl"><h3 className="text-xl font-semibold text-white">{item.question}</h3><p className="mt-3 text-base leading-7 text-white/65">{item.answer}</p></article></Reveal>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"><Reveal animation="zoomIn"><div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#EEF2FF] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/22%)] md:grid-cols-[1fr_260px] md:items-center md:p-9"><div><p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6366F1]"><Users className="h-4 w-4" aria-hidden="true" />{copy.cta.badge}</p><h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{copy.cta.title}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-[#64748B]">{copy.cta.body}</p></div><a className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_18px_42px_rgb(99_102_241/30%)] transition hover:bg-[#4F46E5]" href={appDownloadUrl} rel="noopener noreferrer" target="_blank">{copy.cta.action}<ArrowRight className="h-5 w-5" aria-hidden="true" /></a></div></Reveal></section>
      <SellerFooter lang={subscriptionLang} note={copy.footer} />
      </div>
    </main>
  );
}
