import type { Lang } from './i18n';

export type PremiumCopy = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { plans: string; howToBuy: string; payment: string; contacts: string; choosePlan: string; language: string };
  hero: { badge: string; title: string; body: string; primary: (price: string) => string; oneOff: string; nextLive: string; nextRequest: string };
  outcomes: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  guarantee: string;
  proof: { eyebrow: string; title: string; translated: string; source: string; parents: string };
  plans: {
    eyebrow: string;
    title: string;
    body: string;
    bestValue: string;
    perWeek: (price: string) => string;
    cheaper: (pct: number) => string;
    pay: string;
    order: string;
    charged: (byn: string) => string;
    perDay: (price: string) => string;
    perMonth: (price: string) => string;
    yearSaving: (pct: number) => string;
    footnote: string;
    acceptBefore: string;
    offer: string;
    and: string;
    refundTerms: string;
  };
  account: {
    title: string;
    signInApple: string;
    signInGoogle: string;
    signedInAs: string;
    via: (provider: string) => string;
    premiumUntil: (date: string) => string;
    noPremium: string;
    accountCode: string;
    copy: string;
    copied: string;
    signOut: string;
    checking: string;
    notConfigured: string;
    popupBlocked: string;
    signInError: string;
    why: string;
  };
  checkout: {
    creating: string;
    redirecting: string;
    unavailable: string;
    testOnly: string;
    error: string;
    blocked: string;
    rateLimited: string;
    manualHint: string;
  };
  features: { eyebrow: string; title: string; body: string; device: string; items: { title: string; body: string }[] };
  steps: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
    manualTitle: string;
    manualBody: string;
    manualCode: string;
    copyAddress: string;
    copyTemplate: string;
    writeToUs: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  ret: {
    title: string;
    checking: string;
    paid: (date: string) => string;
    openApp: string;
    pending: string;
    failed: string;
    signIn: string;
    back: string;
  };
  cancel: { title: string; body: string; back: string };
  footer: {
    seller: string;
    requisites: string;
    documents: string;
    medical: string;
    rows: { seller: string; status: string; unp: string; address: string; register: string; email: string; phone: string; hours: string };
  };
  docs: { offer: string; payment: string; privacy: string };
  legal: { eyebrow: string; updated: (date: string) => string; binding: string };
  home: { nav: string; eyebrow: string; title: string; body: string; note: string; details: string };
  currency: { label: string; note: string; names: Record<'BYN' | 'RUB' | 'EUR' | 'USD', string> };
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

