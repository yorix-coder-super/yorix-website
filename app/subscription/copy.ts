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
    paidBody: string;
    link: string;
    code: string;
    copyLink: string;
    copied: string;
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
    alreadySubscribed: (date: string) => string;
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
    blocked: 'Для этого аккаунта оплата недоступна. Напишите нам через форму на странице поддержки.',
    rateLimited: 'Слишком много попыток. Подождите минуту.',
  },
  faq: {
    title: 'Вопросы',
    items: [
      {
        q: 'Что будет, когда срок закончится?',
        a: 'Ничего не спишется: карту мы не храним, автопродления нет. В день окончания выключатся только платные функции — прогноз следующего сна, ИИ-коуч, аналитика и советы на день. Всё, что вы записали, остаётся с вами: дневник снов, кормлений и ухода никуда не денется, им можно пользоваться и дальше. Чтобы продолжить, оформите любой срок заново — если что-то осталось от прежнего, новые дни добавятся к остатку.',
      },
      {
        q: 'Зачем входить через Apple?',
        a: 'Подписку нужно к чему-то привязать, иначе её некуда включить. Вход через Apple — самый короткий путь: ни пароля, ни анкеты, а если выбрать «Скрыть e-mail», мы даже не увидим ваш адрес. Дальше всё само: откройте Yorix на iPhone с тем же аккаунтом Apple — платные функции уже включены, никаких кодов вводить не нужно.',
      },
      {
        q: 'Можно ли вернуть деньги?',
        a: 'Да. Если подписка не включилась, работала с перебоями по нашей вине или деньги списались по ошибке — вернём всю сумму: напишите нам через форму на странице поддержки и укажите номер заказа. Если просто передумали, вернём стоимость неиспользованных дней за вычетом наших подтверждённых расходов. Деньги возвращаем на ту же карту: в течение 10 дней с даты требования, а если причина в недостатке — в течение 7 дней. Полные условия — в разделе 7 публичного договора.',
      },
      {
        q: 'У меня уже есть подписка в App Store.',
        a: 'Две подписки не складываются. Срок, купленный на сайте, начинает идти сразу после оплаты, то есть пойдёт параллельно с подпиской Apple, и часть дней пропадёт зря. Выгоднее сначала отключить автопродление (Настройки → ваше имя → Подписки → Yorix), дождаться конца оплаченного периода и только потом оформить срок здесь. Если ждать не хочется, купите подарок себе: код действует 12 месяцев, активируете его в нужный день.',
      },
      {
        q: 'Мне подарили подписку — что делать?',
        a: 'Откройте присланную ссылку или введите код с открытки на странице «Активировать подарок» — код из 12 символов, его можно вписать вручную или навести камеру на QR-код с открытки. Дальше нажмите «Активировать с Apple» и войдите тем же аккаунтом Apple, которым пользуетесь в приложении: подписка включится сразу, вводить что-то ещё не нужно. Код действует 12 месяцев с даты покупки и срабатывает один раз — после активации ссылка перестаёт работать, а срок появляется в приложении.',
      },
      {
        q: 'Хочу подарить подписку.',
        a: 'Откройте страницу «Подписка в подарок», выберите месяц или год, напишите, кому и что пожелать, и оплатите картой. Аккаунт для этого не нужен: подарок можно купить даже с Android, лишь бы у получателя был iPhone или iPad. Сразу после оплаты вы получите ссылку, код и готовую открытку с QR-кодом — отправьте её в мессенджер или распечатайте. Пока подарок не активирован, код можно заменить, если ссылка ушла не тому человеку, или отменить подарок и вернуть деньги.',
      },
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
    paidTitle: 'Подарок оплачен!',
    paidBody: 'Отправьте ссылку получателю или подарите открытку с кодом. Подписка включится, когда получатель откроет ссылку или введёт код и войдёт через Apple.',
    link: 'Ссылка на подарок',
    code: 'Код подарка',
    copyLink: 'Скопировать ссылку',
    copied: 'Скопировано',
    validUntil: (date) => `Код действует до ${date}`,
    redeemTitle: 'Вам подарили подписку Yorix',
    redeemBody: 'Войдите через Apple тем же аккаунтом, что и в приложении Yorix, — подписка включится сразу.',
    redeem: 'Активировать с Apple',
    redeemAccept: ['Активируя подарок, вы принимаете ', 'условия использования', '.'],
    redeemed: (date) => `Готово! Подписка действует до ${date}`,
    openApp: 'Откройте Yorix на iPhone тем же аккаунтом Apple — функции подписки уже доступны.',
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
    alreadySubscribed: (date) =>
      `Уже есть подписка? Если она оплачена на сайте, срок подарка добавится к ней. Если оформлена в App Store, подарок пойдёт параллельно — лучше отключить её продление и активировать подарок, когда она закончится: код действует до ${date}`,
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
      'Активировать подарок может любой, у кого есть ссылка или код, — отправляйте их только получателю. Если ссылка ушла не туда, замените код: старая ссылка сразу перестанет работать. До активации подарок можно отменить с полным возвратом — ',
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
    scamNote: 'Yorix никогда не просит звонить, платить или пересылать код, чтобы активировать подарок.',
    ownGiftConfirm: 'Этот подарок куплен в этом браузере. Если активировать его на ваш аккаунт, у получателя ссылка перестанет работать. Активировать на себя?',
    lostKey: 'Если вы оплачивали подарок, откройте эту страницу в том же браузере, где платили, — или напишите нам и укажите номер заказа из чека WEBPAY.',
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
    blocked: 'Payment isn’t available for this account. Write to us through the form on the support page.',
    rateLimited: 'Too many attempts. Wait a minute.',
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What happens when the period ends?',
        a: 'Nothing is charged: we keep no card and there is no auto-renewal. On the last day only the paid features switch off — the next-nap forecast, the AI coach, the analytics and the daily advice. Everything you wrote stays with you: the diary of sleep, feeds and care is still there to use. To carry on, buy any period again — whatever is left of the old one is added to it.',
      },
      {
        q: 'Why sign in with Apple?',
        a: 'A subscription has to belong to an account, otherwise there is nothing to switch on. Signing in with Apple is the shortest way there: no password, no form, and with «Hide My Email» we never even see your address. After that it happens by itself: open Yorix on your iPhone with the same Apple account and the paid features are already on — no codes to type.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes. If the subscription never switched on, worked badly through our fault or was charged by mistake, we refund everything — write to us through the form on the support page and give the order number. If you simply changed your mind, we refund the unused days less our documented costs. The money goes back to the same card within 10 days of the request, or within 7 days when the reason is a defect. The full terms are in section 7 of the public offer.',
      },
      {
        q: 'I already have an App Store subscription.',
        a: 'The two do not add up. A period bought here starts the moment you pay, so it would run alongside the Apple one and part of it would be wasted. It is better to turn off auto-renewal first (Settings → your name → Subscriptions → Yorix), let the paid period run out, and buy here after that. If you would rather not wait, buy a gift for yourself: the code is good for 12 months and you redeem it on the day you need it.',
      },
      {
        q: 'Someone gave me a subscription — what now?',
        a: 'Open the link you were sent, or enter the code from the card on the «Redeem a gift» page — it is 12 characters, and the card also carries a QR code you can simply point a camera at. Then press «Redeem with Apple» and sign in with the same Apple account you use in the app: the subscription turns on at once, with nothing else to type. The code is valid for 12 months from the purchase and works once — after that the link stops working and the period shows up in the app.',
      },
      {
        q: 'I want to give a subscription as a gift.',
        a: 'Open the «Gift a subscription» page, pick a month or a year, write who it is for and a few words, and pay by card. No account is needed: you can buy the gift from an Android phone as long as the recipient has an iPhone or iPad. Right after payment you get the link, the code and a ready-made card with a QR code — send it in a messenger or print it. While the gift is unredeemed you can replace the code if the link went to the wrong person, or cancel the gift and get the money back.',
      },
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
    paidTitle: 'Your gift is paid!',
    paidBody: 'Send the link to the recipient or give them the card with the code. The subscription turns on once they open the link or enter the code and sign in with Apple.',
    link: 'Gift link',
    code: 'Gift code',
    copyLink: 'Copy link',
    copied: 'Copied',
    validUntil: (date) => `The code is valid until ${date}.`,
    redeemTitle: 'Someone gave you a Yorix subscription',
    redeemBody: 'Sign in with Apple using the same account as in the Yorix app — the subscription turns on right away.',
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
    alreadySubscribed: (date) =>
      `Already subscribed? If you paid on the website, the gift adds to that period. If you subscribed in the App Store, the gift runs alongside it — better turn off its renewal and redeem the gift when it ends: the code is valid until ${date}.`,
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
      'Anyone who has the link or the code can redeem the gift — send them to the recipient only. If the link went to the wrong place, replace the code: the old link stops working at once. Until it is redeemed, the gift can be cancelled with a full refund — ',
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
    scamNote: 'Yorix never asks you to call, pay or pass on a code to redeem a gift.',
    ownGiftConfirm: 'This gift was bought in this browser. If you redeem it on your account, the link stops working for the recipient. Redeem it for yourself?',
    lostKey: 'If you paid for a gift, open this page in the browser you paid in — or write to us with the order number from the WEBPAY receipt.',
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
    privacy: ['We process account and order data to perform the contract — see the ', 'personal data policy', '. Card details are entered only on the WEBPAY page.'],
    required: 'Tick the box to accept the terms — payment is not available without it.',
    withApple: 'Continue with Apple',
    pay: (price) => `Continue to payment · ${price}`,
    next: 'Continue',
    cancel: 'Cancel',
  },
};

export const subscriptionCopy: Record<Lang, SubscriptionCopy> = { ru, en };
