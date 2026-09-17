import { ArrowRight, ShieldCheck } from 'lucide-react';
import { headers } from 'next/headers';
import { AccountPanel, AccountProvider, CurrencySwitcher, PlanCard, RequestForm } from './account';
import { premiumCopy } from './copy';
import { premiumPath, type Lang } from './i18n';
import { plans } from './merchant';
import { Reveal } from './Reveal';
import { Eyebrow, SectionTitle } from './ui';

// The purchase, on the landing page itself: the same account panel and plan
// cards as /premium, so a visitor buys without leaving the page they came
// to. The full page keeps the bank-facing texts and the legal documents.
export async function HomePremiumSection({ lang }: { lang: Lang }) {
  const copy = premiumCopy[lang];
  const country = (await headers()).get('cf-ipcountry');

  return (
    <section id="premium" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-16 sm:px-8 lg:px-10" lang={lang}>
      <AccountProvider country={country} lang={lang}>
        <RequestForm />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <Eyebrow>{copy.home.eyebrow}</Eyebrow>
            <SectionTitle className="max-w-2xl">{copy.home.title}</SectionTitle>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{copy.home.body}</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">{copy.hero.nextRequest}</p>
          </Reveal>
          <Reveal delay={140}>
            <AccountPanel />
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal className={`flex min-w-0 ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 120} key={plan.id}>
              <PlanCard featured={plan.id === 'year'} plan={plan} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <CurrencySwitcher />
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-6 text-white/70">
          <ShieldCheck className="h-5 w-5 text-[#FDE68A]" aria-hidden="true" />
          <span>{copy.home.note}</span>
          <a className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/30 hover:decoration-white" href={premiumPath(lang, '/oplata')}>
            {copy.home.details}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </p>
      </AccountProvider>
    </section>
  );
}
