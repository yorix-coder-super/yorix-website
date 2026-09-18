import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  LineChart,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Volume2,
} from 'lucide-react';
import { headers } from 'next/headers';
import { BrandLogo } from './BrandLogo';
import { SiteHeader } from './SiteHeader';
import { Magnetic } from './subscription/Magnetic';
import { WordReveal } from './subscription/WordReveal';
import { HomeSubscriptionSection } from './subscription/HomeSubscriptionSection';
import { testimonials } from './subscription/testimonials';
import { Parallax } from './subscription/Parallax';
import { Reveal } from './subscription/Reveal';
import { StarField } from './subscription/StarField';
import { SellerFooter } from './SellerFooter';
import { appDownloadUrl, topicPages } from './content';

const heroScreens = [
  {
    src: '/screen-progress.png',
    alt: 'Yorix progress dashboard showing sleep, feeding, diaper, walk, bath, and play statistics',
    className:
      'left-0 top-24 z-10 hidden w-[38%] rotate-[-7deg] opacity-95 sm:block sm:w-[34%] lg:w-[37%]',
  },
  {
    src: '/screen-today.png',
    alt: 'Yorix today screen showing the next sleep window and quick baby care tracking',
    className: 'left-1/2 top-0 z-30 w-[48%] -translate-x-1/2 lg:w-[50%]',
    priority: true,
  },
  {
    src: '/screen-coach.png',
    alt: 'Yorix AI sleep coach chat screen',
    className:
      'right-0 top-32 z-20 hidden w-[38%] rotate-[6deg] opacity-95 sm:block sm:w-[34%] lg:w-[37%]',
  },
  {
    src: '/screen-bedtime.png',
    alt: 'Yorix sleep sounds screen with white noise, rain, ocean waves, and heartbeat',
    className:
      'bottom-0 right-[14%] z-0 hidden w-[35%] rotate-[4deg] opacity-85 sm:block sm:w-[30%] lg:w-[32%]',
  },
];

const proofItems = [
  {
    icon: Moon,
    label: 'Personal sleep schedule',
    body: 'Next nap and bedtime adapt when real life changes the day.',
  },
  {
    icon: MessageCircle,
    label: '24/7 AI sleep coach',
    body: 'Ask about wake windows, short naps, regressions, and routines.',
  },
  {
    icon: ShieldCheck,
    label: 'Private by design',
    body: 'Your data belongs to you. We do not sell personal data.',
  },
];

const productStories = [
  {
    eyebrow: 'Smart day plan',
    title: 'Know when your baby should sleep next.',
    body: 'Yorix studies naps, wake windows, bedtime, night wakings, and feeding rhythm, then turns the day into a flexible plan that updates as soon as a nap runs short.',
    image: '/screen-plan.png',
    alt: 'Yorix plan for today timeline with naps, wake windows, and bedtime',
    icon: Bell,
    points: [
      'Adaptive wake windows',
      'Short-nap recovery',
      'Bedtime that moves with the day',
    ],
  },
  {
    eyebrow: 'Progress, not spreadsheets',
    title: 'See patterns across sleep, feeding, growth, and care.',
    body: 'Daily logs become clear weekly insights. Track sleep, breastfeeding, diapers, walks, bath, play, height, weight, and growth percentiles in one calm timeline.',
    image: '/screen-growth.png',
    alt: 'Yorix growth statistics screen with weight, height, and development cards',
    icon: LineChart,
    points: [
      'Sleep and feeding trends',
      'WHO growth percentiles',
      'Shared care history',
    ],
  },
  {
    eyebrow: 'AI sleep coach',
    title: 'Ask the question you are too tired to google.',
    body: 'Yorix helps with short naps, night wakings, nap transitions, bedtime battles, white noise, regressions, and everyday baby care questions based on your baby’s routine.',
    image: '/screen-coach.png',
    alt: 'Yorix AI sleep coach welcome screen',
    icon: MessageCircle,
    points: ['Sleep school', 'Routine factors', 'Today’s plan'],
  },
  {
    eyebrow: 'Bedtime sounds',
    title: 'Build a sleep environment that feels familiar.',
    body: 'Use white noise, pink noise, brown noise, rain, ocean waves, heartbeat, and bedtime stories with a simple sleep timer for calmer night routines.',
    image: '/screen-bedtime.png',
    alt: 'Yorix sleep sounds library with bedtime sounds',
    icon: Volume2,
    points: ['White noise and nature sounds', 'Bedtime stories', 'Sleep timer'],
  },
];

