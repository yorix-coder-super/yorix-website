import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { AccountLine, AccountProvider, PlanCard, RequestForm } from './account';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang } from './i18n';
import { plans } from './merchant';
import { Reveal } from './Reveal';
import { Eyebrow, SectionTitle } from './ui';

// The short form of the storefront on the landing page: three prices, the
// same plan buttons (sign in with Apple → WebPay), one trust line and a link
// to the full page with the terms, refunds and FAQ.
export async function HomeSubscriptionSection({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');

  return (
    <section id="subscription" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-16 sm:px-8 lg:px-10" lang={lang}>
      <AccountProvider acceptLanguage={acceptLanguage} country={country} lang={lang}>
        <RequestForm />
        <Reveal>
          <Eyebrow>{copy.home.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-2xl">{copy.home.title}</SectionTitle>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{copy.home.body}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal className={`flex min-w-0 ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 120} key={plan.id}>
              <PlanCard featured={plan.id === 'year'} plan={plan} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-base font-semibold leading-7 text-white">{copy.plans.trust}</p>
        <AccountLine className="mt-2 text-sm leading-6 text-white/60" />
        <a className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white" href={subscriptionPath(lang)}>
          {copy.home.more}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </AccountProvider>
    </section>
  );
}
