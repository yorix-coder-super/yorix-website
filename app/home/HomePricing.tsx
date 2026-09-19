import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { appDownloadUrl } from '../content';
import { docsLang, shotLocale, siteCopy, type SiteLocale } from '../i18n';
import { toWire } from '../i18n/wire';
import { AccountProvider, ChargeNote, CheckoutDialog, PlanCard } from '../subscription/account';
import { currencyForVisitor, sellsOnWeb } from '../subscription/currency';
import { subscriptionCopy } from '../subscription/copy';
import { subscriptionPath } from '../subscription/i18n';
import { plans } from '../subscription/merchant';
import { Reveal } from '../subscription/Reveal';
import { AppleGlyph, Art, featureIcons, PhoneFrame, Sparkle } from './art';

// The home page's storefront: the same plan buttons as /subscription
// (sign in with Apple → the acquirer's page), laid out as the concept's glass
// panel with the trust points beside the cards. Visitors outside Belarus and
// Russia get the App Store instead of web prices.
export async function HomePricing({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const copy = site.subscription;
  const lang = docsLang(locale);
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');

  if (!sellsOnWeb(currencyForVisitor(country, acceptLanguage))) {
    return (
      <section className="mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="subscription">
        <AppStorePanel locale={locale} />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="subscription">
      <AccountProvider
        acceptLanguage={acceptLanguage}
        copy={toWire(copy)}
        country={country}
        docsNote={site.docsNote}
        lang={lang}
        locale={locale}
        plans={site.plans}
      >
        <CheckoutDialog />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgb(0_0_0/18%)] backdrop-blur-xl sm:p-7">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/90">
            {copy.home.title.replace(/\.$/, '')}
          </p>
          <PlanGrid locale={locale} />
          <ChargeNote className="mt-6 text-sm leading-6 text-white/50" />
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <a className="inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white" href={subscriptionPath(lang)}>
              {copy.home.more}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </a>
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white" href={subscriptionPath(lang, '/gift')}>
              <Art className="h-5 w-5 object-contain" height={250} name="icon-gift" width={192} />
              {subscriptionCopy[lang].gift.eyebrow}
            </a>
          </div>
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
              <a className="font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white" href={`${locale === 'en' ? '' : `/${locale}`}/support#contact`}>
                {site.footerLabels.write}
              </a>
            </span>
          </li>
        </ul>
      </Reveal>
    </div>
  );
}

// Where the site does not sell by card the subscription lives in the app, so
// this is the page's last big invitation: a bright night-sky banner with the
// real app in the visitor's language, the moon baby and the four features.
export function AppStorePanel({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const home = site.home;
  const shots = shotLocale(locale);
  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(120%_140%_at_88%_12%,#DB2777_0%,#9333EA_30%,#4C1D95_58%,#1E1B4B_100%)] shadow-[0_40px_120px_rgb(147_51_234/35%)]">
        <div aria-hidden="true" className="absolute -top-28 end-[-6rem] -z-10 h-[26rem] w-[26rem] rounded-full bg-[#F472B6]/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 end-[18%] -z-10 h-80 w-80 rounded-full bg-[#FDE68A]/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -start-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#6366F1]/30 blur-3xl" />
        <Art className="drift pointer-events-none absolute -bottom-[10%] start-[-5%] -z-10 w-[110%] max-w-none opacity-40 rtl:-scale-x-100" height={511} name="cloud-bank" width={1536} />
        <div className="grid items-center gap-2 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 order-2 p-7 pt-2 sm:p-10 sm:pt-4 lg:order-1 lg:py-12 lg:pe-0 lg:ps-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur" dir="ltr">
              <AppleGlyph className="h-4 w-4" />
              iPhone · iPad
            </p>
            <h2 className="mt-5 max-w-xl text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-[2.6rem]">{home.appStore.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-[17px]">{home.appStore.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {home.features.map((feature, index) => (
                <li className="flex items-center gap-3 text-[15px] font-medium leading-5 text-white" key={feature.title}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/20">
                    <Art className="h-6 w-6 object-contain" height={192} name={featureIcons[index] ?? 'icon-sparkle'} width={192} />
                  </span>
                  {feature.title}
                </li>
              ))}
            </ul>
            <a
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-black px-5 py-2.5 text-white shadow-[0_18px_40px_rgb(0_0_0/35%)] transition hover:-translate-y-0.5 hover:border-white/60"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <AppleGlyph className="h-8 w-8" />
              <span className="leading-tight">
                <span className="block text-xs text-white/80">{site.footerLabels.badgeTop}</span>
                <span className="block text-xl font-semibold" dir="ltr">
                  App Store
                </span>
              </span>
            </a>
          </div>
          <div aria-hidden="true" className="relative order-1 h-[330px] sm:h-[400px] lg:order-2 lg:h-[500px]">
            <div className="absolute start-1/2 top-[9%] w-[34%] max-w-[220px] -translate-x-[62%] rtl:translate-x-[62%] lg:top-[12%] lg:w-[38%]">
              <div className="float-slower -rotate-6">
                <PhoneFrame alt="" src={`/shots/${shots}-coach.webp`} />
              </div>
            </div>
            <div className="absolute end-[4%] top-[2%] w-[42%] max-w-[260px] lg:end-[6%] lg:top-[6%]">
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/45%)]" height={900} name="hero-baby-moon" width={817} />
              </div>
            </div>
            <Art className="absolute -bottom-[3%] end-[-3%] w-[36%] max-w-[230px]" height={290} name="cloud-4" width={384} />
            <Art className="absolute -bottom-[2%] start-[14%] w-[44%] max-w-[280px]" height={163} name="cloud-3" width={384} />
            <Orb className="start-[10%] top-[20%]" delay={0} name="icon-bottle" />
            <Orb className="end-[8%] bottom-[30%]" delay={700} name="icon-chat" />
            <Orb className="start-[4%] bottom-[24%]" delay={1400} name="icon-chart" />
            <Orb className="end-[40%] top-[4%]" delay={2100} name="icon-moon-crescent" small />
            <Sparkle className="start-[26%] top-[6%] w-5" delay={200} />
            <Sparkle className="end-[2%] top-[44%] w-4" delay={900} tone="lavender" />
            <Sparkle className="start-[46%] bottom-[18%] w-3" delay={1600} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Orb({ name, className, delay, small = false }: { name: string; className: string; delay: number; small?: boolean }) {
  return (
    <span className={`absolute ${className}`}>
      <span
        className={`bob grid place-items-center rounded-full bg-white/15 shadow-[0_12px_30px_rgb(15_16_34/35%)] ring-1 ring-white/25 backdrop-blur ${small ? 'h-11 w-11' : 'h-14 w-14 sm:h-16 sm:w-16'}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <Art className={small ? 'h-6 w-6 object-contain' : 'h-8 w-8 object-contain sm:h-9 sm:w-9'} height={192} name={name} width={192} />
      </span>
    </span>
  );
}
