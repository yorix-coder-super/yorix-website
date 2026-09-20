import { subscriptionCopy } from '../subscription/copy';
import { planCopy } from '../subscription/merchant';
import { testimonials } from '../subscription/testimonials';
import type { SiteTranslation } from './types';

const sub = subscriptionCopy.en;
const sentence = 'This guide helps you understand your baby’s real rhythm and plan the day with less guessing.';

// The English source. Every translation mirrors this object.
export const translation: SiteTranslation = {
  home: {
    nav: { plan: 'Plan', features: 'Features', guides: 'Guides', faq: 'FAQ', download: 'Get the app' },
    hero: {
      badge: 'Baby sleep tracker with a plan that re-plans itself',
      title: 'Know when your baby’s next sleep is due — before the fussing starts.',
      body: 'Yorix computes the next nap window and bedtime from your baby’s real day and re-plans the moment a nap runs short. Log sleep, feeds and care in one tap, and ask the coach that knows your diary — any hour of the night.',
      primary: 'Get my baby’s plan',
      secondary: 'Read sleep guides',
    },
    stats: ['languages', 'ads in your routine', 'AI coach'],
    plan: {
      eyebrow: 'Your baby has a plan',
      title: 'From sleepy cues to a clear next step.',
      body: 'Yorix is built around the question every tired parent asks: when should my baby sleep next? The app watches the day unfold and keeps the plan flexible.',
      steps: [
        'Build a routine that works for everyone',
        'Prevent overtired meltdowns before bedtime',
        'Learn from real sleep, feeding, and care patterns',
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      items: [
        {
          question: 'What makes Yorix different from a baby sleep chart?',
          answer: 'A chart gives average ranges for an age — and stops there. Yorix looks at your baby: when they woke up today, how much and how well they slept, how long they have been awake, what the last few days looked like — and works out when the wake window closes and when to start winding down. Log a short nap or a late wake-up and the plan for the rest of the day is recalculated on the spot instead of staying yesterday\'s.',
        },
        {
          question: 'What is a wake window?',
          answer: 'It is the stretch a baby can stay awake between sleeps without becoming overtired. For a newborn it is short — 30 to 60 minutes; by the first birthday it grows to 3–4 hours. Miss the window and the baby gets wired: falls asleep more slowly, sleeps more restlessly and wakes more often at night. Yorix works the window out from your baby\'s age and from how they slept today, and tells you in advance when to start the wind-down.',
        },
        {
          question: 'How much sleep does a baby need?',
          answer: 'The WHO guidance for a full day, naps included: 0–3 months — 14–17 hours, 4–11 months — 12–16, 1–2 years — 11–14. The ranges are deliberately wide: one baby is fine on 12 hours, another needs 15, and both are healthy. So the point is not to hit a number but to know your own: Yorix adds up the day\'s sleep and shows it next to the guidance, so you notice when your baby suddenly sleeps much less than usual.',
        },
        {
          question: 'Can I use Yorix with a newborn?',
          answer: 'Yes, and in the first weeks it is mostly a comfortable log: sleep, feeds, nappies and care in one place, one tap per entry — at night, with one hand. There is no strict routine at this age, so Yorix does not impose a schedule; it goes by wake windows and helps you catch the tired signs in time. Once the first repeating patterns appear, the forecast and the plan get sharper.',
        },
        {
          question: 'What if my baby doesn’t sleep as forecast?',
          answer: 'Nothing is broken — just log what actually happened. Yorix recalculates the windows and the rest of the day at once: after a short nap the next wind-down moves closer, after a long one it moves out. The forecast learns from your own entries, so the longer you keep the diary the closer it fits your child. Logged it wrong? Any entry can be edited or deleted, and the plan is recalculated again.',
        },
        {
          question: 'Can two parents keep the diary together?',
          answer: 'Yes. In Settings tap «Invite a partner»: the second adult accepts and sees the same diary on their own iPhone. Entries show up for both of you almost at once — handy when one takes the night and the other takes the morning walk, with nothing to retell. It syncs through your iCloud; there is no separate Yorix account to create.',
        },
        {
          question: 'What is free and what needs a subscription?',
          answer: 'Downloading Yorix and logging sleep is free. For the other kinds of entries — feeds, nappies, care, growth — the free version has a limit. The subscription covers what takes real computation and AI: the personal next-sleep forecast, a day plan that re-plans itself, the AI coach answering from your own diary, analytics and daily advice. The programmes — Solids, Leaps, Potty and the rest — are bought separately.',
        },
        {
          question: 'How do I cancel my subscription?',
          answer: 'An App Store subscription is cancelled in the iPhone settings: your name → «Subscriptions» → Yorix → «Cancel subscription». Access stays until the end of the period you already paid for and simply does not renew after that. A subscription bought on the website never renews by itself: it ends on its day, we keep no card and charge nothing.',
        },
        {
          question: 'Where is my baby’s data stored?',
          answer: 'The diary lives on your iPhone and in your own iCloud — we have no access to it and cannot read it. The AI coach receives only the short summary needed to answer the question at hand: the baby\'s age and the latest entries, without names or contacts. We do not sell data and we show no ads. What is processed, and why, is set out in the personal data policy.',
        },
        {
          question: 'Which devices does Yorix work on?',
          answer: 'iPhone and iPad with iOS 18 or newer. The interface is translated into 20 languages, and there are Home Screen and Lock Screen widgets, a Live Activity while the baby sleeps, and Siri commands to log a sleep or a feed by voice. There is no Android app and no web version of the diary yet: the forecast is computed on the device itself.',
        },
        {
          question: 'Does Yorix work offline?',
          answer: 'Yes. The diary, the wake windows and the next-sleep forecast are computed on the phone, so they work on a plane or at a cabin with no signal. The internet is only needed by the AI coach, which answers on the server, and by iCloud sync: entries made offline reach your other devices as soon as the connection is back.',
        },
        {
          question: 'Does Yorix replace medical advice?',
          answer: 'No. Yorix helps with the routine of a healthy baby, but it is not a medical service: it makes no diagnosis and prescribes no treatment. If you are worried about breathing, temperature, weight, feeding or how your child feels, see a paediatrician — and in an emergency call for help. The coach\'s answers are general information, not a doctor\'s instruction.',
        },
      ],
    },
    cta: {
      badge: 'Built for real family life',
      title: 'Log one nap tonight. Tomorrow’s plan is already there.',
      body: 'Sleep, feeds, diapers, growth and care in one tap — and a plan for tomorrow built from what you logged.',
      action: 'Download Yorix',
    },
    footer: 'Yorix is a routine helper for parents. It does not provide medical diagnosis or emergency advice.',
    features: [
      { title: 'Accurate sleep forecasts', body: 'Built on your baby’s real data' },
      { title: 'Growth and development', body: 'Sleep, feeds and care in one place' },
      { title: 'AI coach 24/7', body: 'Answers to any sleep question' },
      { title: 'Sleep guides', body: 'Advice for every age, grounded in research' },
    ],
    notes: { hero: 'Calm babies, happy parents', coach: 'Support at any hour', cta: 'The best is ahead' },
    more: 'Learn more',
    reviews: { title: 'Real parents. Real stories.', body: 'Unedited words from parents — nothing polished, nothing invented.' },
    pricing: { secure: 'Secure card payment via WebPay', activates: 'The subscription turns on in the app right after payment', questions: 'Questions? Write to us' },
    highlight: { soft: 'before', warm: 'fussing starts.' },
    screenAlt: 'Yorix today screen with the night sleep window',
    showcaseAlt: { progress: 'Yorix progress: sleep and feeding statistics', bedtime: 'Yorix bedtime sounds', coach: 'Yorix AI coach chat' },
    appStore: {
      title: 'Get Yorix on your iPhone',
      body: 'The sleep diary, the next-nap forecast and the AI coach are all in the Yorix app. Download it from the App Store and start tonight.',
    },
  },
  guides: {
    eyebrow: 'Yorix guides',
    title: 'Baby sleep answers parents search for at 3 a.m.',
    body: 'Practical, evidence-aware guides about newborn sleep, naps, wake windows, night wakings, feeding routines, white noise, regressions, and sleep training decisions.',
  },
  articleUi: {
    home: 'Home',
    getApp: 'Get the app',
    backToGuides: 'Back to all guides',
    published: 'Published',
    practicalGuide: 'A practical guide for tired parents who want less guessing.',
    inThisArticle: 'In this article',
    disclaimer:
      'This guide is for general routine support for healthy babies and families. It does not replace medical advice. If you are worried about feeding, growth, breathing, fever, symptoms, or your own wellbeing, contact a qualified healthcare professional.',
    quickReference: 'Quick reference',
    commonQuestions: 'Common questions',
    checklist: 'Quick routine checklist',
    sources: 'Sources and further reading',
    personalizedSupport: 'Personalized support',
    ctaTitle: 'Yorix turns baby sleep and feeding logs into a schedule that adapts.',
    ctaBody: 'Track naps, wake windows, night wakings, feeds, diapers, and routines in one app, then get clearer next steps for the day ahead.',
    download: 'Download Yorix',
    relatedGuides: 'Related guides',
    footer: 'Yorix is a routine helper for parents. It does not provide medical diagnosis or emergency advice.',
  },
  articleExtras: {
    keyTakeaways: 'Key takeaways',
    important: 'Important',
    tip: 'Tip',
    exampleDay: 'Example day',
    commonChallenges: 'Common challenges',
    likelyReason: 'Likely reason',
    tryFirst: 'Try first',
    howToCheck: 'How to check',
    planToday: 'Plan for today',
    readingProgress: 'Reading progress',
    tryInApp: 'Try it in Yorix',
    shortAnswer: 'The short answer',
    inThisGuide: 'In this guide',
    promoTitle: 'Turn insights into better days',
    promoBody: 'Track sleep and feeds, and get personal next steps for your baby.',
    promoTagline: 'A calmer tomorrow, in your pocket.',
    checklist: 'Quick routine checklist',
    notes: { hero: 'Small steps, brighter days', inline: 'Small steps, big progress', promo: 'You’re doing a great job already', shortAnswer: 'Less guessing. More good days.' },
    scenarioTimes: ['Morning', 'First nap', 'Midday', 'Evening', 'Bedtime'],
    scenarioYorix: (value) => `Uses ${value.toLowerCase()} as context for the next plan.`,
    diagnosticRows: [
      {
        observation: 'The day changes after a short nap.',
        explanation: 'The next wake window may need to shorten.',
        action: 'Move the next wind-down earlier.',
        check: 'Compare the next 3 days, not one nap.',
      },
      {
        observation: 'Bedtime becomes harder after a late final nap.',
        explanation: 'Sleep pressure may be too low or the last window may be off.',
        action: 'Protect the bedtime anchor and adjust the final nap.',
        check: 'Watch bedtime settling time for several evenings.',
      },
      {
        observation: 'Night wakings increase suddenly.',
        explanation: 'Schedule, feeding, illness, development, or environment may have changed.',
        action: 'Review sleep, feeds, symptoms, and room conditions together.',
        check: 'Look for the same pattern across 3-7 days.',
      },
    ],
  },
  sceneNotes: {
    'star-mascot': 'Every baby has their own rhythm',
    'scene-bottle': 'Same day. A clearer picture.',
    'scene-sun-moon': 'Bright days, quiet nights',
    'scene-nightlight': 'Quiet, dim and gentle',
    'scene-clock': 'Watch the baby, not the clock',
    'scene-phone': 'Your diary does the math',
    'scene-noise': 'Soft, steady, familiar',
    'scene-calendar': 'Plans that grow with your baby',
    'scene-book': 'Pick what fits your family',
    'scene-tea': 'Rest counts for you too',
    'scene-bath': 'Same steps every evening',
    'scene-crib': 'A calm, safe place to sleep',
    'scene-bunny': 'Calm is contagious',
  },
  sharedArticle: {
    category: 'Baby sleep',
    readTime: '8 min read',
    description: (topic) => `${topic}. ${sentence}`,
    intro: (topic) =>
      `${sentence} ${topic} works best when parents combine age-aware guidance with their baby’s own sleep, feeding, mood, growth, and daily routine patterns. The aim is not a perfect clock-based day; it is a calmer routine that can recover when naps, feeds, illness, travel, daycare, or sleep regressions change the plan.`,
    sectionHeadings: [
      'Start with your baby’s real rhythm',
      'Use age guidance without forcing the clock',
      'Look for patterns across several days',
      'What parents often misunderstand',
      'When to change the plan',
      'What to track before you decide',
      'How Yorix helps',
    ],
    sectionBodies: [
      'A useful routine begins with what actually happens at home: naps, wake windows, feeds, night wakings, diapers, mood, growth, symptoms, and the way your family day is organized. A chart can give a starting point, but your baby’s recent history should shape the next practical step.',
      'Age ranges matter because babies usually move through predictable sleep and feeding transitions. Still, no age table can see today’s short nap, late car sleep, daycare pickup, growth spurt, or bedtime battle. Treat the clock as a guide, then let the day’s evidence adjust the next window.',
      'One difficult night or one skipped nap is not enough to rebuild the whole routine. Track a few days, compare total sleep with the last wake window, and notice whether feeds, room conditions, illness, teething, or new skills appear near the same sleep disruption.',
      'Many parents assume that a schedule should make every day identical. Real baby sleep is more flexible. A strong routine gives repeatable cues, predictable order, and a recovery plan after hard moments, not a rule that ignores hunger, development, or safety.',
      'Consider changing the plan when the same issue repeats for several days: bedtime takes much longer, the last wake window is regularly too long, naps collapse at the same time, night wakings cluster after short daytime sleep, or feeding patterns no longer match the day.',
      'Before making a major change, write down the basics: sleep start and end times, wake windows, feeds, bedtime routine, night wakings, mood, and any symptoms. This keeps decisions grounded in patterns instead of exhausted memory.',
      'Yorix keeps sleep, feeding, diapers, growth, symptoms, routines, and questions in one calm timeline. It can suggest the next sleep window, explain why the plan changed, and help both caregivers follow the same day instead of guessing separately.',
    ],
    rows: [
      'Start with age-aware ranges',
      'Track sleep, feeds, and care together',
      'Adjust after short naps or hard nights',
      'Keep bedtime cues simple and repeatable',
      'Review patterns across several days',
      'Use Yorix to keep both caregivers synced',
      'Ask a clinician about health or safety concerns',
    ],
    checklist: [
      'Log the key sleep and feeding times for several days.',
      'Compare the last nap with the next wake window.',
      'Move bedtime earlier after an overtired day.',
      'Keep the sleep environment safe and familiar.',
      'Avoid changing every variable after one bad night.',
      'Share the same timeline with every caregiver.',
    ],
    questions: [
      'Should I follow a strict schedule?',
      'When should I change the routine?',
      'How many days should I track before deciding?',
      'Can an app replace medical advice?',
    ],
    answers: [
      'A strict schedule can add pressure. Most families do better with a steady rhythm that still adapts to nap length, feeds, health, travel, and development.',
      'Change the routine when you see the same issue repeat across several days, or when age, feeding, illness, daycare, or a sleep transition clearly changes the day.',
      'Three to seven days is often enough to see a useful routine pattern, unless there is a health or safety concern that needs faster professional attention.',
      'No. Yorix helps with routine tracking and planning, but it does not diagnose medical issues or replace qualified healthcare advice.',
    ],
    appHeading: 'How Yorix helps with this routine',
    appBody: [
      'Yorix turns everyday logs into a clearer daily plan, so parents can see what changed and what to try next.',
      'Instead of switching between notes, memory, charts, and late-night searches, you can keep the baby’s sleep and care rhythm in one app.',
    ],
  },
  subscription: {
    nav: sub.nav,
    plans: sub.plans,
    account: sub.account,
    checkout: sub.checkout,
    terms: sub.terms,
    currency: sub.currency,
    docs: sub.docs,
    home: sub.home,
    proof: sub.proof,
    footer: sub.footer,
  },
  plans: planCopy.en,
  testimonials: testimonials.map((t) => t.translations.en) as SiteTranslation['testimonials'],
  support: {
    nav: 'Support',
    eyebrow: 'Support',
    title: 'How can we help?',
    body: 'Answers to the questions parents ask most about Yorix. Can’t find yours? Write to us — a real person reads every message.',
    contact: {
      title: 'Still need help?',
      body: 'Write to us here — or in the app: Settings → “Write to us” opens a chat with us.',
      reply: 'We reply within 3 working days.',
    },
    form: {
      name: 'Your name',
      email: 'E-mail for our reply',
      message: 'Message',
      messagePlaceholder: 'Tell us what happened or what you would like to know',
      send: 'Send',
      sending: 'Sending…',
      sent: 'Thank you! We’ve got your message and will reply to your e-mail within 3 working days.',
      error: 'The message could not be sent. Please try again in a minute — or write to us in the app: Settings → “Write to us”.',
      invalid: 'Please enter your e-mail and a message of at least 10 characters.',
      privacy: 'We use your e-mail and message only to reply to you.',
    },
    topics: [
      {
        title: 'Getting started',
        items: [
          {
            question: 'Where do I start?',
            answer: 'Add your baby when you first open the app and log when they woke up or fell asleep. After the very first entry Yorix shows the next sleep window and refines it with every new one.',
          },
          {
            question: 'How does Yorix make its forecast?',
            answer: 'It starts from the sleep norms and wake windows for your baby’s age and adjusts them to your baby: how they slept today and over the last few days. The more you log, the more accurate the forecast.',
          },
        ],
      },
      {
        title: 'Subscription and purchases',
        items: [
          {
            question: 'What does the subscription include?',
            answer: 'The personal next-sleep forecast, the AI coach, diary analytics and daily recommendations. You can start the diary for free.',
          },
          {
            question: 'How do I restore purchases on a new iPhone?',
            answer: 'Sign in with the same Apple ID, open the subscription screen in the app and tap “Restore Purchases”.',
          },
          {
            question: 'How do I cancel an App Store subscription?',
            answer: 'In your iPhone Settings: tap your name → Subscriptions → Yorix. You keep access until the end of the paid period.',
          },
        ],
      },
      {
        title: 'Family and data',
        items: [
          {
            question: 'How do we keep the diary together?',
            answer: 'In Yorix settings, tap “Invite Partner” and send the invitation. The other adult sees the same diary and can add entries from their own iPhone.',
          },
          {
            question: 'How do I move the diary to a new iPhone?',
            answer: 'The diary is stored in your iCloud. Sign in to the same Apple ID on the new iPhone and make sure iCloud is on for Yorix — your entries come back on their own.',
          },
          {
            question: 'How do I export my data?',
            answer: 'In Yorix settings, choose “Export Data” — the app saves a file with your entries.',
          },
          {
            question: 'How do I delete my account and data?',
            answer: 'In Yorix settings: “Account” → “Delete Account”. Entries in your iCloud can be deleted in the app or in iCloud settings.',
          },
        ],
      },
      {
        title: 'Reminders and widgets',
        items: [
          {
            question: 'Why don’t reminders arrive?',
            answer: 'Check that notifications are on for Yorix: iPhone Settings → Notifications → Yorix. Focus and Do Not Disturb can hide them too.',
          },
          {
            question: 'How do I add a widget?',
            answer: 'Touch and hold an empty spot on the Home Screen, tap “Edit” → “Add Widget”, find Yorix and pick a widget.',
          },
        ],
      },
      {
        title: 'If something goes wrong',
        items: [
          {
            question: 'Entries don’t show up on my other device',
            answer: 'Make sure both devices use the same Apple ID, iCloud is on for Yorix and there is an internet connection. Open the app on both devices — syncing takes a couple of minutes.',
          },
          {
            question: 'The app doesn’t work as expected',
            answer: 'Update Yorix to the latest version in the App Store and restart the app. If that doesn’t help, write to us — see below.',
          },
        ],
      },
    ],
    web: 'Paid for a subscription by card on the website? The answers are on the subscription page.',
  },
  about: {
    nav: 'About Yorix',
    eyebrow: 'About us',
    title: 'Calmer evenings for the whole family',
    body: 'Yorix helps parents know when their baby needs to sleep — and build a routine that fits their own family.',
    sections: [
      {
        title: 'Why we made Yorix',
        body: 'Every parent knows the question: is it time to put the baby down, or is it too early? Sleep charts give averages, but every baby has their own rhythm. We made Yorix so the answer rests on your baby’s real day, not on an average schedule.',
      },
      {
        title: 'How it works',
        body: 'It starts from the age-based guidance of the WHO and the American Academy of Sleep Medicine and the wake windows for each age. Every diary entry sharpens the forecast: Yorix takes into account how your baby slept today and in recent days and recalculates the rest of the day’s plan.',
      },
      {
        title: 'Our mission',
        body: 'More calm sleep for babies — and more confidence and rest for their parents.',
      },
    ],
    values: {
      title: 'What matters to us',
      items: [
        {
          title: 'No ads',
          body: 'Yorix has no ads — nothing distracts you while you’re putting your baby to bed.',
        },
        {
          title: 'Your data is yours',
          body: 'The diary lives on your iPhone and in your iCloud. We don’t sell data.',
        },
        {
          title: 'Honest about limits',
          body: 'Yorix helps with routines but doesn’t replace a doctor. For health questions, talk to your pediatrician.',
        },
        {
          title: 'For the whole family',
          body: 'Two parents can keep one diary, and the coach answers at any hour.',
        },
      ],
    },
  },
  footerLabels: { product: 'Product', features: 'Features', guides: 'Guides', support: 'Support', write: 'Write to us', redeem: 'Redeem a gift', badgeTop: 'Download on the' },
  docsNote: '',
};
