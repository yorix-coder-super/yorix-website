import type { TopicPage } from './content';

const safetySources = [
  {
    label: 'CDC: Providing Care for Babies to Sleep Safely',
    href: 'https://www.cdc.gov/sudden-infant-death/sleep-safely/',
  },
  {
    label: 'American Academy of Pediatrics: Safe Sleep',
    href: 'https://www.aap.org/en/patient-care/safe-sleep/',
  },
  {
    label: 'AASM consensus sleep duration recommendations',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4877308/',
  },
];

export const researchGuides: TopicPage[] = [
  {
    slug: 'survive-night-wakings-new-parents',
    title: 'Night Wakings: 10 Ways New Parents Can Survive',
    shortTitle: 'Night wakings',
    description:
      'A practical guide to infant night wakings, what is normal by age, and how tired parents can make nights safer and more manageable.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '10 min read',
    coverClass: 'from-[#1C1832] via-[#312E81] to-[#6366F1]',
    eyebrow: 'Night waking survival guide',
    intro:
      'Night wakings in the first two years are usually part of normal sleep maturation, not proof that a parent is doing something wrong. The goal is not to force perfect nights at any cost, but to protect safe sleep, respond to real needs, and help parents stay functional.',
    sections: [
      {
        heading: 'What counts as normal at night',
        body: [
          'Newborn sleep is naturally fragmented. Babies wake for hunger, comfort, immature sleep cycles, gas, temperature changes, and the simple fact that their day-night rhythm is still under construction. Even between 6 and 12 months, many healthy babies do not sleep one uninterrupted 6- to 8-hour stretch every night.',
          'It helps to separate waking from signaling. All babies move through lighter sleep and brief arousals. Parents usually notice the wakings that become crying, feeding, rocking, or a long resettling session. Tracking those signaled wakings is more useful than trying to measure every tiny sleep-cycle transition.',
        ],
      },
      {
        heading: 'The first priority is a safe sleep space',
        body: [
          'Before changing a routine, protect the sleep environment. For babies under 1 year, the core safe-sleep pattern is back sleeping, a separate firm and flat surface, a fitted sheet, and no pillows, bumpers, blankets, soft toys, positioners, or inclined sleep products.',
          'Room-sharing without bed-sharing is commonly recommended for the early months because it keeps the baby close for feeding and comforting while preserving a separate sleep surface. This matters most on exhausted nights, when accidental unsafe sleep is more likely.',
        ],
      },
      {
        heading: 'Ten realistic strategies for hard nights',
        body: [
          'Start with the basics: keep nights boring, use low light, feed when there is real hunger, avoid long playful interactions at 3 a.m., and repeat the same short calming steps. A predictable bedtime routine can also reduce bedtime resistance over time, though it does not erase every night waking.',
          'Parents also need a plan for themselves. Prepare water, burp cloths, diapers, and feeding supplies before bed. Agree who handles the first waking if there are two caregivers. If possible, protect one longer parent sleep block several nights a week, even if it requires shifting duties.',
        ],
      },
      {
        heading: 'When to change the schedule',
        body: [
          'If nights suddenly get worse, look at the day first. A very short nap day can cause overtired evenings. A late nap can push bedtime too far. A baby who wakes hungry may need feeding patterns reviewed. Illness, teething discomfort, travel, daycare changes, and new motor skills can also disrupt sleep temporarily.',
          'Avoid changing everything after one awful night. Look for a pattern across several days: bedtime timing, total daytime sleep, last wake window, feeds, and how long it takes to settle. Patterns make better decisions than memory does at 2 a.m.',
        ],
      },
    ],
    sampleRows: [
      {
        label: '0-3 months',
        value: 'Frequent waking',
        note: 'Feeds and immature rhythm are expected',
      },
      {
        label: '4-6 months',
        value: 'Changing cycles',
        note: 'More alertness can disrupt old routines',
      },
      {
        label: '7-12 months',
        value: 'Variable nights',
        note: 'Skills, separation, and habits may matter',
      },
      {
        label: '12-24 months',
        value: 'Usually fewer wakings',
        note: 'Illness and transitions still interrupt sleep',
      },
    ],
    checklist: [
      'Keep every sleep on a firm, flat, separate surface.',
      'Use a short and repeatable bedtime routine.',
      'Keep night care quiet and low stimulation.',
      'Track several nights before making a major routine change.',
    ],
    faqs: [
      {
        question: 'Is it normal for a baby to wake every night?',
        answer:
          'Yes, night waking can be normal across infancy. The meaning depends on age, feeding, health, growth, bedtime timing, and how difficult it is to return to sleep.',
      },
      {
        question: 'Should I stop night feeds to reduce wakings?',
        answer:
          'Not without considering age, growth, feeding type, and medical context. Young babies often need night feeds, and feeding questions should be discussed with a clinician when there is uncertainty.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps with night wakings',
      body: [
        'Yorix lets you log night wakings, feeds, naps, bedtime, and wake windows in one timeline. After a few nights, you can see whether wakings cluster after short naps, late bedtime, long wake windows, or feeding changes.',
        'Instead of guessing in the dark, Yorix turns the pattern into a calmer next-day plan and helps both caregivers stay synced.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: 'white-noise-for-baby-sleep',
    title: 'White Noise for Baby Sleep: What Helps and What to Keep Safe',
    shortTitle: 'White noise safety',
    description:
      'What parents should know about white noise, sound machines, lullabies, volume, distance, timers, and safe use around baby sleep.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '9 min read',
    coverClass: 'from-[#312E81] via-[#6366F1] to-[#A78BFA]',
    eyebrow: 'Sound and sleep',
    intro:
      'White noise can help some babies settle, but it is not a magic sleep treatment. The practical question is how to use sound gently: low volume, enough distance, limited duration, and never as a substitute for safe sleep basics.',
    sections: [
      {
        heading: 'What the evidence actually suggests',
        body: [
          'The best-known direct trial in newborns was small, but it found that more babies fell asleep quickly with white noise than without it. That does not mean every baby needs white noise, or that louder is better. It means sound can be one helpful cue for some families.',
          'Evidence is much thinner for claims that pink noise, brown noise, womb sounds, nature sounds, or all-night audio are clearly superior. Parents can choose a sound that is calm and tolerable, but the strongest practical safety message is about acoustic dose: volume, distance, and duration.',
        ],
      },
      {
        heading: 'Volume, distance, and duration matter',
        body: [
          'A sleep machine should not sit on the crib rail or right next to the baby’s head. Place it as far away as practical, use the lowest volume that still masks household noise, and avoid running it loudly for long stretches.',
          'Many parents use a timer or turn the sound down once the baby is asleep. If sound is needed to mask unpredictable noise in an apartment or shared room, keep it very low and review whether it is still needed as routines stabilize.',
        ],
      },
      {
        heading: 'White noise should support the routine',
        body: [
          'A quiet sound can become a sleep cue, like dim lights or the same bedtime phrase. That kind of learned association is not the same as addiction. The concern is not dependency in a medical sense; it is using sound too loudly, too close, or so constantly that nobody checks whether the environment can be made calmer.',
          'Use white noise as one small part of a wind-down routine: feed or comfort, diaper if needed, dim room, sound on low, and a consistent settling pattern.',
        ],
      },
      {
        heading: 'When sound is not the answer',
        body: [
          'If a baby wakes from hunger, illness, reflux symptoms, pain, breathing problems, or an unsafe sleep setup, white noise will not solve the real issue. It may also hide useful cues if it is too loud for caregivers to hear the baby clearly.',
          'If sleep suddenly changes, review age, naps, feeding, symptoms, room temperature, and safe sleep before adding more devices.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'White noise',
        value: 'Most studied',
        note: 'May help some babies settle',
      },
      {
        label: 'Pink/brown noise',
        value: 'Limited infant data',
        note: 'Choose by comfort, not proven superiority',
      },
      {
        label: 'Lullabies',
        value: 'Gentle cue',
        note: 'Useful when calm and predictable',
      },
      {
        label: 'Sleep machine',
        value: 'Low and far',
        note: 'Avoid high-volume all-night exposure',
      },
    ],
    checklist: [
      'Place the sound source away from the baby’s head.',
      'Use the lowest helpful volume.',
      'Consider a timer or turning volume down after sleep begins.',
      'Keep the sleep space empty and safe regardless of sound.',
    ],
    faqs: [
      {
        question: 'Can white noise damage a baby’s hearing?',
        answer:
          'The risk depends on how loud, how close, and how long it plays. Use low volume, place the machine far from the baby, and limit long high-volume exposure.',
      },
      {
        question: 'Is brown noise better than white noise for babies?',
        answer:
          'There is not strong infant-specific evidence that brown noise is better. If you use sound, choose a calm low-volume option that works for your family.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps with bedtime sounds',
      body: [
        'Yorix includes white noise, rain, ocean sounds, bedtime stories, and a sleep timer, so sound stays connected to the sleep routine instead of becoming another device to manage.',
        'You can also compare nights with and without sound in the sleep log to see whether it actually helps your baby settle.',
      ],
    },
    sources: [
      {
        label:
          'AAP Pediatrics: Preventing Excessive Noise Exposure in Infants, Children, and Adolescents',
        href: 'https://publications.aap.org/pediatrics/article/152/5/e2023063752/194468/Preventing-Excessive-Noise-Exposure-in-Infants',
      },
      ...safetySources,
    ],
  },
  {
    slug: 'ferber-method-baby-sleep',
    title:
      'The Ferber Method: What It Is, When Parents Consider It, and What to Know',
    shortTitle: 'Ferber method',
    description:
      'A balanced guide to the Ferber method, graduated extinction, age readiness, safety boundaries, and gentler alternatives.',
    category: 'Sleep Training',
    date: 'September 3, 2026',
    readTime: '11 min read',
    coverClass: 'from-[#1E1B4B] via-[#4F46E5] to-[#8B5CF6]',
    eyebrow: 'Sleep training decisions',
    intro:
      'The Ferber method is a version of graduated extinction: parents use planned checks while reducing the amount of help needed at sleep onset. It is not the same as ignoring a baby indefinitely, and it is not the right starting point for every age or every family.',
    sections: [
      {
        heading: 'What the Ferber method actually means',
        body: [
          'In practice, a baby is placed down awake or drowsy. If the baby cries, the parent waits for a planned interval, returns briefly to reassure, and then leaves again. The intervals may gradually lengthen. The goal is to reduce a sleep-onset association that requires the same parent action every time the baby reaches lighter sleep.',
          'The important nuance is that research protocols vary. “Ferber,” “graduated extinction,” “controlled crying,” and “controlled comforting” are often used loosely, but they are not always identical in how long parents wait, what they do during checks, or which babies were included.',
        ],
      },
      {
        heading: 'Age matters more than a calendar shortcut',
        body: [
          'For newborns and very young babies, formal extinction-style methods are not the right focus. Sleep is fragmented, feeding needs are real, and the practical priorities are safe sleep, responsive feeding, day-night cues, and parent support.',
          'The strongest randomized evidence for graduated extinction is mainly in older infants, often around 6 months and beyond. Between 4 and 6 months, many families can build routines and gently reduce extra help, but that is different from assuming every 4-month-old is ready for structured crying intervals.',
        ],
      },
      {
        heading: 'What sleep training can and cannot promise',
        body: [
          'Behavioral sleep methods may improve bedtime settling, reduce signaled wakings, and reduce the parent’s sense that sleep is unmanageable. They do not make babies biologically unable to wake. Brief arousals are part of sleep.',
          'The realistic target is a smoother sleep process, not a guarantee of silent nights. If a baby wakes from hunger, illness, discomfort, separation anxiety, or an overtired day, the plan may need adjustment.',
        ],
      },
      {
        heading: 'Alternatives if crying intervals feel wrong',
        body: [
          'Parents do not have to choose Ferber to be serious about sleep. Bedtime fading, camping out, parental-presence fading, responsive settling, and routine repair can all be more acceptable depending on the problem and the parent’s tolerance.',
          'The best method is the one that fits the baby’s age, health, feeding needs, family values, and caregiver mental state. If listening to crying feels overwhelming, a lower-cry approach is a valid path.',
        ],
      },
    ],
    sampleRows: [
      {
        label: '0-4 months',
        value: 'Not a first-line approach',
        note: 'Use responsive settling and safe sleep basics',
      },
      {
        label: '4-6 months',
        value: 'Grey zone',
        note: 'Routines and gentle fading first',
      },
      {
        label: '6+ months',
        value: 'Possible option',
        note: 'Only when healthy, growing, and feeding needs are understood',
      },
      {
        label: 'Any age',
        value: 'Safety first',
        note: 'Health, feeding, and safe sleep override training plans',
      },
    ],
    checklist: [
      'Confirm the baby is old enough and healthy enough for sleep training.',
      'Review feeding and growth before reducing night responses.',
      'Choose a method both caregivers can follow consistently.',
      'Stop and reassess if crying feels extreme or the baby seems unwell.',
    ],
    faqs: [
      {
        question: 'Is Ferber the same as cry it out?',
        answer:
          'Ferber is usually a graduated approach with planned checks. Full extinction is different because parents do not use the same scheduled reassurance checks.',
      },
      {
        question: 'Can I use Ferber for a newborn?',
        answer:
          'No. Newborn sleep is fragmented and feeding-driven. The focus should be safe sleep, responsive care, and gentle day-night rhythm.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps before any sleep training decision',
      body: [
        'Yorix helps you see whether the real issue is bedtime timing, short naps, feeding patterns, or repeated sleep associations. That makes it easier to choose the right approach instead of jumping straight to a method.',
        'If you do try a gradual plan, Yorix can track bedtime, checks, night wakings, and next-day naps so you can judge progress by patterns, not by one emotional night.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: 'sleep-training-methods-explained',
    title:
      'Sleep Training Methods Explained: Ferber, Bedtime Fading, Camping Out, and Responsive Settling',
    shortTitle: 'Sleep training methods',
    description:
      'A clear comparison of common baby sleep training methods, when they are used, what they ask of parents, and safer age boundaries.',
    category: 'Sleep Training',
    date: 'September 3, 2026',
    readTime: '10 min read',
    coverClass: 'from-[#161628] via-[#312E81] to-[#F59E0B]',
    eyebrow: 'Compare the options',
    intro:
      'Sleep training is not one method. It is a broad label for different ways of changing bedtime patterns, from responsive settling and bedtime fading to graduated extinction. Understanding the differences helps parents choose a plan that fits their baby and their values.',
    sections: [
      {
        heading: 'Start by naming the problem',
        body: [
          'A baby who takes 90 minutes to fall asleep may need a different strategy than a baby who wakes every hour and needs the same rocking sequence each time. A baby who is hungry at night needs feeding support, not a behavioral plan.',
          'Before choosing a method, look at age, total sleep, nap timing, last wake window, bedtime routine, feeding, illness, room setup, and how the baby usually falls asleep.',
        ],
      },
      {
        heading: 'The main method families compare',
        body: [
          'Responsive settling means helping the baby calm with voice, touch, holding, rocking, or feeding as appropriate, then gradually giving less help when the baby is ready. Bedtime fading temporarily moves bedtime closer to the time the baby naturally falls asleep, then shifts it earlier.',
          'Camping out or parental-presence fading keeps the parent near the sleep space and reduces presence over time. Graduated extinction uses planned waiting intervals and brief checks. Full extinction removes parental response after bedtime except for safety needs, and many families do not want that approach.',
        ],
      },
      {
        heading: 'Age and health boundaries',
        body: [
          'For the early months, the most appropriate work is routine shaping: light during the day, low stimulation at night, safe sleep, feeding responsiveness, and a bedtime sequence. Structured crying methods are not the starting point for newborns.',
          'For older healthy babies, behavioral methods may be considered when sleep-onset associations or repeated signaled wakings are causing major family distress. Medical concerns, poor growth, breathing problems, fever, feeding difficulty, or parental mental health crisis change the priority.',
        ],
      },
      {
        heading: 'Use a plan you can repeat calmly',
        body: [
          'A sleep plan only works if caregivers can follow it consistently and safely. If a method makes a parent panic, resentful, or unable to sleep at all, it is not a good fit, even if it has a name and a schedule.',
          'Choose the smallest change likely to help. Sometimes that is moving bedtime, protecting naps, adding a routine, or reducing one sleep association gradually rather than changing the whole night at once.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Responsive settling',
        value: 'High parent support',
        note: 'Best fit for younger babies and gentle transitions',
      },
      {
        label: 'Bedtime fading',
        value: 'Clock adjustment',
        note: 'Useful when bedtime is too early for actual sleep pressure',
      },
      {
        label: 'Camping out',
        value: 'Parent stays nearby',
        note: 'Gradual reduction of presence',
      },
      {
        label: 'Graduated extinction',
        value: 'Planned checks',
        note: 'Usually considered for older healthy babies',
      },
    ],
    checklist: [
      'Define the exact sleep problem before choosing a method.',
      'Use safe sleep for every nap and night sleep.',
      'Pick one change and track it for several nights.',
      'Reassess if feeding, illness, growth, or stress is part of the picture.',
    ],
    faqs: [
      {
        question: 'Which sleep training method is best?',
        answer:
          'There is no universal best method. The right choice depends on age, health, feeding, the actual sleep problem, and what caregivers can carry out calmly.',
      },
      {
        question: 'Does sleep training mean ignoring my baby?',
        answer:
          'Not necessarily. Many approaches are gradual and parent-present. The phrase sleep training covers very different methods.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps you choose the smallest useful change',
      body: [
        'Yorix gives you a clear view of naps, bedtime, wake windows, feeds, and wakings before you choose a method. That helps identify whether timing, hunger, routine, or sleep associations are driving the problem.',
        'The AI sleep coach can turn your logs into practical next steps, while keeping medical and safety boundaries clear.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: 'newborn-sleep-first-28-days',
    title:
      'Newborn Sleep in the First 28 Days: What Is Normal and What Needs Attention',
    shortTitle: 'First 28 days',
    description:
      'A newborn sleep guide for the first 28 days, including normal fragmented sleep, feeding-driven waking, safe sleep, and red flags.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '11 min read',
    coverClass: 'from-[#1E1B4B] via-[#312E81] to-[#C7D2FE]',
    eyebrow: 'Newborn physiology',
    intro:
      'The first 28 days are not a miniature version of older baby sleep. Newborn sleep is fragmented, feeding-driven, and only weakly organized around day and night. A good plan protects safety, feeding, and parent recovery instead of chasing a strict schedule.',
    sections: [
      {
        heading: 'Newborn sleep is supposed to be irregular',
        body: [
          'A healthy newborn may sleep many short stretches across 24 hours. The longest stretch can be much shorter than parents expect, and waking every 1 to 3 hours can be completely normal when feeding needs are high.',
          'Official sleep-duration ranges are useful as population guidance, but they are not a diagnosis tool by themselves. A sleepy but healthy baby must still wake well enough to feed, breathe comfortably, maintain color and tone, and show appropriate diapers and growth.',
        ],
      },
      {
        heading: 'Day-night rhythm develops later',
        body: [
          'In the first weeks, circadian rhythm is immature. More obvious day-night organization often emerges over the next months as light exposure, feeding patterns, social interaction, and melatonin rhythm mature.',
          'Parents can help gently by making daytime brighter and more interactive, while keeping nights dim, quiet, and practical. This is not sleep training; it is environmental support for a biological process that takes time.',
        ],
      },
      {
        heading: 'Safe sleep is the non-negotiable foundation',
        body: [
          'For every sleep, place the baby on the back on a separate firm, flat surface with only a fitted sheet. Keep pillows, loose blankets, bumpers, soft toys, positioners, weighted products, and inclined sleep devices out of the sleep space.',
          'If the baby falls asleep in a car seat, swing, or carrier outside its intended use, move the baby to a safe flat sleep surface as soon as practical. Exhaustion is real, so set up the room before night begins.',
        ],
      },
      {
        heading: 'When sleepiness is a red flag',
        body: [
          'Too much sleep is concerning when it comes with poor feeding, difficulty waking, unusual limpness, abnormal breathing, blue color, fever, low temperature, worsening jaundice, dehydration signs, or fewer wet diapers than expected.',
          'If something feels medically wrong, do not try to solve it with a schedule. Newborn concerns deserve prompt clinical advice.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Age',
        value: '0-28 days',
        note: 'Newborn physiology is distinct',
      },
      {
        label: 'Sleep pattern',
        value: 'Short episodes',
        note: 'Often tied closely to feeding',
      },
      {
        label: 'Routine goal',
        value: 'Gentle cues',
        note: 'Light by day, quiet care at night',
      },
      {
        label: 'Avoid',
        value: 'Formal sleep training',
        note: 'Not appropriate for this stage',
      },
    ],
    checklist: [
      'Use back sleeping for every sleep.',
      'Keep the sleep surface firm, flat, separate, and empty.',
      'Feed responsively and follow clinical feeding guidance.',
      'Call a clinician for fever, poor feeding, breathing concerns, or unusual lethargy.',
    ],
    faqs: [
      {
        question: 'Should a newborn sleep on a schedule?',
        answer:
          'A strict clock schedule is usually unrealistic. A simple rhythm around feeding, short wake time, safe sleep, and calm nights is a better goal.',
      },
      {
        question: 'Can I sleep train in the first month?',
        answer:
          'No. The first month is about safe sleep, feeding, recovery, and learning your baby’s signals.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps in the newborn stage',
      body: [
        'Yorix helps you track newborn sleep, feeds, diapers, mood, symptoms, and notes without pretending the first month should be perfectly scheduled.',
        'The shared timeline makes caregiver handoffs easier and gives you clearer information if you need to ask a clinician about feeding, diapers, or sleepiness.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: '3-month-old-sleep-schedule',
    title:
      '3 Month Old Sleep Schedule: A Gentle Rhythm Before Sleep Gets Predictable',
    shortTitle: '3 month sleep',
    description:
      'A 3 month old sleep guide covering day-night rhythm, wake windows, naps, feeding, safe sleep, and why formal sleep training is usually too early.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '9 min read',
    coverClass: 'from-[#6366F1] via-[#8B5CF6] to-[#F59E0B]',
    eyebrow: 'Three month rhythm',
    intro:
      'At 3 months, sleep is moving from newborn chaos toward a clearer rhythm, but it is still changing quickly. The goal is a gentle structure: safe sleep, responsive feeding, day-night cues, several naps, and a calm bedtime routine.',
    sections: [
      {
        heading: 'Three months is a transition stage',
        body: [
          'Around 6 to 12 weeks, many babies begin showing more day-night organization. Night sleep may lengthen, wake periods may become more predictable, and parents may start seeing patterns that were invisible in the first weeks.',
          'Still, a 3-month-old is not an older baby in miniature. Sleep cycles are short, daytime naps vary, and night feeds can remain normal. A chart should guide observation, not create panic.',
        ],
      },
      {
        heading: 'Use wake windows gently',
        body: [
          'Wake windows can help prevent overtiredness, but exact numbers are not medical rules. Watch the baby, then compare sleepy cues with the clock. If the last nap was short, the next wake window may need to be shorter.',
          'A practical day often includes 3 to 5 sleep episodes, depending on nap length, morning wake time, feeding, and temperament. The last part of the day usually needs the most flexibility.',
        ],
      },
      {
        heading: 'Build day-night contrast',
        body: [
          'Use normal household light and interaction during the day. At night, keep feeds and changes calm, dim, and efficient. This supports the maturing circadian system without forcing the baby to behave like an older infant.',
          'A short bedtime routine can begin now: diaper, feed, sleep sack if appropriate, dim room, song or phrase, and safe sleep space.',
        ],
      },
      {
        heading: 'Skip formal crying-based training',
        body: [
          'There is not strong direct evidence supporting structured Ferber-style methods for 3-month-olds. Responsive settling fits this age better: help the baby calm, and only reduce help gradually if your baby is clearly ready.',
          'Feeding should remain responsive. Do not remove night feeds simply to make a schedule look cleaner, especially if growth, prematurity, or feeding concerns are present.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Sleep range',
        value: 'Often 14-17 hours',
        note: 'Total sleep varies by baby and measurement',
      },
      {
        label: 'Naps',
        value: '3-5 episodes',
        note: 'Short naps can still be normal',
      },
      {
        label: 'Night feeds',
        value: 'Often normal',
        note: 'Follow feeding and growth needs',
      },
      {
        label: 'Routine focus',
        value: 'Day-night cues',
        note: 'Bright days, quiet nights',
      },
    ],
    checklist: [
      'Track naps and night sleep for several days.',
      'Use sleepy cues and wake windows together.',
      'Keep every sleep space safe and empty.',
      'Use responsive settling instead of structured crying intervals.',
    ],
    faqs: [
      {
        question: 'How many naps should a 3-month-old take?',
        answer:
          'Many 3-month-olds take 3 to 5 naps, but nap length varies. Total sleep, mood, feeding, and bedtime matter more than a perfect nap count.',
      },
      {
        question: 'Why does my 3-month-old wake after 40 minutes?',
        answer:
          'Short naps can reflect sleep-cycle transitions. They are common at this age, especially when the baby is still learning to connect cycles.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps at 3 months',
      body: [
        'Yorix tracks the short naps, feeds, wake windows, and night wakings that make 3 months feel hard to read. After a few days, the app can suggest a calmer next nap window based on your baby’s real pattern.',
        'That means less mental math and a schedule that bends when one nap goes sideways.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: '5-month-old-sleep-schedule',
    title:
      '5 Month Old Sleep Schedule: Naps, Wake Windows, Night Feeds, and Bedtime',
    shortTitle: '5 month sleep',
    description:
      'A 5 month old sleep schedule guide with realistic nap timing, total sleep ranges, safe sleep, night wakings, and when two naps may be too soon.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '10 min read',
    coverClass: 'from-[#0D9488] via-[#6366F1] to-[#A78BFA]',
    eyebrow: 'Five month routine',
    intro:
      'At 5 months, many babies can follow a more predictable rhythm, but sleep is still variable. A helpful schedule protects enough total sleep, keeps naps from drifting too late, and avoids treating night waking as failure.',
    sections: [
      {
        heading: 'Use 12 to 16 hours as the broad range',
        body: [
          'For babies around 4 to 12 months, a common evidence-based recommendation is 12 to 16 hours of sleep per 24 hours, including naps. That range is broad because real babies vary.',
          'A practical starting point at 5 months is often three naps, roughly 2.5 to 4 hours of daytime sleep, and an 11- to 12-hour night window. Actual nighttime sleep may be shorter because waking and feeding still happen.',
        ],
      },
      {
        heading: 'Two naps may be too early for many babies',
        body: [
          'Some 5-month-olds can manage two naps if both naps are long and wake windows are comfortable. But two naps should not become the goal by itself. If the switch causes evening crying, early mornings, short naps, or more wakings, a small third nap may still be useful.',
          'Think of nap count as a tool, not a status symbol. The right number is the one that keeps the day balanced and bedtime manageable.',
        ],
      },
      {
        heading: 'Night feeds can still be normal',
        body: [
          'Some 5-month-olds still need night feeds, especially if breastfed, smaller, recovering from illness, or following a growth pattern that requires it. Removing feeds without context can make nights worse and create feeding stress.',
          'If you wonder whether a feed is hunger or habit, track several nights along with daytime intake and growth conversations with your clinician.',
        ],
      },
      {
        heading: 'Bedtime works best as a repeatable sequence',
        body: [
          'A short bedtime sequence can help: lower lights, quiet play, feed, diaper, sleep sack if safe and appropriate, sound on low if used, and into the sleep space drowsy but not fully asleep when the baby can tolerate it.',
          'If the baby is practicing rolling, stop swaddling and keep the sleep space empty. Safe sleep remains more important than any schedule.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Total sleep',
        value: '12-16 hours',
        note: 'Includes daytime sleep',
      },
      {
        label: 'Common naps',
        value: 'Usually 3',
        note: 'Two can work only for some babies',
      },
      {
        label: 'Day sleep',
        value: 'About 2.5-4 hours',
        note: 'Use as a planning range',
      },
      {
        label: 'Night window',
        value: 'About 11-12 hours',
        note: 'Not a promise of uninterrupted sleep',
      },
    ],
    checklist: [
      'Watch whether two naps create overtired evenings.',
      'Keep the last nap from pushing bedtime too late.',
      'Track night feeds before changing them.',
      'Stop swaddling once rolling attempts begin.',
    ],
    faqs: [
      {
        question: 'Should a 5-month-old be on two naps?',
        answer:
          'Not necessarily. Many still do better with three naps. Two naps work best when naps are long and wake windows stay comfortable.',
      },
      {
        question: 'Is waking at night abnormal at 5 months?',
        answer:
          'No. Some night waking is still common. Look at hunger, naps, bedtime timing, illness, and how the baby falls asleep.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps at 5 months',
      body: [
        'Yorix adapts the next nap and bedtime after real logs, so a short second nap can shift the rest of the day before overtiredness builds.',
        'You can also track feeds beside sleep to understand whether night waking may be hunger, timing, or a repeated settling pattern.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: '10-month-old-sleep-schedule',
    title:
      '10 Month Old Sleep Schedule: Two Naps, Separation Anxiety, and Better Bedtime',
    shortTitle: '10 month sleep',
    description:
      'A 10 month old sleep schedule guide covering two naps, wake windows, night wakings, separation anxiety, new motor skills, and bedtime routines.',
    category: 'Baby Sleep',
    date: 'September 3, 2026',
    readTime: '9 min read',
    coverClass: 'from-[#252540] via-[#4F46E5] to-[#22C55E]',
    eyebrow: 'Ten month routine',
    intro:
      'At 10 months, many babies are on two naps and a more predictable bedtime, but sleep can be disrupted by crawling, standing, separation anxiety, teething discomfort, illness, and schedule drift.',
    sections: [
      {
        heading: 'A two-nap rhythm is common',
        body: [
          'Many 10-month-olds sleep around 12 to 16 hours per 24 hours, with a practical middle often near 13 to 15 hours. A common pattern is 10 to 12 hours in the night window plus 2 to 3 hours of daytime sleep across two naps.',
          'Wake windows often stretch to roughly 3 to 4 hours, but the exact timing depends on morning wake time, nap length, feeding, daycare, and temperament.',
        ],
      },
      {
        heading: 'Development can interrupt sleep',
        body: [
          'At this age, new motor skills can show up at bedtime. A baby may stand in the crib, practice crawling movements, or wake frustrated because the body is rehearsing new skills.',
          'Separation anxiety also often becomes more visible. The baby understands that a parent can leave, but not always that the parent reliably returns. A predictable goodnight routine and calm brief reassurance can help.',
        ],
      },
      {
        heading: 'Protect bedtime from schedule drift',
        body: [
          'If the second nap ends too late, bedtime may become a battle. If naps are too short, bedtime may need to move earlier. The end of the last nap is often the key piece of the 10-month schedule.',
          'Avoid making bedtime later and later because the baby “does not seem tired.” Overtired babies can look wired, playful, or upset, not only sleepy.',
        ],
      },
      {
        heading: 'Check the real cause of wakings',
        body: [
          'Not every night waking at 10 months is habit. Illness, congestion, ear discomfort, digestive upset, teething pain, travel, and changed daytime feeds can all disturb sleep. If symptoms are present, solve the health issue first.',
          'If the baby is healthy and growing well, repeated wakings may be more about sleep associations, separation, or timing. That is when routine changes can be useful.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Total sleep',
        value: '12-16 hours',
        note: 'Many babies land around 13-15',
      },
      {
        label: 'Naps',
        value: 'Usually 2',
        note: 'Often morning and afternoon',
      },
      {
        label: 'Wake windows',
        value: 'About 3-4 hours',
        note: 'Adjust after short naps',
      },
      {
        label: 'Common disruptor',
        value: 'Separation anxiety',
        note: 'Keep reassurance calm and predictable',
      },
    ],
    checklist: [
      'Track when the second nap ends.',
      'Use a predictable goodnight routine.',
      'Offer calm reassurance for separation anxiety.',
      'Check illness or discomfort before treating wakings as habit.',
    ],
    faqs: [
      {
        question: 'How many naps should a 10-month-old take?',
        answer:
          'Two naps are common at 10 months, usually with one in the morning and one in the afternoon.',
      },
      {
        question: 'Why did sleep get worse at 10 months?',
        answer:
          'New skills, separation anxiety, illness, nap timing, and bedtime drift can all cause temporary sleep disruption.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps at 10 months',
      body: [
        'Yorix can show whether late second naps, short naps, longer wake windows, or feeding changes are connected to bedtime battles and night wakings.',
        'The app helps turn a two-nap day into a flexible plan, then updates bedtime when real life changes the schedule.',
      ],
    },
    sources: safetySources,
  },
  {
    slug: 'baby-sleep-parent-stress',
    title: 'Baby Sleep and Parent Stress: How to Make Nights More Sustainable',
    shortTitle: 'Parent stress',
    description:
      'A guide to baby sleep in the first year that focuses on reducing parent distress, protecting safe sleep, and building a sustainable routine.',
    category: 'Routines',
    date: 'September 3, 2026',
    readTime: '10 min read',
    coverClass: 'from-[#1E1B4B] via-[#0D9488] to-[#6366F1]',
    eyebrow: 'Parent wellbeing',
    intro:
      'Baby sleep is not only about the baby. Fragmented nights affect parent mood, patience, feeding confidence, decision-making, and safety. A sustainable plan supports the whole family, not just a sleep chart.',
    sections: [
      {
        heading: 'Parent sleep is part of the safety plan',
        body: [
          'Exhausted parents are more likely to fall asleep in unsafe places, miss cues, argue about handoffs, or feel trapped by every waking. Protecting parent rest is not selfish; it is part of caring for the baby.',
          'When possible, families can plan shifts, protect one longer sleep block for the most depleted caregiver, and prepare night supplies ahead of time. The exact plan depends on feeding, work, recovery, and available support.',
        ],
      },
      {
        heading: 'Reduce decisions in the middle of the night',
        body: [
          'Night stress grows when every waking becomes a fresh debate: feed or rock, diaper or not, wait or respond, move bedtime tomorrow or keep it fixed. A simple written plan lowers the number of decisions made while half-asleep.',
          'The plan can be gentle: safe sleep first, feed when hunger is likely, keep lights low, use the same settling order, and write down what happened so nobody has to reconstruct the night from memory.',
        ],
      },
      {
        heading: 'Know when sleep advice is not enough',
        body: [
          'Fever in a young infant, breathing difficulty, blue color, seizures, unusual lethargy, poor feeding, dehydration signs, or concerning symptoms need medical advice. Parent thoughts of self-harm or harming the baby require urgent support.',
          'No app or sleep method should override health concerns. The best routine tool helps organize observations so a clinician can understand what is happening faster.',
        ],
      },
      {
        heading: 'Make progress visible',
        body: [
          'A hard night can make it feel like nothing is improving. Looking at a week of data often tells a more accurate story: a longer first stretch, fewer long wakings, a more stable bedtime, or better daytime naps.',
          'Small improvements matter because family sleep improves gradually. Tracking helps parents notice progress before exhaustion erases it.',
        ],
      },
    ],
    sampleRows: [
      {
        label: 'Main goal',
        value: 'Sustainable nights',
        note: 'Baby safety and parent recovery together',
      },
      {
        label: 'Best first step',
        value: 'Simplify the plan',
        note: 'Fewer decisions after midnight',
      },
      {
        label: 'Track',
        value: 'Sleep + feeds + mood',
        note: 'Patterns reduce blame',
      },
      {
        label: 'Red flags',
        value: 'Medical or mental health',
        note: 'Get urgent help when needed',
      },
    ],
    checklist: [
      'Prepare night supplies before bedtime.',
      'Agree on caregiver handoffs when support is available.',
      'Track the night without judging one bad stretch.',
      'Seek urgent help for baby danger signs or severe parent distress.',
    ],
    faqs: [
      {
        question: 'Can baby sleep problems affect parent mental health?',
        answer:
          'Yes. Fragmented sleep can worsen exhaustion and distress. Parents deserve practical support, not blame.',
      },
      {
        question: 'What if I feel like I cannot cope at night?',
        answer:
          'Tell another trusted adult and contact a healthcare professional or crisis service if there is any risk of harm. Sleep strategy should never replace urgent support.',
      },
    ],
    appTieIn: {
      heading: 'How Yorix helps reduce parent stress',
      body: [
        'Yorix creates a shared memory for the family: sleep, feeds, diapers, growth, symptoms, and notes in one calm timeline. That reduces handoff confusion and the feeling that every night is random.',
        'Daily summaries and AI guidance help you choose one next step instead of trying to fix the whole year of sleep at once.',
      ],
    },
    sources: safetySources,
  },
];
