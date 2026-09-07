import { type TopicPage, getTopicPage } from './content';
import { type Locale, localeCopy, locales } from './locales';

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

const defaultArticleUi: ArticleUiCopy = {
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
  ctaBody:
    'Track naps, wake windows, night wakings, feeds, diapers, and routines in one app, then get clearer next steps for the day ahead.',
  download: 'Download Yorix',
  relatedGuides: 'Related guides',
  footer:
    'Yorix is a routine helper for parents. It does not provide medical diagnosis or emergency advice.',
};

const articleUiCopy: Record<Locale, ArticleUiCopy> = {
  tr: {
    ...defaultArticleUi,
    home: 'Ana sayfa',
    getApp: 'Uygulamayı indir',
    backToGuides: 'Tüm rehberlere dön',
    published: 'Yayınlandı',
    practicalGuide: 'Daha az tahmin isteyen yorgun ebeveynler için pratik rehber.',
    inThisArticle: 'Bu yazıda',
    quickReference: 'Hızlı referans',
    commonQuestions: 'Sık sorulan sorular',
    checklist: 'Kısa rutin kontrol listesi',
    sources: 'Kaynaklar ve ek okuma',
    personalizedSupport: 'Kişisel destek',
    download: 'Yorix’i indir',
    footer: localeCopy.tr.footer,
  },
  fr: {
    ...defaultArticleUi,
    home: 'Accueil',
    getApp: "Télécharger l'app",
    backToGuides: 'Retour aux guides',
    published: 'Publié',
    practicalGuide: 'Un guide pratique pour les parents fatigués qui veulent moins deviner.',
    inThisArticle: 'Dans cet article',
    quickReference: 'Repères rapides',
    commonQuestions: 'Questions fréquentes',
    checklist: 'Liste de routine rapide',
    sources: 'Sources et lectures',
    personalizedSupport: 'Accompagnement personnalisé',
    download: 'Télécharger Yorix',
    footer: localeCopy.fr.footer,
  },
  de: {
    ...defaultArticleUi,
    home: 'Startseite',
    getApp: 'App herunterladen',
    backToGuides: 'Zurück zu allen Ratgebern',
    published: 'Veröffentlicht',
    practicalGuide: 'Ein praktischer Ratgeber für müde Eltern, die weniger raten möchten.',
    inThisArticle: 'In diesem Artikel',
    quickReference: 'Kurzübersicht',
    commonQuestions: 'Häufige Fragen',
    checklist: 'Kurze Routine-Checkliste',
    sources: 'Quellen und weitere Lektüre',
    personalizedSupport: 'Persönliche Unterstützung',
    download: 'Yorix herunterladen',
    footer: localeCopy.de.footer,
  },
  ru: {
    ...defaultArticleUi,
    home: 'Главная',
    getApp: 'Скачать приложение',
    backToGuides: 'Назад ко всем гайдам',
    published: 'Опубликовано',
    practicalGuide: 'Практичный гайд для уставших родителей, которые хотят меньше гадать.',
    inThisArticle: 'В этой статье',
    disclaimer:
      'Этот гайд помогает с общей рутиной здоровых малышей и семей. Он не заменяет медицинскую консультацию. Если вас беспокоят кормление, рост, дыхание, температура, симптомы или ваше самочувствие, обратитесь к квалифицированному специалисту.',
    quickReference: 'Краткая шпаргалка',
    commonQuestions: 'Частые вопросы',
    checklist: 'Короткий чек-лист рутины',
    sources: 'Источники и дополнительное чтение',
    personalizedSupport: 'Персональная поддержка',
    ctaTitle: 'Yorix превращает записи сна и кормлений в адаптивный режим.',
    ctaBody:
      'Отслеживайте дневные сны, окна бодрствования, ночные пробуждения, кормления, подгузники и рутину в одном приложении, чтобы понимать следующий шаг на день.',
    download: 'Скачать Yorix',
    footer: localeCopy.ru.footer,
  },
  nl: {
    ...defaultArticleUi,
    home: 'Home',
    getApp: 'Download de app',
    backToGuides: 'Terug naar alle gidsen',
    published: 'Gepubliceerd',
    practicalGuide: 'Een praktische gids voor vermoeide ouders die minder willen raden.',
    inThisArticle: 'In dit artikel',
    quickReference: 'Snelle referentie',
    commonQuestions: 'Veelgestelde vragen',
    checklist: 'Korte routinechecklist',
    sources: 'Bronnen en verder lezen',
    personalizedSupport: 'Persoonlijke ondersteuning',
    download: 'Download Yorix',
    footer: localeCopy.nl.footer,
  },
  it: {
    ...defaultArticleUi,
    home: 'Home',
    getApp: "Scarica l'app",
    backToGuides: 'Torna a tutte le guide',
    published: 'Pubblicato',
    practicalGuide: 'Una guida pratica per genitori stanchi che vogliono indovinare meno.',
    inThisArticle: 'In questo articolo',
    quickReference: 'Riferimento rapido',
    commonQuestions: 'Domande frequenti',
    checklist: 'Checklist rapida della routine',
    sources: 'Fonti e approfondimenti',
    personalizedSupport: 'Supporto personalizzato',
    download: 'Scarica Yorix',
    footer: localeCopy.it.footer,
  },
  pt: {
    ...defaultArticleUi,
    home: 'Início',
    getApp: 'Transferir a aplicação',
    backToGuides: 'Voltar a todos os guias',
    published: 'Publicado',
    practicalGuide: 'Um guia prático para pais cansados que querem adivinhar menos.',
    inThisArticle: 'Neste artigo',
    quickReference: 'Referência rápida',
    commonQuestions: 'Perguntas frequentes',
    checklist: 'Checklist rápida da rotina',
    sources: 'Fontes e leituras',
    personalizedSupport: 'Apoio personalizado',
    download: 'Transferir Yorix',
    footer: localeCopy.pt.footer,
  },
  es: {
    ...defaultArticleUi,
    home: 'Inicio',
    getApp: 'Descargar la app',
    backToGuides: 'Volver a todas las guías',
    published: 'Publicado',
    practicalGuide: 'Una guía práctica para padres cansados que quieren adivinar menos.',
    inThisArticle: 'En este artículo',
    quickReference: 'Referencia rápida',
    commonQuestions: 'Preguntas frecuentes',
    checklist: 'Checklist rápida de rutina',
    sources: 'Fuentes y más lectura',
    personalizedSupport: 'Apoyo personalizado',
    download: 'Descargar Yorix',
    footer: localeCopy.es.footer,
  },
  th: { ...defaultArticleUi, home: 'หน้าแรก', getApp: localeCopy.th.nav.download, backToGuides: 'กลับไปยังคู่มือทั้งหมด', published: 'เผยแพร่', practicalGuide: 'คู่มือที่ใช้ได้จริงสำหรับพ่อแม่ที่เหนื่อยและอยากเดาน้อยลง', inThisArticle: 'ในบทความนี้', quickReference: 'สรุปอย่างรวดเร็ว', commonQuestions: 'คำถามที่พบบ่อย', checklist: 'เช็กลิสต์กิจวัตร', personalizedSupport: 'การช่วยเหลือเฉพาะบุคคล', download: localeCopy.th.cta.action, footer: localeCopy.th.footer },
  sv: { ...defaultArticleUi, home: 'Hem', getApp: localeCopy.sv.nav.download, backToGuides: 'Tillbaka till alla guider', published: 'Publicerad', practicalGuide: 'En praktisk guide för trötta föräldrar som vill gissa mindre.', inThisArticle: 'I den här artikeln', quickReference: 'Snabb översikt', commonQuestions: 'Vanliga frågor', checklist: 'Kort rutinlista', personalizedSupport: 'Personligt stöd', download: localeCopy.sv.cta.action, footer: localeCopy.sv.footer },
  id: { ...defaultArticleUi, home: 'Beranda', getApp: localeCopy.id.nav.download, backToGuides: 'Kembali ke semua panduan', published: 'Diterbitkan', practicalGuide: 'Panduan praktis untuk orang tua lelah yang ingin lebih sedikit menebak.', inThisArticle: 'Dalam artikel ini', quickReference: 'Referensi cepat', commonQuestions: 'Pertanyaan umum', checklist: 'Checklist rutinitas singkat', personalizedSupport: 'Dukungan personal', download: localeCopy.id.cta.action, footer: localeCopy.id.footer },
  ja: { ...defaultArticleUi, home: 'ホーム', getApp: localeCopy.ja.nav.download, backToGuides: 'すべてのガイドに戻る', published: '公開日', practicalGuide: '推測を減らしたい疲れた保護者のための実用的なガイド。', inThisArticle: 'この記事の内容', quickReference: 'クイックリファレンス', commonQuestions: 'よくある質問', checklist: 'ルーティン簡易チェックリスト', personalizedSupport: 'パーソナルサポート', download: localeCopy.ja.cta.action, footer: localeCopy.ja.footer },
  pl: { ...defaultArticleUi, home: 'Strona główna', getApp: localeCopy.pl.nav.download, backToGuides: 'Wróć do wszystkich poradników', published: 'Opublikowano', practicalGuide: 'Praktyczny poradnik dla zmęczonych rodziców, którzy chcą mniej zgadywać.', inThisArticle: 'W tym artykule', quickReference: 'Szybka ściąga', commonQuestions: 'Częste pytania', checklist: 'Krótka lista rutyny', personalizedSupport: 'Wsparcie osobiste', download: localeCopy.pl.cta.action, footer: localeCopy.pl.footer },
  cs: { ...defaultArticleUi, home: 'Domů', getApp: localeCopy.cs.nav.download, backToGuides: 'Zpět na všechny průvodce', published: 'Publikováno', practicalGuide: 'Praktický průvodce pro unavené rodiče, kteří chtějí méně hádat.', inThisArticle: 'V tomto článku', quickReference: 'Rychlý přehled', commonQuestions: 'Časté otázky', checklist: 'Krátký kontrolní seznam', personalizedSupport: 'Osobní podpora', download: localeCopy.cs.cta.action, footer: localeCopy.cs.footer },
  no: { ...defaultArticleUi, home: 'Hjem', getApp: localeCopy.no.nav.download, backToGuides: 'Tilbake til alle guider', published: 'Publisert', practicalGuide: 'En praktisk guide for trøtte foreldre som vil gjette mindre.', inThisArticle: 'I denne artikkelen', quickReference: 'Rask oversikt', commonQuestions: 'Vanlige spørsmål', checklist: 'Kort rutinesjekkliste', personalizedSupport: 'Personlig støtte', download: localeCopy.no.cta.action, footer: localeCopy.no.footer },
  ar: { ...defaultArticleUi, home: 'الرئيسية', getApp: localeCopy.ar.nav.download, backToGuides: 'العودة إلى كل الأدلة', published: 'نشر في', practicalGuide: 'دليل عملي للوالدين المتعبين الذين يريدون تقليل التخمين.', inThisArticle: 'في هذا المقال', quickReference: 'مرجع سريع', commonQuestions: 'أسئلة شائعة', checklist: 'قائمة روتين سريعة', personalizedSupport: 'دعم مخصص', download: localeCopy.ar.cta.action, footer: localeCopy.ar.footer },
  da: { ...defaultArticleUi, home: 'Hjem', getApp: localeCopy.da.nav.download, backToGuides: 'Tilbage til alle guider', published: 'Udgivet', practicalGuide: 'En praktisk guide til trætte forældre, der vil gætte mindre.', inThisArticle: 'I denne artikel', quickReference: 'Hurtigt overblik', commonQuestions: 'Ofte stillede spørgsmål', checklist: 'Kort rutinetjekliste', personalizedSupport: 'Personlig støtte', download: localeCopy.da.cta.action, footer: localeCopy.da.footer },
  he: { ...defaultArticleUi, home: 'בית', getApp: localeCopy.he.nav.download, backToGuides: 'חזרה לכל המדריכים', published: 'פורסם', practicalGuide: 'מדריך מעשי להורים עייפים שרוצים פחות לנחש.', inThisArticle: 'במאמר זה', quickReference: 'תקציר מהיר', commonQuestions: 'שאלות נפוצות', checklist: 'רשימת שגרה קצרה', personalizedSupport: 'תמיכה אישית', download: localeCopy.he.cta.action, footer: localeCopy.he.footer },
  uk: { ...defaultArticleUi, home: 'Головна', getApp: localeCopy.uk.nav.download, backToGuides: 'Назад до всіх гайдів', published: 'Опубліковано', practicalGuide: 'Практичний гайд для втомлених батьків, які хочуть менше вгадувати.', inThisArticle: 'У цій статті', quickReference: 'Коротка довідка', commonQuestions: 'Поширені запитання', checklist: 'Короткий чек-лист рутини', personalizedSupport: 'Персональна підтримка', download: localeCopy.uk.cta.action, footer: localeCopy.uk.footer },
  vi: { ...defaultArticleUi, home: 'Trang chủ', getApp: localeCopy.vi.nav.download, backToGuides: 'Quay lại tất cả hướng dẫn', published: 'Đã xuất bản', practicalGuide: 'Hướng dẫn thực tế cho cha mẹ mệt mỏi muốn bớt phỏng đoán.', inThisArticle: 'Trong bài viết này', quickReference: 'Tóm tắt nhanh', commonQuestions: 'Câu hỏi thường gặp', checklist: 'Checklist thói quen nhanh', personalizedSupport: 'Hỗ trợ cá nhân', download: localeCopy.vi.cta.action, footer: localeCopy.vi.footer },
  ms: { ...defaultArticleUi, home: 'Laman utama', getApp: localeCopy.ms.nav.download, backToGuides: 'Kembali ke semua panduan', published: 'Diterbitkan', practicalGuide: 'Panduan praktikal untuk ibu bapa letih yang mahu kurang meneka.', inThisArticle: 'Dalam artikel ini', quickReference: 'Rujukan pantas', commonQuestions: 'Soalan lazim', checklist: 'Senarai semak rutin ringkas', personalizedSupport: 'Sokongan peribadi', download: localeCopy.ms.cta.action, footer: localeCopy.ms.footer },
  hi: { ...defaultArticleUi, home: 'होम', getApp: localeCopy.hi.nav.download, backToGuides: 'सभी गाइड पर वापस जाएँ', published: 'प्रकाशित', practicalGuide: 'थके हुए माता-पिता के लिए व्यावहारिक गाइड, ताकि अनुमान कम हो।', inThisArticle: 'इस लेख में', quickReference: 'त्वरित संदर्भ', commonQuestions: 'आम सवाल', checklist: 'छोटी रूटीन चेकलिस्ट', personalizedSupport: 'व्यक्तिगत सहायता', download: localeCopy.hi.cta.action, footer: localeCopy.hi.footer },
};

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

