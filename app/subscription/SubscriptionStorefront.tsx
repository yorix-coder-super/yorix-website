import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { AppleGlyph, Art, PhoneFrame, Sparkle } from '../home/art';
import { headlineTones } from '../home/copy';
import { FaqItem, whitePill } from '../home/CtaBand';
import { AppStorePanel, PlanGrid } from '../home/HomePricing';
import { appDownloadUrl } from '../content';
import { siteCopy } from '../i18n';
import { AccountProvider, ChargeNote, CheckoutDialog, HeroCta } from './account';
import { currencyForVisitor, sellsOnWeb } from './currency';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang } from './i18n';
import { Magnetic } from './Magnetic';
import { Parallax } from './Parallax';
import { Reveal } from './Reveal';
import { SocialProof } from './SocialProof';
import { SubscriptionShell } from './SubscriptionShell';
import { testimonials } from './testimonials';
import { WordReveal } from './WordReveal';

const outcomeIcons = ['icon-moon-crescent', 'icon-bolt', 'icon-chat'];

// The storefront is a funnel: hero thesis → three outcomes → the plan grid
// (the only decision) → proof → four objections. Sign-in happens inside the
// plan button; the bank-facing texts live on /payment and in the footer.
export async function SubscriptionStorefront({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');
  // Outside Belarus and Russia the subscription is sold in the App Store.
  const web = sellsOnWeb(currencyForVisitor(country, acceptLanguage));
  // One verbatim sentence from a real parent is the hero's only trust signal.
  const voice = testimonials[1];
  const quote = (voice.locale === lang ? voice.quote : voice.translations[lang]).split(/(?<=\.)\s/)[0];

  return (
    <SubscriptionShell lang={lang}>
      <AccountProvider acceptLanguage={acceptLanguage} country={country} lang={lang}>
        <CheckoutDialog />
        <section className="relative">
          <div className="hero-clouds pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[42%] min-h-[200px] overflow-hidden">
            <Parallax className="absolute inset-x-[-4%] bottom-[-8%]" offset={['start start', 'end start']} y={[0, 40]}>
              <Art className="drift block h-auto w-full opacity-90" height={511} name="cloud-bank" width={1536} />
            </Parallax>
          </div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-5 pb-10 pt-4 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-6">
            <div className="relative z-10 min-w-0">
              <Reveal animation="fadeIn" load>
                <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-xl">
                  {copy.hero.eyebrow}
                </p>
              </Reveal>
              <h1 className="max-w-[36rem] text-[2.45rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.05rem]">
                <WordReveal delay={120} text={copy.hero.title} tones={headlineTones(copy.hero.title)} />
              </h1>
              <Reveal delay={260} load>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-[17px]">{copy.hero.subline}</p>
              </Reveal>
              <Reveal delay={380} load>
                <div className="mt-7">
                  <Magnetic className="flex sm:inline-flex">
                    {web ? (
                      <a className={`${whitePill} flex-1`} href="#plans">
                        <HeroCta />
                        <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
                      </a>
                    ) : (
                      <a className={`${whitePill} flex-1`} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                        <AppleGlyph />
                        {siteCopy(lang).home.nav.download}
                      </a>
                    )}
                  </Magnetic>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">
                  <span className="text-white/85">«{quote}»</span> — {voice.author}, {copy.proof.parents}
                </p>
              </Reveal>
            </div>
            <StorefrontArt lang={lang} />
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-8 lg:px-10">
          <Reveal>
            <h2 className="text-2xl font-semibold text-white sm:text-[1.9rem]">{copy.outcomes.title}</h2>
          </Reveal>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.outcomes.items.map((item, index) => (
              <Reveal className="flex" delay={index * 110} key={item.lead}>
                <li className="group flex w-full items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#5B55E8,#2E2A7A_70%)] shadow-[0_0_40px_rgb(99_102_241/40%)] ring-1 ring-white/15">
                    <Art className="h-8 w-8 object-contain" height={192} name={outcomeIcons[index]} width={192} />
                  </span>
                  <p className="text-[15px] leading-6 text-white/75">
                    <strong className="font-semibold text-white">{item.lead}</strong> {item.rest}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="relative mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="plans">
          {web ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgb(0_0_0/18%)] backdrop-blur-xl sm:p-7">
              <Reveal>
                <h2 className="text-2xl font-semibold text-white sm:text-[1.9rem]">{copy.plans.title}</h2>
                <p className="mt-3 text-[15px] leading-6 text-white/65">{copy.plans.included}</p>
              </Reveal>
              <PlanGrid locale={lang} />
              <p className="mt-6 text-sm leading-6 text-white/60">{copy.plans.steps}</p>
              <p className="mt-3 text-sm leading-6 text-white/50">
                {copy.plans.acceptBefore}{' '}
                <a className="text-white/80 underline decoration-white/30 hover:text-white hover:decoration-white" href={subscriptionPath(lang, '/offer')}>
                  {copy.plans.offer}
                </a>{' '}
                {copy.plans.and}{' '}
                <a className="text-white/80 underline decoration-white/30 hover:text-white hover:decoration-white" href={subscriptionPath(lang, '/payment')}>
                  {copy.plans.refundTerms}
                </a>
                . {copy.plans.device}
              </p>
              <ChargeNote className="mt-2 text-sm leading-6 text-white/50" />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
                <a className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white" href={subscriptionPath(lang, '/gift')}>
                  <Art className="h-5 w-5 object-contain" height={250} name="icon-gift" width={192} />
                  {copy.gift.eyebrow}
                </a>
                <a className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white hover:decoration-white" href={`${lang === 'ru' ? '/ru' : ''}/gift`}>
                  {copy.gift.entryTitle}
                </a>
              </div>
            </div>
          ) : (
            <AppStorePanel locale={lang} />
          )}
        </section>

        <SocialProof locale={lang} />

        <section className="relative mx-auto max-w-7xl scroll-mt-6 px-5 pb-20 pt-8 sm:px-8 lg:px-10" id="faq">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-2xl font-semibold text-white sm:text-[1.9rem]">{copy.faq.title}</h2>
              <div className="bob hidden w-24 shrink-0 sm:block">
                <Art className="h-auto w-full" height={420} name="star-mascot" width={410} />
              </div>
            </div>
          </Reveal>
          <div className="mt-5 grid items-start gap-3 md:grid-cols-2">
            {copy.faq.items.map((item, index) => (
              <Reveal animation="fadeIn" delay={index * 60} key={item.q}>
                <FaqItem answer={item.a} question={item.q} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/60">
            <a className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/30 hover:decoration-white" href={`${lang === 'ru' ? '/ru' : ''}/support#contact`}>
              {copy.faq.more}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        </section>
      </AccountProvider>
    </SubscriptionShell>
  );
}

function StorefrontArt({ lang }: { lang: Lang }) {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[500px] lg:h-[560px]">
      <div aria-hidden="true" className="absolute left-[8%] top-[20%] h-[60%] w-[70%] rounded-full bg-[#6366F1]/25 blur-3xl" />
      <Reveal animation="driftInRight" className="absolute right-[6%] top-[2%] z-20 w-[44%] sm:w-[40%]" delay={200} load>
        <div className="rotate-[6deg]">
          <div className="float-slower">
            <PhoneFrame alt={lang === 'ru' ? 'Экран «Сегодня» в Yorix' : 'Yorix today screen'} priority src={`/shots/${lang}-today.webp`} />
          </div>
        </div>
      </Reveal>
      <Reveal animation="zoomIn" className="absolute bottom-[2%] left-[0%] z-30 w-[50%] sm:w-[46%]" delay={320} load>
        <div className="float-slow">
          <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/40%)]" height={560} name="cta-baby-star" priority width={503} />
        </div>
      </Reveal>
      <Reveal animation="fadeIn" className="absolute left-[8%] top-[6%] z-10 w-[20%]" delay={520} load>
        <div className="bob">
          <Art className="h-auto w-full" height={420} name="star-mascot" width={410} />
        </div>
      </Reveal>
      <Sparkle className="left-[40%] top-[4%] w-4" delay={0} />
      <Sparkle className="right-[2%] top-[62%] w-3" delay={900} tone="lavender" />
      <Sparkle className="bottom-[10%] left-[58%] w-2.5" delay={1700} />
    </div>
  );
}
