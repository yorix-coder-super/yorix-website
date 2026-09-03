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
import { BrandLogo } from './BrandLogo';
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

const parentQuotes = [
  {
    title: 'Less guessing',
    body: 'A calmer way to understand wake windows, naps, feeding, and the next best sleep moment.',
  },
  {
    title: 'One shared memory',
    body: 'Both parents can see the same baby sleep, feeding, diapers, growth, and care data.',
  },
  {
    title: 'Made for real nights',
    body: 'Quick logging, AI guidance, and sleep sounds when the whole house is tired.',
  },
];

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

export default function Home() {
  const featuredGuides = topicPages.slice(0, 6);

  return (
    <main className="home-page min-h-screen overflow-hidden text-white">
      <header className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a
          className="flex items-center gap-3"
          href="#top"
          aria-label="Yorix home"
        >
          <BrandLogo size="sm" tone="dark" />
        </a>
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 p-2 text-sm font-semibold text-white/70 shadow-[0_18px_70px_rgb(0_0_0/18%)] backdrop-blur-xl md:flex">
          <a
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            href="#plan"
          >
            Plan
          </a>
          <a
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            href="#features"
          >
            Features
          </a>
          <a
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            href="/guides"
          >
            Guides
          </a>
          <a
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            href="#faq"
          >
            FAQ
          </a>
        </nav>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] shadow-[0_18px_45px_rgb(255_255_255/18%)] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Get the app
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <section
        id="top"
        className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20"
      >
        <div className="relative z-20 max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Baby sleep tracker and AI schedule app
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Finally understand your baby’s sleep.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Yorix learns your child’s rhythm and turns naps, wake windows,
            bedtime, night wakings, feeding, growth, and daily care into a
            schedule that adapts to real family life.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_22px_55px_rgb(99_102_241/34%)] transition hover:bg-[#4F46E5] focus:outline-none focus:ring-4 focus:ring-[#818CF8]/30"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Plan the next nap
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
              href="/guides"
            >
              Read sleep guides
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-9 hidden max-w-xl gap-3 text-sm text-white/70 sm:grid sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">14</strong>
              languages
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">0</strong>
              ads in your routine
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <strong className="block text-2xl text-white">24/7</strong>
              AI coach
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[300px] sm:hidden">
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

        <div className="relative z-10 mx-auto hidden h-[650px] w-full max-w-[620px] sm:block lg:h-[760px]">
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
      </section>

      <section className="relative border-y border-white/10 bg-[#161628]/70">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-10">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                className="flex gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                key={item.label}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-white">{item.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="plan"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">
              Your baby has a plan
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              From sleepy cues to a clear next step.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/65">
            Yorix is built around the question every tired parent asks: when
            should my baby sleep next? The app watches the day unfold and keeps
            the plan flexible.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            'Build a routine that works for everyone',
            'Prevent overtired meltdowns before bedtime',
            'Learn from real sleep, feeding, and care patterns',
          ].map((item, index) => (
            <article
              className="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              key={item}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="grid gap-8 px-5 pb-12 sm:px-8 lg:px-10">
        {productStories.map((story, index) => {
          const Icon = story.icon;
          return (
            <article
              className="mx-auto grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_90px_rgb(0_0_0/18%)] backdrop-blur-xl md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10"
              key={story.title}
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
                <img
                  src={story.image}
                  alt={story.alt}
                  className="absolute left-1/2 top-8 w-[70%] max-w-[330px] -translate-x-1/2 rounded-[2rem] shadow-[0_32px_85px_rgb(0_0_0/42%)] ring-1 ring-white/15"
                  width="1206"
                  height="2622"
                />
              </div>
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">
              Loved by tired parents
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Less sleep math. More confidence.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              Yorix gives families the calm structure they need without turning
              every nap, feed, or diaper into a spreadsheet.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {parentQuotes.map((item) => (
              <article
                className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                key={item.title}
              >
                <div className="mb-5 flex gap-1 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                      key={index}
                    />
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="border-y border-white/10 bg-[#0F1022]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
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
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((page) => (
              <a
                className="rounded-lg border border-white/10 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/10"
                href={`/${page.slug}`}
                key={page.slug}
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
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <p className="mb-3 text-center text-sm font-semibold uppercase text-[#A78BFA]">
          FAQ
        </p>
        <h2 className="text-center text-4xl font-semibold text-white sm:text-5xl">
          Baby sleep questions, answered calmly.
        </h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article
              className="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              key={faq.question}
            >
              <h3 className="text-xl font-semibold text-white">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-white/65">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="download"
        className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10"
      >
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#EEF2FF] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/22%)] md:grid-cols-[1fr_260px] md:items-center md:p-9">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6366F1]">
              <Users className="h-4 w-4" aria-hidden="true" />
              Built for real family life
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Start with one nap. Let Yorix learn the rhythm.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#64748B]">
              Track today’s sleep, feeds, diapers, growth, symptoms, mood, and
              routines, then get a clearer plan for the day ahead.
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
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/50 sm:px-8">
        <p>
          Yorix is a routine helper for parents. It does not provide medical
          diagnosis or emergency advice.
        </p>
      </footer>
    </main>
  );
}
