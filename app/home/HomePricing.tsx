import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import { appDownloadUrl } from '../content';
import { docsLang, siteCopy, type SiteLocale } from '../i18n';
import { toWire } from '../i18n/wire';
import { AccountProvider, ChargeNote, CheckoutDialog, PlanCard } from '../subscription/account';
import { currencyForVisitor, sellsOnWeb } from '../subscription/currency';
import { subscriptionCopy } from '../subscription/copy';
import { subscriptionPath } from '../subscription/i18n';
import { Magnetic } from '../subscription/Magnetic';
import { plans } from '../subscription/merchant';
import { Parallax } from '../subscription/Parallax';
import { Reveal } from '../subscription/Reveal';
import { AppleGlyph, AppQr, Art, featureIcons, Sparkle } from './art';

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
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-white/30 hover:text-white hover:decoration-white" href={`${lang === 'ru' ? '/ru' : ''}/gift`}>
              {subscriptionCopy[lang].gift.entryTitle}
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
// this is the page's last big invitation: the night-sky scene (generated for
// this banner) with the four features and the App Store badge over its calm
// left side — on a phone the scene sits on top and the text below it.
export function AppStorePanel({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const home = site.home;
  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(100deg,#12144F_0%,#1A1D66_52%,#3730A3_100%)] shadow-[0_40px_120px_rgb(79_70_229/28%)] rtl:bg-[linear-gradient(260deg,#12144F_0%,#1A1D66_52%,#3730A3_100%)]">
        {/* The mask stays put while the scene drifts under it; the zoom keeps its edges out of sight.
            Right-to-left pages mirror the whole panel: the scene, its fade and the gradient. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[15rem] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)] sm:h-[19rem] lg:inset-y-0 lg:end-0 lg:start-auto lg:h-full lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_22%)] rtl:lg:[mask-image:linear-gradient(to_left,transparent,black_22%)]"
        >
          <Parallax className="h-full w-full" scale={[1.16, 1.1]} y={[-12, 12]}>
            <img alt="" className="h-full w-full object-cover object-[72%_32%] lg:object-[46%_50%] rtl:-scale-x-100" height={1024} loading="lazy" src="/art/showcase-night.webp" width={1536} />
          </Parallax>
          <Sparkle className="end-[30%] top-[12%] w-3.5" delay={0} />
          <Sparkle className="end-[8%] top-[34%] w-3" delay={1000} tone="lavender" />
          <Sparkle className="bottom-[22%] end-[44%] hidden w-2.5 lg:block" delay={1900} />
        </div>
        <div className="relative grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="p-7 pt-[14rem] sm:p-10 sm:pt-[18rem] lg:py-14 lg:pe-0 lg:ps-12 lg:pt-14">
            <Reveal delay={100}>
              <h2 className="max-w-xl text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-[2.6rem]">{home.appStore.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-[17px]">{home.appStore.body}</p>
            </Reveal>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {home.features.map((feature, index) => (
                <li key={feature.title}>
                  <Reveal animation="fadeIn" className="group flex items-center gap-3 text-[15px] font-medium leading-5 text-white" delay={220 + index * 80}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/20 transition duration-300 group-hover:scale-110 group-hover:bg-white/20">
                      <Art className="h-6 w-6 object-contain" height={192} name={featureIcons[index] ?? 'icon-sparkle'} width={192} />
                    </span>
                    {feature.title}
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5" delay={460}>
              <Magnetic className="inline-flex">
                <a
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-black px-5 py-2.5 text-white shadow-[0_18px_40px_rgb(0_0_0/35%)] transition hover:-translate-y-0.5 hover:border-white/60 active:translate-y-0 active:scale-[0.98]"
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
              </Magnetic>
              <AppQr className="hidden w-[7.5rem] shrink-0 rotate-[-6deg] transition duration-300 hover:rotate-0 hover:scale-105 sm:block rtl:rotate-[6deg] rtl:hover:rotate-0" label={`${site.footerLabels.scan} — ${site.footerLabels.scanHint}`} />
            </Reveal>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
