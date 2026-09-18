import { itemIcon } from './article-ui';
import { type TopicPage, getTopicPage } from './content';
import { siteCopy } from './i18n';
import { type Locale, locales } from './locales';

export const translatedArticleSlugs = [
  'baby-nap-schedule-by-age',
  'newborn-sleep-schedule',
  '4-month-old-sleep-schedule',
  'baby-feeding-schedule',
  'wake-windows-by-age',
  'survive-night-wakings-new-parents',
  'white-noise-for-baby-sleep',
  'ferber-method-baby-sleep',
  'sleep-training-methods-explained',
  'newborn-sleep-first-28-days',
  '3-month-old-sleep-schedule',
  '5-month-old-sleep-schedule',
  '10-month-old-sleep-schedule',
  'baby-sleep-parent-stress',
] as const;

export type TranslatedArticleSlug = (typeof translatedArticleSlugs)[number];

export type ArticleUiCopy = {
  home: string;
  getApp: string;
  backToGuides: string;
  published: string;
  practicalGuide: string;
  inThisArticle: string;
  disclaimer: string;
  quickReference: string;
  commonQuestions: string;
  checklist: string;
  sources: string;
  personalizedSupport: string;
  ctaTitle: string;
  ctaBody: string;
  download: string;
  relatedGuides: string;
  footer: string;
};

type ArticleTranslation = Omit<TopicPage, 'slug' | 'date' | 'coverClass' | 'sources'>;

