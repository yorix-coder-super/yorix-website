import { ArrowRight } from 'lucide-react';
import type { Locale } from '../locales';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { Reveal } from '../subscription/Reveal';
import { StarField } from '../subscription/StarField';
import { Art, guideIcon, Sparkle } from './art';
import { CtaBand } from './CtaBand';

export type GuideCard = { slug: string; href: string; title: string; description: string; category: string; date: string; readTime: string; coverClass: string };

// The guides index for every language: night sky, an open book with the star
// mascot, glass cards whose covers carry the guide's 3D icon.
export function GuidesIndex({
  locale,
  home,
  eyebrow,
  title,
  body,
  guides,
  cta,
  footer,
}: {
  locale: Locale | 'en';
  home: string;
  eyebrow: string;
  title: string;
  body: string;
  guides: GuideCard[];
  cta: { title: string; body: string; action: string };
  footer: string;
}) {
  const rtl = locale === 'ar' || locale === 'he';

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" dir={rtl ? 'rtl' : undefined} lang={locale}>
      <StarField />
      <div className="relative z-10">
        <SiteHeader locale={locale} />

        <section className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-8 pt-4 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div>
            <Reveal animation="fadeIn" load>
              <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-xl">{eyebrow}</p>
            </Reveal>
            <Reveal delay={120} load>
              <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.2rem]">{title}</h1>
            </Reveal>
            <Reveal delay={240} load>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">{body}</p>
            </Reveal>
          </div>
          <div aria-hidden="true" className="relative mx-auto hidden h-[300px] w-full max-w-[420px] sm:block">
            <div className="absolute inset-x-10 top-10 h-48 rounded-full bg-[#6366F1]/30 blur-3xl" />
            <Reveal animation="zoomIn" className="absolute left-[14%] top-[8%] w-[52%]" delay={160} load>
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_28px_50px_rgb(15_16_34/45%)]" height={192} name="icon-book" priority width={191} />
              </div>
            </Reveal>
            <Reveal animation="zoomIn" className="absolute bottom-[4%] right-[6%] w-[36%]" delay={360} load>
              <div className="bob">
                <Art className="h-auto w-full" height={420} name="star-mascot" width={410} />
              </div>
            </Reveal>
            <Sparkle className="right-[22%] top-[6%] w-4" delay={0} />
            <Sparkle className="bottom-[20%] left-[8%] w-3" delay={900} tone="lavender" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <Reveal className="flex" delay={(index % 3) * 90} key={guide.slug}>
                <a className="group flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.06] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25" href={guide.href}>
                  <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${guide.coverClass}`}>
                    <Art className="absolute right-6 top-1/2 h-24 w-24 -translate-y-1/2 object-contain drop-shadow-[0_16px_30px_rgb(15_16_34/40%)] transition duration-500 group-hover:scale-110" height={192} name={guideIcon(guide.slug)} width={192} />
                    <span className="absolute bottom-4 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{guide.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm text-white/55">
                      {guide.date} · {guide.readTime}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold leading-tight text-white">{guide.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/65">{guide.description}</p>
                    <span className="mt-auto flex justify-end pt-4">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition group-hover:bg-white group-hover:text-[#1E1B4B]">
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand action={cta.action} body={cta.body} title={cta.title} />
        <SellerFooter home={home} lang={locale === 'ru' ? 'ru' : 'en'} note={footer} />
      </div>
    </main>
  );
}
