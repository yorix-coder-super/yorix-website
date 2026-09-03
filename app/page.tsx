import {
  ArrowRight,
  Baby,
  Check,
  Clock3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { appDownloadUrl, appFeatures, topicPages } from './content';

const ageSchedules = [
  {
    age: '0-3 months',
    sleep: '14-17 hours',
    naps: '4-6 naps',
    note: 'Follow sleepy cues and build gentle day-night rhythm.',
  },
  {
    age: '4-6 months',
    sleep: '12-15 hours',
    naps: '3-4 naps',
    note: 'Start watching wake windows and predictable bedtime flow.',
  },
  {
    age: '7-12 months',
    sleep: '11-14 hours',
    naps: '2-3 naps',
    note: 'Keep naps consistent while protecting overnight sleep.',
  },
];

const benefits = [
  'See the next nap window before your baby gets overtired',
  'Track sleep, feeding, diapers, and patterns in one calm place',
  'Turn daily logs into a routine that actually fits your baby',
];

const faqs = [
  {
    question: 'What is a baby schedule?',
    answer:
      'A baby schedule is a flexible daily rhythm for sleep, feeds, play, and bedtime. It should guide the day without forcing every baby into the same timetable.',
  },
  {
    question: 'When should I start using a schedule?',
    answer:
      'Many parents begin with simple tracking in the newborn stage, then use wake windows and nap patterns more actively around 3-4 months.',
  },
  {
    question: 'Can an app replace medical advice?',
    answer:
      'No. A schedule app can help you notice patterns, but feeding, sleep, growth, and health concerns should be discussed with a qualified clinician.',
  },
];

export default function Home() {
  return (
    <main className="brand-page min-h-screen text-[#1E1B4B]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a className="flex items-center gap-3" href="#top" aria-label="Yorix home">
          <BrandLogo size="sm" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#64748B] md:flex">
          <a className="transition hover:text-[#1E1B4B]" href="#schedule">
            Schedule
          </a>
          <a className="transition hover:text-[#1E1B4B]" href="#how-it-helps">
            How it helps
          </a>
          <a className="transition hover:text-[#1E1B4B]" href="#features">
            Features
          </a>
          <a className="transition hover:text-[#1E1B4B]" href="#guides">
            Guides
          </a>
          <a className="transition hover:text-[#1E1B4B]" href="#faq">
            FAQ
          </a>
        </nav>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1E1B4B] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
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
        className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-12 pt-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_420px] lg:px-10 lg:pb-20 lg:pt-10"
      >
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-white px-4 py-2 text-sm font-semibold text-[#6366F1] shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Baby schedule app for calmer days
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] text-[#1E1B4B] sm:text-6xl lg:text-7xl">
            Build a baby schedule that follows your real day.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748B]">
            Yorix helps parents track sleep, feeds, and daily rhythm, then turns
            patterns into a softer schedule for naps, bedtime, and busy days.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6366F1] px-6 text-base font-semibold text-white shadow-[0_16px_35px_rgb(95_100_244/24%)] transition hover:bg-[#4F46E5] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Plan the next nap
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:border-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-[#C7D2FE]/35"
              href="#schedule"
            >
              See sample schedule
            </a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-[#64748B]">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <strong className="block text-xl text-[#1E1B4B]">3 min</strong>
              to log a day
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <strong className="block text-xl text-[#1E1B4B]">0 ads</strong>
              in your routine
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <strong className="block text-xl text-[#1E1B4B]">24/7</strong>
              rhythm view
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[360px] md:max-w-none">
          <div className="sky-gradient relative overflow-hidden rounded-[34px] p-3 shadow-[0_28px_80px_rgb(49_46_129/26%)]">
            <img
              src="/app-screenshot.png"
              alt="Yorix app showing a next nap prediction and baby routine tracker"
              className="h-auto w-full rounded-[26px]"
              width="1242"
              height="2688"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section id="schedule" className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#8B5CF6]">
              Gentle structure
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[#1E1B4B] sm:text-4xl">
              A schedule should reduce guessing, not add pressure.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#64748B]">
              Start with age-aware guidance, then adjust around your baby’s
              actual sleep, feeding, mood, and family routine.
            </p>
          </div>
          <div className="grid gap-3">
            {ageSchedules.map((item) => (
              <article
                className="grid gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:grid-cols-[120px_1fr]"
                key={item.age}
              >
                <div>
                  <h3 className="font-semibold text-[#1E1B4B]">{item.age}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">Sample range</p>
                </div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#8B5CF6]">
                      Sleep
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{item.sleep}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#8B5CF6]">
                      Naps
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{item.naps}</dd>
                  </div>
                  <p className="text-sm leading-6 text-[#64748B] sm:col-span-2">
                    {item.note}
                  </p>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-helps"
        className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-3 lg:px-10"
      >
        <div className="lg:col-span-1">
          <p className="mb-3 text-sm font-semibold uppercase text-[#8B5CF6]">
            How Yorix helps
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[#1E1B4B]">
            Made for parents who need a calmer rhythm.
          </h2>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          {benefits.map((benefit) => (
            <div
              className="flex gap-4 rounded-lg border border-[#E2E8F0] bg-white p-5"
              key={benefit}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-base leading-7 text-[#1E1B4B]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[#8B5CF6]">
                Why parents choose Yorix
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#1E1B4B] sm:text-4xl">
                Finally understand your baby’s sleep and get your evenings back.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#64748B]">
                Yorix is a personalized baby sleep tracker app that learns your
                child’s unique rhythm. Track naps, wake windows, bedtime, night
                wakings, feeding, and daily routines, then get a sleep schedule
                that adapts to your baby instead of forcing your baby into a
                generic chart.
              </p>
              <p className="mt-4 text-base leading-8 text-[#64748B]">
                No guesswork. No one-size-fits-all schedules. Just a clearer
                answer to the question every tired parent asks: when should my
                baby sleep next?
              </p>
              <a
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6366F1] px-6 text-base font-semibold text-white shadow-[0_16px_35px_rgb(95_100_244/24%)] transition hover:bg-[#4F46E5] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
                href={appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Try Yorix
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6">
              <h3 className="text-xl font-semibold text-[#1E1B4B]">
                Built for real family life
              </h3>
              <p className="mt-3 text-base leading-7 text-[#64748B]">
                Yorix combines baby sleep tracking, sleep schedule planning,
                feeding logs, growth tracking, and an AI sleep coach in one app.
                It is designed for families from the newborn stage through age 3
                and is available in 14 languages.
              </p>
              <p className="mt-3 text-base leading-7 text-[#64748B]">
                Your data belongs to you. We do not sell your personal data.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appFeatures.map((feature) => (
              <article
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5"
                key={feature.title}
              >
                <span className={`mb-4 grid h-9 w-9 place-items-center rounded-full ${feature.tintClass}`}>
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-[#1E1B4B]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2FF]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
          <div className="flex items-start gap-4">
            <Clock3 className="mt-1 h-6 w-6 text-[#6366F1]" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-semibold">Wake windows</h2>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Keep naps close to the moment your baby is ready for sleep.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Baby className="mt-1 h-6 w-6 text-[#6366F1]" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-semibold">Daily tracking</h2>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Log sleep, feeding, diapers, and notes without spreadsheet work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck
              className="mt-1 h-6 w-6 text-[#6366F1]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-lg font-semibold">Parent-safe guidance</h2>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Helpful routine support, with clear boundaries around health advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="guides" className="night-gradient text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#C7D2FE]">
              Yorix blog
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Baby sleep guides for the questions parents search first.
            </h2>
            <div className="mt-8 flex flex-wrap gap-5 border-b border-white/15 pb-4 text-sm font-medium text-white/55">
              <span className="border-b-2 border-white pb-4 text-white">All posts</span>
              <span>Baby Sleep</span>
              <span>Feeding</span>
              <span>Routines</span>
            </div>
          </div>
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
            href={appDownloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download Yorix
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topicPages.map((page) => (
            <a
              className="overflow-hidden rounded-lg bg-[#161628] shadow-[0_20px_60px_rgb(0_0_0/18%)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(0_0_0/26%)]"
              href={`/${page.slug}`}
              key={page.slug}
            >
              <div className={`bg-gradient-to-br ${page.coverClass} p-6`}>
                <img
                  src="/app-icon.png"
                  alt=""
                  className="h-24 w-24 rounded-[26px] shadow-2xl"
                  width="1024"
                  height="1024"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-[#C7D2FE]">
                  {page.date} · {page.category}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {page.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  {page.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-[#A78BFA]">
                  {page.readTime}
                </p>
              </div>
            </a>
          ))}
        </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <p className="mb-3 text-center text-sm font-semibold uppercase text-[#8B5CF6]">
          FAQ
        </p>
        <h2 className="text-center text-3xl font-semibold text-[#1E1B4B] sm:text-4xl">
          Baby schedule questions, answered simply.
        </h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article
              className="rounded-lg border border-[#E2E8F0] bg-white p-5"
              key={faq.question}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-2 text-base leading-7 text-[#64748B]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="night-gradient grid gap-7 rounded-lg p-7 text-white shadow-[0_22px_70px_rgb(49_46_129/22%)] sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-[#C7D2FE]">
              Start small today
            </p>
            <h2 className="text-3xl font-semibold">
              Create your baby’s first calm schedule.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#E0E7FF]">
              Open Yorix and start tracking naps, feeds, diapers, and daily
              rhythm in a calmer way.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
            href={appDownloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download Yorix
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="border-t border-[#E2E8F0] px-5 py-8 text-center text-sm text-[#64748B] sm:px-8">
        <p>
          Yorix is a routine helper for parents. It does not provide medical
          diagnosis or emergency advice.
        </p>
      </footer>
    </main>
  );
}
