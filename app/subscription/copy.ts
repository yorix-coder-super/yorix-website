import type { Lang } from './i18n';

export type SubscriptionCopy = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { plans: string; reviews: string; faq: string; documents: string; choosePlan: string; language: string };
  hero: { eyebrow: string; title: string; subline: string; primary: (price: string) => string };
  outcomes: { title: string; items: { lead: string; rest: string }[] };
  proof: { eyebrow: string; title: string; translated: string; source: string; parents: string };
  plans: {
    title: string;
    included: string;
    bestValue: string;
    perWeek: (perWeek: string, base: string) => string;
    subscribe: (period: string) => string;
    extend: (period: string) => string;
    trust: string;
    steps: string;
    googleQuestion: string;
    googleLink: string;
    goesTo: (email: string) => string;
    activeUntil: (email: string, date: string) => string;
    wrongAccount: string;
    signOut: string;
    acceptBefore: string;
    offer: string;
    and: string;
    refundTerms: string;
    device: string;
  };
  account: { signInApple: string; signInGoogle: string; popupBlocked: string; signInError: string };
  checkout: {
    signingIn: string;
    creating: string;
    redirecting: string;
    unavailable: string;
    testOnly: string;
    error: string;
    blocked: (email: string) => string;
    rateLimited: string;
    request: string;
  };
  faq: { title: string; items: { q: string; a: string }[]; more: string };
  ret: { checking: string; paid: (date: string) => string; openApp: string; pending: string; failed: string; signIn: string; back: string };
  cancel: { title: string; body: string; back: string };
  footer: {
    seller: string;
    tagline: string;
    subscription: string;
    requisites: string;
    documents: string;
    medical: string;
    rows: { seller: string; status: string; unp: string; address: string; register: string; email: string; phone: string; hours: string };
  };
  docs: { offer: string; payment: string; privacy: string };
  legal: { eyebrow: string; updated: (date: string) => string; binding: string };
  home: { nav: string; eyebrow: string; title: string; body: string; more: string };
  currency: { note: (amounts: string) => string };
  request: {
    title: string;
    body: string;
    plan: string;
    email: string;
    code: string;
    optional: string;
    codeHint: string;
    submit: string;
    cancel: string;
    consent: string;
    sentTitle: string;
    sentBody: string;
    close: string;
    error: string;
    errorMail: string;
  };
};

