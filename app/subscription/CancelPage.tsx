import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang } from './i18n';
import { SubscriptionShell } from './SubscriptionShell';
import { Button } from './ui';

export function CancelPage({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  return (
    <SubscriptionShell lang={lang} page="/cancel">
      <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-10 text-center sm:px-8">
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.cancel.title}</h1>
        <p className="mt-6 text-lg leading-8 text-white/75">{copy.cancel.body}</p>
        <Button className="mt-8" href={`${subscriptionPath(lang)}#tarify`} variant="light">
          {copy.cancel.back}
        </Button>
      </section>
    </SubscriptionShell>
  );
}
