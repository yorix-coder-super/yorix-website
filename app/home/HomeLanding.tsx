import { ArrowRight, BookOpen, Plus, Star } from 'lucide-react';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { appDownloadUrl } from '../content';
import { subscriptionCopy } from '../subscription/copy';
import { subscriptionPath } from '../subscription/i18n';
import { Parallax } from '../subscription/Parallax';
import { Reveal } from '../subscription/Reveal';
import { StarField } from '../subscription/StarField';
import { testimonials } from '../subscription/testimonials';
import { WordReveal } from '../subscription/WordReveal';
import { AppleGlyph, Art, DoodleArrow, DoodleHeart, Hand, PhoneFrame, Sparkle } from './art';
import { headlineTones, homeCopy, type HomeLocale } from './copy';
import { HomePricing } from './HomePricing';

const featureIcons = ['icon-bolt', 'icon-chart', 'icon-chat', 'icon-heart'];

// Real App Store screenshots of the current build, per language.
const showcase = [
  { name: 'progress', alt: { en: 'Yorix progress: sleep and feeding statistics', ru: 'Прогресс в Yorix: статистика сна и кормлений' } },
  { name: 'bedtime', alt: { en: 'Yorix bedtime sounds', ru: 'Звуки для сна в Yorix' } },
  { name: 'coach', alt: { en: 'Yorix AI coach chat', ru: 'Чат с ИИ-коучем Yorix' } },
];

const whitePill =
  'inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] shadow-[0_18px_50px_rgb(255_255_255/14%)] transition hover:bg-[#EEF2FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30';

