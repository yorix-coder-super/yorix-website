import { ArrowRight, CalendarClock, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { headers } from 'next/headers';
import { AccountLine, AccountProvider, ChargeNote, HeroCta, PlanCard, RequestForm } from './account';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang } from './i18n';
import { Magnetic } from './Magnetic';
import { merchant, plans } from './merchant';
import { Parallax } from './Parallax';
import { Reveal } from './Reveal';
import { SocialProof } from './SocialProof';
import { SubscriptionShell } from './SubscriptionShell';
import { testimonials } from './testimonials';
import { Button, Eyebrow, SectionTitle } from './ui';
import { WordReveal } from './WordReveal';

const outcomeIcons = [CalendarClock, RotateCcw, MessageCircle];

// The storefront is a funnel: hero thesis → three outcomes → the plan grid
// (the only decision) → proof → four objections. Sign-in happens inside the
// plan button; the bank-facing texts live on /payment and in the footer.
export async function SubscriptionStorefront({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');
  // One verbatim sentence from a real parent is the hero's only trust signal.
  const voice = testimonials[1];
  const quote = (voice.locale === lang ? voice.quote : voice.translations[lang]).split(/(?<=\.)\s/)[0];

  return (
    <SubscriptionShell lang={lang}>
      <AccountProvider acceptLanguage={acceptLanguage} country={country} lang={lang}>
        <RequestForm />
        <section className="relative">
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20">
            <div className="relative z-10 min-w-0">
              <Reveal load animation="fadeIn">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] shadow-sm backdrop-blur-xl">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {copy.hero.eyebrow}
                </p>
              </Reveal>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                <WordReveal delay={120} text={copy.hero.title} />
              </h1>
              <Reveal load delay={260}>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{copy.hero.subline}</p>
              </Reveal>
              <Reveal load delay={400}>
                <div className="mt-8">
                  <Magnetic className="flex sm:inline-flex">
                    <Button className="flex-1" href="#plans">
                      <HeroCta />
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </Magnetic>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">
                  <span className="text-white/85">«{quote}»</span> — {voice.author}, {copy.proof.parents}
                </p>
              </Reveal>
            </div>
            <Reveal load animation="zoomIn" delay={200} className="relative z-0 mx-auto hidden w-full max-w-[460px] sm:block">
              <Parallax className="relative h-[560px]" offset={['start start', 'end start']} scale={[1, 0.97]} y={[0, -70]}>
                <div className="absolute inset-x-6 bottom-10 top-16 rounded-full bg-[#6366F1]/25 blur-3xl" />
                <img
                  src="/screen-coach.png"
                  alt=""
                  className="absolute left-0 top-16 z-10 h-auto w-[46%] rotate-[-6deg] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                  width="1206"
                  height="2622"
                />
                <img
                  src="/screen-plan.png"
                  alt=""
                  className="absolute right-0 top-0 z-20 h-auto w-[54%] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                  width="1206"
                  height="2622"
                  fetchPriority="high"
                />
              </Parallax>
            </Reveal>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 pb-10 pt-2 sm:px-8 lg:px-10">
          <Reveal>
            <SectionTitle className="max-w-2xl">{copy.outcomes.title}</SectionTitle>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.outcomes.items.map((item, index) => {
              const Icon = outcomeIcons[index];
              return (
                <Reveal className="flex" delay={index * 120} key={item.lead}>
                  <li className="group spotlight flex w-full items-start gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25">
                    <span className="relative inline-grid shrink-0">
                      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#FDE68A] opacity-30 blur-xl transition duration-500 group-hover:opacity-80" />
                      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#FDE68A] text-[#1E1B4B]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </span>
                    <p className="text-base leading-7 text-white/75">
                      <strong className="font-semibold text-white">{item.lead}</strong> {item.rest}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section id="plans" className="relative mx-auto max-w-7xl scroll-mt-6 px-5 py-14 sm:px-8 lg:px-10">
          <Reveal>
            <SectionTitle className="max-w-2xl">{copy.plans.title}</SectionTitle>
            <p className="mt-4 text-base leading-7 text-white/65">{copy.plans.included}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
            {plans.map((plan, index) => (
              <Reveal className={`flex ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 120} key={plan.id}>
                <PlanCard featured={plan.id === 'year'} plan={plan} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-base font-semibold leading-7 text-white">{copy.plans.trust}</p>
          <p className="mt-2 text-sm leading-6 text-white/60">{copy.plans.steps}</p>
          <AccountLine className="mt-3 text-sm leading-6 text-white/60" />
          <p className="mt-4 text-sm leading-6 text-white/50">
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
        </section>

        <SocialProof lang={lang} />

        <section id="faq" className="relative mx-auto max-w-5xl scroll-mt-6 px-5 pb-20 pt-10 sm:px-8">
          <Reveal>
            <Eyebrow center>{copy.nav.faq}</Eyebrow>
            <SectionTitle center>{copy.faq.title}</SectionTitle>
          </Reveal>
          <div className="mt-8 grid gap-3">
            {copy.faq.items.map((item, index) => (
              <Reveal animation="fadeIn" delay={index * 40} key={item.q}>
                <details className="group rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl open:bg-white/[0.14]">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-7 text-white/65 animate-in fade-in duration-300">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-white/60">
            <a className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/30 hover:decoration-white" href={`mailto:${merchant.email}`}>
              {copy.faq.more}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        </section>
      </AccountProvider>
    </SubscriptionShell>
  );
}