const napArticle: Partial<Record<Locale, ArticleTranslation>> = {
  tr: {
    title: 'Yaşa Göre Bebek Uyku Programı',
    shortTitle: 'Yaşa göre uyku',
    description: 'Yaşa göre bebek uyku programı, uyanıklık pencereleri, uyku sayıları ve kısa uykulardan sonra günü ayarlamanın pratik yolları.',
    category: 'Bebek Uykusu',
    readTime: '7 dk okuma',
    eyebrow: 'Yaşa göre uyku planlama',
    intro: 'Yaşa göre bir uyku programı ebeveynlere iyi bir başlangıç verir, ama gerçek uyku kusursuz bir tabloyu takip etmez. Yorix yaşa uygun aralıkları bebeğinizin gerçek uyku geçmişiyle birleştirir.',
    sections: [
      { heading: 'Önce yaş aralığıyla başlayın, sonra bebeği izleyin', body: ['Yenidoğanlar günde birçok kez uyuyabilir, daha büyük bebekler üç uykuya oturabilir ve ilk yılın ikinci yarısında birçok bebek iki uykuya yaklaşır. Bu aralıklar yararlıdır ama uyku işaretleri, gece uykusu, beslenme ve uyku süresi yine önemlidir.', 'Program, yaşayan bir ritim gibi kullanıldığında daha iyi çalışır. Bebek bir uykudan erken kalkarsa sonraki uyku genellikle öne çekilir. İlk uyku uzunsa sonraki uyanıklık penceresi doğal olarak uzayabilir.'] },
      { heading: 'Kısa uykular günün geri kalanını değiştirmeli', body: ['25 dakikalık uyku ile 90 dakikalık uyku aynı değildir. Bir uyku kısaysa sonraki uyanıklık penceresi kısalabilir ve yatış saati öne gelebilir.', 'Sabit çizelgeler burada yorucu olur. Gerçek hayatta araba uykuları, atlanan uykular, kreş dönüşü, misafirler ve aniden farklı plan isteyen bebekler vardır.'] },
      { heading: 'Programı kural değil ritim olarak kullanın', body: ['Amaç bebeği sert bir saate zorlamak değildir. İyi bir uyku rutini tahmini azaltır ama büyüme ataklarına, seyahate, beslenme değişikliklerine ve uyku gerilemelerine yer bırakır.', 'Bebek mutlu görünüyorsa, iyi besleniyor ve 24 saat içinde makul uyuyorsa saatten çok tutarlılık ve zor günlerden sonra toparlanma önemlidir.'] },
      { heading: 'Yorix basılı tablonun ötesinde ne katar', body: ['Yorix her gündüz uykusunu, uyanıklık penceresini, yatış saatini, gece uyanmasını ve beslenme notunu tek yerde takip eder. Zamanla genel ortalama yerine bebeğinizin gerçek ritmi görünür.', 'Uygulama yaşa ve son uyku geçmişine göre sonraki uykuyu önerebilir, sonra pencerenin neden değiştiğini açıklar. Böylece gün boyu uyku matematiği yapmanız gerekmez.'] },
    ],
    sampleRows: [{ label: '0-3 ay', value: '4-6+ uyku', note: 'Esnek yenidoğan ritmi' }, { label: '4-6 ay', value: '3-4 uyku', note: 'Uyanıklık pencereleri daha yararlı olur' }, { label: '7-12 ay', value: '2-3 uyku', note: 'Birçok bebek iki uykuya yaklaşır' }, { label: '12-18 ay', value: '1-2 uyku', note: 'Uyku geçişleri yatış saatini değiştirebilir' }],
    checklist: ['Birkaç gün her uykunun başlangıç ve bitişini kaydedin.', 'Uyku süresini sonraki uyanıklık penceresiyle karşılaştırın.', 'Zor uyku günlerinde yatışı erkene alın.', 'Odayı ve sakinleşme rutinini tanıdık tutun.'],
    faqs: [{ question: 'Bebek uyku programı her gün aynı mı olmalı?', answer: 'Tam olarak değil. Tutarlı bir ritim yardımcıdır, ama uyku süresi, hastalık, seyahat ve gelişimsel değişiklikler günü kaydırabilir.' }, { question: 'Bebeğim sadece kısa uyuyorsa ne yapmalıyım?', answer: 'Kısa uykular özellikle geçiş dönemlerinde yaygındır. Birkaç gün örüntüleri takip edin ve zorlu günlerde sonraki uyanıklık penceresini kısaltmayı düşünün.' }],
  },
  ru: {
    title: 'Режим дневного сна ребенка по возрасту',
    shortTitle: 'Дневной сон по возрасту',
    description: 'Практичный режим дневного сна по возрасту: окна бодрствования, количество снов и как менять день после короткого сна.',
    category: 'Сон ребенка',
    readTime: '7 минут',
    eyebrow: 'Планирование сна по возрасту',
    intro: 'Режим дневного сна по возрасту дает родителям хорошую отправную точку, но реальный сон редко идет по идеальной таблице. Yorix помогает соединить возрастные ориентиры с настоящей историей сна вашего малыша.',
    sections: [
      { heading: 'Начните с возраста, потом наблюдайте за ребенком', body: ['Новорожденные могут спать много раз в день, дети постарше часто переходят к трем дневным снам, а во второй половине первого года многие постепенно идут к двум снам. Эти диапазоны полезны, но признаки усталости, ночной сон, кормления и длительность снов все равно важны.', 'Режим лучше работает, когда вы относитесь к нему как к живому ритму. Если малыш проснулся слишком рано, следующий сон часто нужно сдвинуть раньше. Если первый сон был длинным и восстановительным, следующее окно бодрствования может стать немного длиннее.'] },
      { heading: 'Короткий сон должен менять остаток дня', body: ['Сон на 25 минут и сон на 90 минут не равны. После короткого сна следующее окно бодрствования может быть короче, а ночной сон иногда нужно начинать раньше. Yorix пересчитывает следующее окно сна по ходу дня.', 'Именно здесь фиксированные таблицы часто раздражают. Они показывают красивый день, но в реальности есть сон в машине, пропущенный сон, садик, гости и дни, когда ребенку внезапно нужен другой план.'] },
      { heading: 'Используйте расписание как ритм, а не как жесткое правило', body: ['Цель не в том, чтобы загнать ребенка в строгий график. Хорошая рутина снижает количество догадок, но оставляет место скачкам роста, поездкам, изменениям кормления и регрессам сна.', 'Если малыш бодрый, хорошо ест и в целом нормально спит за 24 часа, точное время на часах менее важно, чем последовательность и восстановление после сложных дней.'] },
      { heading: 'Что Yorix дает сверх обычной таблицы', body: ['Yorix хранит дневные сны, окна бодрствования, отбой, ночные пробуждения и кормления в одном месте. Со временем появляется картина реального ритма ребенка, а не средняя схема из интернета.', 'Приложение может предложить следующий сон с учетом возраста и недавней истории сна, а затем объяснить, почему окно изменилось. Это помогает принимать решения без постоянной математики сна.'] },
    ],
    sampleRows: [{ label: '0-3 месяца', value: '4-6+ снов', note: 'Гибкий ритм новорожденного' }, { label: '4-6 месяцев', value: '3-4 сна', note: 'Окна бодрствования становятся полезнее' }, { label: '7-12 месяцев', value: '2-3 сна', note: 'Многие дети идут к двум снам' }, { label: '12-18 месяцев', value: '1-2 сна', note: 'Переходы сна могут двигать отбой' }],
    checklist: ['Несколько дней записывайте начало и конец каждого сна.', 'Сравнивайте длительность сна со следующим окном бодрствования.', 'После тяжелого дня со снами сдвигайте отбой раньше.', 'Сохраняйте знакомую комнату и спокойную рутину.'],
    faqs: [{ question: 'Режим дневного сна должен быть одинаковым каждый день?', answer: 'Не совсем. Стабильный ритм помогает, но длительность снов, болезнь, поездки и развитие могут сдвигать день. Гибкий режим обычно проще поддерживать.' }, { question: 'Что делать, если ребенок спит только короткими снами?', answer: 'Короткие сны часто встречаются, особенно во время переходов. Отслеживайте несколько дней и попробуйте сократить следующее окно бодрствования или сдвинуть отбой раньше после сложного дня.' }],
  },
  es: makeNap('Spanish', 'Horario de siestas del bebé por edad', 'Siestas por edad'),
};

