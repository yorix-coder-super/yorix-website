import {
  ArrowRight,
  Baby,
  Check,
  Clock3,
  Moon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

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

const appDownloadUrl = 'https://gotoapp.store/yorix';

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
    <main className="min-h-screen bg-[#fbfaf7] text-[#20222a]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a className="flex items-center gap-3" href="#top" aria-label="Yorix home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#5f64f4] text-white shadow-sm">
            <Moon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">Yorix</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#626575] md:flex">
          <a className="transition hover:text-[#20222a]" href="#schedule">
            Schedule
          </a>
          <a className="transition hover:text-[#20222a]" href="#how-it-helps">
            How it helps
          </a>
          <a className="transition hover:text-[#20222a]" href="#faq">
            FAQ
          </a>
        </nav>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#20222a] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#343744] focus:outline-none focus:ring-4 focus:ring-[#5f64f4]/25"
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
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ded7f7] bg-white px-4 py-2 text-sm font-semibold text-[#595ecf] shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Baby schedule app for calmer days
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] text-[#181a22] sm:text-6xl lg:text-7xl">
            Build a baby schedule that follows your real day.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#626575]">
            Yorix helps parents track sleep, feeds, and daily rhythm, then turns
            patterns into a softer schedule for naps, bedtime, and busy days.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#5f64f4] px-6 text-base font-semibold text-white shadow-[0_16px_35px_rgb(95_100_244/24%)] transition hover:bg-[#4d52df] focus:outline-none focus:ring-4 focus:ring-[#5f64f4]/25"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Plan the next nap
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dcd7cd] bg-white px-6 text-base font-semibold text-[#20222a] transition hover:border-[#bbb3a7] focus:outline-none focus:ring-4 focus:ring-[#d9c7aa]/35"
              href="#schedule"
            >
              See sample schedule
            </a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-[#626575]">
            <div className="rounded-lg border border-[#ece5d8] bg-white p-4">
              <strong className="block text-xl text-[#20222a]">3 min</strong>
              to log a day
            </div>
            <div className="rounded-lg border border-[#ece5d8] bg-white p-4">
              <strong className="block text-xl text-[#20222a]">0 ads</strong>
              in your routine
            </div>
            <div className="rounded-lg border border-[#ece5d8] bg-white p-4">
              <strong className="block text-xl text-[#20222a]">24/7</strong>
              rhythm view
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[360px] md:max-w-none">
          <div className="relative overflow-hidden rounded-[34px] bg-[#17162e] p-3 shadow-[0_28px_80px_rgb(47_44_91/28%)]">
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

      <section id="schedule" className="border-y border-[#eee4d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#777b5e]">
              Gentle structure
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[#181a22] sm:text-4xl">
              A schedule should reduce guessing, not add pressure.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#626575]">
              Start with age-aware guidance, then adjust around your baby’s
              actual sleep, feeding, mood, and family routine.
            </p>
          </div>
          <div className="grid gap-3">
            {ageSchedules.map((item) => (
              <article
                className="grid gap-3 rounded-lg border border-[#eee4d5] bg-[#fbfaf7] p-5 sm:grid-cols-[120px_1fr]"
                key={item.age}
              >
                <div>
                  <h3 className="font-semibold text-[#20222a]">{item.age}</h3>
                  <p className="mt-1 text-sm text-[#626575]">Sample range</p>
                </div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#777b5e]">
                      Sleep
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{item.sleep}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#777b5e]">
                      Naps
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{item.naps}</dd>
                  </div>
                  <p className="text-sm leading-6 text-[#626575] sm:col-span-2">
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
          <p className="mb-3 text-sm font-semibold uppercase text-[#777b5e]">
            How Yorix helps
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[#181a22]">
            Made for parents who need a calmer rhythm.
          </h2>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          {benefits.map((benefit) => (
            <div
              className="flex gap-4 rounded-lg border border-[#eee4d5] bg-white p-5"
              key={benefit}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e9f7ed] text-[#248047]">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-base leading-7 text-[#3d404b]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#e9f7ed]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
          <div className="flex items-start gap-4">
            <Clock3 className="mt-1 h-6 w-6 text-[#248047]" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-semibold">Wake windows</h2>
              <p className="mt-2 text-sm leading-6 text-[#526052]">
                Keep naps close to the moment your baby is ready for sleep.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Baby className="mt-1 h-6 w-6 text-[#248047]" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-semibold">Daily tracking</h2>
              <p className="mt-2 text-sm leading-6 text-[#526052]">
                Log sleep, feeding, diapers, and notes without spreadsheet work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck
              className="mt-1 h-6 w-6 text-[#248047]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-lg font-semibold">Parent-safe guidance</h2>
              <p className="mt-2 text-sm leading-6 text-[#526052]">
                Helpful routine support, with clear boundaries around health advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <p className="mb-3 text-center text-sm font-semibold uppercase text-[#777b5e]">
          FAQ
        </p>
        <h2 className="text-center text-3xl font-semibold text-[#181a22] sm:text-4xl">
          Baby schedule questions, answered simply.
        </h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article
              className="rounded-lg border border-[#eee4d5] bg-white p-5"
              key={faq.question}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-2 text-base leading-7 text-[#626575]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-7 rounded-lg bg-[#20222a] p-7 text-white sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-[#b9bbff]">
              Start small today
            </p>
            <h2 className="text-3xl font-semibold">
              Create your baby’s first calm schedule.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#d9dbe8]">
              Open Yorix and start tracking naps, feeds, diapers, and daily
              rhythm in a calmer way.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#20222a] transition hover:bg-[#f0f0f4] focus:outline-none focus:ring-4 focus:ring-white/25"
            href={appDownloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download Yorix
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="border-t border-[#eee4d5] px-5 py-8 text-center text-sm text-[#626575] sm:px-8">
        <p>
          Yorix is a routine helper for parents. It does not provide medical
          diagnosis or emergency advice.
        </p>
      </footer>
    </main>
  );
}