const parentQuotes = testimonials.map((t) => ({
  title: t.author,
  body: t.translations.en,
  source: t.source === 'appstore' ? 'App Store review' : 'parent feedback',
  translated: t.locale !== 'en',
}));

const faqs = [
  {
    question: 'What makes Yorix different from a baby sleep chart?',
    answer:
      'A chart gives average ranges. Yorix uses your baby’s real naps, wake windows, night wakings, feeds, and routine history to adjust the next sleep window.',
  },
  {
    question: 'Can I use Yorix with a newborn?',
    answer:
      'Yes. In the newborn stage, Yorix is most useful as a simple sleep, feeding, diaper, and care log. The routine becomes more predictive as patterns emerge.',
  },
  {
    question: 'Does Yorix replace medical advice?',
    answer:
      'No. Yorix is a routine helper, not a medical service. Feeding, growth, breathing, fever, symptoms, or safety concerns should be discussed with a qualified clinician.',
  },
];

function PhoneShot({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`absolute h-auto rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15 ${className}`}
      width="1206"
      height="2622"
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}

export default async function Home() {
  const featuredGuides = topicPages.slice(0, 6);
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white">
      <StarField />
      <div className="relative z-10">
      <SiteHeader acceptLanguage={acceptLanguage} country={country} locale="en" />

      <section
        id="top"
        className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20"
      >
        <div className="relative z-20 max-w-2xl">
          <Reveal load animation="fadeIn">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Baby sleep tracker with a plan that re-plans itself
            </p>
          </Reveal>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            <WordReveal delay={120} text="Know when your baby’s next sleep is due — before the fussing starts." />
          </h1>
          <Reveal load delay={260}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Yorix computes the next nap window and bedtime from your baby’s
              real day and re-plans the moment a nap runs short. Log sleep,
              feeds and care in one tap, and ask the coach that knows your
              diary — any hour of the night.
            </p>
          </Reveal>
          <Reveal load delay={400}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="flex">
              <a
                className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_22px_55px_rgb(99_102_241/34%)] transition hover:bg-[#4F46E5] focus:outline-none focus:ring-4 focus:ring-[#818CF8]/30"
                href={appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Get my baby’s plan
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Magnetic>
            <a
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
              href="/guides"
            >
              Read sleep guides
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          </Reveal>
          <Reveal load delay={540}>
          <div className="mt-9 hidden max-w-xl gap-3 text-sm text-white/70 sm:grid sm:grid-cols-3">
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">20</strong>
              languages
            </div>
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">0</strong>
              ads in your routine
            </div>
            <div className="spotlight rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">24/7</strong>
              AI coach
            </div>
          </div>
          </Reveal>
        </div>

        <Reveal load animation="zoomIn" delay={160} className="sm:hidden">
        <div className="relative z-10 mx-auto w-full max-w-[300px]">
          <div className="absolute inset-6 rounded-full bg-[#6366F1]/30 blur-3xl" />
          <img
            src="/screen-today.png"
            alt="Yorix today screen showing the next sleep window and quick baby care tracking"
            className="relative h-auto w-full rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
            width="1206"
            height="2622"
            fetchPriority="high"
          />
        </div>
        </Reveal>

        <Reveal load animation="zoomIn" delay={200} className="hidden sm:block">
        <Parallax offset={['start start', 'end start']} scale={[1, 0.96]} y={[0, -80]}>
        <div className="relative z-10 mx-auto h-[650px] w-full max-w-[620px] lg:h-[760px]">
          <div className="absolute inset-x-4 bottom-12 top-20 rounded-full bg-[#6366F1]/25 blur-3xl" />
          {heroScreens.map((screen) => (
            <PhoneShot
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              className={screen.className}
              priority={screen.priority}
            />
          ))}
        </div>
        </Parallax>
        </Reveal>
      </section>

      <section className="relative border-y border-white/10 bg-[#161628]/70">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-10">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="flex" delay={index * 120} key={item.label}>
              <article
                className="group spotlight flex w-full gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25"
              >
                <span className="relative inline-grid shrink-0 self-start">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#6366F1] opacity-30 blur-xl transition duration-500 group-hover:opacity-80" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
                <div>
                  <h2 className="font-semibold text-white">{item.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.body}
                  </p>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="plan"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">
              Your baby has a plan
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              From sleepy cues to a clear next step.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-2xl text-lg leading-8 text-white/65">
              Yorix is built around the question every tired parent asks: when
              should my baby sleep next? The app watches the day unfold and keeps
              the plan flexible.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            'Build a routine that works for everyone',
            'Prevent overtired meltdowns before bedtime',
            'Learn from real sleep, feeding, and care patterns',
          ].map((item, index) => (
            <Reveal className="flex" delay={index * 130} key={item}>
            <article className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">{item}</h3>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="features" className="grid gap-8 px-5 pb-12 sm:px-8 lg:px-10">
        {productStories.map((story, index) => {
          const Icon = story.icon;
          return (
            <Reveal animation={index % 2 === 1 ? 'driftInRight' : 'driftInLeft'} className="mx-auto w-full max-w-7xl" key={story.title}>
            <article
              className="grid w-full gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_90px_rgb(0_0_0/18%)] backdrop-blur-xl md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10"
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {story.eyebrow}
                </p>
                <h2 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {story.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
                  {story.body}
                </p>
                <ul className="mt-7 grid gap-3">
                  {story.points.map((point) => (
                    <li
                      className="flex items-center gap-3 text-base font-semibold text-white"
                      key={point}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#22C55E] text-white">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#1E1B4B] sm:min-h-[650px] md:min-h-[590px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgb(129_140_248/0.35),transparent_24rem)]" />
                <Parallax className="absolute left-1/2 top-8 w-[70%] max-w-[330px] -translate-x-1/2" scale={[0.94, 1]} y={[72, -48]}>
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="h-auto w-full rounded-[2rem] shadow-[0_32px_85px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                    width="1206"
                    height="2622"
                  />
                </Parallax>
              </div>
            </article>
            </Reveal>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">
              What parents write — unedited
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              They weren’t sleeping either.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              Real words from a published App Store review and from parents who
              wrote to support. Nothing polished, nothing invented.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {parentQuotes.map((item, index) => (
              <Reveal className="flex" delay={index * 120} key={item.title}>
              <article className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25">
                <div className="mb-5 flex gap-1 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                      key={index}
                    />
                  ))}
                </div>
                <p className="text-base leading-7 text-white/85">“{item.body}”</p>
                <p className="mt-4 text-sm text-white/55">
                  <span className="font-semibold text-white">{item.title}</span> · {item.source}
                  {item.translated ? ' · translated' : ''}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="border-y border-white/10 bg-[#0F1022]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">
                Yorix guides
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Sleep knowledge is sleep power.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
                Evidence-aware guides for night wakings, wake windows, white
                noise, sleep regressions, feeding rhythm, and age-based
                schedules.
              </p>
            </div>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
              href="/guides"
            >
              View all guides
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((page, index) => (
              <Reveal className="flex" delay={index * 80} key={page.slug}>
              <a
                className="w-full spotlight rounded-lg border border-white/10 bg-white/10 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/15"
                href={`/${page.slug}`}
              >
                <p className="text-sm font-semibold text-[#C7D2FE]">
                  {page.category} · {page.readTime}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-white">
                  {page.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {page.description}
                </p>
              </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeSubscriptionSection lang="en" />

      <section id="faq" className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <Reveal>
          <p className="mb-3 text-center text-sm font-semibold uppercase text-[#A78BFA]">
            FAQ
          </p>
          <h2 className="text-center text-4xl font-semibold text-white sm:text-5xl">
            Baby sleep questions, answered calmly.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq, index) => (
            <Reveal animation="fadeIn" delay={index * 90} key={faq.question}>
            <article className="spotlight rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-white/65">
                {faq.answer}
              </p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="download"
        className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      >
        <Reveal animation="zoomIn">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#EEF2FF] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/22%)] md:grid-cols-[1fr_260px] md:items-center md:p-9">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6366F1]">
              <Users className="h-4 w-4" aria-hidden="true" />
              Built for real family life
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Log one nap tonight. Tomorrow’s plan is already there.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#64748B]">
              The diary is free forever. Sleep, feeds, diapers, growth and care
              in one tap — and a plan for tomorrow built from what you logged.
            </p>
          </div>
          <a
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_18px_42px_rgb(99_102_241/30%)] transition hover:bg-[#4F46E5] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
            href={appDownloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download Yorix
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        </Reveal>
      </section>

      <SellerFooter note="Yorix is a routine helper for parents. It does not provide medical diagnosis or emergency advice." />
      </div>
    </main>
  );
}