function makeNap(language: string, title: string, shortTitle: string): ArticleTranslation {
  return {
    title,
    shortTitle,
    description:
      language === 'Spanish'
        ? 'Guía práctica de siestas por edad, ventanas de vigilia y ajustes cuando una siesta sale corta.'
        : `A localized ${language} guide to baby naps by age, wake windows, nap counts, and flexible routine adjustments.`,
    category: siteCopy('es').sharedArticle.category,
    readTime: language === 'Japanese' ? '7分' : '7 min',
    eyebrow: title,
    intro:
      language === 'Spanish'
        ? 'Un horario de siestas por edad ayuda a empezar, pero el sueño real rara vez sigue una tabla perfecta. Yorix combina rangos por edad con el historial real de tu bebé para decidir mejor la próxima siesta.'
        : `This ${language} version explains how to use age-based nap ranges together with your baby’s real sleep history, so the schedule stays flexible instead of becoming a rigid chart.`,
    sections: [
      {
        heading: language === 'Spanish' ? 'Empieza por la edad y observa al bebé' : 'Start with age, then follow your baby',
        body: [
          language === 'Spanish'
            ? 'Los recién nacidos pueden dormir muchas veces al día, los bebés mayores suelen acercarse a tres siestas y muchos pasan hacia dos siestas en la segunda mitad del primer año. La edad ayuda, pero también importan las señales de sueño, la noche, las tomas y la duración de cada siesta.'
            : 'Newborns may nap many times, older babies often settle into three naps, and many babies move toward two naps later in the first year. Age ranges help, but sleepy cues, night sleep, feeds, and nap length still matter.',
          language === 'Spanish'
            ? 'El horario funciona mejor como un ritmo vivo. Si una siesta termina pronto, la siguiente ventana de vigilia puede acortarse. Si la primera siesta fue larga, el siguiente periodo despierto puede alargarse un poco.'
            : 'The schedule works best as a living rhythm. A short nap can make the next wake window shorter; a long restorative nap can let the next window stretch naturally.',
        ],
      },
      {
        heading: language === 'Spanish' ? 'Las siestas cortas deben cambiar el resto del día' : 'Short naps should change the rest of the day',
        body: [
          language === 'Spanish'
            ? 'Una siesta de 25 minutos no equivale a una de 90. Después de una siesta corta, el bebé puede necesitar dormir antes y acostarse más temprano.'
            : 'A 25-minute nap is not the same as a 90-minute nap. After a short nap, the next wake window may need to be shorter and bedtime may need to move earlier.',
          language === 'Spanish'
            ? 'Ahí es donde las tablas fijas fallan. La vida real incluye siestas en el coche, guardería, visitas, enfermedad y días en los que el plan necesita cambiar.'
            : 'Fixed charts often break here. Real family life includes car naps, daycare pickup, visitors, illness, and days when the plan needs to change.',
        ],
      },
      {
        heading: language === 'Spanish' ? 'Usa el horario como ritmo, no como regla' : 'Use the schedule as a rhythm, not a rule',
        body: [
          language === 'Spanish'
            ? 'El objetivo no es forzar al bebé a un reloj rígido. Una buena rutina reduce dudas, pero deja espacio para crecimiento, viajes, cambios de alimentación y regresiones.'
            : 'The goal is not to force a baby into a rigid clock. A good routine reduces guessing while leaving room for growth, travel, feeding changes, and regressions.',
          language === 'Spanish'
            ? 'Si el bebé está activo, come bien y duerme razonablemente en 24 horas, la constancia suele importar más que el minuto exacto.'
            : 'If your baby is content, feeds well, and sleeps reasonably across 24 hours, consistency usually matters more than the exact minute on the clock.',
        ],
      },
      {
        heading: language === 'Spanish' ? 'Cómo ayuda Yorix' : 'How Yorix helps',
        body: [
          language === 'Spanish'
            ? 'Yorix registra siestas, ventanas de vigilia, hora de dormir, despertares nocturnos y tomas en un solo lugar. Con el tiempo muestra el ritmo real de tu bebé.'
            : 'Yorix keeps naps, wake windows, bedtime, night wakings, and feeds in one place. Over time, the app shows your baby’s real rhythm instead of a generic average.',
          language === 'Spanish'
            ? 'La app sugiere la próxima siesta según la edad y el historial reciente, y explica por qué cambia la ventana. Así no tienes que hacer matemáticas de sueño todo el día.'
            : 'The app can suggest the next nap from age and recent history, then explain why the window changed, so parents do less sleep math all day.',
        ],
      },
    ],
    sampleRows: [
      { label: '0-3', value: '4-6+', note: 'Flexible newborn rhythm' },
      { label: '4-6', value: '3-4', note: 'Wake windows become more useful' },
      { label: '7-12', value: '2-3', note: 'Many babies move toward two naps' },
      { label: '12-18', value: '1-2', note: 'Nap transitions can shift bedtime' },
    ],
    checklist: [
      'Track each nap start and end time for a few days.',
      'Compare nap length with the next wake window.',
      'Move bedtime earlier after a difficult nap day.',
      'Keep the room and wind-down routine familiar.',
    ],
    faqs: [
      { question: language === 'Spanish' ? '¿Debe ser igual cada día?' : 'Should the schedule be the same every day?', answer: language === 'Spanish' ? 'No exactamente. Un ritmo constante ayuda, pero las siestas, la salud, los viajes y el desarrollo pueden mover el día.' : 'Not exactly. A consistent rhythm helps, but nap length, illness, travel, and development can shift the day.' },
      { question: language === 'Spanish' ? '¿Y si mi bebé solo hace siestas cortas?' : 'What if my baby only takes short naps?', answer: language === 'Spanish' ? 'Es común, sobre todo en transiciones. Mira varios días y considera acortar la siguiente ventana o adelantar la hora de dormir.' : 'Short naps are common, especially during transitions. Watch patterns across several days and consider a shorter next wake window or earlier bedtime.' },
    ],
  };
}

