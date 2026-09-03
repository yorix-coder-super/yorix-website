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
  eyebrow: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
  checklist: string[];
};

export const topicPages: TopicPage[] = [
  {
    slug: 'baby-nap-schedule-by-age',
    title: 'Baby Nap Schedule by Age',
    shortTitle: 'Nap schedule by age',
    description:
      'A practical baby nap schedule by age with wake windows, nap counts, and simple ways to adjust the day when naps are short.',
    eyebrow: 'Age-based nap planning',
    intro:
      'A baby nap schedule by age gives parents a useful starting point, but real sleep rarely follows a perfect chart. Yorix helps you combine age-aware nap ranges with your baby’s actual sleep history so the next nap feels easier to time.',
    sections: [
      {
        heading: 'Start with the age range, then watch the baby',
        body: 'Newborns may nap many times a day, older babies often settle into three naps, and many babies move toward two naps around the second half of the first year. These ranges are helpful, but sleepy cues, night sleep, feeds, and nap length still matter.',
      },
      {
        heading: 'Short naps should change the rest of the day',
        body: 'A 25-minute nap is not the same as a 90-minute nap. When one nap is short, the next wake window may need to be shorter and bedtime may need to move earlier. Yorix recalculates the next sleep window as the day unfolds.',
      },
      {
        heading: 'Use the schedule as a rhythm, not a rule',
        body: 'The goal is not to force a baby into a rigid timetable. A good nap routine helps parents reduce guessing while still leaving room for growth spurts, travel days, feeding changes, and sleep regressions.',
      },
    ],
    checklist: [
      'Track every nap start and end time for a few days.',
      'Compare nap length with the next wake window.',
      'Move bedtime earlier after a difficult nap day.',
      'Keep the room and wind-down routine familiar.',
    ],
  },
  {
    slug: 'newborn-sleep-schedule',
    title: 'Newborn Sleep Schedule',
    shortTitle: 'Newborn sleep',
    description:
      'A gentle newborn sleep schedule guide for parents who want to track sleep, feeds, wake windows, and day-night rhythm without pressure.',
    eyebrow: 'Newborn rhythm',
    intro:
      'A newborn sleep schedule is less about strict times and more about noticing patterns. In the first months, babies need frequent sleep, frequent feeds, and flexible support as their day-night rhythm slowly develops.',
    sections: [
      {
        heading: 'Keep expectations soft in the newborn stage',
        body: 'Newborn sleep can look irregular. Some naps are long, some are tiny, and feeding needs can shift from day to day. Instead of chasing a perfect timetable, it is more useful to track what actually happened and build a calm rhythm from that information.',
      },
      {
        heading: 'Connect sleep and feeding notes',
        body: 'Many parents understand the day better when sleep, feeds, diapers, and mood sit in one timeline. Yorix keeps those logs together so you can see whether a short nap followed a long wake window, a cluster feed, or an unusual morning.',
      },
      {
        heading: 'Build day-night cues gently',
        body: 'Morning light, calm evenings, and a repeatable bedtime flow can help a baby begin to recognize the difference between day and night. The routine can stay simple: feed, change, soothe, and sleep.',
      },
    ],
    checklist: [
      'Track sleep and feeds without trying to force exact times.',
      'Use short, calm wake periods between naps.',
      'Keep nights quiet and low-stimulation.',
      'Ask a clinician about feeding, growth, or health concerns.',
    ],
  },
  {
    slug: '4-month-old-sleep-schedule',
    title: '4 Month Old Sleep Schedule',
    shortTitle: '4 month sleep',
    description:
      'A clear 4 month old sleep schedule guide covering wake windows, nap changes, bedtime, and the 4 month sleep regression.',
    eyebrow: 'Four month routine',
    intro:
      'A 4 month old sleep schedule often changes quickly. Wake windows stretch, naps may become less predictable, and many families notice new night wakings during the 4 month sleep regression.',
    sections: [
      {
        heading: 'Expect change around four months',
        body: 'At this age, sleep patterns mature and the old newborn rhythm may stop working. A baby who slept long stretches may begin waking more often, and naps can become shorter while the routine reorganizes.',
      },
      {
        heading: 'Use wake windows to protect naps',
        body: 'Many four-month-olds do best with a predictable flow of naps, feeds, play, and bedtime. Yorix helps track how long your baby has been awake and suggests the next sleep window before overtiredness builds.',
      },
      {
        heading: 'Make bedtime easier to repeat',
        body: 'A steady bedtime routine can help even when the exact bedtime moves. A bath, feed, quiet room, white noise, and consistent soothing pattern may make the evening feel less chaotic for parents and baby.',
      },
    ],
    checklist: [
      'Watch for shorter naps and adjust the next sleep window.',
      'Keep bedtime flexible after a rough nap day.',
      'Track night wakings to spot patterns over a week.',
      'Use the same calm bedtime steps most nights.',
    ],
  },
  {
    slug: 'baby-feeding-schedule',
    title: 'Baby Feeding Schedule',
    shortTitle: 'Feeding schedule',
    description:
      'A practical baby feeding schedule guide for tracking breastfeeding, bottle feeds, pumping, diapers, and sleep in one daily rhythm.',
    eyebrow: 'Feeding and sleep',
    intro:
      'A baby feeding schedule can help parents understand the whole day, especially when it sits next to sleep, diapers, mood, and growth notes. Feeding and sleep are connected, but every baby’s rhythm is different.',
    sections: [
      {
        heading: 'Track feeding without turning it into pressure',
        body: 'A log can help you remember the last breastfeeding session, bottle, pumping time, or feed amount. It should support the parent, not create anxiety. Yorix keeps feeding history simple and easy to review.',
      },
      {
        heading: 'Look at feeds and naps together',
        body: 'Some difficult naps happen after a long wake window, while others may connect to hunger, digestion, or an unusually busy day. Seeing sleep and feeds in one timeline makes those patterns easier to notice.',
      },
      {
        heading: 'Keep health questions separate from tracking',
        body: 'Tracking can help you prepare better questions for a clinician, but it does not replace medical advice. If you are concerned about feeding, weight, hydration, or symptoms, speak with a qualified professional.',
      },
    ],
    checklist: [
      'Log breastfeeding, bottles, and pumping in one place.',
      'Track diapers near feeding notes for better context.',
      'Review daily totals without judging one unusual day.',
      'Share clear history with a clinician when needed.',
    ],
  },
  {
    slug: 'wake-windows-by-age',
    title: 'Wake Windows by Age',
    shortTitle: 'Wake windows',
    description:
      'A wake windows by age guide for newborns, infants, and toddlers, with practical tips for timing naps and bedtime.',
    eyebrow: 'Sleep timing',
    intro:
      'Wake windows by age help parents estimate how long a baby may comfortably stay awake before the next nap or bedtime. They are useful guides, but they work best when combined with real sleep history.',
    sections: [
      {
        heading: 'Wake windows change as babies grow',
        body: 'A newborn may need sleep again after a short period awake, while an older baby can usually handle longer stretches. The challenge is that growth spurts, regressions, illness, and short naps can change the right timing.',
      },
      {
        heading: 'The previous nap matters',
        body: 'A long restorative nap may support a longer wake window. A short nap often means the next sleep time should come sooner. Yorix studies nap length and daily rhythm before suggesting the next sleep window.',
      },
      {
        heading: 'Bedtime is part of the same pattern',
        body: 'When wake windows stretch too far late in the day, bedtime can become harder. A flexible schedule helps parents move bedtime earlier after missed naps instead of waiting for a fixed time on the clock.',
      },
    ],
    checklist: [
      'Track wake time from the end of the last nap.',
      'Shorten the next window after a short nap.',
      'Use sleepy cues alongside the timer.',
      'Keep bedtime flexible when the day goes off plan.',
    ],
  },
];

export function getTopicPage(slug: string) {
  return topicPages.find((page) => page.slug === slug);
}
