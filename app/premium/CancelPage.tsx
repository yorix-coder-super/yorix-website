import { premiumCopy } from './copy';
import { premiumPath, type Lang } from './i18n';
import { PremiumShell } from './PremiumShell';
import { Button } from './ui';

export function CancelPage({ lang }: { lang: Lang }) {
  const copy = premiumCopy[lang];
  return (
    <PremiumShell lang={lang} page="/cancel">
      <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-10 text-center sm:px-8">
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.cancel.title}</h1>
        <p className="mt-6 text-lg leading-8 text-white/75">{copy.cancel.body}</p>
        <Button className="mt-8" href={`${premiumPath(lang)}#tarify`} variant="light">
          {copy.cancel.back}
        </Button>
      </section>
    </PremiumShell>
  );
}
