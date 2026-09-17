import { ArrowRight } from 'lucide-react';
import { AccountPanel, AccountProvider, PlanCard } from './account';
import { premiumCopy } from './copy';
import { premiumPath, type Lang } from './i18n';
import { plans } from './merchant';
import { Reveal } from './Reveal';
import { Eyebrow, SectionTitle } from './ui';

// The purchase, on the landing page itself: the same account panel and plan
// cards as /premium, so a visitor buys without leaving the page they came
// to. The full page keeps the bank-facing texts and the legal documents.
export function HomePremiumSection({ lang }: { lang: Lang }) {
  const copy = premiumCopy[lang];

  return (
    <section id="premium" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-16 sm:px-8 lg:px-10" lang={lang}>
      <AccountProvider lang={lang}>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <Eyebrow>{copy.home.eyebrow}</Eyebrow>
            <SectionTitle>{copy.home.title}</SectionTitle>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">{copy.home.body}</p>
            <AccountPanel />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal className={`flex ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 120} key={plan.id}>
                <PlanCard featured={plan.id === 'year'} plan={plan} />
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-6 text-white/60">
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
