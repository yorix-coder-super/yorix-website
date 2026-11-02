import content from './instagram-content.json';

export const campaignLocales = ['ru', 'tr', 'de', 'en', 'ar'] as const;
export type CampaignLocale = typeof campaignLocales[number];
export const languageNames = { ru: 'Русский', tr: 'Türkçe', de: 'Deutsch', en: 'English', ar: 'العربية' };
export function isCampaignLocale(value: string): value is CampaignLocale {
  return campaignLocales.some(locale => locale === value);
}

const ui = {
  ru: {
    intro: 'Чуть больше ясности. Чуть меньше тревоги.', back: 'Назад', skip: 'Скачать', language: 'Язык', steps: ['Ваш день', 'Время сна', 'С Yorix', 'Начать'],
    example: 'Пример', nextSleep: 'Следующий сон', time: 'через 40 мин', window: 'Ориентир сна', demoNote: 'Демонстрация, не прогноз для вашего малыша',
    premium: 'Прогноз и гибкий план — в Yorix Premium.', download: 'Скачать в App Store', device: 'iPhone и iPad · iOS 18+',
    free: 'Скачивание и дневник сна — бесплатно. Прогноз и план дня — в Premium. Условия подписки показаны в приложении до покупки.',
    share: 'Поделиться', copy: 'Скопировать ссылку', copied: 'Ссылка скопирована', manual: 'Скопируйте эту ссылку:', qr: 'Открыть Yorix в App Store по QR-коду',
    android: 'Для Android приложения пока нет. Сохраните ссылку или передайте близкому с iPhone.', instagram: 'Не открылся App Store? Откройте страницу во внешнем браузере через меню Instagram и попробуйте снова.',
    caution: 'Время сна — лишь один из факторов. Ориентируйтесь на сигналы малыша. Yorix не заменяет педиатра.', privacy: 'Конфиденциальность', support: 'Написать нам', restart: 'Посмотреть сначала',
  },
  en: {
    intro: 'A little more clarity. A little less worry.', back: 'Back', skip: 'Download', language: 'Language', steps: ['Your day', 'Sleep timing', 'With Yorix', 'Get started'],
    example: 'Example', nextSleep: 'Next sleep', time: 'in 40 min', window: 'Suggested sleep window', demoNote: 'Illustration, not a prediction for your baby',
    premium: 'Predictions and a flexible plan are part of Yorix Premium.', download: 'Download on the App Store', device: 'iPhone and iPad · iOS 18+',
    free: 'Download and sleep logging are free. Predictions and the daily plan require Premium. Subscription terms appear in the app before purchase.',
    share: 'Share', copy: 'Copy link', copied: 'Link copied', manual: 'Copy this link:', qr: 'Open Yorix on the App Store with this QR code',
    android: 'An Android app is not available yet. Save the link or share it with someone who has an iPhone.', instagram: 'App Store did not open? Open this page in an external browser from the Instagram menu and try again.',
    caution: 'Sleep timing is only one factor. Follow your baby’s cues. Yorix does not replace a pediatrician.', privacy: 'Privacy', support: 'Contact us', restart: 'Start again',
  },
  tr: {
    intro: 'Biraz daha netlik. Biraz daha az endişe.', back: 'Geri', skip: 'İndir', language: 'Dil', steps: ['Gününüz', 'Uyku zamanı', 'Yorix ile', 'Başlayın'],
    example: 'Örnek', nextSleep: 'Sonraki uyku', time: '40 dk sonra', window: 'Önerilen uyku aralığı', demoNote: 'Gösterim amaçlıdır, bebeğinize özel bir tahmin değildir',
    premium: 'Tahminler ve esnek günlük plan Yorix Premium’a dahildir.', download: 'App Store’dan indirin', device: 'iPhone ve iPad · iOS 18+',
    free: 'İndirmek ve uyku kaydı tutmak ücretsizdir. Tahminler ve günlük plan Premium gerektirir. Abonelik koşulları satın almadan önce uygulamada gösterilir.',
    share: 'Paylaş', copy: 'Bağlantıyı kopyala', copied: 'Bağlantı kopyalandı', manual: 'Bu bağlantıyı kopyalayın:', qr: 'Bu QR koduyla Yorix’i App Store’da açın',
    android: 'Henüz Android uygulaması yok. Bağlantıyı kaydedin veya iPhone kullanan bir yakınınızla paylaşın.', instagram: 'App Store açılmadı mı? Instagram menüsünden bu sayfayı harici bir tarayıcıda açıp tekrar deneyin.',
    caution: 'Uyku zamanı etkenlerden yalnızca biridir. Bebeğinizin işaretlerini takip edin. Yorix çocuk doktorunun yerini tutmaz.', privacy: 'Gizlilik', support: 'Bize yazın', restart: 'Baştan izleyin',
  },
  de: {
    intro: 'Etwas mehr Klarheit. Etwas weniger Sorge.', back: 'Zurück', skip: 'Herunterladen', language: 'Sprache', steps: ['Ihr Tag', 'Schlafenszeit', 'Mit Yorix', 'Loslegen'],
    example: 'Beispiel', nextSleep: 'Nächster Schlaf', time: 'in 40 Min.', window: 'Empfohlenes Schlaffenster', demoNote: 'Illustration, keine Vorhersage für Ihr Baby',
    premium: 'Vorhersagen und ein flexibler Tagesplan gehören zu Yorix Premium.', download: 'Im App Store laden', device: 'iPhone und iPad · iOS 18+',
    free: 'Download und Schlafprotokoll sind kostenlos. Vorhersagen und Tagesplan erfordern Premium. Die Abo-Bedingungen werden vor dem Kauf in der App angezeigt.',
    share: 'Teilen', copy: 'Link kopieren', copied: 'Link kopiert', manual: 'Kopieren Sie diesen Link:', qr: 'Yorix mit diesem QR-Code im App Store öffnen',
    android: 'Eine Android-App gibt es noch nicht. Speichern Sie den Link oder teilen Sie ihn mit jemandem mit iPhone.', instagram: 'Der App Store öffnet sich nicht? Öffnen Sie diese Seite über das Instagram-Menü in einem externen Browser und versuchen Sie es erneut.',
    caution: 'Die Schlafenszeit ist nur ein Faktor. Achten Sie auf die Signale Ihres Babys. Yorix ersetzt keine kinderärztliche Beratung.', privacy: 'Datenschutz', support: 'Kontakt', restart: 'Von vorn ansehen',
  },
  ar: {
    intro: 'وضوح أكثر قليلًا. وقلق أقل قليلًا.', back: 'رجوع', skip: 'تنزيل', language: 'اللغة', steps: ['يومك', 'وقت النوم', 'مع Yorix', 'ابدئي'],
    example: 'مثال', nextSleep: 'النوم التالي', time: 'بعد ٤٠ دقيقة', window: 'الفترة المقترحة للنوم', demoNote: 'عرض توضيحي، وليس توقعًا خاصًا بطفلك',
    premium: 'التوقعات والخطة اليومية المرنة ضمن Yorix Premium.', download: 'تنزيل من App Store', device: 'iPhone وiPad · iOS 18+',
    free: 'التنزيل وتسجيل النوم مجانيان. التوقعات والخطة اليومية تتطلب Premium. تظهر شروط الاشتراك في التطبيق قبل الشراء.',
    share: 'مشاركة', copy: 'نسخ الرابط', copied: 'تم نسخ الرابط', manual: 'انسخي هذا الرابط:', qr: 'افتحي Yorix في App Store باستخدام رمز QR',
    android: 'لا يتوفر تطبيق Android حاليًا. احفظي الرابط أو شاركيه مع شخص يستخدم iPhone.', instagram: 'لم يُفتح App Store؟ افتحي هذه الصفحة في متصفح خارجي من قائمة Instagram ثم حاولي مجددًا.',
    caution: 'توقيت النوم عامل واحد فقط. راقبي إشارات طفلك. لا يحل Yorix محل طبيب الأطفال.', privacy: 'الخصوصية', support: 'تواصلي معنا', restart: 'البدء من جديد',
  },
};

export function campaignCopy(locale: CampaignLocale) {
  return { screens: content[locale], ...ui[locale] };
}
export type CampaignCopy = ReturnType<typeof campaignCopy>;