const ru: SubscriptionCopy = {
  meta: {
    title: 'Подписка Yorix — оплата картой, без App Store',
    description: 'Прогноз сна, коуч 24/7 и аналитика на неделю, месяц или год. Одна оплата картой через WebPay, без автопродления.',
    ogLocale: 'ru_RU',
  },
  nav: { plans: 'Тарифы', reviews: 'Отзывы', faq: 'Вопросы', documents: 'Документы', choosePlan: 'Выбрать тариф', language: 'Язык' },
  hero: {
    eyebrow: 'Подписка Yorix · оплата картой, без App Store',
    title: 'Сегодня вечером вы уже будете знать, когда укладывать.',
    subline: 'Прогноз следующего сна по дневнику вашего малыша, план, который пересчитывается сам, и коуч, который знает ваш день.',
    primary: (price) => `Оформить подписку · от ${price}`,
  },
  outcomes: {
    title: 'Что изменится уже сегодня',
    items: [
      { lead: 'Видите,', rest: 'во сколько начинать укладывание — до переутомления.' },
      { lead: 'Сон вышел коротким', rest: '— план пересчитался сам.' },
      { lead: 'Коуч отвечает в три ночи', rest: '— по вашему дневнику.' },
    ],
  },
  proof: { eyebrow: 'Отзывы · без правок', title: 'Что пишут родители', translated: 'перевод', source: 'отзыв в App Store', parents: 'отзыв родителей' },
  plans: {
    title: 'Выберите срок. Остальное одинаково.',
    included: 'В каждом тарифе: прогноз сна · коуч 24/7 · аналитика · советы на день',
    bestValue: 'Выгоднее всего',
    perWeek: (perWeek, base) => `${perWeek} в неделю вместо ${base}`,
    subscribe: (period) => `Оформить ${period}`,
    extend: (period) => `Продлить ${period}`,
    trust: 'Одна оплата за выбранный срок. Без автопродления, карту не сохраняем.',
    steps: 'Apple ID из приложения → карта на WebPay → подписка включена',
    googleQuestion: 'В приложении вошли через Google?',
    googleLink: 'Войти через Google',
    goesTo: (email) => `Подписка включится на ${email}.`,
    activeUntil: (email, date) => `На ${email} подписка до ${date} — новый срок добавится к нему.`,
    wrongAccount: 'Не тот аккаунт?',
    signOut: 'Выйти',
    acceptBefore: 'Оплачивая, вы принимаете',
    offer: 'публичный договор',
    and: 'и',
    refundTerms: 'условия возврата',
    device: 'Для iPhone и iPad, iOS 18+.',
  },
  account: {
    signInApple: 'Войти через Apple',
    signInGoogle: 'Войти через Google',
    popupBlocked: 'Браузер закрыл окно входа. Разрешите всплывающие окна и нажмите ещё раз.',
    signInError: 'Войти не удалось. Попробуйте ещё раз.',
  },
  checkout: {
    signingIn: 'Открываем вход через Apple…',
    creating: 'Создаём оплату…',
    redirecting: 'Переходим в WebPay…',
    unavailable: 'Оплата на сайте пока закрыта — оставьте заявку, пришлём ссылку.',
    testOnly: 'Оплата пока открыта только тестировщикам — оставьте заявку.',
    error: 'Не получилось создать оплату. Попробуйте ещё раз или оставьте заявку.',
    blocked: (email) => `Для этого аккаунта оплата недоступна. Напишите нам: ${email}.`,
    rateLimited: 'Слишком много попыток. Подождите минуту.',
    request: 'Оставить заявку',
  },
  faq: {
    title: 'Вопросы',
    items: [
      { q: 'Что будет, когда срок закончится?', a: 'Подписка выключится, записи останутся. Ничего не спишется — карту мы не храним. Чтобы продлить, оформите новый срок: дни добавятся к текущему.' },
      { q: 'Зачем входить через Apple ID?', a: 'Подписка привязана к аккаунту, не к телефону. Войдите тем же Apple ID, что и в приложении, — включится именно там. Вошли через Google? Здесь тоже.' },
      { q: 'Можно ли вернуть деньги?', a: 'Как в App Store: оплаченный срок не возвращается. Исключения — подписка не включилась, не работала по нашей вине или списание ошибочное: вернём на ту же карту.' },
      { q: 'У меня уже есть подписка в App Store.', a: 'Отключите автопродление: Настройки → ваше имя → Подписки. Подписка Apple доработает до конца периода, срок с сайта добавится после него.' },
    ],
    more: 'Другой вопрос? Напишите нам',
  },
  ret: {
    checking: 'Проверяем оплату…',
    paid: (date) => `Подписка включена до ${date}`,
    openApp: 'Откройте Yorix на iPhone — всё уже работает. Чек придёт на e-mail.',
    pending: 'Банк подтверждает оплату — обычно меньше минуты. Страница обновится сама.',
    failed: 'Оплаченный заказ не найден. Если деньги списаны, напишите нам — дату и сумму.',
    signIn: 'Войдите через Apple, чтобы увидеть статус заказа.',
    back: 'К тарифам',
  },
  cancel: { title: 'Оплата отменена', body: 'Деньги не списаны. Вернуться можно в любой момент.', back: 'К тарифам' },
  footer: {
    seller: 'Продавец и контакты',
    tagline: 'Дневник, прогноз сна и коуч для родителей малышей.',
    subscription: 'Подписка',
    requisites: 'Все реквизиты',
    documents: 'Документы',
    medical: 'Yorix помогает с режимом дня и не оказывает медицинских услуг.',
    rows: { seller: 'Продавец', status: 'Статус', unp: 'УНП', address: 'Адрес', register: 'Регистрация в Торговом реестре', email: 'E-mail', phone: 'Телефон', hours: 'Режим работы' },
  },
  docs: { offer: 'Публичный договор (оферта)', payment: 'Оплата, доставка и возврат', privacy: 'Политика обработки персональных данных' },
  legal: { eyebrow: 'Документы', updated: (date) => `Редакция от ${date}`, binding: '' },
  home: {
    nav: 'Подписка',
    eyebrow: 'Подписка картой — если App Store недоступен',
    title: 'Полная подписка Yorix — картой, без App Store.',
    body: 'Прогноз следующего сна, коуч 24/7, аналитика и советы на день — на неделю, месяц или год.',
    more: 'Всё о подписке: условия, возврат, вопросы',
  },
  currency: { note: (amounts) => `Оплата проходит в белорусских рублях: ${amounts}. Банк карты пересчитает по своему курсу.` },
  request: {
    title: 'Заявка на подписку',
    body: 'Оставьте e-mail — в течение дня пришлём ссылку на оплату. Платить пока не нужно.',
    plan: 'Срок',
    email: 'E-mail',
    code: 'Код аккаунта',
    optional: '(если есть)',
    codeHint: 'В приложении: Настройки → Аккаунт',
    submit: 'Получить ссылку',
    cancel: 'Отмена',
    consent: 'Нажимая кнопку, вы соглашаетесь на обработку e-mail для этого заказа.',
    sentTitle: 'Заявка принята',
    sentBody: 'Ссылка придёт на e-mail в течение дня — загляните и в «Спам».',
    close: 'Понятно',
    error: 'Не отправилось.',
    errorMail: 'Написать письмом',
  },
};