const localizedTopicNames: Record<Locale, Record<TranslatedArticleSlug, string>> = {
  tr: {
    'baby-nap-schedule-by-age': 'Yaşa göre bebek gündüz uykusu programı',
    'newborn-sleep-schedule': 'Yenidoğan uyku programı',
    '4-month-old-sleep-schedule': '4 aylık bebek uyku programı',
    'baby-feeding-schedule': 'Bebek beslenme programı',
    'wake-windows-by-age': 'Yaşa göre uyanıklık pencereleri',
    'survive-night-wakings-new-parents': 'Gece uyanmaları: yeni ebeveynler için hayatta kalma rehberi',
    'white-noise-for-baby-sleep': 'Bebek uykusu için beyaz gürültü',
    'ferber-method-baby-sleep': 'Ferber yöntemi ve bebek uykusu',
    'sleep-training-methods-explained': 'Bebek uyku eğitimi yöntemleri',
    'newborn-sleep-first-28-days': 'İlk 28 günde yenidoğan uykusu',
    '3-month-old-sleep-schedule': '3 aylık bebek uyku programı',
    '5-month-old-sleep-schedule': '5 aylık bebek uyku programı',
    '10-month-old-sleep-schedule': '10 aylık bebek uyku programı',
    'baby-sleep-parent-stress': 'Bebek uykusu ve ebeveyn stresi',
  },
  fr: {
    'baby-nap-schedule-by-age': 'Programme de siestes de bébé par âge',
    'newborn-sleep-schedule': 'Programme de sommeil du nouveau-né',
    '4-month-old-sleep-schedule': 'Programme de sommeil à 4 mois',
    'baby-feeding-schedule': 'Programme d’alimentation du bébé',
    'wake-windows-by-age': 'Fenêtres d’éveil par âge',
    'survive-night-wakings-new-parents': 'Réveils nocturnes : survivre comme nouveaux parents',
    'white-noise-for-baby-sleep': 'Bruit blanc pour le sommeil de bébé',
    'ferber-method-baby-sleep': 'Méthode Ferber et sommeil de bébé',
    'sleep-training-methods-explained': 'Méthodes d’apprentissage du sommeil',
    'newborn-sleep-first-28-days': 'Sommeil du nouveau-né pendant les 28 premiers jours',
    '3-month-old-sleep-schedule': 'Programme de sommeil à 3 mois',
    '5-month-old-sleep-schedule': 'Programme de sommeil à 5 mois',
    '10-month-old-sleep-schedule': 'Programme de sommeil à 10 mois',
    'baby-sleep-parent-stress': 'Sommeil de bébé et stress parental',
  },
  de: {
    'baby-nap-schedule-by-age': 'Babys Nickerchenplan nach Alter',
    'newborn-sleep-schedule': 'Schlafplan für Neugeborene',
    '4-month-old-sleep-schedule': 'Schlafplan für 4 Monate alte Babys',
    'baby-feeding-schedule': 'Fütterungsplan für Babys',
    'wake-windows-by-age': 'Wachfenster nach Alter',
    'survive-night-wakings-new-parents': 'Nächtliches Aufwachen: Überlebenstipps für neue Eltern',
    'white-noise-for-baby-sleep': 'Weißes Rauschen für Babyschlaf',
    'ferber-method-baby-sleep': 'Ferber-Methode und Babyschlaf',
    'sleep-training-methods-explained': 'Schlaftrainingsmethoden erklärt',
    'newborn-sleep-first-28-days': 'Neugeborenenschlaf in den ersten 28 Tagen',
    '3-month-old-sleep-schedule': 'Schlafplan für 3 Monate alte Babys',
    '5-month-old-sleep-schedule': 'Schlafplan für 5 Monate alte Babys',
    '10-month-old-sleep-schedule': 'Schlafplan für 10 Monate alte Babys',
    'baby-sleep-parent-stress': 'Babyschlaf und Elternstress',
  },
  ru: {
    'baby-nap-schedule-by-age': 'Режим дневного сна ребенка по возрасту',
    'newborn-sleep-schedule': 'Режим сна новорожденного',
    '4-month-old-sleep-schedule': 'Режим сна ребенка в 4 месяца',
    'baby-feeding-schedule': 'Режим кормления ребенка',
    'wake-windows-by-age': 'Окна бодрствования по возрасту',
    'survive-night-wakings-new-parents': 'Ночные пробуждения: как выжить новым родителям',
    'white-noise-for-baby-sleep': 'Белый шум для сна ребенка',
    'ferber-method-baby-sleep': 'Метод Фербера и сон ребенка',
    'sleep-training-methods-explained': 'Методы обучения сну простыми словами',
    'newborn-sleep-first-28-days': 'Сон новорожденного в первые 28 дней',
    '3-month-old-sleep-schedule': 'Режим сна ребенка в 3 месяца',
    '5-month-old-sleep-schedule': 'Режим сна ребенка в 5 месяцев',
    '10-month-old-sleep-schedule': 'Режим сна ребенка в 10 месяцев',
    'baby-sleep-parent-stress': 'Сон ребенка и стресс родителей',
  },
  nl: makeTopicNames('Dutch', {
    'baby-nap-schedule-by-age': 'Babys dutjesschema per leeftijd',
    'newborn-sleep-schedule': 'Slaapschema voor pasgeborenen',
    '4-month-old-sleep-schedule': 'Slaapschema voor baby’s van 4 maanden',
    'baby-feeding-schedule': 'Voedingsschema voor baby’s',
    'wake-windows-by-age': 'Wakkervensters per leeftijd',
  }),
  it: makeTopicNames('Italian', {
    'baby-nap-schedule-by-age': 'Programma dei sonnellini per età',
    'newborn-sleep-schedule': 'Programma del sonno del neonato',
    '4-month-old-sleep-schedule': 'Programma del sonno a 4 mesi',
    'baby-feeding-schedule': 'Programma di alimentazione del bambino',
    'wake-windows-by-age': 'Finestre di veglia per età',
  }),
  pt: makeTopicNames('Portuguese', {
    'baby-nap-schedule-by-age': 'Rotina de sestas do bebé por idade',
    'newborn-sleep-schedule': 'Rotina de sono do recém-nascido',
    '4-month-old-sleep-schedule': 'Rotina de sono aos 4 meses',
    'baby-feeding-schedule': 'Rotina de alimentação do bebé',
    'wake-windows-by-age': 'Janelas de vigília por idade',
  }),
  es: makeTopicNames('Spanish', {
    'baby-nap-schedule-by-age': 'Horario de siestas del bebé por edad',
    'newborn-sleep-schedule': 'Horario de sueño del recién nacido',
    '4-month-old-sleep-schedule': 'Horario de sueño a los 4 meses',
    'baby-feeding-schedule': 'Horario de alimentación del bebé',
    'wake-windows-by-age': 'Ventanas de vigilia por edad',
  }),
  th: makeTopicNames('Thai', {
    'baby-nap-schedule-by-age': 'ตารางงีบของทารกตามวัย',
    'newborn-sleep-schedule': 'ตารางนอนของทารกแรกเกิด',
    '4-month-old-sleep-schedule': 'ตารางนอนของทารกวัย 4 เดือน',
    'baby-feeding-schedule': 'ตารางให้นมและอาหารของทารก',
    'wake-windows-by-age': 'ช่วงเวลาตื่นตามวัย',
  }),
  sv: makeTopicNames('Swedish', {
    'baby-nap-schedule-by-age': 'Barnets tupplursschema efter ålder',
    'newborn-sleep-schedule': 'Sömnschema för nyfödda',
    '4-month-old-sleep-schedule': 'Sömnschema för 4 månader gamla barn',
    'baby-feeding-schedule': 'Matningsschema för bebisar',
    'wake-windows-by-age': 'Vakentider efter ålder',
  }),
  id: makeTopicNames('Indonesian', {
    'baby-nap-schedule-by-age': 'Jadwal tidur siang bayi berdasarkan usia',
    'newborn-sleep-schedule': 'Jadwal tidur bayi baru lahir',
    '4-month-old-sleep-schedule': 'Jadwal tidur bayi 4 bulan',
    'baby-feeding-schedule': 'Jadwal menyusu dan makan bayi',
    'wake-windows-by-age': 'Jendela bangun berdasarkan usia',
  }),
  ja: makeTopicNames('Japanese', {
    'baby-nap-schedule-by-age': '月齢別の赤ちゃんの昼寝スケジュール',
    'newborn-sleep-schedule': '新生児の睡眠スケジュール',
    '4-month-old-sleep-schedule': '生後4か月の睡眠スケジュール',
    'baby-feeding-schedule': '赤ちゃんの授乳・食事スケジュール',
    'wake-windows-by-age': '月齢別の起きている時間',
  }),
  pl: makeTopicNames('Polish', {
    'baby-nap-schedule-by-age': 'Plan drzemek dziecka według wieku',
    'newborn-sleep-schedule': 'Plan snu noworodka',
    '4-month-old-sleep-schedule': 'Plan snu dziecka w wieku 4 miesięcy',
    'baby-feeding-schedule': 'Plan karmienia dziecka',
    'wake-windows-by-age': 'Okna czuwania według wieku',
  }),
  cs: makeTopicNames('Czech', {
    'baby-nap-schedule-by-age': 'Plán denního spánku podle věku',
    'newborn-sleep-schedule': 'Spánkový režim novorozence',
    '4-month-old-sleep-schedule': 'Spánkový režim ve 4 měsících',
    'baby-feeding-schedule': 'Režim krmení miminka',
    'wake-windows-by-age': 'Okna bdění podle věku',
  }),
  no: makeTopicNames('Norwegian', {
    'baby-nap-schedule-by-age': 'Lurskjema for baby etter alder',
    'newborn-sleep-schedule': 'Søvnskjema for nyfødte',
    '4-month-old-sleep-schedule': 'Søvnskjema for baby på 4 måneder',
    'baby-feeding-schedule': 'Matingsplan for baby',
    'wake-windows-by-age': 'Våkenvinduer etter alder',
  }),
  ar: makeTopicNames('Arabic', {
    'baby-nap-schedule-by-age': 'جدول قيلولة الطفل حسب العمر',
    'newborn-sleep-schedule': 'جدول نوم حديث الولادة',
    '4-month-old-sleep-schedule': 'جدول نوم الطفل في عمر 4 أشهر',
    'baby-feeding-schedule': 'جدول تغذية الطفل',
    'wake-windows-by-age': 'فترات اليقظة حسب العمر',
  }),
  da: makeTopicNames('Danish', {
    'baby-nap-schedule-by-age': 'Babys lurskema efter alder',
    'newborn-sleep-schedule': 'Søvnplan for nyfødte',
    '4-month-old-sleep-schedule': 'Søvnplan for baby på 4 måneder',
    'baby-feeding-schedule': 'Madplan for baby',
    'wake-windows-by-age': 'Vågenvinduer efter alder',
  }),
  he: makeTopicNames('Hebrew', {
    'baby-nap-schedule-by-age': 'לוח תנומות לתינוק לפי גיל',
    'newborn-sleep-schedule': 'לוח שינה ליילוד',
    '4-month-old-sleep-schedule': 'לוח שינה לתינוק בן 4 חודשים',
    'baby-feeding-schedule': 'לוח האכלה לתינוק',
    'wake-windows-by-age': 'חלונות ערות לפי גיל',
  }),
  uk: makeTopicNames('Ukrainian', {
    'baby-nap-schedule-by-age': 'Режим денного сну дитини за віком',
    'newborn-sleep-schedule': 'Режим сну новонародженого',
    '4-month-old-sleep-schedule': 'Режим сну дитини у 4 місяці',
    'baby-feeding-schedule': 'Режим годування дитини',
    'wake-windows-by-age': 'Вікна неспання за віком',
  }),
  vi: makeTopicNames('Vietnamese', {
    'baby-nap-schedule-by-age': 'Lịch ngủ ngày của bé theo độ tuổi',
    'newborn-sleep-schedule': 'Lịch ngủ của trẻ sơ sinh',
    '4-month-old-sleep-schedule': 'Lịch ngủ cho bé 4 tháng',
    'baby-feeding-schedule': 'Lịch cho bé bú và ăn',
    'wake-windows-by-age': 'Khoảng thức theo độ tuổi',
  }),
  ms: makeTopicNames('Malay', {
    'baby-nap-schedule-by-age': 'Jadual tidur siang bayi mengikut umur',
    'newborn-sleep-schedule': 'Jadual tidur bayi baru lahir',
    '4-month-old-sleep-schedule': 'Jadual tidur bayi 4 bulan',
    'baby-feeding-schedule': 'Jadual penyusuan dan makan bayi',
    'wake-windows-by-age': 'Tetingkap berjaga mengikut umur',
  }),
  hi: makeTopicNames('Hindi', {
    'baby-nap-schedule-by-age': 'उम्र के अनुसार बच्चे की नैप दिनचर्या',
    'newborn-sleep-schedule': 'नवजात शिशु की नींद दिनचर्या',
    '4-month-old-sleep-schedule': '4 महीने के बच्चे की नींद दिनचर्या',
    'baby-feeding-schedule': 'बच्चे का फीडिंग शेड्यूल',
    'wake-windows-by-age': 'उम्र के अनुसार जागने की अवधि',
  }),
};

