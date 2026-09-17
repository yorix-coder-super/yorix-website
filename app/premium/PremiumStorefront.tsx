import { ArrowRight, BarChart3, CalendarClock, LockKeyhole, MessageCircle, RotateCcw, ShieldCheck, Smartphone, Sparkles, Sun, UserRound } from 'lucide-react';
import { headers } from 'next/headers';
import { AccountPanel, AccountProvider, FlowNote, ManualOrder, PlanCard, RequestForm } from './account';
import { premiumCopy } from './copy';
import { premiumPath, type Lang } from './i18n';
import { formatByn, plans } from './merchant';
import { Money } from './Money';
import { PremiumShell } from './PremiumShell';
import { Parallax } from './Parallax';
import { Reveal } from './Reveal';
import { SocialProof } from './SocialProof';
import { Button, Eyebrow, SectionTitle } from './ui';

const featureIcons = [Sparkles, MessageCircle, BarChart3, Sun];
const outcomeIcons = [CalendarClock, RotateCcw, MessageCircle];
const stepIcons = [UserRound, LockKeyhole, Smartphone];

export async function PremiumStorefront({ lang }: { lang: Lang }) {
  const copy = premiumCopy[lang];
  const week = plans[0];
  const country = (await headers()).get('cf-ipcountry');

  return (
    <PremiumShell lang={lang}>
      <AccountProvider country={country} lang={lang}>
        <RequestForm />
        <section className="relative">
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20">
            <div className="relative z-10 min-w-0">
              <Reveal load animation="fadeIn">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] backdrop-blur-xl">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {copy.hero.badge}
                </p>
              </Reveal>
              <Reveal load delay={120}>
                <h1 className="max-w-2xl text-[2.35rem] font-semibold leading-[1.06] text-white sm:text-6xl">{copy.hero.title}</h1>
              </Reveal>
              <Reveal load delay={260}>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{copy.hero.body}</p>
              </Reveal>
              <Reveal load delay={400}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="#tarify">
                    <Money text={copy.hero.primary(formatByn(week.priceByn, lang))} />
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm text-white/65">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    {copy.hero.oneOff}
                  </span>
                </div>
                <FlowNote className="mt-4 max-w-xl text-sm leading-6 text-white/55" />
                <AccountPanel />
              </Reveal>
            </div>
            <Reveal load animation="zoomIn" delay={200} className="relative z-0 mx-auto hidden w-full max-w-[460px] sm:block">
              <Parallax className="relative h-[560px]" offset={['start start', 'end start']} scale={[1, 0.97]} y={[0, -70]}>
              <div className="absolute inset-x-6 bottom-10 top-16 rounded-full bg-[#6366F1]/25 blur-3xl" />
              <img
                src="/screen-coach.png"
                alt=""
                className="absolute left-0 top-16 z-10 w-[46%] rotate-[-6deg] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                width="1206"
                height="2622"
              />
              <img
                src="/screen-plan.png"
                alt=""
                className="absolute right-0 top-0 z-20 w-[54%] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                width="1206"
                height="2622"
                fetchPriority="high"
              />
              </Parallax>
            </Reveal>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-5 pt-4 pb-10 sm:px-8">
          <Reveal>
            <Eyebrow>{copy.outcomes.eyebrow}</Eyebrow>
            <SectionTitle className="max-w-2xl">{copy.outcomes.title}</SectionTitle>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.outcomes.items.map((item, index) => {
              const Icon = outcomeIcons[index];
              return (
                <Reveal className="flex" delay={index * 120} key={item.title}>
                  <article className="w-full rounded-[1.5rem] border border-white/15 bg-white/[0.1] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FDE68A] text-[#1E1B4B]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="tarify" className="relative mx-auto max-w-6xl scroll-mt-6 px-5 py-14 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>{copy.plans.eyebrow}</Eyebrow>
              <SectionTitle>{copy.plans.title}</SectionTitle>
              <p className="mt-4 text-lg leading-8 text-white/65">{copy.plans.body}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
            {plans.map((plan, index) => (
              <Reveal className={`flex ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 120} key={plan.id}>
                <PlanCard featured={plan.id === 'year'} plan={plan} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-3 rounded-[1.25rem] border border-[#FDE68A]/30 bg-[#FDE68A]/10 px-5 py-4 text-base leading-7 text-white">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#FDE68A]" aria-hidden="true" />
            {copy.guarantee}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/60">
            {copy.plans.footnote} {copy.plans.acceptBefore}{' '}
            <a className="text-white underline decoration-white/30 hover:decoration-white" href={premiumPath(lang, '/oferta')}>
              {copy.plans.offer}
            </a>{' '}
            {copy.plans.and}{' '}
            <a className="text-white underline decoration-white/30 hover:decoration-white" href={premiumPath(lang, '/oplata')}>
              {copy.plans.refundTerms}
            </a>
            .
          </p>
        </section>

        <SocialProof lang={lang} />

        <section className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <Eyebrow>{copy.features.eyebrow}</Eyebrow>
              <SectionTitle>{copy.features.title}</SectionTitle>
              <p className="mt-5 text-lg leading-8 text-white/65">{copy.features.body}</p>
              <p className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/55">
                <Smartphone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                {copy.features.device}
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.features.items.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <Reveal className="flex" delay={index * 90} key={feature.title}>
                    <article className="w-full rounded-[1.5rem] border border-white/15 bg-white/[0.1] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">{feature.body}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="kak-kupit" className="relative scroll-mt-6 border-y border-white/10 bg-[#161628]/70">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <Reveal>
              <Eyebrow>{copy.steps.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-2xl">{copy.steps.title}</SectionTitle>
            </Reveal>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {copy.steps.items.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <Reveal className="flex" delay={index * 100} key={step.title}>
                    <li className="w-full list-none rounded-[1.5rem] border border-white/15 bg-white/[0.1] p-6">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-bold text-white">{index + 1}</span>
                        <Icon className="h-5 w-5 text-[#C7D2FE]" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">{step.body}</p>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
            <ManualOrder />
          </div>
        </section>

        <section id="voprosy" className="relative mx-auto max-w-4xl px-5 pb-20 pt-14 sm:px-8">
          <Reveal>
            <Eyebrow center>{copy.faq.eyebrow}</Eyebrow>
            <SectionTitle center>{copy.faq.title}</SectionTitle>
          </Reveal>
          <div className="mt-8 grid gap-3">
            {copy.faq.items.map((item, index) => (
              <Reveal animation="fadeIn" delay={index * 40} key={item.q}>
                <details className="group rounded-[1.25rem] border border-white/15 bg-white/[0.1] p-5 backdrop-blur-xl open:bg-white/[0.14]">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-7 text-white/65 animate-in fade-in duration-300">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      </AccountProvider>
    </PremiumShell>
  );
}
