import { ArrowRight } from 'lucide-react';
import { appDownloadUrl } from '../content';
import { AppleGlyph, Art, Sparkle } from '../home/art';
import { CtaBand, whitePill } from '../home/CtaBand';
import { isRtl, siteCopy, type SiteLocale } from '../i18n';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { Reveal } from '../subscription/Reveal';
import { StarField } from '../subscription/StarField';

const sectionIcons = ['icon-moon-crescent', 'icon-chart', 'icon-sun'];
const valueIcons = ['icon-sparkle', 'icon-lock', 'icon-shield', 'icon-heart'];

// «Our story» on Napper, «Who we are» on Huckleberry: why the app exists, how
// it works and what it stands for — facts about the product only, no
// invented founder story.
export function AboutPage({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const copy = site.about;
  const home = locale === 'en' ? '/' : `/${locale}`;

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" dir={isRtl(locale) ? 'rtl' : undefined} lang={locale}>
      <StarField />
      <div className="relative z-10">
        <SiteHeader current="about" locale={locale} />

        <section className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-10 pt-4 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div>
            <Reveal animation="fadeIn" load>
              <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-xl">{copy.eyebrow}</p>
            </Reveal>
            <Reveal delay={120} load>
              <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.07] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.2rem]">{copy.title}</h1>
            </Reveal>
            <Reveal delay={240} load>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">{copy.body}</p>
            </Reveal>
            <Reveal delay={320} load>
              <a className={`${whitePill} mt-7 whitespace-normal! text-center sm:whitespace-nowrap!`} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                <AppleGlyph />
                {site.home.nav.download}
                <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <div aria-hidden="true" className="relative mx-auto hidden h-[340px] w-full max-w-[380px] sm:block">
            <div className="absolute inset-x-8 top-14 h-52 rounded-full bg-[#FDE68A]/15 blur-3xl" />
            <Reveal animation="zoomIn" className="absolute inset-x-[10%] top-0" delay={160} load>
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_28px_50px_rgb(15_16_34/45%)] rtl:-scale-x-100" height={560} name="cta-baby-star" priority width={503} />
              </div>
            </Reveal>
            <Sparkle className="end-[8%] top-[10%] w-4" delay={0} />
            <Sparkle className="bottom-[12%] start-[4%] w-3" delay={900} tone="lavender" />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-10 sm:px-8 md:grid-cols-3 lg:px-10">
          {copy.sections.map((section, index) => (
            <Reveal className="flex" delay={index * 110} key={section.title}>
              <article className="flex w-full flex-col rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                  <Art className="h-8 w-8 object-contain" height={192} name={sectionIcons[index]} width={192} />
                </span>
                <h2 className="mt-4 text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-2 text-[15px] leading-7 text-white/75">{section.body}</p>
              </article>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <Reveal>
            <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]">{copy.values.title}</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {copy.values.items.map((value, index) => (
              <Reveal className="flex" delay={index * 90} key={value.title}>
                <div className="flex w-full items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                    <Art className="h-7 w-7 object-contain" height={192} name={valueIcons[index]} width={192} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white">{value.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">{value.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand action={site.home.cta.action} body={site.home.cta.body} note={site.home.notes.cta} title={site.home.cta.title} />

        <SellerFooter home={home} locale={locale} note={site.home.footer} />
      </div>
    </main>
  );
}
