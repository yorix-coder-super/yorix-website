import { ArrowRight, BookOpen } from 'lucide-react';
import { docsLang, isRtl, shotLocale } from '../i18n';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { appDownloadUrl } from '../content';
import { subscriptionPath } from '../subscription/i18n';
import { Parallax } from '../subscription/Parallax';
import { Reveal } from '../subscription/Reveal';
import { SocialProof } from '../subscription/SocialProof';
import { StarField } from '../subscription/StarField';
import { WordReveal } from '../subscription/WordReveal';
import { AppleGlyph, Art, DoodleArrow, DoodleHeart, Hand, PhoneFrame, Sparkle } from './art';
import { headlineParts, homeCopy, type HomeLocale } from './copy';
import { CtaBand, FaqItem, whitePill } from './CtaBand';
import { HomePricing } from './HomePricing';

const featureIcons = ['icon-bolt', 'icon-chart', 'icon-chat', 'icon-heart'];

// Real screenshots of the current build in the page's language (English
// where the app itself is not translated).
const showcase = ['progress', 'bedtime', 'coach'] as const;

export async function HomeLanding({ locale }: { locale: HomeLocale }) {
  const copy = homeCopy(locale);
  const home = locale === 'en' ? '/' : `/${locale}`;
  const guides = locale === 'en' ? '/guides' : `/${locale}/guides`;
  const shots = shotLocale(locale);

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" dir={isRtl(locale) ? 'rtl' : undefined} lang={locale}>
      <StarField />
      <div className="relative z-10">
        <SiteHeader locale={locale} />

        <section className="relative" id="top">
          <div className="hero-clouds pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[46%] min-h-[220px] overflow-hidden">
            <Parallax className="absolute inset-x-[-4%] bottom-[-6%]" offset={['start start', 'end start']} y={[0, 40]}>
              <Art className="drift block h-auto w-full opacity-90 rtl:-scale-x-100" height={511} name="cloud-bank" width={1536} />
            </Parallax>
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-4 px-5 pb-6 pt-4 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-6 lg:px-10 lg:pb-2">
            <div className="relative z-20 max-w-[34rem]">
              <Reveal animation="fadeIn" load>
                <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-xl">
                  {copy.hero.badge}
                </p>
              </Reveal>
              <h1 className="max-w-[36rem] text-[2.45rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.05rem]">
                <WordReveal delay={120} parts={headlineParts(copy.hero.title, copy.highlight)} text={copy.hero.title} />
              </h1>
              <Reveal delay={260} load>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-[17px]">{copy.hero.body}</p>
              </Reveal>
              <Reveal delay={380} load>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a className={whitePill} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                    <AppleGlyph />
                    {copy.hero.primary}
                    <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
                  </a>
                  <a className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.06] py-1.5 ps-2 pe-6 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.12]" href={guides}>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                      <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    {copy.hero.secondary}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={500} load>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex shrink-0">
                    {['icon-moon-crescent', 'icon-chat', 'icon-heart'].map((icon, index) => (
                      <span className={`grid h-11 w-11 place-items-center rounded-full bg-[#2E2A6E] ring-2 ring-[#1E1B4B] ${index ? '-ms-3' : ''}`} key={icon}>
                        <Art className="h-7 w-7 object-contain" height={192} name={icon} width={192} />
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-5 text-white/70">
                    <strong className="font-semibold text-white">20</strong> {copy.stats[0]} · <strong className="font-semibold text-white">0</strong> {copy.stats[1]}
                    <br />
                    <strong className="font-semibold text-white">24/7</strong> {copy.stats[2]}
                  </p>
                </div>
              </Reveal>
            </div>

            <HeroArt
              coachLabel={copy.features[2].title}
              notes={copy.notes}
              screen={`/shots/${shots}-today.webp`}
              screenAlt={copy.screenAlt}
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-7 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10" id="features">
          {copy.features.map((feature, index) => (
            <Reveal className="flex" delay={index * 100} key={feature.title}>
              <div className="group flex items-start gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#5B55E8,#2E2A7A_70%)] shadow-[0_0_44px_rgb(99_102_241/40%)] ring-1 ring-white/15 transition duration-300 group-hover:-translate-y-1">
                  <Art className="h-9 w-9 object-contain" height={192} name={featureIcons[index]} width={192} />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">{feature.title}</h2>
                  <p className="mt-1.5 text-sm leading-5 text-white/60">{feature.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10" id="plan">
          <Reveal>
            <article className="relative grid overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#F8F7FF_0%,#EEF2FF_48%,#E0E7FF_100%)] text-[#1E1B4B] shadow-[0_30px_90px_rgb(0_0_0/25%)] lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative z-10 p-7 sm:p-10 lg:py-12 lg:ps-12 lg:pe-4">
                <h2 className="max-w-md text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.01em] sm:text-[2.25rem]">{copy.plan.title}</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-[#475569]">{copy.plan.body}</p>
                <ul className="mt-6 grid gap-3">
                  {copy.plan.steps.map((step) => (
                    <li className="flex items-center gap-3 text-[15px] font-medium leading-6 text-[#1E1B4B]" key={step}>
                      <Art className="h-6 w-6 shrink-0 object-contain" height={192} name="icon-check" width={190} />
                      {step}
                    </li>
                  ))}
                </ul>
                <a className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1E1B4B] px-6 text-base font-semibold text-white transition hover:bg-[#312E81]" href="#subscription">
                  {copy.more}
                  <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </div>
              <div className="relative h-[330px] overflow-hidden sm:h-[430px] lg:h-auto lg:min-h-[420px] lg:overflow-visible">
                <div className="absolute inset-x-4 top-8 flex justify-center gap-3 sm:gap-5 lg:inset-x-6 lg:top-20">
                  {showcase.map((shot, index) => (
                    <Reveal className="w-[32%] max-w-[270px] lg:w-[35%]" delay={140 + index * 120} key={shot}>
                      <PhoneFrame alt={copy.showcaseAlt[shot]} className="transition duration-500 hover:-translate-y-2" src={`/shots/${shots}-${shot}.webp`} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </section>

        <SocialProof body={copy.reviews.body} locale={locale} title={copy.reviews.title} />

        <HomePricing locale={locale} />

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10" id="faq">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]">{copy.faq.title}</h2>
              <a className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white" href={`${subscriptionPath(docsLang(locale))}#faq`}>
                {copy.allQuestions}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <div className="mt-5 grid items-start gap-3 md:grid-cols-3">
            {copy.faq.items.map((item, index) => (
              <Reveal animation="fadeIn" delay={index * 90} key={item.question}>
                <FaqItem answer={item.answer} question={item.question} />
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand action={copy.cta.action} body={copy.cta.body} note={copy.notes.cta} title={copy.cta.title} />

        <SellerFooter home={home} locale={locale} note={copy.footer} />
      </div>
    </main>
  );
}

function HeroArt({ coachLabel, notes, screen, screenAlt }: { coachLabel: string; notes: { hero: string; coach: string }; screen: string; screenAlt: string }) {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[640px] sm:h-[520px] lg:h-[590px]">
      <div aria-hidden="true" className="absolute start-[4%] top-[18%] h-[62%] w-[58%] rounded-full bg-[#FDE68A]/20 blur-3xl" />

      <Reveal animation="zoomIn" className="absolute start-[-6%] top-[9%] z-20 w-[66%] sm:start-[-4%] lg:start-[-8%] lg:top-[7%] lg:w-[68%]" delay={120} load>
        <Parallax offset={['start start', 'end start']} y={[0, -50]}>
          <div className="float-slow">
            <Art className="h-auto w-full drop-shadow-[0_30px_60px_rgb(15_16_34/45%)] rtl:-scale-x-100" height={900} name="hero-baby-moon" priority width={817} />
          </div>
        </Parallax>
      </Reveal>

      <Reveal animation="driftInRight" className="absolute start-[50%] top-[3%] z-30 w-[40%] sm:start-[46%] sm:w-[34%] lg:top-[5%]" delay={240} load>
        <div className="rotate-[7deg] rtl:-rotate-[7deg]">
          <div className="float-slower">
            <PhoneFrame alt={screenAlt} priority src={screen} />
          </div>
        </div>
      </Reveal>

      <Reveal animation="zoomIn" className="absolute bottom-[1%] end-[-3%] z-40 w-[27%] sm:bottom-[4%] sm:end-[-2%] sm:w-[22%]" delay={480} load>
        <div className="bob">
          <Art className="h-auto w-full drop-shadow-[0_18px_30px_rgb(15_16_34/40%)] rtl:-scale-x-100" height={420} name="star-mascot" width={410} />
        </div>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute end-[-4%] top-[14%] z-40 hidden sm:block" delay={620} load>
        <div className="float-slower rotate-[-8deg] rtl:rotate-[8deg] rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-3 shadow-[0_18px_50px_rgb(0_0_0/25%)] backdrop-blur-xl">
          <span className="flex items-center gap-2.5 text-[15px] font-semibold leading-5 text-white">
            <Art className="h-8 w-8 object-contain" height={192} name="icon-sparkle" width={192} />
            <span className="max-w-[6.5rem]">{coachLabel}</span>
          </span>
        </div>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute start-[-1%] top-[-5%] z-40 hidden w-[27%] sm:block" delay={760} load>
        <Hand className="relative -rotate-12 rtl:rotate-12 text-[1.75rem] text-[#E0E7FF] lg:text-[1.95rem]">
          {notes.hero} <DoodleHeart className="h-6 w-6 text-[#FDE68A]" />
        </Hand>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute end-[-3%] top-[31%] z-40 hidden w-[22%] sm:block" delay={880} load>
        <div className="relative -rotate-6 rtl:rotate-6">
          <DoodleArrow className="absolute -top-12 end-[46%] h-12 w-9 text-[#E0E7FF]/80 rtl:-scale-x-100" />
          <Hand className="relative text-[1.5rem] text-[#E0E7FF] lg:text-[1.65rem]">{notes.coach}</Hand>
        </div>
      </Reveal>

      <Sparkle className="start-[40%] top-[2%] w-4" delay={0} />
      <Sparkle className="start-[2%] top-[70%] w-3" delay={900} tone="lavender" />
      <Sparkle className="end-[16%] top-[58%] w-3" delay={1600} />
      <Sparkle className="start-[46%] bottom-[6%] w-2.5" delay={2300} tone="lavender" />
    </div>
  );
}
