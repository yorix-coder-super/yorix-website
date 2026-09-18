import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { docsLang, siteCopy, type SiteLocale } from '../i18n';
import { toWire } from '../i18n/wire';
import { AccountLine, AccountProvider, PlanCard, RequestForm } from '../subscription/account';
import { subscriptionPath } from '../subscription/i18n';
import { merchant, plans } from '../subscription/merchant';
import { Reveal } from '../subscription/Reveal';
import { Art } from './art';

// The home page's storefront: the same plan buttons as /subscription
// (sign in with Apple → WebPay, regional prices from cf-ipcountry), laid out
// as the concept's glass panel with the trust points beside the cards.
export async function HomePricing({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const copy = site.subscription;
  const lang = docsLang(locale);
  const requestHeaders = await headers();

  return (
    <section className="mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="subscription">
      <AccountProvider
        acceptLanguage={requestHeaders.get('accept-language')}
        copy={toWire(copy)}
        country={requestHeaders.get('cf-ipcountry')}
        docsNote={site.docsNote}
        lang={lang}
        locale={locale}
        plans={site.plans}
      >
        <RequestForm />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgb(0_0_0/18%)] backdrop-blur-xl sm:p-7">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/90">
            {copy.home.title.replace(/\.$/, '')}
          </p>
          <PlanGrid locale={locale} />
          <AccountLine className="mt-6 text-sm leading-6 text-white/60" />
          <a className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white" href={subscriptionPath(lang)}>
            {copy.home.more}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </a>
        </div>
      </AccountProvider>
    </section>
  );
}

// Three plan cards (the year first on phones) and the four promises beside
// them: one payment, WebPay, instant activation, a human to write to. Must sit
// inside an AccountProvider.
export function PlanGrid({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const copy = site.subscription;
  const home = site.home;
  const points = [
    { icon: 'icon-calendar', text: copy.plans.trust },
    { icon: 'icon-shield', text: home.pricing.secure },
    { icon: 'icon-phone', text: home.pricing.activates },
  ];

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_0.95fr] xl:items-stretch">
      {plans.map((plan, index) => (
        <Reveal className={`flex min-w-0 ${plan.id === 'year' ? 'order-first lg:order-none' : ''}`} delay={index * 110} key={plan.id}>
          <PlanCard featured={plan.id === 'year'} plan={plan} />
        </Reveal>
      ))}
      <Reveal className="lg:col-span-3 xl:col-span-1" delay={360}>
        <ul className="grid h-full content-center gap-5 sm:grid-cols-2 xl:grid-cols-1 xl:ps-2">
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
            <span className="min-w-0">
              {home.pricing.questions}
              <br />
              <a className="font-semibold text-white underline decoration-white/30 underline-offset-2 [overflow-wrap:anywhere] hover:decoration-white" href={`mailto:${merchant.email}`}>
                {merchant.email}
              </a>
            </span>
          </li>
        </ul>
      </Reveal>
    </div>
  );
}
