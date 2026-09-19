import { headers } from 'next/headers';
import { AccountProvider } from '../account';
import { subscriptionCopy } from '../copy';
import type { Lang } from '../i18n';
import { Reveal } from '../Reveal';
import { SubscriptionShell } from '../SubscriptionShell';
import { GiftCheckout } from './GiftCheckout';

// The gift page of the card-sales countries (the proxy sends everyone else
// home): headline, then the live card and the checkout.
export async function GiftPage({ lang }: { lang: Lang }) {
  const text = subscriptionCopy[lang].gift;
  const requestHeaders = await headers();

  return (
    <SubscriptionShell lang={lang} page="/gift">
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-8 lg:px-10">
        <Reveal animation="fadeIn" load>
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-xl">{text.eyebrow}</p>
        </Reveal>
        <Reveal delay={120} load>
          <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-[3rem]">{text.title}</h1>
        </Reveal>
        <Reveal delay={240} load>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">{text.body}</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-4 sm:px-8 lg:px-10">
        <AccountProvider acceptLanguage={requestHeaders.get('accept-language')} country={requestHeaders.get('cf-ipcountry')} lang={lang}>
          <GiftCheckout />
        </AccountProvider>
      </section>
    </SubscriptionShell>
  );
}