export async function HomeLanding({ locale }: { locale: HomeLocale }) {
  const copy = homeCopy(locale);
  const sub = subscriptionCopy[locale];
  const home = locale === 'en' ? '/' : `/${locale}`;
  const guides = locale === 'en' ? '/guides' : `/${locale}/guides`;
  const reviews = testimonials.map((t) => ({
    ...t,
    text: t.locale === locale ? t.quote : t.translations[locale],
    translated: t.locale !== locale,
  }));

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={locale}>
      <StarField />
      <div className="relative z-10">
        <SiteHeader locale={locale} />

        <section className="relative" id="top">
          <div className="hero-clouds pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[46%] min-h-[220px] overflow-hidden">
            <Parallax className="absolute inset-x-[-4%] bottom-[-6%]" offset={['start start', 'end start']} y={[0, 40]}>
              <Art className="drift block h-auto w-full opacity-90" height={511} name="cloud-bank" width={1536} />
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
                <WordReveal delay={120} text={copy.hero.title} tones={headlineTones(copy.hero.title)} />
              </h1>
              <Reveal delay={260} load>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-[17px]">{copy.hero.body}</p>
              </Reveal>
              <Reveal delay={380} load>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a className={whitePill} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                    <AppleGlyph />
                    {copy.hero.primary}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.06] py-1.5 pl-2 pr-6 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.12]" href={guides}>
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
                      <span className={`grid h-11 w-11 place-items-center rounded-full bg-[#2E2A6E] ring-2 ring-[#1E1B4B] ${index ? '-ml-3' : ''}`} key={icon}>
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
              screen={`/shots/${locale}-today.webp`}
              screenAlt={locale === 'ru' ? 'Экран «Сегодня» в Yorix: окно ночного сна' : 'Yorix today screen with the night sleep window'}
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
              <div className="relative z-10 p-7 sm:p-10 lg:py-12 lg:pl-12 lg:pr-4">
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
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
              <div className="relative h-[330px] overflow-hidden sm:h-[430px] lg:h-auto lg:min-h-[420px] lg:overflow-visible">
                <div className="absolute inset-x-4 top-8 flex justify-center gap-3 sm:gap-5 lg:inset-x-6 lg:top-20">
                  {showcase.map((shot, index) => (
                    <Reveal className="w-[32%] max-w-[270px] lg:w-[35%]" delay={140 + index * 120} key={shot.name}>
                      <PhoneFrame alt={shot.alt[locale]} className="transition duration-500 hover:-translate-y-2" src={`/shots/${locale}-${shot.name}.webp`} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10" id="reviews">
          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-7 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-4">
            <Reveal className="flex flex-col justify-center lg:pr-4">
              <h2 className="text-[1.75rem] font-semibold leading-[1.15] text-white sm:text-[2rem] lg:text-[1.7rem]">{copy.reviews.title}</h2>
              <p className="mt-4 text-[15px] leading-6 text-white/65">{copy.reviews.body}</p>
            </Reveal>
            {reviews.map((review, index) => (
              <Reveal className="flex" delay={index * 120} key={review.author}>
                <figure className="flex w-full flex-col rounded-2xl border border-white/12 bg-white/[0.07] p-5 transition hover:border-white/25">
                  <div aria-label={`${review.stars}/5`} className="flex gap-1 text-[#FBBF24]">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star className="h-4 w-4 fill-current" aria-hidden="true" key={i} />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-[15px] leading-6 text-white/85">“{review.text}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-5">
                    <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#A78BFA,#6366F1)] text-sm font-semibold text-white">
                      {review.author.charAt(0)}
                    </span>
                    <span className="text-sm leading-5">
                      <span className="block font-semibold text-white">{review.author}</span>
                      <span className="text-xs text-white/55">
                        {review.source === 'appstore' ? sub.proof.source : sub.proof.parents}
                        {review.translated ? ` · ${sub.proof.translated}` : ''}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <HomePricing lang={locale} />

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10" id="faq">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]">{copy.faq.title}</h2>
              <a className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition hover:text-white" href={`${subscriptionPath(locale)}#faq`}>
                {copy.allQuestions}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <div className="mt-5 grid items-start gap-3 md:grid-cols-3">
            {copy.faq.items.map((item, index) => (
              <Reveal animation="fadeIn" delay={index * 90} key={item.question}>
                <details className="group rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-xl transition open:bg-white/[0.09] hover:border-white/25">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium leading-6 text-white [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus className="h-5 w-5 shrink-0 text-white/70 transition duration-300 group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-6 text-white/65">{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-10">
          <Reveal animation="zoomIn">
            <div className="relative rounded-[2rem] bg-[linear-gradient(100deg,#4F46E5_0%,#6D6AF0_48%,#A5B4FC_100%)] shadow-[0_30px_90px_rgb(79_70_229/35%)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                <Art className="drift absolute bottom-[-38%] left-[-5%] w-[110%] max-w-none opacity-45" height={511} name="cloud-bank" width={1536} />
                <Sparkle className="left-[34%] top-[16%] w-3" delay={300} tone="lavender" />
                <Sparkle className="right-[30%] top-[62%] w-2.5" delay={1200} />
                <Sparkle className="right-[7%] bottom-[18%] w-4" delay={700} />
              </div>
              <div className="relative grid items-center gap-6 px-6 pb-8 pt-2 sm:px-10 md:grid-cols-[230px_1fr_auto] md:py-10 lg:grid-cols-[260px_1fr_auto]">
                <div className="relative mx-auto -mt-24 w-[200px] md:absolute md:-top-16 md:left-6 md:mx-0 md:mt-0 md:w-[230px] lg:w-[250px]">
                  <div className="float-slow">
                    <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(30_27_75/35%)]" height={560} name="cta-baby-star" width={503} />
                  </div>
                </div>
                <div className="hidden md:block" />
                <div className="text-center md:text-left">
                  <h2 className="text-[1.65rem] font-semibold leading-[1.2] text-white sm:text-[1.9rem]">{copy.cta.title}</h2>
                  <p className="mt-2 max-w-xl text-[15px] leading-6 text-white/85">{copy.cta.body}</p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <a className={whitePill} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                    <AppleGlyph />
                    {copy.cta.action}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <Hand className="absolute right-8 top-[-2.4rem] hidden rotate-[-8deg] text-[1.9rem] text-[#FDE68A] lg:block">
                {copy.notes.cta} <DoodleHeart className="h-6 w-6" />
              </Hand>
            </div>
          </Reveal>
        </section>

        <SellerFooter home={home} lang={locale} note={copy.footer} />
      </div>
    </main>
  );
}

function HeroArt({ coachLabel, notes, screen, screenAlt }: { coachLabel: string; notes: { hero: string; coach: string }; screen: string; screenAlt: string }) {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[640px] sm:h-[520px] lg:h-[590px]">
      <div aria-hidden="true" className="absolute left-[4%] top-[18%] h-[62%] w-[58%] rounded-full bg-[#FDE68A]/20 blur-3xl" />

      <Reveal animation="zoomIn" className="absolute left-[-6%] top-[9%] z-20 w-[66%] sm:left-[-4%] lg:left-[-8%] lg:top-[7%] lg:w-[68%]" delay={120} load>
        <Parallax offset={['start start', 'end start']} y={[0, -50]}>
          <div className="float-slow">
            <Art className="h-auto w-full drop-shadow-[0_30px_60px_rgb(15_16_34/45%)]" height={900} name="hero-baby-moon" priority width={817} />
          </div>
        </Parallax>
      </Reveal>

      <Reveal animation="driftInRight" className="absolute left-[50%] top-[3%] z-30 w-[40%] sm:left-[46%] sm:w-[34%] lg:top-[5%]" delay={240} load>
        <div className="rotate-[7deg]">
          <div className="float-slower">
            <PhoneFrame alt={screenAlt} priority src={screen} />
          </div>
        </div>
      </Reveal>

      <Reveal animation="zoomIn" className="absolute bottom-[1%] right-[-3%] z-40 w-[27%] sm:bottom-[4%] sm:right-[-2%] sm:w-[22%]" delay={480} load>
        <div className="bob">
          <Art className="h-auto w-full drop-shadow-[0_18px_30px_rgb(15_16_34/40%)]" height={420} name="star-mascot" width={410} />
        </div>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute right-[-4%] top-[14%] z-40 hidden sm:block" delay={620} load>
        <div className="float-slower rotate-[-8deg] rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-3 shadow-[0_18px_50px_rgb(0_0_0/25%)] backdrop-blur-xl">
          <span className="flex items-center gap-2.5 text-[15px] font-semibold leading-5 text-white">
            <Art className="h-8 w-8 object-contain" height={192} name="icon-sparkle" width={192} />
            <span className="max-w-[6.5rem]">{coachLabel}</span>
          </span>
        </div>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute left-[-1%] top-[-5%] z-40 hidden w-[27%] sm:block" delay={760} load>
        <Hand className="relative -rotate-12 text-[1.75rem] text-[#E0E7FF] lg:text-[1.95rem]">
          {notes.hero} <DoodleHeart className="h-6 w-6 text-[#FDE68A]" />
        </Hand>
      </Reveal>

      <Reveal animation="fadeIn" className="absolute right-[-3%] top-[31%] z-40 hidden w-[22%] sm:block" delay={880} load>
        <div className="relative -rotate-6">
          <DoodleArrow className="absolute -top-12 right-[46%] h-12 w-9 text-[#E0E7FF]/80" />
          <Hand className="relative text-[1.5rem] text-[#E0E7FF] lg:text-[1.65rem]">{notes.coach}</Hand>
        </div>
      </Reveal>

      <Sparkle className="left-[40%] top-[2%] w-4" delay={0} />
      <Sparkle className="left-[2%] top-[70%] w-3" delay={900} tone="lavender" />
      <Sparkle className="right-[16%] top-[58%] w-3" delay={1600} />
      <Sparkle className="left-[46%] bottom-[6%] w-2.5" delay={2300} tone="lavender" />
    </div>
  );
}