const ru: PremiumCopy = {
  meta: {
    title: 'Подписка Yorix — тарифы и оплата картой',
    description:
      'Подписка Yorix на неделю, месяц или год: персональный прогноз сна, ИИ-коуч и аналитика. Цены в белорусских рублях, оплата картой через WebPay.',
    ogLocale: 'ru_RU',
  },
  nav: { plans: 'Тарифы', howToBuy: 'Как купить', payment: 'Оплата и возврат', contacts: 'Контакты', choosePlan: 'Выбрать тариф', language: 'Язык' },
  hero: {
    badge: 'Подписка Yorix · на неделю, месяц или год',
    title: 'Вы будете знать, когда малышу пора спать, — раньше, чем он начнёт капризничать.',
    body: 'Yorix считает окно следующего сна и время укладывания по дневнику вашего малыша и пересчитывает план, если день пошёл не так. Рядом — коуч по сну, который знает ваш дневник, в любой час ночи.',
    primary: (price) => `Оформить подписку от ${price}`,
    oneOff: 'Разовая оплата, без автопродления',
    nextLive: 'Вход через Apple → карта на защищённой странице WebPay → подписка включится в приложении сразу. Списаний потом не будет.',
    nextRequest: 'Оставьте почту — в течение дня пришлём ссылку на оплату. До этого платить ничего не нужно.',
  },
  outcomes: {
    eyebrow: 'Что изменится уже сегодня вечером',
    title: 'Три вещи, которые подписка делает за вас.',
    items: [
      { title: 'Вы видите, во сколько начинать укладывание', body: 'До переутомления, а не после. Окно сна считается по реальным снам и возрасту малыша, а не по таблице из интернета.' },
      { title: 'Сон сбился на час? План пересчитался сам', body: 'Один короткий сон — и весь день сдвигается вместе с отбоем. Считать в уме ничего не нужно.' },
      { title: 'В три ночи есть кого спросить', body: 'Коуч отвечает по вашему дневнику, а не общими фразами: что происходит с ночным сном, что поменять в ритуале, когда ждать переход на один сон.' },
    ],
  },
  guarantee: 'Платите один раз за выбранный срок: карта не сохраняется, ничего не продлевается и не списывается само. Когда срок закончится — просто оформите новый.',
  proof: {
    eyebrow: 'Отзывы',
    title: 'Что пишут родители — без правок.',
    translated: 'перевод',
    source: 'отзыв в App Store',
    parents: 'отзыв родителей',
  },
  plans: {
    eyebrow: 'Доступ',
    title: 'Выберите срок. Всё остальное одинаково.',
    body: 'В каждом тарифе — полная подписка: прогноз сна, коуч, аналитика и советы на день.',
    bestValue: 'Выгоднее всего',
    perWeek: (price) => `${price} в неделю`,
    cheaper: (pct) => `на ${pct}% дешевле недели`,
    pay: 'Оформить подписку',
    order: 'Заказать письмом',
    charged: (byn) => `списание ${byn}`,
    perDay: (price) => `${price} в день`,
    perMonth: (price) => `${price} в месяц`,
    yearSaving: (pct) => `на ${pct}% дешевле, чем 12 месяцев по отдельности`,
    footnote: 'Срок начинается с момента включения подписки на аккаунте.',
    acceptBefore: 'Оплачивая заказ, вы принимаете',
    offer: 'публичный договор',
    and: 'и',
    refundTerms: 'условия возврата',
  },
  account: {
    title: 'Аккаунт',
    signInApple: 'Войти через Apple',
    signInGoogle: 'Войти через Google',
    signedInAs: 'Вы вошли как',
    via: (provider) => `через ${provider}`,
    premiumUntil: (date) => `Подписка до ${date}`,
    noPremium: 'Подписка не активна',
    accountCode: 'Код аккаунта',
    copy: 'Скопировать',
    copied: 'Скопировано',
    signOut: 'Выйти',
    checking: 'Проверяем аккаунт…',
    notConfigured: 'Вход на сайте подключается. Пока заказ оформляется письмом.',
    popupBlocked: 'Браузер закрыл окно входа. Разрешите всплывающие окна для этого сайта и попробуйте снова.',
    signInError: 'Не удалось войти. Попробуйте ещё раз.',
    why: 'Войдите с тем же аккаунтом, что и в приложении: так подписка включится именно там.',
  },
  checkout: {
    creating: 'Создаём оплату…',
    redirecting: 'Переходим на страницу WebPay…',
    unavailable: 'Оплата картой на сайте пока не открыта — закажите письмом.',
    testOnly: 'Оплата на сайте сейчас открыта только тестировщикам — закажите письмом.',
    error: 'Не удалось создать оплату. Попробуйте ещё раз или напишите нам.',
    blocked: 'Оплата для этого аккаунта недоступна. Напишите нам.',
    rateLimited: 'Слишком много попыток. Подождите минуту и попробуйте снова.',
    manualHint: 'Если оплатить на сайте не получается, закажите письмом — укажите срок и код аккаунта.',
  },
  features: {
    eyebrow: 'Что входит',
    title: 'Четыре вещи, которых нет в бесплатной версии.',
    body: 'Дневник сна, кормлений и ухода бесплатен всегда. Подписка превращает записи в план на сегодня и ответы на ваши вопросы.',
    device: 'Для iPhone и iPad с iOS 18 и новее. Подписка привязана к аккаунту Yorix и работает на всех устройствах, где выполнен вход.',
    items: [
      { title: 'Персональный прогноз сна', body: 'Следующий дневной сон и отбой рассчитываются по реальным снам, окнам бодрствования и возрасту малыша и пересчитываются, когда день идёт не по плану.' },
      { title: 'ИИ-коуч по сну 24/7', body: 'Ответы на вопросы о коротких снах, ночных пробуждениях, переходах между снами и режиме — с учётом дневника вашего малыша.' },
      { title: 'Аналитика и тренды', body: 'Недельная картина сна, кормлений и ухода: как меняется ночной сон, сколько длятся окна бодрствования, что влияет на отбой.' },
      { title: 'Рекомендации на каждый день', body: 'Короткие подсказки на сегодня: когда начинать укладывание, как восстановиться после короткого сна, что поменять в ритуале.' },
    ],
  },
  steps: {
    eyebrow: 'Как это работает',
    title: 'Три шага — и подписка уже в приложении.',
    items: [
      { title: 'Войдите через Apple', body: 'С тем же Apple ID, которым вы входите в Yorix на iPhone, — так подписка включится именно на вашем аккаунте.' },
      { title: 'Оплатите картой', body: 'На защищённой странице WebPay. Данные карты видит только банк; мы их не получаем и не храним.' },
      { title: 'Откройте Yorix', body: 'Подписка уже включена. Письмо с датой окончания срока и чек придут на e-mail.' },
    ],
    manualTitle: 'Пока без входа через Apple? Оставьте заявку.',
    manualBody: 'Укажите почту и код аккаунта из приложения (Настройки → Аккаунт). В течение дня пришлём ссылку на оплату — до этого платить ничего не нужно. После оплаты включим подписку в течение 24 часов.',
    manualCode: 'Код аккаунта',
    copyAddress: 'Скопировать адрес',
    copyTemplate: 'Скопировать шаблон',
    writeToUs: 'Оставить заявку',
  },
  faq: {
    eyebrow: 'Вопросы',
    title: 'Частые вопросы об оплате.',
    items: [
      { q: 'У нас нет режима, сны хаотичные. Прогноз вообще сработает?', a: 'Да. Прогноз считается по вашим реальным снам и возрасту малыша, а не по таблице, — чем хаотичнее день, тем полезнее план, который пересчитывается после каждого записанного сна. Первые два-три дня просто ведите дневник: точность растёт с каждой записью.' },
      { q: 'Что будет, когда срок закончится?', a: 'Подписка отключится, а все записи о малыше останутся в приложении. Карта не привязывается, автоматических списаний нет. Продлить можно новым заказом — дни добавятся к текущему сроку.' },
      { q: 'Зачем входить через Apple?', a: 'Подписка привязывается к аккаунту Yorix, а не к телефону или карте. Вход с тем же Apple ID, что и в приложении, гарантирует, что оплата попадёт на ваш аккаунт и будет работать на всех ваших устройствах. Если вы вошли в приложение через Google — войдите через Google и здесь.' },
      { q: 'С какого момента считается срок?', a: 'С момента включения подписки на аккаунте: при оплате на сайте — сразу после оплаты, при заказе письмом — когда мы его включим. Дату окончания видно в блоке «Аккаунт» и в письме-подтверждении.' },
      { q: 'Как убедиться, что страница оплаты настоящая?', a: 'Страница оплаты открывается в домене webpay.by, а письма мы отправляем только с адреса, указанного в подвале сайта. Мы никогда не просим прислать данные карты в письме или мессенджере.' },
      { q: 'Какие карты принимаются?', a: 'Visa, Mastercard и Белкарт — через процессинговую систему WebPay. Цена указана в белорусских рублях; если счёт карты в другой валюте, сумму пересчитает ваш банк по своему курсу.' },
      { q: 'У меня уже есть подписка в App Store. Что делать?', a: 'Подписка, купленная на сайте, не отменяет подписку через App Store. Чтобы не платить дважды, отключите автопродление: «Настройки → ваше имя → Подписки». Подписка Apple будет работать до конца оплаченного периода, а срок с сайта добавится к нему.' },
      { q: 'Оплатил, а подписка не появилась. Что делать?', a: 'В приложении подписка отображается как Premium. Перезапустите приложение: оно проверяет аккаунт при каждом открытии. Если Premium не появился в течение часа, напишите нам — укажите дату и сумму оплаты. Проверьте также папку «Спам», если ждёте письмо от нас.' },
      { q: 'Как отменить подписку и можно ли вернуть деньги?', a: 'Отменять нечего: автопродления нет, и списаний после оплаты не будет. Оплаченный срок действует до конца и не возвращается — так же, как подписка в App Store. Если подписка не включилась, не работала по нашей вине или списание прошло ошибочно, напишите нам — вернём деньги на ту же карту.' },
      { q: 'Входят ли в подписку программы из раздела «Программы»?', a: 'Нет. Программы покупаются отдельно в приложении и в подписку не входят.' },
    ],
  },
  ret: {
    title: 'Спасибо за оплату!',
    checking: 'Проверяем оплату…',
    paid: (date) => `Подписка активна до ${date}`,
    openApp: 'Откройте Yorix на iPhone — подписка уже включена. Письмо с подтверждением и чек придут на e-mail.',
    pending: 'Платёж ещё обрабатывается. Обычно это занимает меньше минуты — страница обновится сама.',
    failed: 'Мы не нашли оплаченный заказ. Если деньги списаны, напишите нам — укажите дату и сумму оплаты.',
    signIn: 'Войдите, чтобы увидеть статус заказа.',
    back: 'К тарифам',
  },
  cancel: {
    title: 'Оплата отменена',
    body: 'Деньги не списаны. Вы можете вернуться к тарифам и попробовать снова в любой момент.',
    back: 'К тарифам',
  },
  footer: {
    seller: 'Продавец и контакты',
    requisites: 'Реквизиты продавца',
    documents: 'Документы',
    medical: 'Yorix помогает с режимом дня и не оказывает медицинских услуг.',
    rows: { seller: 'Продавец', status: 'Статус', unp: 'УНП', address: 'Адрес', register: 'Регистрация в Торговом реестре', email: 'E-mail', phone: 'Телефон', hours: 'Режим работы' },
  },
  docs: { offer: 'Публичный договор (оферта)', payment: 'Оплата, доставка и возврат', privacy: 'Политика обработки персональных данных' },
  legal: { eyebrow: 'Документы', updated: (date) => `Редакция от ${date}`, binding: '' },
  home: {
    nav: 'Подписка',
    eyebrow: 'Подписка, если App Store недоступен',
    title: 'Знайте, когда малышу пора спать, — раньше, чем начнутся капризы.',
    body: 'Прогноз следующего сна по дневнику вашего малыша, коуч, который знает ваш день, и план, который пересчитывается сам. Доступ на неделю, месяц или год: разовая оплата картой, без автопродления.',
    note: 'Платите один раз за выбранный срок: карта не сохраняется, ничего не продлевается и не списывается само.',
    details: 'Условия, возврат и реквизиты продавца',
  },
  currency: {
    label: 'Валюта',
    note: 'Оплата проходит в BYN, банк карты пересчитает по своему курсу',
    names: { BYN: 'Белорусский рубль', RUB: 'Российский рубль', EUR: 'Евро', USD: 'Доллар США' },
  },
  request: {
    title: 'Оформить подписку',
    body: 'Оставьте e-mail — пришлём ссылку на защищённую оплату WebPay. После оплаты включим подписку на вашем аккаунте.',
    plan: 'Срок',
    email: 'E-mail',
    code: 'Код аккаунта',
    optional: '(если уже установили приложение)',
    codeHint: 'В приложении: Настройки → Аккаунт → «Код аккаунта». Без него включим подписку по e-mail входа.',
    submit: 'Получить ссылку на оплату',
    cancel: 'Отмена',
    consent: 'Нажимая кнопку, вы соглашаетесь с обработкой e-mail для оформления заказа.',
    sentTitle: 'Заявка принята',
    sentBody: 'Ссылка на оплату придёт на ваш e-mail в течение рабочего дня, обычно быстрее. Проверьте папку «Спам», если письма долго нет.',
    close: 'Понятно',
    error: 'Не удалось отправить заявку.',
    errorMail: 'Написать письмом',
  },
};

