import { researchGuides } from './research-guides';

export const siteUrl = 'https://www.yorix.website';

export const appDownloadUrl = 'https://gotoapp.store/yorix';

export const appFeatures = [
  {
    title: 'Personalized baby sleep tracker',
    body: 'Log daytime naps and nighttime sleep in seconds, build a simple sleep diary, and follow your baby’s changing routine from newborn through toddlerhood.',
    tintClass: 'bg-[#EEF2FF] text-[#6366F1]',
  },
  {
    title: 'Smart sleep schedules',
    body: 'Get a newborn or infant sleep schedule based on age and real history. Yorix predicts the next nap, bedtime, and wake window, then adjusts when the day changes.',
    tintClass: 'bg-[#F5F3FF] text-[#8B5CF6]',
  },
  {
    title: '24/7 AI sleep coach',
    body: 'Ask about short naps, night wakings, bedtime battles, nap transitions, wake windows, and sleep regressions, with guidance shaped by your baby’s data.',
    tintClass: 'bg-[#DBEAFE] text-[#3B82F6]',
  },
  {
    title: 'One-tap tracking',
    body: 'Start and stop sleep, breastfeeding, and walk timers with Live Activities and Dynamic Island, including during middle-of-the-night feeds.',
    tintClass: 'bg-[#E0E7FF] text-[#4F46E5]',
  },
  {
    title: 'Feeding and breastfeeding tracker',
    body: 'Track breastfeeding, bottle feeds, pumping, and feeding history alongside sleep so the whole day fits into one calm timeline.',
    tintClass: 'bg-[#DCFCE7] text-[#22C55E]',
  },
  {
    title: 'Diapers, growth, and baby development',
    body: 'Log diapers, height, weight, symptoms, mood, and vaccinations. Follow growth with WHO percentiles and keep care notes in one place.',
    tintClass: 'bg-[#FFF7ED] text-[#D9913F]',
  },
  {
    title: 'White noise and bedtime routines',
    body: 'Play white noise, rain, ocean sounds, and calming bedtime stories with a sleep timer for a more consistent bedtime routine.',
    tintClass: 'bg-[#FEF3C7] text-[#F59E0B]',
  },
  {
    title: 'Insights and sleep analysis',
    body: 'See daily summaries, weekly reports, sleep trends, and practical insights instead of a long list of disconnected logs.',
    tintClass: 'bg-[#CCFBF1] text-[#0D9488]',
  },
  {
    title: 'Widgets and family sharing',
    body: 'Log from the Home Screen and keep parents in sync with the same baby sleep, feeding, and care data in real time.',
    tintClass: 'bg-[#FAE8FF] text-[#A855F7]',
  },
];

export type TopicPage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  coverClass: string;
  eyebrow: string;
  intro: string;
  sections: {
    heading: string;
    body: string[];
  }[];
  sampleRows: {
    label: string;
    value: string;
    note: string;
  }[];
  checklist: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  appTieIn?: {
    heading: string;
    body: string[];
  };
  sources?: {
    label: string;
    href: string;
  }[];
};

