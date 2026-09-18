import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { AccountLine, AccountProvider, PlanCard, RequestForm } from '../subscription/account';
import { subscriptionCopy } from '../subscription/copy';
import { subscriptionPath } from '../subscription/i18n';
import { merchant, plans } from '../subscription/merchant';
import { Reveal } from '../subscription/Reveal';
import { Art } from './art';
import { homeCopy, type HomeLocale } from './copy';

// The home page's storefront: the same plan buttons as /subscription
// (sign in with Apple → WebPay, regional prices from cf-ipcountry), laid out
// as the concept's glass panel with the trust points beside the cards.
export async function HomePricing({ lang }: { lang: HomeLocale }) {
  const copy = subscriptionCopy[lang];
  const home = homeCopy(lang);
  const requestHeaders = await headers();
  const points = [
    { icon: 'icon-calendar', text: copy.plans.trust },
    { icon: 'icon-shield', text: home.pricing.secure },
    { icon: 'icon-phone', text: home.pricing.activates },
  ];

  return (
    <section className="mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="subscription" lang={lang}>
      <AccountProvider acceptLanguage={requestHeaders.get('accept-language')} country={requestHeaders.get('cf-ipcountry')} lang={lang}>
        <RequestForm />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgb(0_0_0/18%)] backdrop-blur-xl sm:p-7">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/90">
            {copy.home.title.replace(/\.$/, '')}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_0.95fr] lg:items-stretch">
            {plans.map((plan, index) => (
              <Reveal className={`flex min-w-0 ${plan.id === 'year' ? 'order-first md:order-none' : ''}`} delay={index * 110} key={plan.id}>
                <PlanCard featured={plan.id === 'year'} plan={plan} />
              </Reveal>
            ))}
            <Reveal className="md:col-span-3 lg:col-span-1" delay={360}>
              <ul className="grid h-full content-center gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:pl-2">
                {points.map((point) => (
                  <li className="flex items-center gap-3.5 text-sm leading-5 text-white/80" key={point.icon}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                      <Art className="h-7 w-7 object-contain" height={192} name={point.icon} width={192} />
                    </span>
                    {point.text}
                  </li>
                ))}
                <li className="flex items-center gap-3.5 text-sm leading-5 text-white/80">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                    <Art className="h-7 w-7 object-contain" height={192} name="icon-question" width={192} />
                  </span>
                  <span>
                    {home.pricing.questions}
                    <br />
                    <a className="font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white" href={`mailto:${merchant.email}`}>
                      {merchant.email}
                    </a>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>
          <AccountLine className="mt-6 text-sm leading-6 text-white/60" />
          <a className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white" href={subscriptionPath(lang)}>
            {copy.home.more}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </AccountProvider>
    </section>
  );
}
