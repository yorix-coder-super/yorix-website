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
  };
  account: { signInApple: string; popupBlocked: string; signInError: string };
  checkout: {
    signingIn: string;
    creating: string;
    redirecting: string;
    unavailable: string;
    testOnly: string;
    error: string;
    blocked: string;
    rateLimited: string;
  };
  faq: { title: string; items: { q: string; a: string }[]; more: string };
  ret: {
    checking: string; paid: (date: string) => string; paidLead: string; openApp: string;
    pending: string; failed: string; signIn: string; back: string; badgeTop: string; scan: string;
    badge: string; badgeGift: string; thanks: string; qrTitle: string; qrHint: string;
    features: { title: string; sub: string }[];
    helpTitle: string; helpBody: string; helpCta: string;
    noteTop: string; noteThanks: string;
  };
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
  docs: { offer: string; payment: string; terms: string; privacy: string };
  legal: { eyebrow: string; updated: (date: string) => string; binding: string };
  home: { nav: string; eyebrow: string; title: string; body: string; more: string };
  currency: { note: (amounts: string) => string };
  gift: {
    nav: string;
    eyebrow: string;
    title: string;
    body: string;
    steps: [string, string, string];
    plan: string;
    to: string;
    toPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    cardFor: (name: string) => string;
    cardPlan: (period: string) => string;
    note: string;
    pay: (price: string) => string;
    paidTitle: string;
    paidLead: string;
    paidBody: string;
    shareTitle: string;
    shareSteps: [string, string, string];
    link: string;
    code: string;
    copyLink: string;
    copyCode: string;
    copied: string;
    redeemOnSite: [string, string];
    redeemOnSiteLink: string;
    haveCode: string;
    validUntil: (date: string) => string;
    redeemTitle: string;
    redeemBody: string;
    redeem: string;
    redeemAccept: [string, string, string];
    redeemed: (date: string) => string;
    openApp: string;
    download: string;
    loading: string;
    errors: { notFound: string; redeemed: string; expired: string; cancelled: string; replaced: string; typo: string; locked: string; rateLimited: string; error: string };
    alreadySubscribed: { summary: string; web: string; store: (date: string) => string };
    popupHint: string;
    enterCode: string;
    entryTitle: string;
    entryBody: string;
    entryLabel: string;
    entryGo: string;
    entryShort: string;
    entryHint: string;
    status: { active: (date: string) => string; redeemed: (date: string) => string; cancelled: string; expired: string; replaced: string };
    safety: [string, string, string];
    replace: string;
    replaceConfirm: string;
    replaceDone: string;
    cardDownload: string;
    cardError: string;
    cardScan: string;
    cardOr: (site: string) => string;
    shareText: (period: string) => string;
    listTitle: string;
    shareCard: string;
    cardContact: string;
    scamNote: string;
    ownGiftConfirm: string;
    ownGiftTitle: string;
    ownGiftKeep: string;
    ownGiftGoOn: string;
    lostKey: string;
  };
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
    description: 'Прогноз сна, коуч 24/7 и аналитика на неделю, месяц или год. Одна оплата картой, без автопродления.',
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
  },
  account: {
    signInApple: 'Войти через Apple',
    popupBlocked: 'Браузер закрыл окно входа. Разрешите всплывающие окна и нажмите ещё раз.',
    signInError: 'Войти не удалось. Попробуйте ещё раз.',
  },
  checkout: {
    signingIn: 'Открываем вход через Apple…',
    creating: 'Создаём оплату…',
    redirecting: 'Переходим к оплате…',
    unavailable: 'Оплата картой на сайте скоро откроется.',
    testOnly: 'Оплата картой пока открыта только для тестирования.',
    error: 'Не получилось создать оплату. Попробуйте ещё раз через минуту.',
    blocked: 'Для этого аккаунта оплата недоступна. Напишите нам через форму на странице поддержки.',
    rateLimited: 'Слишком много попыток. Подождите минуту.',
  },
  faq: {
    title: 'Вопросы',
    items: [
      {
        q: 'Что будет, когда срок закончится?',
        a: 'Ничего не спишется: карту мы не храним, автопродления нет. Выключатся только платные функции — прогноз сна, ИИ-коуч и аналитика, а дневник останется с вами. Чтобы продолжить, [выберите срок](/ru/subscription#plans) заново: остаток прежнего прибавится к новому.',
      },
      {
        q: 'Зачем входить через Apple?',
        a: 'Чтобы подписка включилась в приложении сама: войдите тем же аккаунтом Apple, что и в Yorix, и после оплаты всё уже работает, без кодов. Ни пароля, ни анкеты, а с «Скрыть e-mail» мы не увидим даже ваш адрес.',
      },
      {
        q: 'Можно ли вернуть деньги?',
        a: 'Да. Подписка не включилась, работала с перебоями по нашей вине или списалась по ошибке — вернём всю сумму; просто передумали — вернём неиспользованные дни за вычетом подтверждённых расходов. [Напишите нам](/ru/support#contact) и укажите номер заказа: деньги придут на ту же карту в течение 10 дней, а если причина в недостатке — 7 дней. Условия целиком — в [разделе 7 договора](/ru/subscription/offer#refunds).',
      },
      {
        q: 'У меня уже есть подписка в App Store.',
        a: 'Две подписки не складываются: срок с сайта начинает идти сразу и пойдёт параллельно с подпиской Apple. Сначала отключите автопродление (Настройки → ваше имя → Подписки → Yorix) и дождитесь конца оплаченного периода. Не хочется ждать — [купите подарок себе](/ru/subscription/gift): код действует 12 месяцев, активируете его в нужный день.',
      },
      {
        q: 'Мне подарили подписку — что делать?',
        a: 'Откройте присланную ссылку или [введите код с открытки](/ru/gift), нажмите «Активировать с Apple» и войдите тем же аккаунтом, что и в приложении, — подписка включится сразу. Код действует 12 месяцев и срабатывает один раз.',
      },
      {
        q: 'Хочу подарить подписку.',
        a: '[Оформите подарок](/ru/subscription/gift): месяц или год, имя и пожелание, оплата картой. Аккаунт не нужен, купить можно даже с Android. Сразу после оплаты получите ссылку, код и открытку с QR-кодом — для мессенджера или печати. Пока подарок не активирован, код можно заменить, а сам подарок — отменить с возвратом денег.',
      },
    ],
    more: 'Другой вопрос? Напишите нам',
  },
  ret: {
    checking: 'Проверяем оплату…',
    paid: (date) => `Подписка включена до ${date}`,
    openApp: 'Откройте Yorix на iPhone в том же аккаунте Apple — подписка уже там.',
    pending: 'Банк подтверждает оплату — обычно меньше минуты. Страница обновится сама.',
    failed: 'Оплаченный заказ не найден. Если деньги списаны, напишите нам — дату и сумму.',
    signIn: 'Войдите через Apple, чтобы увидеть статус заказа.',
    back: 'К тарифам',
    badgeTop: 'Загрузите в',
    scan: 'Наведите камеру телефона на код, чтобы открыть Yorix в App Store',
    badge: 'Оплачено',
    badgeGift: 'Подарок активирован',
    thanks: 'Спасибо, что выбрали Yorix',
    paidLead: 'Подписка действует до',
    qrTitle: 'Открыть по QR-коду',
    qrHint: 'Наведите камеру iPhone',
    features: [
      { title: 'Прогнозы сна', sub: 'уже доступны' },
      { title: 'Вся аналитика', sub: 'без ограничений' },
      { title: 'ИИ-коуч 24/7', sub: 'рядом с вами' },
      { title: 'Экспертные гайды', sub: 'и рекомендации' },
    ],
    helpTitle: 'Нужна помощь?',
    helpBody: 'Мы всегда на связи и поможем, если что-то не работает.',
    helpCta: 'Перейти в поддержку',
    noteTop: 'Спокойные ночи — счастливые дни',
    noteThanks: 'Хороших вам ночей!',
  },
  cancel: { title: 'Оплата отменена', body: 'Деньги не списаны. Вернуться можно в любой момент.', back: 'К тарифам' },
  footer: {
    seller: 'Продавец',
    tagline: 'Дневник, прогноз сна и коуч для родителей малышей.',
    subscription: 'Подписка',
    requisites: 'Реквизиты в оферте',
    documents: 'Документы',
    medical: 'Yorix помогает с детской рутиной и не оказывает медицинской помощи.',
    rows: { seller: 'Продавец', status: 'Статус', unp: 'УНП', address: 'Адрес', register: 'Регистрация в Торговом реестре', email: 'E-mail', phone: 'Телефон', hours: 'Режим работы' },
  },
  docs: { offer: 'Публичный договор (оферта)', payment: 'Оплата, доставка и возврат', terms: 'Условия использования', privacy: 'Политика обработки персональных данных' },
  legal: { eyebrow: 'Документы', updated: (date) => `Редакция от ${date}`, binding: '' },
  home: {
    nav: 'Подписка',
    eyebrow: 'Подписка картой — если App Store недоступен',
    title: 'Полная подписка Yorix — картой, без App Store.',
    body: 'Прогноз следующего сна, коуч 24/7, аналитика и советы на день — на неделю, месяц или год.',
    more: 'Всё о подписке: условия, возврат, вопросы',
  },
  currency: { note: (amounts) => `Принимаем карты «Мир». Оплата проходит в белорусских рублях: ${amounts}. Банк карты пересчитает по своему курсу.` },
  gift: {
    nav: 'Подарок',
    eyebrow: 'Подписка в подарок',
    title: 'Подарите спокойные ночи',
    body: 'Подписка Yorix на месяц или год — подарок молодым родителям: прогноз сна, ИИ-коуч и аналитика дневника с первого дня.',
    steps: ['Выберите срок и подпишите открытку', 'Оплатите картой — сразу получите ссылку, код и открытку', 'Получатель откроет ссылку или введёт код, войдёт через Apple — и подписка включится'],
    plan: 'Срок',
    to: 'Кому',
    toPlaceholder: 'Например, Маше и Саше',
    message: 'Пожелание',
    messagePlaceholder: 'Спокойных ночей и сладких снов!',
    // A Russian card dedication is in the dative, without «для»: «Маше и Саше».
    cardFor: (name) => name,
    cardPlan: (period) => `Подписка Yorix ${period}`,
    note: 'Аккаунт не нужен: сразу после оплаты получите ссылку, код и открытку с QR. Получателю понадобится iPhone или iPad.',
    pay: (price) => `Оплатить подарок · ${price}`,
    paidTitle: 'Спасибо! Подарок готов',
    paidLead: 'Вы дарите спокойные ночи — это дорогого стоит. Осталось передать открытку, дальше всё сделаем мы.',
    shareTitle: 'Как подарить',
    shareSteps: [
      'Отправьте открытку или ссылку получателю — в мессенджер, почтой или распечатайте.',
      'Он перейдёт по ссылке или введёт код на сайте.',
      'Вход через Apple — и подписка включится сама.',
    ],
    paidBody: 'Отправьте ссылку получателю или подарите открытку с кодом. Подписка включится, когда получатель откроет ссылку или введёт код и войдёт через Apple.',
    link: 'Ссылка на подарок',
    code: 'Код подарка',
    copyLink: 'Скопировать ссылку',
    copyCode: 'Скопировать код',
    copied: 'Скопировано',
    redeemOnSite: ['Код можно ввести на ', ' — там же, что и на открытке.'],
    redeemOnSiteLink: 'странице активации подарка',
    haveCode: 'У меня есть код',
    validUntil: (date) => `Код действует до ${date}`,
    redeemTitle: 'Вам подарили подписку Yorix',
    redeemBody: 'Подписка уже ваша — остался один шаг. Войдите через Apple тем же аккаунтом, что и в приложении: на него она и встанет.',
    redeem: 'Активировать через Apple',
    redeemAccept: ['Активируя подарок, вы принимаете ', 'условия использования', '.'],
    redeemed: (date) => `Готово! Подписка действует до ${date}`,
    openApp: 'Откройте Yorix на iPhone в том же аккаунте Apple — функции подписки уже доступны.',
    download: 'Скачать Yorix',
    loading: 'Открываем подарок…',
    errors: {
      notFound: 'Такого подарка нет. Проверьте ссылку или код.',
      redeemed: 'Этот подарок уже активирован.',
      expired: 'Срок действия подарка истёк.',
      cancelled: 'Подарок отменён.',
      replaced: 'Эта ссылка больше не действует: код заменили на новый. Попросите новую ссылку у того, кто подарил.',
      typo: 'Похоже, в коде опечатка — сверьте его с открыткой или сообщением.',
      locked: 'Слишком много неверных кодов: активация для этого аккаунта приостановлена на сутки. Попробуйте завтра или напишите нам.',
      rateLimited: 'Слишком много попыток подряд. Подождите минуту и попробуйте снова.',
      error: 'Не получилось активировать подарок. Попробуйте ещё раз через минуту.',
    },
    alreadySubscribed: {
      summary: 'У меня уже есть подписка',
      web: 'Если подписка оплачена на сайте, дни подарка просто добавятся к ней.',
      store: (date) =>
        `Если подписка оформлена в App Store, подарок пойдёт параллельно и вы заплатите дважды за одни и те же дни. Выгоднее отключить автопродление и активировать подарок, когда она закончится: код действует до ${date}`,
    },
    popupHint: 'Окно входа не открылось? Откройте эту страницу в Safari или другом браузере — ссылка та же.',
    enterCode: 'Ввести код вручную',
    entryTitle: 'Активировать подарок',
    entryBody: 'Введите код с открытки или из сообщения, затем войдите через Apple тем же аккаунтом, что и в приложении Yorix, — подписка включится сразу.',
    entryLabel: 'Код подарка',
    entryGo: 'Продолжить',
    entryShort: 'В коде 12 символов — проверьте, всё ли введено.',
    entryHint: 'Путать O и 0, I и 1 не страшно — прочитаем правильно. Можно вставить и ссылку на подарок целиком.',
    status: {
      active: (date) => `Ждёт активации · до ${date}`,
      redeemed: (date) => `Активирован ${date}`,
      cancelled: 'Отменён',
      expired: 'Срок действия истёк',
      replaced: 'Код заменён',
    },
    safety: [
      'Активировать подарок может любой, у кого есть ссылка или код, — отправляйте их только получателю. Если ссылка ушла не туда или подарок больше не нужен, в первые 6 месяцев после оплаты и до активации его можно отменить с полным возвратом — ',
      'напишите нам',
      '.',
    ],
    replace: 'Заменить код',
    replaceConfirm: 'Заменить код? Старая ссылка и код сразу перестанут работать — получателю нужно будет отправить новые.',
    replaceDone: 'Готово: код заменён. Отправьте получателю новую ссылку.',
    cardDownload: 'Скачать открытку',
    cardError: 'Не получилось собрать открытку. Попробуйте ещё раз или в другом браузере.',
    cardScan: 'Наведите камеру на QR-код',
    cardOr: (site) => `или введите код на ${site}`,
    shareText: (period) => `Подарок для вас — подписка Yorix ${period}. Откройте ссылку и войдите через Apple — подписка включится сама.`,
    listTitle: 'Ваши подарки',
    shareCard: 'Отправить открытку',
    cardContact: 'Открытка — без контактов: уберите ссылки, адреса сайтов, e-mail, @ники и номера телефонов.',
    scamNote: 'Мы никогда не просим звонить, платить или пересылать код — ни до активации, ни после.',
    ownGiftTitle: 'Это подарок, который вы купили',
    ownGiftKeep: 'Не активировать',
    ownGiftGoOn: 'Активировать на себя',
    ownGiftConfirm: 'Этот подарок куплен в этом браузере. Если активировать его на ваш аккаунт, у получателя ссылка перестанет работать. Активировать на себя?',
    lostKey: 'Если вы оплачивали подарок, откройте эту страницу в том же браузере, где платили, — или напишите нам и укажите номер заказа из чека.',
  },
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
    privacy: ['Данные аккаунта и заказа обрабатываем для исполнения договора — ', 'Политика обработки персональных данных', '. Данные карты вводятся только на странице платёжного сервиса.'],
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
    description: 'Sleep forecast, 24/7 coach and analytics for a week, a month or a year. One card payment, no auto-renewal.',
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
  },
  account: {
    signInApple: 'Sign in with Apple',
    popupBlocked: 'The browser closed the sign-in window. Allow pop-ups and press again.',
    signInError: 'Sign-in failed. Please try again.',
  },
  checkout: {
    signingIn: 'Opening Apple sign-in…',
    creating: 'Creating your payment…',
    redirecting: 'Taking you to the payment page…',
    unavailable: 'Card payment on the site opens soon.',
    testOnly: 'Card payment is open for testing only for now.',
    error: 'Couldn’t create the payment. Please try again in a minute.',
    blocked: 'Payment isn’t available for this account. Write to us through the form on the support page.',
    rateLimited: 'Too many attempts. Wait a minute.',
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What happens when the period ends?',
        a: 'Nothing is charged: we keep no card and there is no auto-renewal. Only the paid features switch off — the nap forecast, the AI coach and the analytics — and your diary stays with you. To carry on, [pick a period](/subscription#plans) again: whatever is left of the old one is added to it.',
      },
      {
        q: 'Why sign in with Apple?',
        a: 'So the subscription turns on in the app by itself: sign in with the same Apple account you use in Yorix and everything works right after payment, with no codes. No password, no form, and with «Hide My Email» we never even see your address.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes. If the subscription never switched on, worked badly through our fault or was charged by mistake, we refund everything; if you simply changed your mind, we refund the unused days less our documented costs. [Write to us](/support#contact) with the order number: the money returns to the same card within 10 days, or 7 when the reason is a defect. The full terms are in [section 7 of the offer](/subscription/offer#refunds).',
      },
      {
        q: 'I already have an App Store subscription.',
        a: 'The two do not add up: a period bought here starts at once and would run alongside the Apple one. Turn off auto-renewal first (Settings → your name → Subscriptions → Yorix) and let the paid period run out. Rather not wait? [Buy a gift for yourself](/subscription/gift): the code is good for 12 months and you redeem it on the day you need it.',
      },
      {
        q: 'Someone gave me a subscription — what now?',
        a: 'Open the link you were sent or [enter the code from the card](/gift), press «Redeem with Apple» and sign in with the same Apple account you use in the app — the subscription turns on at once. The code is valid for 12 months and works once.',
      },
      {
        q: 'I want to give a subscription as a gift.',
        a: '[Set up a gift](/subscription/gift): a month or a year, a name and a few words, payment by card. No account is needed, and you can buy it even from an Android phone. Right after payment you get the link, the code and a card with a QR code to send in a messenger or print. While the gift is unredeemed you can replace the code or cancel the gift and get the money back.',
      },
    ],
    more: 'Another question? Write to us',
  },
  ret: {
    checking: 'Checking the payment…',
    paid: (date) => `Subscription on until ${date}`,
    openApp: 'Open Yorix on your iPhone with the same Apple account — the subscription is already there.',
    pending: 'The bank is confirming the payment — usually under a minute. This page refreshes itself.',
    failed: 'No paid order found. If money was charged, write to us with the date and amount.',
    signIn: 'Sign in with Apple to see the order status.',
    back: 'Back to plans',
    badgeTop: 'Download on the',
    scan: 'Point your phone camera at the code to open Yorix in the App Store',
    badge: 'Paid',
    badgeGift: 'Gift redeemed',
    thanks: 'Thank you for choosing Yorix',
    paidLead: 'Your subscription runs until',
    qrTitle: 'Open with the QR code',
    qrHint: 'Point your iPhone camera at it',
    features: [
      { title: 'Sleep forecasts', sub: 'already on' },
      { title: 'All the analytics', sub: 'nothing held back' },
      { title: 'AI coach 24/7', sub: 'whenever you need it' },
      { title: 'Expert guides', sub: 'and recommendations' },
    ],
    helpTitle: 'Need a hand?',
    helpBody: 'We are here, and we will help if something does not work.',
    helpCta: 'Go to support',
    noteTop: 'Calm nights — happy days',
    noteThanks: 'Sleep well!',
  },
  cancel: { title: 'Payment cancelled', body: 'Nothing was charged. Come back any time.', back: 'Back to plans' },
  footer: {
    seller: 'Seller',
    tagline: 'Diary, sleep forecast and a coach for parents of little ones.',
    subscription: 'Subscription',
    requisites: 'Requisites in the offer',
    documents: 'Documents',
    medical: 'Yorix helps with your baby’s routine and does not provide medical care.',
    rows: { seller: 'Seller', status: 'Status', unp: 'Taxpayer number (УНП)', address: 'Address', register: 'Trade register', email: 'E-mail', phone: 'Phone', hours: 'Working hours' },
  },
  docs: { offer: 'Public offer agreement', payment: 'Payment, delivery and refunds', terms: 'Terms of use', privacy: 'Personal data policy' },
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
  gift: {
    nav: 'Gift',
    eyebrow: 'Gift a subscription',
    title: 'Give the gift of calm nights',
    body: 'A month or a year of Yorix for new parents: the sleep forecast, the AI coach and diary analytics from day one.',
    steps: ['Pick a period and sign the card', 'Pay by card — get the link, the code and a card to print right away', 'The recipient opens the link or enters the code, signs in with Apple — and the subscription turns on'],
    plan: 'Period',
    to: 'To',
    toPlaceholder: 'For example, Masha and Sasha',
    message: 'Message',
    messagePlaceholder: 'Calm nights and sweet dreams!',
    cardFor: (name) => `For ${name}`,
    cardPlan: (period) => `Yorix subscription ${period}`,
    note: 'No account needed: right after payment you get the link, the code and a card with a QR code. The recipient needs an iPhone or iPad.',
    pay: (price) => `Pay for the gift · ${price}`,
    paidTitle: 'Thank you! The gift is ready',
    paidLead: 'You are giving someone calm nights — that counts for a lot. Pass the card on; the rest is on us.',
    shareTitle: 'How to give it',
    shareSteps: [
      'Send the card or the link to whoever it is for — by message, by mail, or printed.',
      'They follow the link, or type the code on the site.',
      'They sign in with Apple — the subscription turns itself on.',
    ],
    paidBody: 'Send the link to the recipient or give them the card with the code. The subscription turns on once they open the link or enter the code and sign in with Apple.',
    link: 'Gift link',
    code: 'Gift code',
    copyLink: 'Copy link',
    copyCode: 'Copy code',
    copied: 'Copied',
    redeemOnSite: ['The code can be entered on the ', ' — the address the card carries.'],
    redeemOnSiteLink: 'gift activation page',
    haveCode: 'I have a code',
    validUntil: (date) => `The code is valid until ${date}.`,
    redeemTitle: 'Someone gave you a Yorix subscription',
    redeemBody: 'The subscription is yours — one step left. Sign in with Apple using the same account as in the app: that is where it lands.',
    redeem: 'Redeem with Apple',
    redeemAccept: ['By redeeming the gift you accept the ', 'terms of use', '.'],
    redeemed: (date) => `Done! Your subscription runs until ${date}`,
    openApp: 'Open Yorix on your iPhone with the same Apple account — the subscription features are already there.',
    download: 'Get Yorix',
    loading: 'Opening your gift…',
    errors: {
      notFound: 'There is no such gift. Check the link or the code.',
      redeemed: 'This gift has already been redeemed.',
      expired: 'This gift has expired.',
      cancelled: 'This gift was cancelled.',
      replaced: 'This link no longer works: the code was replaced with a new one. Ask the person who gave you the gift for the new link.',
      typo: 'The code seems to have a typo — check it against the card or the message.',
      locked: 'Too many wrong codes: redeeming is paused for this account for a day. Try again tomorrow or write to us.',
      rateLimited: 'Too many attempts in a row. Wait a minute and try again.',
      error: 'The gift could not be redeemed. Please try again in a minute.',
    },
    alreadySubscribed: {
      summary: 'I already have a subscription',
      web: 'If the subscription was paid for on this website, the gift simply adds its days to it.',
      store: (date) =>
        `If it was bought in the App Store, the gift would run alongside it and you would pay twice for the same days. Better to turn its renewal off and redeem the gift when it ends: the code is valid until ${date}.`,
    },
    popupHint: 'The sign-in window did not open? Open this page in Safari or another browser — the link stays the same.',
    enterCode: 'Enter the code by hand',
    entryTitle: 'Redeem a gift',
    entryBody: 'Enter the code from the card or the message, then sign in with Apple using the same account as in the Yorix app — the subscription turns on right away.',
    entryLabel: 'Gift code',
    entryGo: 'Continue',
    entryShort: 'The code has 12 characters — check that it is all there.',
    entryHint: 'O and 0, I and 1 are read the same way. You can also paste the whole gift link here.',
    status: {
      active: (date) => `Waiting to be redeemed · until ${date}`,
      redeemed: (date) => `Redeemed on ${date}`,
      cancelled: 'Cancelled',
      expired: 'Expired',
      replaced: 'Code replaced',
    },
    safety: [
      'Anyone who has the link or the code can redeem the gift — send them to the recipient only. If the link went to the wrong place, or the gift is no longer needed, it can be cancelled with a full refund within 6 months of payment, as long as it is unredeemed — ',
      'write to us',
      '.',
    ],
    replace: 'Replace the code',
    replaceConfirm: 'Replace the code? The old link and code stop working at once — you will need to send the new ones to the recipient.',
    replaceDone: 'Done: the code is replaced. Send the recipient the new link.',
    cardDownload: 'Download the card',
    cardError: 'The card could not be made. Try again or in another browser.',
    cardScan: 'Point your camera at the QR code',
    cardOr: (site) => `or enter the code at ${site}`,
    shareText: (period) => `A gift for you — a Yorix subscription ${period}. Open the link and sign in with Apple — the subscription turns on by itself.`,
    listTitle: 'Your gifts',
    shareCard: 'Send the card',
    cardContact: 'No contacts on the card: remove links, website addresses, e-mails, @handles and phone numbers.',
    scamNote: 'We never ask you to call, pay or pass a code on — not before redeeming, not after.',
    ownGiftTitle: 'This is the gift you bought',
    ownGiftKeep: 'Leave it for them',
    ownGiftGoOn: 'Redeem it anyway',
    ownGiftConfirm: 'This gift was bought in this browser. If you redeem it on your account, the link stops working for the recipient. Redeem it for yourself?',
    lostKey: 'If you paid for a gift, open this page in the browser you paid in — or write to us with the order number from your receipt.',
  },
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
    privacy: ['We process account and order data to perform the contract — see the ', 'personal data policy', '. Card details are entered only on the payment service’s page.'],
    required: 'Tick the box to accept the terms — payment is not available without it.',
    withApple: 'Continue with Apple',
    pay: (price) => `Continue to payment · ${price}`,
    next: 'Continue',
    cancel: 'Cancel',
  },
};

export const subscriptionCopy: Record<Lang, SubscriptionCopy> = { ru, en };