const localizedSharedCopy: Record<Locale, {
  description: (topic: string) => string;
  intro: (topic: string) => string;
  category: string;
  readTime: string;
  sectionHeadings: [string, string, string, string];
  sectionBodies: [string, string, string, string];
  rows: [string, string, string, string];
  checklist: [string, string, string, string];
  questions: [string, string];
  answers: [string, string];
  appHeading: string;
  appBody: [string, string];
}> = {
  tr: makeShared('Bebek Uykusu', '8 dk okuma', 'Bu rehber, konuya göre bebeğinizin gerçek ritmini anlamanıza ve günü daha sakin planlamanıza yardımcı olur.'),
  fr: makeShared('Sommeil de bébé', '8 min de lecture', 'Ce guide aide à comprendre le rythme réel de votre bébé et à organiser la journée avec moins d’incertitude.'),
  de: makeShared('Babyschlaf', '8 Min. Lesezeit', 'Dieser Ratgeber hilft, den echten Rhythmus Ihres Babys zu verstehen und den Tag mit weniger Raten zu planen.'),
  ru: makeShared('Сон ребенка', '8 минут', 'Этот гайд помогает понять реальный ритм ребенка и спокойнее планировать день без бесконечных догадок.'),
  nl: makeShared('Babyslaap', '8 min lezen', 'Deze gids helpt je het echte ritme van je baby te begrijpen en de dag met minder giswerk te plannen.'),
  it: makeShared('Sonno del bambino', '8 min di lettura', 'Questa guida aiuta a capire il ritmo reale del bambino e a pianificare la giornata con meno incertezza.'),
  pt: makeShared('Sono do bebé', '8 min de leitura', 'Este guia ajuda a compreender o ritmo real do bebé e a planear o dia com menos adivinhação.'),
  es: makeShared('Sueño del bebé', '8 min de lectura', 'Esta guía ayuda a entender el ritmo real de tu bebé y a planificar el día con menos dudas.'),
  th: makeShared('การนอนของทารก', 'อ่าน 8 นาที', 'คู่มือนี้ช่วยให้เข้าใจจังหวะจริงของลูกและวางแผนแต่ละวันได้ชัดเจนขึ้น'),
  sv: makeShared('Babysömn', '8 min läsning', 'Den här guiden hjälper dig förstå barnets verkliga rytm och planera dagen med mindre gissande.'),
  id: makeShared('Tidur bayi', '8 menit baca', 'Panduan ini membantu memahami ritme nyata bayi dan merencanakan hari dengan lebih sedikit menebak.'),
  ja: makeShared('赤ちゃんの睡眠', '8分', 'このガイドは赤ちゃんの本当のリズムを理解し、迷いを減らして一日を整えるためのものです。'),
  pl: makeShared('Sen dziecka', '8 min czytania', 'Ten poradnik pomaga zrozumieć prawdziwy rytm dziecka i planować dzień z mniejszą liczbą domysłów.'),
  cs: makeShared('Spánek miminka', '8 min čtení', 'Tento průvodce pomáhá pochopit skutečný rytmus miminka a plánovat den s menším hádáním.'),
  no: makeShared('Babysøvn', '8 min lesing', 'Denne guiden hjelper deg å forstå babyens faktiske rytme og planlegge dagen med mindre gjetting.'),
  ar: makeShared('نوم الطفل', 'قراءة 8 دقائق', 'يساعدك هذا الدليل على فهم الإيقاع الحقيقي لطفلك وتنظيم اليوم بقدر أقل من التخمين.'),
  da: makeShared('Babysøvn', '8 min læsning', 'Denne guide hjælper dig med at forstå babys faktiske rytme og planlægge dagen med mindre gætteri.'),
  he: makeShared('שנת תינוקות', '8 דקות קריאה', 'המדריך הזה עוזר להבין את הקצב האמיתי של התינוק ולתכנן את היום עם פחות ניחושים.'),
  uk: makeShared('Сон дитини', '8 хв читання', 'Цей гайд допомагає зрозуміти реальний ритм дитини й планувати день з меншим вгадуванням.'),
  vi: makeShared('Giấc ngủ của bé', '8 phút đọc', 'Hướng dẫn này giúp hiểu nhịp thật của bé và lên kế hoạch mỗi ngày với ít phỏng đoán hơn.'),
  ms: makeShared('Tidur bayi', '8 min bacaan', 'Panduan ini membantu memahami ritma sebenar bayi dan merancang hari dengan kurang meneka.'),
  hi: makeShared('शिशु की नींद', '8 मिनट पढ़ें', 'यह गाइड बच्चे की असली लय समझने और दिन को कम अनुमान के साथ योजना बनाने में मदद करती है।'),
};

