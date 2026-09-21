import { ArrowRight } from 'lucide-react';
import { appDownloadUrl } from '../content';
import { AppleGlyph, AppQr, Art, DoodleHeart, featureIcons, Hand, PhoneFrame, Sparkle } from '../home/art';
import type { SubscriptionCopy } from './copy';
import { formatDate, type Lang } from './i18n';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';
import { Tilt } from './Tilt';
import { Button } from './ui';

/**
 * What a buyer sees the moment the money lands: the date they paid for, the
 * one thing left to do (open the app), and what they just unlocked. The page
 * is the receipt and the welcome at once, so it is built like a hero rather
 * than a status line — the art is the same baby and the same app screen the
 * storefront promised, now with the subscription on.
 */
export function PaidScreen({ until, lang, copy }: { until: string; lang: Lang; copy: SubscriptionCopy }) {
  const t = copy.ret;
  const support = `${lang === 'ru' ? '/ru' : ''}/support#contact`;

  return (
    <div className="relative text-start">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6">
        <div>
          <Reveal load>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pe-4 ps-2 text-sm font-semibold text-white ring-1 ring-white/15">
              <Art className="h-6 w-6" height={96} name="star" width={96} />
              {t.badge}
            </p>
          </Reveal>
          {/* Thanks leads, the receipt follows: the first is why anyone feels
              good about this screen, the second is what they came to check. */}
          <Reveal delay={120} load>
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.1] text-white sm:text-5xl">{t.thanks}</h1>
          </Reveal>
          <Reveal delay={180} load>
            <p className="mt-4 text-xl font-semibold leading-8 text-white/90 sm:text-2xl">
              {t.paidLead} <span className="text-[#FDE68A]">{formatDate(until, lang)}</span>
            </p>
          </Reveal>
          <Reveal delay={240} load>
            <p className="mt-3 max-w-xl text-lg leading-8 text-white/70">{t.openApp}</p>
          </Reveal>
          <Reveal delay={280} load>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <a
                  className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2 text-white transition hover:-translate-y-0.5 hover:border-white/50 active:translate-y-0"
                  href={appDownloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <AppleGlyph className="h-7 w-7" />
                  <span className="leading-tight">
                    <span className="block text-[11px] text-white/80">{t.badgeTop}</span>
                    <span className="block text-lg font-semibold">App Store</span>
                  </span>
                </a>
              </Magnetic>
              {/* The phone in hand taps the badge; the code is for whoever paid at a desk. */}
              <div className="hidden items-center gap-3 sm:flex">
                <AppQr className="w-[4.5rem] shrink-0" label={t.scan} />
                <span className="leading-tight">
                  <span className="block font-semibold text-white">{t.qrTitle}</span>
                  <span className="mt-0.5 block text-sm text-white/55">{t.qrHint}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal animation="zoomIn" delay={180} load>
          {/* A fixed ratio, with both objects placed inside it: the phone is
              taller than the mascot, and without a reserved box it hangs out
              of the column and lands on the row below. */}
          <div className="relative mx-auto aspect-[1/0.9] w-full max-w-sm lg:max-w-md">
            <div className="float-slow absolute bottom-0 start-0 w-[72%]">
              <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/45%)]" height={560} name="cta-baby-star" priority width={503} />
            </div>
            {/* The app, already unlocked, leaning out from behind the mascot —
                and the one object on this page that follows the cursor. */}
            <div className="absolute end-0 top-[2%] w-[40%] rotate-[4deg] rtl:-rotate-[4deg]">
              <Tilt>
                <PhoneFrame
                  alt={lang === 'ru' ? 'Экран «Сегодня» в Yorix' : 'The Today screen in Yorix'}
                  bezel="p-[1.4%]"
                  src={`/shots/${lang}-today.webp`}
                />
              </Tilt>
            </div>
            <Sparkle className="top-[4%] start-[10%] w-4" delay={200} />
            <Sparkle className="bottom-[22%] start-0 w-3" delay={1100} tone="lavender" />
            <Hand className="absolute -top-6 end-[-2%] hidden w-40 rotate-[7deg] rtl:-rotate-[7deg] text-[1.35rem] text-[#E0E7FF] xl:block">
              {t.noteTop} <DoodleHeart className="h-5 w-5 text-[#FDE68A]" />
            </Hand>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.features.map((feature, index) => (
          <Reveal delay={360 + index * 70} key={feature.title} load="visible">
            <div className="spotlight flex h-full items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25">
              <Art className="h-11 w-11 shrink-0" height={192} name={featureIcons[index % featureIcons.length]} width={192} />
              <span className="leading-tight">
                <span className="block font-semibold text-white">{feature.title}</span>
                <span className="mt-0.5 block text-sm text-white/60">{feature.sub}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={640} load="visible">
        <div className="spotlight relative mt-8 flex flex-col items-center gap-5 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:flex-row sm:justify-between sm:p-8">
          {/* Support wears its own face everywhere else on the site; a bare
              card here looked like a different product's. */}
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 start-6 hidden w-28 sm:block lg:w-32">
            <div className="absolute inset-x-2 bottom-4 h-20 rounded-full bg-[#6366F1]/30 blur-2xl" />
            <div className="float-slower relative">
              <Art className="h-auto w-full drop-shadow-[0_18px_34px_rgb(15_16_34/45%)]" height={440} name="support-mascot" width={420} />
            </div>
          </div>
          <div className="text-center sm:ms-36 sm:text-start lg:ms-40">
            <p className="text-xl font-semibold text-white">{t.helpTitle}</p>
            <p className="mt-1 leading-7 text-white/70">{t.helpBody}</p>
          </div>
          <Magnetic className="shrink-0">
            <Button href={support} variant="light">
              {t.helpCta}
              <ArrowRight aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
            </Button>
          </Magnetic>
          <Sparkle className="start-[7.5rem] top-5 hidden w-3 sm:block" delay={600} tone="lavender" />
        </div>
      </Reveal>

      <Reveal delay={720} load="visible">
        <Hand className="mt-8 text-center text-[1.5rem] text-[#FDE68A] lg:text-end">
          {t.noteThanks} <DoodleHeart className="h-6 w-6" />
        </Hand>
      </Reveal>
    </div>
  );
}