function makeFallbackArticle(locale: Locale, source: TopicPage): ArticleTranslation {
  const copy = siteCopy(locale);
  const shared = copy.sharedArticle;
  const english = siteCopy('en').sharedArticle;
  const title = copy.topics?.[source.slug as TranslatedArticleSlug] ?? source.title;

  return {
    title,
    shortTitle: title,
    description: shared.description(title),
    category: shared.category,
    readTime: shared.readTime,
    eyebrow: title,
    intro: shared.intro(title),
    sections: shared.sectionHeadings.map((heading, index) => ({
      heading,
      body: [shared.sectionBodies[index]],
    })),
    sampleRows: shared.rows.map((row, index) => ({
      label: `${index + 1}`,
      value: row,
      note: title,
    })),
    rowIcons: english.rows.map((row) => itemIcon(row)),
    sceneHeadings: [...english.sectionHeadings],
    checklist: [...shared.checklist],
    faqs: shared.questions.map((question, index) => ({
      question,
      answer: shared.answers[index],
    })),
    appTieIn: {
      heading: shared.appHeading,
      body: [...shared.appBody],
    },
  };
}

export function getArticleUiCopy(locale?: Locale): ArticleUiCopy {
  return siteCopy(locale ?? 'en').articleUi;
}

export function getLocalizedTopicPage(locale: Locale, slug: string): TopicPage | undefined {
  if (!isTranslatedArticleSlug(slug)) {
    return undefined;
  }

  const source = getTopicPage(slug);

  if (!source) {
    return undefined;
  }

  const translation =
    slug === 'baby-nap-schedule-by-age' && napArticle[locale]
      ? napArticle[locale]
      : makeFallbackArticle(locale, source);

  // Blocks written only in English never leak into a translation: a locale
  // shows them only when its own translation provides them.
  return {
    ...source,
    quickAnswer: undefined,
    scenarioRows: undefined,
    diagnosticRows: undefined,
    actionPlan: undefined,
    safetyNote: undefined,
    appTieIn: undefined,
    ...translation,
    slug,
  };
}

export function getLocalizedTopicPages(locale: Locale) {
  return translatedArticleSlugs
    .map((slug) => getLocalizedTopicPage(locale, slug))
    .filter((page): page is TopicPage => Boolean(page));
}

export function isTranslatedArticleSlug(value: string): value is TranslatedArticleSlug {
  return translatedArticleSlugs.includes(value as TranslatedArticleSlug);
}

export function translatedArticleAlternates(slug: string) {
  if (!isTranslatedArticleSlug(slug)) {
    return {};
  }

  return Object.fromEntries(
    getTranslatedLocalesForArticle(slug).map((locale) => [locale, `/${locale}/${slug}`]),
  );
}

export function getTranslatedLocalesForArticle(slug: string) {
  if (!isTranslatedArticleSlug(slug)) {
    return [];
  }

  return [...locales];
}