function makeNap(language: string, title: string, shortTitle: string): ArticleTranslation {
  return {
    title,
    shortTitle,
    description:
      language === 'Spanish'
        ? 'Guía práctica de siestas por edad, ventanas de vigilia y ajustes cuando una siesta sale corta.'
        : `A localized ${language} guide to baby naps by age, wake windows, nap counts, and flexible routine adjustments.`,
    category: localeCopyByLanguage(language).guides.title,
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

function makeTopicNames(
  language: string,
  overrides: Partial<Record<TranslatedArticleSlug, string>>,
): Record<TranslatedArticleSlug, string> {
  const fallback: Record<TranslatedArticleSlug, string> = {
    'baby-nap-schedule-by-age': `${language} baby nap schedule by age`,
    'newborn-sleep-schedule': `${language} newborn sleep schedule`,
    '4-month-old-sleep-schedule': `${language} 4 month old sleep schedule`,
    'baby-feeding-schedule': `${language} baby feeding schedule`,
    'wake-windows-by-age': `${language} wake windows by age`,
    'survive-night-wakings-new-parents': `${language} night wakings survival guide`,
    'white-noise-for-baby-sleep': `${language} white noise for baby sleep`,
    'ferber-method-baby-sleep': `${language} Ferber method guide`,
    'sleep-training-methods-explained': `${language} sleep training methods explained`,
    'newborn-sleep-first-28-days': `${language} newborn sleep in the first 28 days`,
    '3-month-old-sleep-schedule': `${language} 3 month old sleep schedule`,
    '5-month-old-sleep-schedule': `${language} 5 month old sleep schedule`,
    '10-month-old-sleep-schedule': `${language} 10 month old sleep schedule`,
    'baby-sleep-parent-stress': `${language} baby sleep and parent stress`,
  };

  return {
    ...fallback,
    ...overrides,
  };
}

function makeShared(category: string, readTime: string, sentence: string) {
  return {
    category,
    readTime,
    description: (topic: string) => `${topic}. ${sentence}`,
    intro: (topic: string) => `${sentence} ${topic} works best when parents combine age-aware guidance with their baby’s own sleep, feeding, mood, growth, and daily routine patterns.`,
    sectionHeadings: [
      'Start with your baby’s real rhythm',
      'Use age guidance without forcing the clock',
      'Look for patterns across several days',
      'How Yorix helps',
    ] as [string, string, string, string],
    sectionBodies: [
      'A useful routine begins with what actually happens: naps, wake windows, feeding, night wakings, mood, growth, and the way your family day is organized. A chart can give a starting point, but your baby’s recent history should shape the next step.',
      'Age ranges are helpful because babies usually move through predictable sleep and feeding transitions. Still, illness, travel, daycare, short naps, growth spurts, and regressions can change the day quickly. A flexible plan is easier to keep than a perfect timetable.',
      'One difficult night or one skipped nap is not enough to rewrite the whole routine. Track a few days, compare sleep length with wake windows and feeds, and adjust gently when the same pattern appears again.',
      'Yorix keeps sleep, feeding, diapers, growth, symptoms, routines, and questions in one calm timeline. It can suggest the next sleep window, explain why the plan changed, and help both caregivers follow the same day instead of guessing separately.',
    ] as [string, string, string, string],
    rows: [
      'Track sleep, feeds, and care together',
      'Adjust after short naps or hard nights',
      'Keep bedtime cues simple and repeatable',
      'Ask a clinician about health or safety concerns',
    ] as [string, string, string, string],
    checklist: [
      'Log the key sleep and feeding times for several days.',
      'Compare the last nap with the next wake window.',
      'Move bedtime earlier after an overtired day.',
      'Keep the sleep environment safe and familiar.',
    ] as [string, string, string, string],
    questions: [
      'Should I follow a strict schedule?',
      'When should I change the routine?',
    ] as [string, string],
    answers: [
      'A strict schedule can add pressure. Most families do better with a steady rhythm that still adapts to nap length, feeds, health, travel, and development.',
      'Change the routine when you see the same issue repeat across several days, or when age, feeding, illness, daycare, or a sleep transition clearly changes the day.',
    ] as [string, string],
    appHeading: 'How Yorix helps with this routine',
    appBody: [
      'Yorix turns everyday logs into a clearer daily plan, so parents can see what changed and what to try next.',
      'Instead of switching between notes, memory, charts, and late-night searches, you can keep the baby’s sleep and care rhythm in one app.',
    ] as [string, string],
  };
}

function makeFallbackArticle(locale: Locale, source: TopicPage): ArticleTranslation {
  const shared = localizedSharedCopy[locale];
  const title = localizedTopicNames[locale][source.slug as TranslatedArticleSlug] ?? source.title;

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
      note: source.shortTitle,
    })),
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

function localeCopyByLanguage(language: string) {
  const entries: Record<string, Locale> = {
    French: 'fr', German: 'de', Dutch: 'nl', Italian: 'it', Portuguese: 'pt',
    Spanish: 'es', Thai: 'th', Swedish: 'sv', Indonesian: 'id', Japanese: 'ja',
    Polish: 'pl', Czech: 'cs', Norwegian: 'no', Arabic: 'ar', Danish: 'da',
    Hebrew: 'he', Ukrainian: 'uk', Vietnamese: 'vi', Malay: 'ms', Hindi: 'hi',
  };
  return localeCopy[entries[language] ?? 'fr'];
}

export function getArticleUiCopy(locale?: Locale) {
  return locale ? articleUiCopy[locale] : defaultArticleUi;
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

  return {
    ...source,
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