const en: SubscriptionCopy = {
  meta: {
    title: 'Yorix subscription — pay by card, no App Store needed',
    description: 'Sleep forecast, 24/7 coach and analytics for a week, a month or a year. One card payment via WebPay, no auto-renewal.',
    ogLocale: 'en_US',
  },
  nav: { plans: 'Plans', reviews: 'Reviews', faq: 'FAQ', documents: 'Documents', choosePlan: 'Choose a plan', language: 'Language' },
  hero: {
    eyebrow: 'Yorix subscription · card payment outside the App Store',
    title: "Tonight you'll already know when to start bedtime.",
    subline: "A next-nap forecast from your baby's diary, a plan that re-plans itself, and a coach that knows your day.",
    primary: (price) => `Subscribe · from ${price}`,
  },
  outcomes: {
    title: 'What changes tonight',
    items: [
      { lead: 'See', rest: 'when to start winding down — before overtiredness.' },
      { lead: 'A short nap?', rest: 'The plan re-plans itself.' },
      { lead: 'A 3 a.m. coach', rest: 'that knows your diary.' },
    ],
  },
  proof: { eyebrow: 'Reviews · unedited', title: 'What parents write', translated: 'translated', source: 'App Store review', parents: 'parent feedback' },
  plans: {
    title: 'Pick the length. The rest is the same.',
    included: 'Every plan: sleep forecast · 24/7 coach · analytics · daily advice',
    bestValue: 'Best value',
    perWeek: (perWeek, base) => `${perWeek} a week instead of ${base}`,
    subscribe: (period) => `Subscribe ${period}`,
    extend: (period) => `Extend ${period}`,
    trust: 'One payment for the period. No auto-renewal, no card on file.',
    steps: 'Apple ID as in the app → card via WebPay → on in the app',
    googleQuestion: 'Signed in to the app with Google?',
    googleLink: 'Sign in with Google',
    goesTo: (email) => `The subscription goes to ${email}.`,
    activeUntil: (email, date) => `${email} is subscribed until ${date} — a new period is added on.`,
    wrongAccount: 'Wrong account?',
    signOut: 'Sign out',
    acceptBefore: 'By paying you accept the',
    offer: 'public offer',
    and: 'and the',
    refundTerms: 'refund terms',
    device: 'iPhone and iPad, iOS 18+.',
  },
  account: {
    signInApple: 'Sign in with Apple',
    signInGoogle: 'Sign in with Google',
    popupBlocked: 'The browser closed the sign-in window. Allow pop-ups and press again.',
    signInError: 'Sign-in failed. Please try again.',
  },
  checkout: {
    signingIn: 'Opening Apple sign-in…',
    creating: 'Creating your payment…',
    redirecting: 'Taking you to WebPay…',
    unavailable: "Card payment on the site isn't open yet — leave a request and we'll send a link.",
    testOnly: 'Payment is open to testers only for now — leave a request.',
    error: "Couldn't create the payment. Try again or leave a request.",
    blocked: (email) => `Payment isn't available for this account. Write to us: ${email}.`,
    rateLimited: 'Too many attempts. Wait a minute.',
    request: 'Leave a request',
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'What happens when the period ends?', a: 'It switches off; your records stay. Nothing is charged — we keep no card. To extend, buy a new period: the days are added on.' },
      { q: 'Why sign in with my Apple ID?', a: 'Tied to your account, not your phone. Same Apple ID as in the app — and it switches on there. Google in the app? Google here.' },
      { q: 'Can I get a refund?', a: "As in the App Store, a paid period isn't refunded — unless it never switched on, failed through our fault or was charged by mistake." },
      { q: 'I already have an App Store subscription.', a: 'Turn off auto-renewal: Settings → your name → Subscriptions. The Apple period runs to its end; the site period is added after it.' },
    ],
    more: 'Another question? Write to us',
  },
  ret: {
    checking: 'Checking the payment…',
    paid: (date) => `Subscription on until ${date}`,
    openApp: "Open Yorix on your iPhone — it's already working. The receipt arrives by e-mail.",
    pending: 'The bank is confirming the payment — usually under a minute. This page refreshes itself.',
    failed: 'No paid order found. If money was charged, write to us with the date and amount.',
    signIn: 'Sign in with Apple to see the order status.',
    back: 'Back to plans',
  },
  cancel: { title: 'Payment cancelled', body: 'Nothing was charged. Come back any time.', back: 'Back to plans' },
  footer: {
    seller: 'Seller and contacts',
    tagline: 'Diary, sleep forecast and a coach for parents of little ones.',
    subscription: 'Subscription',
    requisites: 'Full seller details',
    documents: 'Documents',
    medical: 'Yorix helps with the daily routine and does not provide medical services.',
    rows: { seller: 'Seller', status: 'Status', unp: 'Taxpayer number (УНП)', address: 'Address', register: 'Trade register', email: 'E-mail', phone: 'Phone', hours: 'Working hours' },
  },
  docs: { offer: 'Public offer agreement', payment: 'Payment, delivery and refunds', privacy: 'Personal data policy' },
  legal: {
    eyebrow: 'Documents',
    updated: (date) => `Version of ${date}`,
    binding: 'This translation is provided for convenience. The Russian version is the legally binding one.',
  },
  home: {
    nav: 'Subscription',
    eyebrow: 'When the App Store is not an option',
    title: 'The full Yorix subscription — by card, no App Store.',
    body: 'Next-nap forecast, 24/7 coach, analytics and daily advice — for a week, a month or a year.',
    more: 'All about the subscription: terms, refunds, FAQ',
  },
  currency: { note: (amounts) => `The card is charged in Belarusian rubles: ${amounts}. Your bank converts at its own rate.` },
  request: {
    title: 'Subscription request',
    body: "Leave your e-mail — we'll send a payment link within a day. Nothing to pay yet.",
    plan: 'Period',
    email: 'E-mail',
    code: 'Account code',
    optional: '(if you have one)',
    codeHint: 'In the app: Settings → Account',
    submit: 'Send me the link',
    cancel: 'Cancel',
    consent: 'By pressing the button you agree to e-mail processing for this order.',
    sentTitle: 'Request received',
    sentBody: 'The link arrives by e-mail within a day — check spam too.',
    close: 'Got it',
    error: "Didn't send.",
    errorMail: 'Write by e-mail',
  },
};

export const subscriptionCopy: Record<Lang, SubscriptionCopy> = { ru, en };