export const coreTopicPages: TopicPage[] = [
  {
    slug: 'baby-nap-schedule-by-age',
    title: 'Baby Nap Schedule by Age',
    shortTitle: 'Nap schedule by age',
    description:
      'A practical baby nap schedule by age with wake windows, nap counts, and simple ways to adjust the day when naps are short.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '7 min read',
    coverClass: 'from-[#1E1B4B] via-[#312E81] to-[#6366F1]',
    eyebrow: 'Age-based nap planning',
    intro:
      'A baby nap schedule by age gives parents a useful starting point, but real sleep rarely follows a perfect chart. Yorix helps you combine age-aware nap ranges with your baby’s actual sleep history so the next nap feels easier to time.',
    sections: [
      {
        heading: 'Start with the age range, then watch the baby',
        body: [
          'Newborns may nap many times a day, older babies often settle into three naps, and many babies move toward two naps around the second half of the first year. These ranges are helpful, but sleepy cues, night sleep, feeds, and nap length still matter.',
          'A schedule works best when it is treated as a living rhythm. If your baby wakes early from one nap, the next nap often needs to move earlier. If the first nap is long and restorative, the next wake window may stretch naturally.',
        ],
      },
      {
        heading: 'Short naps should change the rest of the day',
        body: [
          'A 25-minute nap is not the same as a 90-minute nap. When one nap is short, the next wake window may need to be shorter and bedtime may need to move earlier. Yorix recalculates the next sleep window as the day unfolds.',
          'This is where many fixed baby sleep charts become frustrating. They show a clean day, but real family life includes car naps, skipped naps, daycare pickup, visitors, and babies who suddenly need a different plan.',
        ],
      },
      {
        heading: 'Use the schedule as a rhythm, not a rule',
        body: [
          'The goal is not to force a baby into a rigid timetable. A good nap routine helps parents reduce guessing while still leaving room for growth spurts, travel days, feeding changes, and sleep regressions.',
          'If your baby seems happy, feeds well, and sleeps reasonably across 24 hours, the exact clock time matters less than consistency and recovery after hard days.',
        ],
      },
      {
        heading: 'What Yorix adds beyond a printed chart',
        body: [
          'Yorix tracks each nap, wake window, bedtime, night waking, and feeding note in one place. Over time, that creates a clearer picture of your baby’s real rhythm instead of a generic average.',
          'The app can suggest the next nap based on age and recent sleep history, then explain why the window changed. That helps parents make decisions without doing sleep math all day.',
        ],
      },
    ],
    sampleRows: [
      {
        label: '0-3 months',
        value: '4-6+ naps',
        note: 'Flexible newborn rhythm',
      },
      {
        label: '4-6 months',
        value: '3-4 naps',
        note: 'Wake windows become more useful',
      },
      {
        label: '7-12 months',
        value: '2-3 naps',
        note: 'Many babies move toward two naps',
      },
      {
        label: '12-18 months',
        value: '1-2 naps',
        note: 'Nap transitions can shift bedtime',
      },
    ],
    checklist: [
      'Track every nap start and end time for a few days.',
      'Compare nap length with the next wake window.',
      'Move bedtime earlier after a difficult nap day.',
      'Keep the room and wind-down routine familiar.',
    ],
    faqs: [
      {
        question: 'Should a baby nap schedule be the same every day?',
        answer:
          'Not exactly. A consistent rhythm helps, but nap length, illness, travel, and developmental changes can shift the day. Flexible schedules are usually easier to maintain.',
      },
      {
        question: 'What if my baby only takes short naps?',
        answer:
          'Short naps are common, especially during transitions. Track patterns over several days and consider a shorter next wake window or earlier bedtime after a rough nap day.',
      },
    ],
  },
  {
    slug: 'newborn-sleep-schedule',
    title: 'Newborn Sleep Schedule',
    shortTitle: 'Newborn sleep',
    description:
      'A gentle newborn sleep schedule guide for parents who want to track sleep, feeds, wake windows, and day-night rhythm without pressure.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '8 min read',
    coverClass: 'from-[#312E81] via-[#6366F1] to-[#A78BFA]',
    eyebrow: 'Newborn rhythm',
    intro:
      'A newborn sleep schedule is less about strict times and more about noticing patterns. In the first months, babies need frequent sleep, frequent feeds, and flexible support as their day-night rhythm slowly develops.',
    sections: [
      {
        heading: 'Keep expectations soft in the newborn stage',
        body: [
          'Newborn sleep can look irregular. Some naps are long, some are tiny, and feeding needs can shift from day to day. Instead of chasing a perfect timetable, it is more useful to track what actually happened and build a calm rhythm from that information.',
          'Parents often feel pressure to create a schedule early. In reality, newborn routines are usually built from repeated care moments: feeding, changing, short awake time, soothing, and sleep.',
        ],
      },
      {
        heading: 'Connect sleep and feeding notes',
        body: [
          'Many parents understand the day better when sleep, feeds, diapers, and mood sit in one timeline. Yorix keeps those logs together so you can see whether a short nap followed a long wake window, a cluster feed, or an unusual morning.',
          'This is especially useful when two parents or caregivers are sharing nights. The log becomes a shared memory for the day instead of a set of half-remembered times.',
        ],
      },
      {
        heading: 'Build day-night cues gently',
        body: [
          'Morning light, calm evenings, and a repeatable bedtime flow can help a baby begin to recognize the difference between day and night. The routine can stay simple: feed, change, soothe, and sleep.',
          'At night, many families keep lights low, voices quiet, and stimulation minimal. During the day, feeds and wake time can happen in brighter rooms so the rhythm slowly becomes clearer.',
        ],
      },
      {
        heading: 'When to use the app',
        body: [
          'Yorix can be helpful from the beginning because it keeps the basics in one place: sleep, feeding, diapers, mood, growth, and notes. You do not need a strict routine to start tracking.',
          'After a few days, the timeline can show patterns: when sleep tends to fall apart, how feeds line up with naps, and which bedtime flow seems easiest to repeat.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Sleep focus',
        value: 'Frequent naps',
        note: 'Follow cues more than the clock',
      },
      {
        label: 'Wake time',
        value: 'Short and calm',
        note: 'Avoid overtired stretches',
      },
      {
        label: 'Night rhythm',
        value: 'Low stimulation',
        note: 'Keep care simple and quiet',
      },
      {
        label: 'Tracking',
        value: 'Sleep + feeds',
        note: 'Look for patterns, not perfection',
      },
    ],
    checklist: [
      'Track sleep and feeds without trying to force exact times.',
      'Use short, calm wake periods between naps.',
      'Keep nights quiet and low-stimulation.',
      'Ask a clinician about feeding, growth, or health concerns.',
    ],
    faqs: [
      {
        question: 'Can a newborn follow a strict sleep schedule?',
        answer:
          'Most newborns are not ready for a strict clock-based schedule. A flexible rhythm and consistent care cues are usually more realistic.',
      },
      {
        question: 'Why track newborn sleep if it changes so much?',
        answer:
          'Tracking helps parents see patterns, share care, and remember feeds or diapers. It is not about making every day identical.',
      },
    ],
  },
  {
    slug: '4-month-old-sleep-schedule',
    title: '4 Month Old Sleep Schedule',
    shortTitle: '4 month sleep',
    description:
      'A clear 4 month old sleep schedule guide covering wake windows, nap changes, bedtime, and the 4 month sleep regression.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '7 min read',
    coverClass: 'from-[#1C1832] via-[#312E81] to-[#4F46E5]',
    eyebrow: 'Four month routine',
    intro:
      'A 4 month old sleep schedule often changes quickly. Wake windows stretch, naps may become less predictable, and many families notice new night wakings during the 4 month sleep regression.',
    sections: [
      {
        heading: 'Expect change around four months',
        body: [
          'At this age, sleep patterns mature and the old newborn rhythm may stop working. A baby who slept long stretches may begin waking more often, and naps can become shorter while the routine reorganizes.',
          'This does not mean you did anything wrong. Around four months, many babies become more alert, sleep cycles change, and the timing that worked last week may suddenly feel off.',
        ],
      },
      {
        heading: 'Use wake windows to protect naps',
        body: [
          'Many four-month-olds do best with a predictable flow of naps, feeds, play, and bedtime. Yorix helps track how long your baby has been awake and suggests the next sleep window before overtiredness builds.',
          'The right window depends on the previous nap, the morning wake time, and how the baby seems. A short nap often calls for a smaller next window and a calmer transition into sleep.',
        ],
      },
      {
        heading: 'Make bedtime easier to repeat',
        body: [
          'A steady bedtime routine can help even when the exact bedtime moves. A bath, feed, quiet room, white noise, and consistent soothing pattern may make the evening feel less chaotic for parents and baby.',
          'The routine does not need to be elaborate. What matters is that it is repeatable and calm enough that parents can do it on ordinary tired evenings.',
        ],
      },
      {
        heading: 'Track regressions without panic',
        body: [
          'If night wakings increase, track them for a few days before changing everything. Yorix can help separate one rough night from a pattern that may need a routine adjustment.',
          'Parents can look at bedtime, nap totals, feeding timing, and wake windows together instead of guessing from memory.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Nap count',
        value: '3-4 naps',
        note: 'Depends on nap length and wake time',
      },
      {
        label: 'Routine focus',
        value: 'Consistent bedtime flow',
        note: 'Same order, flexible time',
      },
      {
        label: 'Common challenge',
        value: 'Short naps',
        note: 'Next window may need to shorten',
      },
      {
        label: 'Yorix helps with',
        value: 'Timing changes',
        note: 'Recalculates after real logs',
      },
    ],
    checklist: [
      'Watch for shorter naps and adjust the next sleep window.',
      'Keep bedtime flexible after a rough nap day.',
      'Track night wakings to spot patterns over a week.',
      'Use the same calm bedtime steps most nights.',
    ],
    faqs: [
      {
        question: 'Is the 4 month sleep regression real?',
        answer:
          'Many families notice major sleep changes around this age. It is often connected to maturing sleep patterns, longer wake windows, and more alertness.',
      },
      {
        question: 'Should bedtime be fixed at four months?',
        answer:
          'A consistent bedtime routine helps, but the exact time may need to move based on naps. Earlier bedtime can help after a short-nap day.',
      },
    ],
  },
  {
    slug: 'baby-feeding-schedule',
    title: 'Baby Feeding Schedule',
    shortTitle: 'Feeding schedule',
    description:
      'A practical baby feeding schedule guide for tracking breastfeeding, bottle feeds, pumping, diapers, and sleep in one daily rhythm.',
    category: 'Feeding',
    date: 'September 3, 2026',
    readTime: '6 min read',
    coverClass: 'from-[#0D9488] via-[#22C55E] to-[#C7D2FE]',
    eyebrow: 'Feeding and sleep',
    intro:
      'A baby feeding schedule can help parents understand the whole day, especially when it sits next to sleep, diapers, mood, and growth notes. Feeding and sleep are connected, but every baby’s rhythm is different.',
    sections: [
      {
        heading: 'Track feeding without turning it into pressure',
        body: [
          'A log can help you remember the last breastfeeding session, bottle, pumping time, or feed amount. It should support the parent, not create anxiety. Yorix keeps feeding history simple and easy to review.',
          'For tired parents, the value is often practical: which side did we start on, when was the last bottle, how long has it been, and what happened before the next nap?',
        ],
      },
      {
        heading: 'Look at feeds and naps together',
        body: [
          'Some difficult naps happen after a long wake window, while others may connect to hunger, digestion, or an unusually busy day. Seeing sleep and feeds in one timeline makes those patterns easier to notice.',
          'A combined timeline can also make handoffs easier. If one parent slept, the other parent can still see the night without asking for every detail.',
        ],
      },
      {
        heading: 'Keep health questions separate from tracking',
        body: [
          'Tracking can help you prepare better questions for a clinician, but it does not replace medical advice. If you are concerned about feeding, weight, hydration, or symptoms, speak with a qualified professional.',
          'Yorix is built as a routine and care log. It helps organize information, but medical decisions should stay with qualified clinicians.',
        ],
      },
      {
        heading: 'Use feeding history for calmer planning',
        body: [
          'When feeding and sleep live together, parents can notice whether certain routines lead to smoother naps or easier bedtimes. The goal is clarity, not perfection.',
          'Over time, daily summaries and weekly patterns can show whether the schedule is becoming more predictable.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Breastfeeding',
        value: 'Timer + history',
        note: 'Useful for night feeds',
      },
      {
        label: 'Bottle feeds',
        value: 'Amounts + times',
        note: 'Easy shared-care reference',
      },
      {
        label: 'Pumping',
        value: 'Sessions logged',
        note: 'Keep supply notes organized',
      },
      {
        label: 'Diapers',
        value: 'Context with feeds',
        note: 'Helpful for care discussions',
      },
    ],
    checklist: [
      'Log breastfeeding, bottles, and pumping in one place.',
      'Track diapers near feeding notes for better context.',
      'Review daily totals without judging one unusual day.',
      'Share clear history with a clinician when needed.',
    ],
    faqs: [
      {
        question: 'Should feeding and sleep be tracked in the same app?',
        answer:
          'For many families, yes. Feeding can affect sleep timing, and a single timeline makes the day easier to understand.',
      },
      {
        question: 'Can tracking become stressful?',
        answer:
          'It can if every number feels like a judgment. The healthier goal is to use tracking as memory support and pattern recognition.',
      },
    ],
  },
  {
    slug: 'wake-windows-by-age',
    title: 'Wake Windows by Age',
    shortTitle: 'Wake windows',
    description:
      'A wake windows by age guide for newborns, infants, and toddlers, with practical tips for timing naps and bedtime.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '7 min read',
    coverClass: 'from-[#6366F1] via-[#8B5CF6] to-[#F59E0B]',
    eyebrow: 'Sleep timing',
    intro:
      'Wake windows by age help parents estimate how long a baby may comfortably stay awake before the next nap or bedtime. They are useful guides, but they work best when combined with real sleep history.',
    sections: [
      {
        heading: 'Wake windows change as babies grow',
        body: [
          'A newborn may need sleep again after a short period awake, while an older baby can usually handle longer stretches. The challenge is that growth spurts, regressions, illness, and short naps can change the right timing.',
          'Because wake windows change gradually, parents often need both age guidance and recent history. Yesterday’s pattern may matter more than a chart when your baby is going through a transition.',
        ],
      },
      {
        heading: 'The previous nap matters',
        body: [
          'A long restorative nap may support a longer wake window. A short nap often means the next sleep time should come sooner. Yorix studies nap length and daily rhythm before suggesting the next sleep window.',
          'This is one of the most useful parts of adaptive scheduling: the plan changes because the day changed, not because the parent failed to follow the plan.',
        ],
      },
      {
        heading: 'Bedtime is part of the same pattern',
        body: [
          'When wake windows stretch too far late in the day, bedtime can become harder. A flexible schedule helps parents move bedtime earlier after missed naps instead of waiting for a fixed time on the clock.',
          'A good bedtime plan protects the evening by responding to the whole day. If naps were short, bedtime may need to come earlier. If naps were strong, the evening may feel smoother.',
        ],
      },
      {
        heading: 'Use cues with the timer',
        body: [
          'Wake windows are guides, not commands. Rubbing eyes, zoning out, fussiness, and reduced engagement can all help parents decide whether to begin the wind-down.',
          'Yorix gives the timing context so those cues become easier to interpret.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Newborn',
        value: 'Very short windows',
        note: 'Follow sleepy cues closely',
      },
      {
        label: '4-6 months',
        value: 'Growing windows',
        note: 'Nap rhythm starts to emerge',
      },
      {
        label: '7-12 months',
        value: 'Longer awake time',
        note: 'Transitions can affect bedtime',
      },
      {
        label: 'Toddler',
        value: 'One main nap',
        note: 'Evenings depend on nap quality',
      },
    ],
    checklist: [
      'Track wake time from the end of the last nap.',
      'Shorten the next window after a short nap.',
      'Use sleepy cues alongside the timer.',
      'Keep bedtime flexible when the day goes off plan.',
    ],
    faqs: [
      {
        question: 'Are wake windows more important than nap times?',
        answer:
          'For many babies, wake windows are more useful than fixed nap times, especially before a stable daily schedule develops.',
      },
      {
        question: 'What happens if a wake window is too long?',
        answer:
          'Some babies become overtired, making naps or bedtime harder. A shorter next window or earlier bedtime may help after a stretched day.',
      },
    ],
  },
];

export const topicPages: TopicPage[] = [...coreTopicPages, ...researchGuides];

export function getTopicPage(slug: string) {
  return topicPages.find((page) => page.slug === slug);
}
