import { ArrowRight } from 'lucide-react';
import { Art, Sparkle } from '../home/art';
import { whitePill } from '../home/CtaBand';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang } from './i18n';
import { merchant } from './merchant';
import { SubscriptionShell } from './SubscriptionShell';

export function CancelPage({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  return (
    <SubscriptionShell lang={lang} page="/cancel">
      <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-6 text-center sm:px-8">
        <div className="relative mx-auto w-40 sm:w-48">
          <div className="bob">
            <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/40%)]" height={420} name="star-mascot" priority width={410} />
          </div>
          <Sparkle className="-left-6 top-4 w-3" delay={300} tone="lavender" />
          <Sparkle className="-right-4 top-10 w-4" delay={1100} />
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.cancel.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">{copy.cancel.body}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a className={whitePill} href={`${subscriptionPath(lang)}#plans`}>
            {copy.cancel.back}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a className="text-sm font-medium text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white" href={`mailto:${merchant.email}`}>
            {merchant.email}
          </a>
        </div>
      </section>
    </SubscriptionShell>
  );
}