const en: PremiumCopy = {
  meta: {
    title: 'Yorix subscription — plans and card payment',
    description:
      'A Yorix subscription for a week, a month or a year: a personal sleep forecast, the AI coach and analytics. Prices in Belarusian rubles, card payment via WebPay.',
    ogLocale: 'en_US',
  },
  nav: { plans: 'Plans', howToBuy: 'How to buy', payment: 'Payment & refunds', contacts: 'Contacts', choosePlan: 'Choose a plan', language: 'Language' },
  hero: {
    badge: 'Yorix subscription · a week, a month or a year',
    title: "Know when your baby's next sleep is due — before the fussing starts.",
    body: "Yorix computes the next nap window and bedtime from your baby's diary and re-plans when the day drifts. Alongside: a sleep coach that knows your diary, any hour of the night.",
    primary: (price) => `Subscribe from ${price}`,
    oneOff: 'One payment, no auto-renewal',
    nextLive: "Sign in with Apple → card on WebPay's secure page → the subscription switches on in the app right away. No charges later.",
    nextRequest: "Leave your e-mail — within a day we send a payment link. Nothing to pay until then.",
  },
  outcomes: {
    eyebrow: 'What changes tonight',
    title: 'Three things the subscription does for you.',
    items: [
      { title: 'You see when to start winding down', body: "Before overtiredness, not after. The sleep window comes from your baby's real naps and age, not a chart off the internet." },
      { title: 'A nap slipped by an hour? The plan re-planned itself', body: 'One short nap and the whole day shifts, bedtime included. Nothing to recalculate in your head.' },
      { title: "At 3 a.m. there's someone to ask", body: "The coach answers from your diary, not in generic phrases: what is happening with night sleep, what to change in the ritual, when to expect the one-nap switch." },
    ],
  },
  guarantee: 'Pay once for the period you choose: no card on file, nothing renews or gets charged by itself. When the period ends, simply order a new one.',
  proof: {
    eyebrow: 'Reviews',
    title: 'What parents write — unedited.',
    translated: 'translated',
    source: 'App Store review',
    parents: 'parent feedback',
  },
  plans: {
    eyebrow: 'Access',
    title: 'Pick the length. Everything else is the same.',
    body: 'Every plan is the full subscription: sleep forecast, coach, analytics and daily advice.',
    bestValue: 'Best value',
    perWeek: (price) => `${price} a week`,
    cheaper: (pct) => `${pct}% less than weekly`,
    pay: 'Subscribe',
    order: 'Order by e-mail',
    charged: (byn) => `charged ${byn}`,
    perDay: (price) => `${price} a day`,
    perMonth: (price) => `${price} a month`,
    yearSaving: (pct) => `${pct}% less than 12 separate months`,
    footnote: 'The period starts when the subscription is switched on for the account.',
    acceptBefore: 'By paying you accept the',
    offer: 'public offer',
    and: 'and the',
    refundTerms: 'refund terms',
  },
  account: {
    title: 'Account',
    signInApple: 'Sign in with Apple',
    signInGoogle: 'Sign in with Google',
    signedInAs: 'Signed in as',
    via: (provider) => `via ${provider}`,
    premiumUntil: (date) => `Subscription until ${date}`,
    noPremium: 'No active subscription',
    accountCode: 'Account code',
    copy: 'Copy',
    copied: 'Copied',
    signOut: 'Sign out',
    checking: 'Checking your account…',
    notConfigured: 'Sign-in on the site is being connected. For now, order by e-mail.',
    popupBlocked: 'The browser closed the sign-in window. Allow pop-ups for this site and try again.',
    signInError: 'Sign-in failed. Please try again.',
    why: 'Sign in with the account you use in the app, so the subscription switches on right there.',
  },
  checkout: {
    creating: 'Creating your payment…',
    redirecting: 'Taking you to the WebPay page…',
    unavailable: 'Card payment on the site is not open yet — order by e-mail.',
    testOnly: 'Card payment on the site is currently open to testers only — order by e-mail.',
    error: 'Could not create the payment. Try again or write to us.',
    blocked: 'Payment is unavailable for this account. Please write to us.',
    rateLimited: 'Too many attempts. Wait a minute and try again.',
    manualHint: 'If paying on the site does not work, order by e-mail — state the period and your account code.',
  },
  features: {
    eyebrow: "What's included",
    title: 'Four things the free app does not have.',
    body: 'The sleep, feeding and care diary is free forever. The subscription turns the entries into a plan for today and answers to your questions.',
    device: 'For iPhone and iPad on iOS 18 or later. The subscription is tied to your Yorix account and works on every device where you are signed in.',
    items: [
      { title: 'Personal sleep forecast', body: 'The next nap and bedtime are computed from real naps, wake windows and your baby’s age, and recomputed when the day goes off plan.' },
      { title: '24/7 AI sleep coach', body: 'Answers about short naps, night wakings, nap transitions and routine — informed by your baby’s diary.' },
      { title: 'Analytics and trends', body: 'A weekly picture of sleep, feeding and care: how night sleep changes, how long wake windows last, what affects bedtime.' },
      { title: 'Daily recommendations', body: 'Short tips for today: when to start winding down, how to recover after a short nap, what to change in the ritual.' },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Three steps and the subscription is in the app.',
    items: [
      { title: 'Sign in with Apple', body: 'With the same Apple ID you use in Yorix on your iPhone — so the subscription lands on your own account.' },
      { title: 'Pay by card', body: "On WebPay's secure page. Only the bank sees the card; we never receive or store it." },
      { title: 'Open Yorix', body: 'The subscription is already on. A confirmation with the end date and a receipt arrive by e-mail.' },
    ],
    manualTitle: 'No Apple sign-in yet? Leave a request.',
    manualBody: 'Give your e-mail and the account code from the app (Settings → Account). Within a day we send a payment link — nothing to pay until then. After payment we switch the subscription on within 24 hours.',
    manualCode: 'Account code',
    copyAddress: 'Copy address',
    copyTemplate: 'Copy template',
    writeToUs: 'Leave a request',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions about payment.',
    items: [
      { q: 'We have no routine and naps are chaotic. Will the forecast even work?', a: "Yes. The forecast comes from your baby's real naps and age, not a chart — the more chaotic the day, the more useful a plan that re-plans after every logged nap. Just keep the diary for the first two or three days: accuracy grows with every entry." },
      { q: 'What happens when the period ends?', a: 'The subscription switches off and every record about your baby stays in the app. No card is stored and nothing is charged automatically. To extend, place a new order — the days are added to the current period.' },
      { q: 'Why sign in with Apple?', a: 'The subscription is tied to your Yorix account, not to a phone or a card. Signing in with the same Apple ID as in the app guarantees the payment lands on your account and works on all your devices. If you signed in to the app with Google, sign in with Google here as well.' },
      { q: 'When does the period start?', a: 'When the subscription is switched on for the account: immediately after paying on the site, or when we switch it on for an e-mail order. The end date is shown in the “Account” block and in the confirmation e-mail.' },
      { q: 'How do I know the payment page is genuine?', a: 'The payment page opens on the webpay.by domain, and our e-mails come only from the address in the site footer. We never ask for card details by e-mail or messenger.' },
      { q: 'Which cards are accepted?', a: 'Visa, Mastercard and Belkart, through the WebPay processing system. The price is in Belarusian rubles; if your card is in another currency, your bank converts the amount at its own rate.' },
      { q: 'I already have an App Store subscription. What now?', a: 'A subscription bought on the site does not cancel the App Store one. To avoid paying twice, turn off auto-renewal: Settings → your name → Subscriptions. The Apple subscription runs until the end of the paid period, and the site period is added after it.' },
      { q: 'I paid but the subscription did not appear. What should I do?', a: 'In the app the subscription is shown as Premium. Restart the app: it checks the account every time it opens. If Premium is still missing after an hour, write to us with the date and amount of the payment. Check the spam folder too if you are waiting for our e-mail.' },
      { q: 'How do I cancel, and can I get a refund?', a: 'There is nothing to cancel: no auto-renewal, no charges after the payment. The paid period runs to its end and is not refunded — the same as an App Store subscription. If the subscription did not switch on, did not work through our fault, or you were charged by mistake, write to us and we refund to the same card.' },
      { q: 'Are the programs from the “Programs” section included?', a: 'No. Programs are bought separately in the app and are not part of the subscription.' },
    ],
  },
  ret: {
    title: 'Thank you for your payment!',
    checking: 'Checking the payment…',
    paid: (date) => `Subscription active until ${date}`,
    openApp: 'Open Yorix on your iPhone — the subscription is already on. A confirmation and receipt will arrive by e-mail.',
    pending: 'The payment is still being processed. It usually takes under a minute — this page refreshes by itself.',
    failed: 'We could not find a paid order. If money was charged, write to us with the date and amount.',
    signIn: 'Sign in to see the order status.',
    back: 'Back to plans',
  },
  cancel: {
    title: 'Payment cancelled',
    body: 'Nothing was charged. You can go back to the plans and try again any time.',
    back: 'Back to plans',
  },
  footer: {
    seller: 'Seller and contacts',
    requisites: 'Seller details',
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
    eyebrow: 'A subscription when the App Store is not an option',
    title: "Know when your baby's next sleep is due — before the fussing starts.",
    body: "A next-nap forecast from your baby's diary, a coach that knows your day, and a plan that re-plans itself. A week, a month or a year: one card payment, no auto-renewal.",
    note: 'Pay once for the period you choose: no card on file, nothing renews or gets charged by itself.',
    details: 'Terms, refunds and seller details',
  },
  currency: {
    label: 'Currency',
    note: 'The card is charged in BYN; your bank converts at its own rate',
    names: { BYN: 'Belarusian ruble', RUB: 'Russian ruble', EUR: 'Euro', USD: 'US dollar' },
  },
  request: {
    title: 'Subscribe',
    body: 'Leave your e-mail — we send a secure WebPay payment link. After payment we switch the subscription on for your account.',
    plan: 'Period',
    email: 'E-mail',
    code: 'Account code',
    optional: '(if you already have the app)',
    codeHint: 'In the app: Settings → Account → “Account code”. Without it we match the subscription to the sign-in e-mail.',
    submit: 'Send me the payment link',
    cancel: 'Cancel',
    consent: 'By pressing the button you agree to the processing of your e-mail for this order.',
    sentTitle: 'Request received',
    sentBody: 'The payment link arrives by e-mail within one working day, usually sooner. Check the spam folder if it takes long.',
    close: 'Got it',
    error: 'The request could not be sent.',
    errorMail: 'Write by e-mail instead',
  },
};

export const premiumCopy: Record<Lang, PremiumCopy> = { ru, en };
