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
    acceptBefore: string;
    offer: string;
    and: string;
    refundTerms: string;
    device: string;
  };
  account: { signInApple: string; popupBlocked: string; signInError: string };
  checkout: {
    signingIn: string;
    creating: string;
    redirecting: string;
    unavailable: string;
    testOnly: string;
    error: string;
    blocked: (email: string) => string;
    rateLimited: string;
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
  terms: {
    title: (period: string) => string;
    period: string;
    days: (days: string) => string;
    price: string;
    charge: (amount: string) => string;
    oneOff: string;
    signInNote: string;
    active: (date: string) => string;
    accept: [string, string, string, string, string];
    privacy: [string, string, string];
    required: string;
    withApple: string;
    pay: (price: string) => string;
    next: string;
    cancel: string;
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
    steps: 'Вход через Apple → оплата картой → подписка в приложении',
    acceptBefore: 'Оплачивая, вы принимаете',
    offer: 'публичный договор',
    and: 'и',
    refundTerms: 'условия возврата',
    device: 'Для iPhone и iPad, iOS 18+.',
  },
  account: {
    signInApple: 'Войти через Apple',
    popupBlocked: 'Браузер закрыл окно входа. Разрешите всплывающие окна и нажмите ещё раз.',
    signInError: 'Войти не удалось. Попробуйте ещё раз.',
  },
  checkout: {
    signingIn: 'Открываем вход через Apple…',
    creating: 'Создаём оплату…',
    redirecting: 'Переходим в WebPay…',
    unavailable: 'Оплата картой на сайте скоро откроется.',
    testOnly: 'Оплата картой пока открыта только для тестирования.',
    error: 'Не получилось создать оплату. Попробуйте ещё раз через минуту.',
    blocked: (email) => `Для этого аккаунта оплата недоступна. Напишите нам: ${email}.`,
    rateLimited: 'Слишком много попыток. Подождите минуту.',
  },
  faq: {
    title: 'Вопросы',
    items: [
      { q: 'Что будет, когда срок закончится?', a: 'Подписка выключится, записи останутся. Ничего не спишется — карту мы не храним. Чтобы продлить, оформите новый срок: дни добавятся к текущему.' },
      { q: 'Зачем входить через Apple?', a: 'Так подписка сама включится в приложении на вашем аккаунте — без кодов и ручной активации: после оплаты всё подключается автоматически.' },
      { q: 'Можно ли вернуть деньги?', a: 'Да, по разделу 7 оферты. Если подписка не включилась, не работала по нашей вине или списание ошибочное, вернём всю сумму. Если откажетесь сами — стоимость неиспользованных дней за вычетом наших подтверждённых расходов.' },
      { q: 'У меня уже есть подписка в App Store.', a: 'Отключите автопродление: Настройки → ваше имя → Подписки. Подписка Apple доработает до конца периода, срок с сайта добавится после него.' },
    ],
    more: 'Другой вопрос? Напишите нам',
  },
  ret: {
    checking: 'Проверяем оплату…',
    paid: (date) => `Подписка включена до ${date}`,
    openApp: 'Откройте Yorix на iPhone — всё уже работает. Чек об оплате пришлёт платёжная система.',
    pending: 'Банк подтверждает оплату — обычно меньше минуты. Страница обновится сама.',
    failed: 'Оплаченный заказ не найден. Если деньги списаны, напишите нам — дату и сумму.',
    signIn: 'Войдите через Apple, чтобы увидеть статус заказа.',
    back: 'К тарифам',
  },
  cancel: { title: 'Оплата отменена', body: 'Деньги не списаны. Вернуться можно в любой момент.', back: 'К тарифам' },
  footer: {
    seller: 'Продавец',
    tagline: 'Дневник, прогноз сна и коуч для родителей малышей.',
    subscription: 'Подписка',
    requisites: 'Реквизиты в оферте',
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
  currency: { note: (amounts) => `Принимаем карты «Мир». Оплата проходит в белорусских рублях: ${amounts}. Банк карты пересчитает по своему курсу.` },
  terms: {
    title: (period) => `Подписка ${period}`,
    period: 'Срок',
    days: (days) => `${days} с момента оплаты`,
    price: 'Цена',
    charge: (amount) => `к списанию ${amount}`,
    oneOff: 'Платёж разовый, без автопродления. Карту мы не сохраняем.',
    signInNote: 'Подписка включится в приложении Yorix на вашем аккаунте Apple сразу после оплаты — ничего вводить не нужно.',
    active: (date) => `Подписка уже действует до ${date} — новый срок добавится к ней.`,
    accept: ['Я принимаю условия ', 'публичного договора', ' и ', 'оплаты и возврата', '. Мне есть 18 лет.'],
    privacy: ['Данные аккаунта и заказа обрабатываем для исполнения договора — ', 'Политика обработки персональных данных', '. Данные карты вводятся только на странице WEBPAY.'],
    required: 'Отметьте, что принимаете условия: без этого оплата недоступна.',
    withApple: 'Продолжить с Apple',
    pay: (price) => `Перейти к оплате · ${price}`,
    next: 'Продолжить',
    cancel: 'Отмена',
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
    steps: 'Sign in with Apple → pay by card → it’s on in the app',
    acceptBefore: 'By paying you accept the',
    offer: 'public offer',
    and: 'and the',
    refundTerms: 'refund terms',
    device: 'iPhone and iPad, iOS 18+.',
  },
  account: {
    signInApple: 'Sign in with Apple',
    popupBlocked: 'The browser closed the sign-in window. Allow pop-ups and press again.',
    signInError: 'Sign-in failed. Please try again.',
  },
  checkout: {
    signingIn: 'Opening Apple sign-in…',
    creating: 'Creating your payment…',
    redirecting: 'Taking you to WebPay…',
    unavailable: 'Card payment on the site opens soon.',
    testOnly: 'Card payment is open for testing only for now.',
    error: 'Couldn’t create the payment. Please try again in a minute.',
    blocked: (email) => `Payment isn't available for this account. Write to us: ${email}.`,
    rateLimited: 'Too many attempts. Wait a minute.',
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'What happens when the period ends?', a: 'It switches off; your records stay. Nothing is charged — we keep no card. To extend, buy a new period: the days are added on.' },
      { q: 'Why sign in with Apple?', a: 'So the subscription turns on by itself in the app on your account — no codes, no manual activation: everything connects automatically after payment.' },
      { q: 'Can I get a refund?', a: 'Yes, under section 7 of the offer. If it never switched on, failed through our fault or was charged by mistake, we refund everything. If you cancel yourself — the unused days less our documented costs.' },
      { q: 'I already have an App Store subscription.', a: 'Turn off auto-renewal: Settings → your name → Subscriptions. The Apple period runs to its end; the site period is added after it.' },
    ],
    more: 'Another question? Write to us',
  },
  ret: {
    checking: 'Checking the payment…',
    paid: (date) => `Subscription on until ${date}`,
    openApp: 'Open Yorix on your iPhone — it’s already working. The payment system sends the receipt.',
    pending: 'The bank is confirming the payment — usually under a minute. This page refreshes itself.',
    failed: 'No paid order found. If money was charged, write to us with the date and amount.',
    signIn: 'Sign in with Apple to see the order status.',
    back: 'Back to plans',
  },
  cancel: { title: 'Payment cancelled', body: 'Nothing was charged. Come back any time.', back: 'Back to plans' },
  footer: {
    seller: 'Seller',
    tagline: 'Diary, sleep forecast and a coach for parents of little ones.',
    subscription: 'Subscription',
    requisites: 'Requisites in the offer',
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
  currency: { note: (amounts) => `Mir cards are accepted. The card is charged in Belarusian rubles: ${amounts}. Your bank converts at its own rate.` },
  terms: {
    title: (period) => `Subscription ${period}`,
    period: 'Period',
    days: (days) => `${days} from payment`,
    price: 'Price',
    charge: (amount) => `charged as ${amount}`,
    oneOff: 'One-off payment, no auto-renewal. We keep no card on file.',
    signInNote: 'It turns on in the Yorix app on your Apple account right after payment — nothing to type in.',
    active: (date) => `You already have a subscription until ${date} — the new period is added on.`,
    accept: ['I accept the ', 'public offer', ' and the ', 'payment and refund terms', '. I am 18 or older.'],
    privacy: ['We process account and order data to perform the contract — see the ', 'personal data policy', '. Card details are entered only on the WEBPAY page.'],
    required: 'Tick the box to accept the terms — payment is not available without it.',
    withApple: 'Continue with Apple',
    pay: (price) => `Continue to payment · ${price}`,
    next: 'Continue',
    cancel: 'Cancel',
  },
};

export const subscriptionCopy: Record<Lang, SubscriptionCopy> = { ru, en };
