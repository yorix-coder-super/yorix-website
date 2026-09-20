import { Clock, Gift, Mail } from 'lucide-react';
import { Art, Sparkle } from '../home/art';
import { CtaBand, FaqItem, whitePill } from '../home/CtaBand';
import { docsLang, isRtl, siteCopy, type SiteLocale } from '../i18n';
import { SellerFooter } from '../SellerFooter';
import { ContactForm } from './ContactForm';
import { SiteHeader } from '../SiteHeader';
import { subscriptionPath } from '../subscription/i18n';
import { Reveal } from '../subscription/Reveal';
import { sellsHere } from '../subscription/region';
import { StarField } from '../subscription/StarField';

const topicIcons = ['icon-sparkle', 'icon-card', 'icon-heart', 'icon-clock', 'icon-bolt'];

// The help page every app of this kind has (Napper's Support, Huckleberry's
// Help): questions grouped by topic, answered with the app's own labels,
// then the two ways to reach a person.
export async function SupportPage({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const copy = site.support;
  const home = locale === 'en' ? '/' : `/${locale}`;
  const web = await sellsHere();
  const docs = docsLang(locale);

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" dir={isRtl(locale) ? 'rtl' : undefined} lang={locale}>
      <StarField />
      <div className="relative z-10">
        <SiteHeader current="support" locale={locale} />

        <section className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-8 pt-4 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
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
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a className={whitePill} href="#contact">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  {site.footerLabels.write}
                </a>
                <a className="inline-flex items-center gap-2 text-base font-semibold text-white/85 underline decoration-white/30 underline-offset-4 hover:decoration-white" href={docs === 'ru' ? '/ru/gift' : '/gift'}>
                  <Gift className="h-5 w-5" aria-hidden="true" />
                  {site.footerLabels.redeem}
                </a>
              </div>
            </Reveal>
          </div>
          <div aria-hidden="true" className="relative mx-auto hidden h-[320px] w-full max-w-[380px] sm:block">
            <div className="absolute inset-x-8 top-12 h-52 rounded-full bg-[#6366F1]/30 blur-3xl" />
            <Reveal animation="zoomIn" className="absolute inset-x-[12%] top-[2%]" delay={160} load>
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_28px_50px_rgb(15_16_34/45%)]" height={440} name="support-mascot" priority width={420} />
              </div>
            </Reveal>
            <Sparkle className="end-[10%] top-[8%] w-4" delay={0} />
            <Sparkle className="bottom-[16%] start-[6%] w-3" delay={900} tone="lavender" />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-6 sm:px-8 lg:px-10">
          {copy.topics.map((topic, index) => (
            <Reveal key={topic.title}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                  <Art className="h-7 w-7 object-contain" height={192} name={topicIcons[index] ?? 'icon-question'} width={192} />
                </span>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">{topic.title}</h2>
              </div>
              <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
                {topic.items.map((item) => (
                  <FaqItem answer={item.answer} key={item.question} question={item.question} />
                ))}
              </div>
            </Reveal>
          ))}
          {web ? (
            <p className="text-sm leading-6 text-white/70">
              <a className="font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white" href={`${subscriptionPath(docs)}#faq`}>
                {copy.web}
              </a>
            </p>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-6 px-5 py-10 sm:px-8 lg:px-10" id="contact">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(120%_150%_at_8%_0%,#DB2777_0%,#9333EA_36%,#5B21B6_62%,#2E1065_100%)] shadow-[0_40px_120px_rgb(147_51_234/35%)]">
              <div aria-hidden="true" className="absolute -bottom-32 -start-20 -z-10 h-80 w-80 rounded-full bg-[#FDE68A]/20 blur-3xl" />
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-12">
                <div className="text-center lg:text-start">
                  <div aria-hidden="true" className="relative mx-auto w-[min(62%,15rem)] lg:mx-0 lg:w-[min(80%,19rem)]">
                    <div className="float-slow">
                      <Art className="h-auto w-full drop-shadow-[0_24px_44px_rgb(30_27_75/45%)]" height={765} name="contact-letter" width={760} />
                    </div>
                  </div>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#FDE68A]">{copy.contact.title}</p>
                  <h2 className="mt-2 text-[2rem] font-semibold leading-[1.1] text-white sm:text-[2.4rem]">{site.footerLabels.write}</h2>
                  <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/85 lg:mx-0">{copy.contact.body}</p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                    <Clock aria-hidden="true" className="h-4 w-4" />
                    {copy.contact.reply}
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-xl sm:p-7">
                  <ContactForm
                    copy={copy.form}
                    lang={locale}
                    page={locale === 'en' ? '/support' : `/${locale}/support`}
                    privacyHref={subscriptionPath(docs, '/privacy')}
                    privacyLabel={site.subscription.docs.privacy}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <CtaBand action={site.home.cta.action} body={site.home.cta.body} note={site.home.notes.cta} title={site.home.cta.title} />

        <SellerFooter home={home} locale={locale} note={site.home.footer} />
      </div>
    </main>
  );
}
