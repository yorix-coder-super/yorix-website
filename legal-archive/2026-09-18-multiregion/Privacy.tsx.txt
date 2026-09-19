import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { merchant } from '../merchant';
import { LegalBody, type LegalSection } from './LegalBody';
import { SellerBlock, sellerLine } from './SellerBlock';
import { editionLabel } from './versions';

export const privacyTitle = { ru: 'Политика обработки персональных данных', en: 'Personal data policy' } as const;

type Ctx = { email: string; operator: string; offer: string };

// One policy for the site, the app and support. Every processor, data field
// and retention period below was checked against the app, the Worker and the
// site code on 18.09.2026 — change the text together with the code.
function ru({ email, operator, offer }: Ctx): LegalSection[] {
  return [
    {
      title: '1. Общие положения',
      blocks: [
        `1.1. Политика определяет, как ${operator} (далее — Оператор, «мы») обрабатывает персональные данные пользователей сайта yorix.website (далее — Сайт), мобильного приложения «Yorix» для iPhone и iPad (далее — Приложение), службы поддержки и связанных онлайн-сервисов (вместе — Сервис). Политика разработана в соответствии с Законом Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных» (далее — Закон № 99-З).`,
        '1.2. Политика объясняет, какие данные мы обрабатываем, зачем и на каком основании, кому их передаём, как долго храним и как вы можете реализовать свои права. Политика не является согласием и не требует «принятия». Если обработка основана на согласии, мы просим его отдельно, в момент, когда оно нужно, и вы можете его отозвать.',
        '1.3. Сервис предназначен для взрослых — родителей и других лиц, которые заботятся о ребёнке. Сведения о ребёнке вносит взрослый; дети Сервисом не пользуются, и мы не собираем данные непосредственно у детей.',
        '1.4. Термины «персональные данные», «специальные персональные данные» (в том числе сведения о здоровье), «обработка», «уполномоченное лицо» и «трансграничная передача» используются в значении Закона № 99-З.',
      ],
    },
    {
      title: '2. Где хранится дневник',
      blocks: [
        '2.1. Записи дневника — имя или прозвище ребёнка, дата рождения, пол; сон, кормления, подгузники, прогулки, рост и вес; сведения о здоровье (температура, симптомы, лекарства, прививки, самочувствие); заметки и фотографии — хранятся на вашем устройстве и синхронизируются через вашу частную базу данных iCloud (Apple CloudKit). **У Оператора нет доступа к этой базе, и мы не можем прочитать её содержимое.** Совместный доступ второго взрослого к дневнику предоставляется средствами iCloud по вашему приглашению.',
        '2.2. Прогнозы сна, план дня и аналитика дневника рассчитываются на вашем устройстве.',
        '2.3. Сведения из дневника попадают к Оператору только в случаях, описанных в разделе 3: когда вы пользуетесь ИИ-коучем, когда отправляете обращение из Приложения и в виде событий аналитики.',
      ],
    },
    {
      title: '3. Какие данные мы обрабатываем, зачем, на каком основании и сколько храним',
      blocks: [
        {
          table: {
            head: ['Цель', 'Данные', 'Основание', 'Срок хранения'],
            rows: [
              [
                'Вход и учётная запись',
                'Идентификатор аккаунта; адрес электронной почты, в том числе адрес-ретранслятор Apple «Скрыть e-mail»; имя, если его передали Apple или Google; способ входа',
                'Договор (абз. 15 ст. 6 Закона № 99-З)',
                'Пока существует аккаунт',
              ],
              [
                'Покупка подписки на Сайте, её активация и возвраты',
                'Код аккаунта, e-mail, тариф, цена и валюта, номер заказа, номер и статус операции WEBPAY, даты оплаты и срока доступа, язык',
                'Договор; обязанности по законодательству — учёт дохода и чеки (абз. 20 ст. 6)',
                '3 года после окончания срока доступа; документы учёта дохода — в сроки налогового законодательства',
              ],
              [
                'Покупки в App Store',
                'Сведения Apple о покупке: продукт, даты, статус, страна магазина. Платёжные данные мы не получаем',
                'Договор',
                'Пока существует аккаунт и 3 года после окончания подписки',
              ],
              [
                'ИИ-коуч и персональные подсказки',
                'Ваши сообщения и ответы Коуча; имя и возраст ребёнка; записи дневника и программ, нужные для ответа, в том числе сведения о здоровье; язык; идентификатор установки',
                'Согласие (ст. 5 и 8 Закона № 99-З); передача в США — с согласия после информирования о рисках (абз. 2 п. 1 ст. 9)',
                'На сервере — 30 дней после последнего сообщения в диалоге. История диалогов в Приложении хранится в вашем iCloud, пока вы её не удалите',
              ],
              [
                'Поддержка и обратная связь',
                'E-mail, текст обращения и вложения, модель устройства, версии iOS и Приложения. К обращению из Приложения прикладываются записи дневника за последние 7 дней и план дня',
                'Договор; для сведений о ребёнке — согласие',
                'На сервере — 90 дней; переписка — 3 года после закрытия обращения',
              ],
              [
                'Диагностика сбоев',
                'Отчёты о сбоях и зависаниях, модель устройства, версии iOS и Приложения, идентификатор установки',
                'Договор (обеспечение работоспособности)',
                '90 дней',
              ],
              [
                'Аналитика использования',
                'Псевдонимный идентификатор; модель устройства, версии iOS и Приложения, язык и страна; экраны и действия в Приложении, в том числе тип добавленной записи (например, «сон», «кормление», «симптом» и степень его выраженности) и возраст ребёнка в месяцах — без значений измерений, заметок и имени',
                'Согласие',
                'До 2 лет',
              ],
              [
                'Атрибуция рекламы',
                'События установки и запуска Приложения, регистрации, начала пробного периода и покупок; рекламный идентификатор устройства — только если вы разрешили отслеживание в системном запросе Apple',
                'Согласие',
                'До 2 лет',
              ],
              [
                'Прогноз погоды для программы «Одеваемся на улицу»',
                'Координаты, округлённые примерно до 1 км, язык, часовой пояс',
                'Договор',
                'Координаты не сохраняются; прогноз для района хранится на сервере 15 минут',
              ],
              [
                'Безопасность и защита от злоупотреблений',
                'IP-адрес, время запросов, идентификатор установки, ключ проверки подлинности Приложения (Apple App Attest)',
                'Договор',
                'IP-адрес — до 30 дней; ключ — пока используется установка Приложения',
              ],
              [
                'Работа Сайта',
                'Выбранный язык (cookie yorix-lang); данные входа в хранилище браузера (Firebase Authentication)',
                'Договор; технические данные, без которых Сайт не работает',
                'Cookie языка — 1 год; данные входа — до выхода из аккаунта',
              ],
              [
                'Ответы на запросы государственных органов, защита прав в споре',
                'Сведения, относящиеся к запросу или спору',
                'Обязанности по законодательству (абз. 20 ст. 6)',
                'На время рассмотрения и срок исковой давности',
              ],
            ],
          },
        },
        '3.1. Данные банковской карты вводятся только на платёжной странице WEBPAY. Мы их не получаем и не храним.',
        '3.2. **Мы не продаём персональные данные.** Сведения о здоровье ребёнка не используются для рекламы и не передаются рекламным сетям.',
        `3.3. Если вы не дадите согласие там, где оно нужно, будет недоступна только соответствующая функция: дневник, прогнозы и покупка подписки работают без ИИ-коуча, аналитики и атрибуции рекламы. Условия покупки описаны в [публичном договоре](${offer}).`,
      ],
    },
    {
      title: '4. Кому мы передаём данные',
      blocks: [
        '4.1. Мы передаём данные уполномоченным лицам только в объёме, нужном для цели, по договорам или их стандартным условиям обработки данных, и отвечаем перед вами за их действия (п. 3 ст. 7 Закона № 99-З).',
        {
          table: {
            head: ['Получатель', 'Страна', 'Какие данные', 'Зачем'],
            rows: [
              ['Apple Inc.', 'США', 'Вход через Apple; ваша частная база iCloud (у Оператора нет к ней доступа); покупки в App Store; координаты для прогноза погоды; проверка подлинности Приложения', 'Вход, хранение и синхронизация дневника, покупки, погода, защита'],
              ['Google LLC (Firebase)', 'США', 'Идентификатор аккаунта, e-mail, способ входа; события запуска, регистрации и покупок', 'Вход, аналитика'],
              ['Cloudflare, Inc.', 'США; серверы по всему миру', 'Данные, которые проходят через наш сервер: заказы, диалоги с Коучем, обращения, отчёты о сбоях', 'Размещение Сайта и сервера'],
              ['OpenAI', 'США', 'Сообщения Коучу и сводка из дневника', 'Ответы, проверка безопасности, подсказки'],
              ['DeepInfra', 'США', 'Сообщения Коучу и сводка из дневника', 'Ответы Коуча (модель DeepSeek, размещённая у DeepInfra)'],
              ['Mixpanel, Amplitude', 'США', 'События аналитики', 'Аналитика использования'],
              ['Adapty', 'США', 'Идентификатор пользователя, покупки в App Store, показы экрана подписки', 'Экран подписки и статистика покупок'],
              ['Meta Platforms', 'США, Ирландия', 'События установки, регистрации и покупок; рекламный идентификатор — с вашего разрешения', 'Атрибуция рекламы'],
              ['Resend', 'США', 'E-mail и текст писем', 'Отправка служебных писем'],
              ['Microsoft (Outlook.com)', 'США', 'Переписка с поддержкой', 'Почтовый ящик поддержки'],
              ['ООО «Вебпэй» и банк-эквайер', 'Беларусь', 'Данные заказа и платежа', 'Приём платежей и возвраты'],
            ],
          },
        },
        '4.2. Поставщики ИИ получают сообщения и сводку из дневника без вашего e-mail, платёжных данных и идентификатора аккаунта. По их условиям данные, переданные через API, не используются для обучения моделей: DeepInfra не сохраняет запросы, OpenAI хранит их не дольше 30 дней для контроля злоупотреблений.',
        '4.3. Сведения о расчётах (сумма, дата, наименование услуги) передаются в Министерство по налогам и сборам через приложение «Налог на профессиональный доход». Иным государственным органам данные предоставляются только в случаях, предусмотренных законодательством.',
      ],
    },
    {
      title: '5. Трансграничная передача',
      blocks: [
        '5.1. Большинство получателей находятся в США. США не входят в перечень государств, обеспечивающих надлежащий уровень защиты прав субъектов персональных данных (приказ Национального центра защиты персональных данных от 15.11.2021 № 14). Российская Федерация, государства Европейского союза и Великобритания в этот перечень входят.',
        '5.2. **Риски.** В государствах без надлежащего уровня защиты может не быть законодательства о персональных данных или уполномоченного органа по их защите, к персональным данным может относиться более узкий круг сведений, права субъектов могут быть ограничены, а органы власти могут получать доступ к данным.',
        '5.3. **Основания.** Данные для входа, покупок и поддержки передаются, потому что это необходимо для исполнения договора с вами (абз. 3 п. 1 ст. 9 Закона № 99-З). Данные ИИ-коуча, аналитики и атрибуции, а также сведения о здоровье ребёнка передаются с вашего согласия после информирования о рисках (абз. 2 п. 1 ст. 9).',
        '5.4. **Меры защиты.** Мы передаём минимум данных, шифруем их при передаче и выбираем поставщиков, принявших обязательства по защите данных (для данных из ЕС и Великобритании — стандартные договорные условия либо участие получателя в EU-U.S. Data Privacy Framework).',
      ],
    },
    {
      title: '6. Сведения о ребёнке и о здоровье',
      blocks: [
        '6.1. Вы вносите сведения о ребёнке как его законный представитель. Согласие на обработку данных ребёнка, в том числе сведений о здоровье, даёт один из законных представителей (ч. 2 п. 9 ст. 5 Закона № 99-З). Если вы не законный представитель, вносите такие сведения только с его согласия.',
        '6.2. Сведения о здоровье — специальные персональные данные. Мы обрабатываем их только для функций, которыми вы пользуетесь, и принимаем комплекс мер для их защиты (п. 3 ст. 8): минимизация, шифрование при передаче, доступ только у Оператора.',
      ],
    },
    {
      title: '7. ИИ-коуч',
      blocks: [
        '7.1. Когда вы задаёте вопрос, Приложение отправляет на наш сервер сообщение и сводку из дневника, нужную для ответа: имя и возраст ребёнка, недавние записи и, если они есть, сведения о здоровье и программах. Сервер передаёт их поставщику модели ИИ (раздел 4).',
        '7.2. Ответы формируются автоматически. Решений, порождающих для вас юридические последствия, Коуч не принимает.',
        '7.3. Пользоваться Коучем не обязательно: дневник и прогнозы работают без него. Если вы отзовёте согласие, Коуч станет недоступен.',
      ],
    },
    {
      title: '8. Cookie и хранилище браузера',
      blocks: [
        '8.1. Сайт не использует рекламные и аналитические cookie, пиксели и счётчики.',
        '8.2. Сайт использует только технические средства: cookie yorix-lang с выбранным языком и хранилище браузера, в котором Firebase Authentication хранит данные входа. Без них Сайт не работает, поэтому согласия на них не требуется. Вы можете удалить их в настройках браузера.',
      ],
    },
    {
      title: '9. Удаление данных',
      blocks: [
        '9.1. Вы можете удалить записи, историю Коуча и аккаунт в Приложении (Настройки → Аккаунт) или направить запрос на e-mail.',
        '9.2. После удаления аккаунта или отзыва согласия мы удаляем данные в течение 15 дней, кроме сведений, хранение которых обязательно по законодательству (например, о платежах). Из резервных копий данные удаляются не позднее 30 дней.',
        '9.3. Данные в вашей частной базе iCloud удаляете вы — в Приложении или в настройках iCloud.',
      ],
    },
    {
      title: '10. Ваши права',
      blocks: [
        {
          table: {
            head: ['Право', 'Срок ответа'],
            rows: [
              ['Отозвать согласие — в той же форме, в которой оно дано (в Приложении или по e-mail)', '15 дней'],
              ['Получить информацию об обработке своих данных', '5 рабочих дней, бесплатно'],
              ['Потребовать изменить неточные или устаревшие данные', '15 дней'],
              ['Получить информацию о предоставлении данных третьим лицам (раз в год бесплатно)', '15 дней'],
              ['Потребовать прекратить обработку и удалить данные', '15 дней'],
              ['Обжаловать действия Оператора в Национальный центр защиты персональных данных (cpd.by)', '—'],
            ],
          },
        },
        `10.1. Заявление подаётся в письменной форме или в виде электронного документа и содержит фамилию, имя, отчество, адрес места жительства (места пребывания), дату рождения, идентификационный номер (если он указывался при даче согласия), изложение сути требований и подпись (ст. 14 Закона № 99-З). Для удобства мы также рассматриваем в те же сроки запросы, отправленные на ${email} с адреса электронной почты вашего аккаунта, и можем попросить подтвердить, что запрос исходит от вас.`,
      ],
    },
    {
      title: '11. Защита данных',
      blocks: [
        '11.1. Мы шифруем данные при передаче (TLS), ограничиваем доступ к ним, используем двухфакторную аутентификацию служебных учётных записей и проверку подлинности Приложения, храним данные минимально необходимое время.',
        '11.2. О нарушении систем защиты мы уведомляем Национальный центр защиты персональных данных незамедлительно, но не позднее трёх рабочих дней, а вас — без неоправданной задержки, если нарушение может затронуть ваши права.',
      ],
    },
    {
      title: '12. Пользователям из других стран',
      blocks: [
        '**ЕС, ЕЭЗ и Великобритания.** Оператор — лицо, указанное в разделе 14. Правовые основания по GDPR и UK GDPR: исполнение договора (ст. 6(1)(b)) — вход, покупки, поддержка, диагностика; юридическая обязанность (ст. 6(1)(c)) — учёт дохода; законный интерес (ст. 6(1)(f)) — безопасность и защита прав в спорах; согласие (ст. 6(1)(a)) и явное согласие на данные о здоровье (ст. 9(2)(a)) — ИИ-коуч, сведения о ребёнке в обращениях, аналитика, атрибуция. Вы вправе получить доступ к данным, исправить, удалить их, ограничить обработку, получить их в переносимом формате, возразить против обработки на основании законного интереса, отозвать согласие и подать жалобу в надзорный орган по месту жительства. Мы отвечаем в течение месяца.',
        '**Российская Федерация.** Данные для покупки обрабатываются для исполнения договора (п. 5 ч. 1 ст. 6 Федерального закона «О персональных данных»), сведения о здоровье ребёнка — только с вашего согласия. На запрос о ваших данных мы отвечаем в течение 10 рабочих дней.',
        '**США.** Сведения о здоровье ребёнка, которые вы вносите, являются consumer health data по законам штатов Вашингтон, Невада и Коннектикут. Мы собираем их у вас для функций, описанных в разделе 3, передаём только получателям из раздела 4, не продаём и не используем для рекламы. Вы вправе узнать, какие данные мы получили и кому передали, удалить их и отозвать согласие; если мы отклоним запрос, напишите нам с темой «Appeal» — мы ответим в течение 45 дней. Сайт не отслеживает посетителей на сторонних сайтах, поэтому сигналы Do Not Track не меняют его работу.',
      ],
    },
    {
      title: '13. Изменения Политики',
      blocks: [
        '13.1. Новая редакция публикуется на этой странице с датой. О существенных изменениях мы сообщаем не менее чем за 30 дней по e-mail или в Приложении. Для новых целей обработки мы запрашиваем новое согласие.',
      ],
    },
  ];
}

function en({ email, operator, offer }: Ctx): LegalSection[] {
  return [
    {
      title: '1. General',
      blocks: [
        `1.1. This policy sets out how ${operator} (the “Operator”, “we”) processes the personal data of users of the yorix.website site (the “Website”), the Yorix mobile app for iPhone and iPad (the “App”), support and related online services (together, the “Service”). It follows the Law of the Republic of Belarus of 7 May 2021 No. 99-З “On personal data protection” (“Law 99-З”).`,
        '1.2. It explains what data we process, why and on what basis, who we share it with, how long we keep it and how you can exercise your rights. The policy is not consent and does not need to be “accepted”. Where processing relies on consent, we ask for it separately, when it is needed, and you can withdraw it.',
        '1.3. The Service is for adults — parents and others caring for a child. Information about the child is entered by an adult; children do not use the Service and we do not collect data directly from children.',
        '1.4. The terms “personal data”, “special personal data” (including health information), “processing”, “authorised person” and “cross-border transfer” have the meaning given in Law 99-З.',
      ],
    },
    {
      title: '2. Where the diary is kept',
      blocks: [
        '2.1. Diary records — the child’s name or nickname, date of birth, sex; sleep, feeds, diapers, walks, height and weight; health information (temperature, symptoms, medicines, vaccinations, wellbeing); notes and photos — are stored on your device and synced through your private iCloud database (Apple CloudKit). **The Operator has no access to that database and cannot read it.** Sharing the diary with a second adult works through iCloud at your invitation.',
        '2.2. Sleep forecasts, the day plan and diary analytics are calculated on your device.',
        '2.3. Diary information reaches the Operator only in the cases in section 3: when you use the AI coach, when you send a request from the App, and as analytics events.',
      ],
    },
    {
      title: '3. What we process, why, on what basis and for how long',
      blocks: [
        {
          table: {
            head: ['Purpose', 'Data', 'Basis', 'Retention'],
            rows: [
              [
                'Sign-in and account',
                'Account identifier; e-mail address, including Apple’s “Hide My Email” relay; name, if Apple or Google passed it; sign-in method',
                'Contract (Article 6, paragraph 15, Law 99-З)',
                'While the account exists',
              ],
              [
                'Buying a subscription on the Website, activating it and refunds',
                'Account code, e-mail, plan, price and currency, order number, WEBPAY transaction number and status, payment and access dates, language',
                'Contract; legal obligations — income accounting and receipts (Article 6, paragraph 20)',
                '3 years after the access period ends; income accounting documents — as required by tax law',
              ],
              [
                'App Store purchases',
                'Apple’s purchase details: product, dates, status, storefront country. We never receive payment details',
                'Contract',
                'While the account exists and 3 years after the subscription ends',
              ],
              [
                'AI coach and personal tips',
                'Your messages and the Coach’s answers; the child’s name and age; diary and program records needed for the answer, including health information; language; installation identifier',
                'Consent (Articles 5 and 8, Law 99-З); transfer to the US — with consent after being informed of the risks (Article 9(1), paragraph 2)',
                'On the server — 30 days after the last message in the conversation. Conversation history in the App stays in your iCloud until you delete it',
              ],
              [
                'Support and feedback',
                'E-mail, the text of the request and attachments, device model, iOS and App versions. Requests sent from the App include the diary records of the last 7 days and the day plan',
                'Contract; for information about the child — consent',
                'On the server — 90 days; correspondence — 3 years after the request is closed',
              ],
              [
                'Crash diagnostics',
                'Crash and hang reports, device model, iOS and App versions, installation identifier',
                'Contract (keeping the Service working)',
                '90 days',
              ],
              [
                'Usage analytics',
                'Pseudonymous identifier; device model, iOS and App versions, language and country; screens and actions in the App, including the type of record added (for example “sleep”, “feed”, “symptom” and its severity) and the child’s age in months — without measured values, notes or names',
                'Consent',
                'Up to 2 years',
              ],
              [
                'Advertising attribution',
                'App install and launch, sign-up, trial start and purchase events; the device advertising identifier — only if you allowed tracking in Apple’s system prompt',
                'Consent',
                'Up to 2 years',
              ],
              [
                'Weather forecast for the “Dressed for outside” program',
                'Coordinates rounded to about 1 km, language, time zone',
                'Contract',
                'Coordinates are not stored; the forecast for the area is cached on the server for 15 minutes',
              ],
              [
                'Security and abuse prevention',
                'IP address, request times, installation identifier, the App’s attestation key (Apple App Attest)',
                'Contract',
                'IP address — up to 30 days; key — while the App installation is in use',
              ],
              [
                'Running the Website',
                'Chosen language (yorix-lang cookie); sign-in data in browser storage (Firebase Authentication)',
                'Contract; technical data the Website cannot work without',
                'Language cookie — 1 year; sign-in data — until you sign out',
              ],
              [
                'Answering government requests, defending rights in disputes',
                'Information related to the request or dispute',
                'Legal obligations (Article 6, paragraph 20)',
                'For the time of the proceedings and the limitation period',
              ],
            ],
          },
        },
        '3.1. Bank card details are entered only on the WEBPAY payment page. We never receive or store them.',
        '3.2. **We do not sell personal data.** The child’s health information is not used for advertising and is not shared with ad networks.',
        `3.3. If you do not give consent where it is needed, only the feature concerned becomes unavailable: the diary, forecasts and buying a subscription work without the AI coach, analytics and ad attribution. The purchase terms are in the [public offer](${offer}).`,
      ],
    },
    {
      title: '4. Who we share data with',
      blocks: [
        '4.1. We share data with authorised persons (processors) only to the extent needed for the purpose, under contracts or their standard data processing terms, and we are responsible to you for them (Article 7(3), Law 99-З).',
        {
          table: {
            head: ['Recipient', 'Country', 'Data', 'Purpose'],
            rows: [
              ['Apple Inc.', 'USA', 'Sign in with Apple; your private iCloud database (the Operator has no access); App Store purchases; coordinates for the weather forecast; App attestation', 'Sign-in, storing and syncing the diary, purchases, weather, security'],
              ['Google LLC (Firebase)', 'USA', 'Account identifier, e-mail, sign-in method; launch, sign-up and purchase events', 'Sign-in, analytics'],
              ['Cloudflare, Inc.', 'USA; servers worldwide', 'Data passing through our server: orders, Coach conversations, requests, crash reports', 'Hosting the Website and the server'],
              ['OpenAI', 'USA', 'Messages to the Coach and the diary summary', 'Answers, safety checks, tips'],
              ['DeepInfra', 'USA', 'Messages to the Coach and the diary summary', 'Coach answers (the DeepSeek model hosted by DeepInfra)'],
              ['Mixpanel, Amplitude', 'USA', 'Analytics events', 'Usage analytics'],
              ['Adapty', 'USA', 'User identifier, App Store purchases, subscription screen views', 'Subscription screen and purchase statistics'],
              ['Meta Platforms', 'USA, Ireland', 'Install, sign-up and purchase events; the advertising identifier — with your permission', 'Advertising attribution'],
              ['Resend', 'USA', 'E-mail address and message text', 'Sending service e-mails'],
              ['Microsoft (Outlook.com)', 'USA', 'Support correspondence', 'Support mailbox'],
              ['Webpay LLC and the acquiring bank', 'Belarus', 'Order and payment details', 'Taking payments and refunds'],
            ],
          },
        },
        '4.2. AI providers receive messages and the diary summary without your e-mail, payment details or account identifier. Under their terms, data sent through the API is not used to train models: DeepInfra does not store requests, and OpenAI keeps them for up to 30 days for abuse monitoring.',
        '4.3. Payment details (amount, date, name of the service) go to the Ministry of Taxes and Duties through the “Professional income tax” app. Other authorities receive data only where the law requires it.',
      ],
    },
    {
      title: '5. Cross-border transfers',
      blocks: [
        '5.1. Most recipients are in the USA. The USA is not on the list of countries that ensure an adequate level of protection of data subjects’ rights (Order of the National Personal Data Protection Center of 15.11.2021 No. 14). Russia, the EU member states and the UK are on that list.',
        '5.2. **Risks.** In countries without adequate protection there may be no personal data legislation or data protection authority, a narrower range of information may count as personal data, data subjects’ rights may be limited, and authorities may access the data.',
        '5.3. **Bases.** Sign-in, purchase and support data are transferred because this is necessary to perform the contract with you (Article 9(1), paragraph 3, Law 99-З). AI coach, analytics and attribution data, and the child’s health information, are transferred with your consent after you are informed of the risks (Article 9(1), paragraph 2).',
        '5.4. **Safeguards.** We transfer the minimum data, encrypt it in transit and choose providers that have committed to protecting it (for data from the EU and UK — standard contractual clauses or the recipient’s participation in the EU-U.S. Data Privacy Framework).',
      ],
    },
    {
      title: '6. Information about the child and health',
      blocks: [
        '6.1. You enter information about the child as their legal representative. Consent to processing the child’s data, including health information, is given by one of the legal representatives (Article 5(9), part 2, Law 99-З). If you are not a legal representative, enter such information only with their consent.',
        '6.2. Health information is special personal data. We process it only for the features you use and protect it with a set of measures (Article 8(3)): minimisation, encryption in transit, access limited to the Operator.',
      ],
    },
    {
      title: '7. AI coach',
      blocks: [
        '7.1. When you ask a question, the App sends our server the message and the diary summary needed for the answer: the child’s name and age, recent records and, if any, health and program information. The server passes them to the AI model provider (section 4).',
        '7.2. Answers are generated automatically. The Coach makes no decisions with legal effects for you.',
        '7.3. Using the Coach is optional: the diary and forecasts work without it. If you withdraw consent, the Coach becomes unavailable.',
      ],
    },
    {
      title: '8. Cookies and browser storage',
      blocks: [
        '8.1. The Website uses no advertising or analytics cookies, pixels or counters.',
        '8.2. The Website uses only technical means: the yorix-lang cookie with the chosen language and browser storage where Firebase Authentication keeps sign-in data. The Website cannot work without them, so no consent is needed. You can delete them in your browser settings.',
      ],
    },
    {
      title: '9. Deleting data',
      blocks: [
        '9.1. You can delete records, Coach history and the account in the App (Settings → Account) or by writing to us.',
        '9.2. After the account is deleted or consent is withdrawn, we delete the data within 15 days, except information we must keep by law (for example, payment records). Backups are cleared within 30 days.',
        '9.3. You delete the data in your private iCloud database yourself — in the App or in iCloud settings.',
      ],
    },
    {
      title: '10. Your rights',
      blocks: [
        {
          table: {
            head: ['Right', 'Response time'],
            rows: [
              ['Withdraw consent — in the same form it was given (in the App or by e-mail)', '15 days'],
              ['Get information about the processing of your data', '5 working days, free of charge'],
              ['Have inaccurate or outdated data changed', '15 days'],
              ['Get information about data provided to third parties (once a year free of charge)', '15 days'],
              ['Have processing stopped and data deleted', '15 days'],
              ['Appeal to the National Personal Data Protection Center of Belarus (cpd.by)', '—'],
            ],
          },
        },
        `10.1. Under Law 99-З a request is made in writing or as an electronic document and states your full name, address of residence (stay), date of birth, identification number (if given with the consent), the substance of the request and your signature (Article 14). For convenience we also handle, within the same times, requests sent to ${email} from your account’s e-mail address, and we may ask you to confirm that the request comes from you.`,
      ],
    },
    {
      title: '11. Security',
      blocks: [
        '11.1. We encrypt data in transit (TLS), restrict access to it, use two-factor authentication for service accounts and App attestation, and keep data no longer than necessary.',
        '11.2. We notify the National Personal Data Protection Center of a security breach without delay and within three working days, and you — without undue delay if the breach may affect your rights.',
      ],
    },
    {
      title: '12. Users in other countries',
      blocks: [
        '**EU, EEA and UK.** The controller is the person named in section 14. Legal bases under the GDPR and UK GDPR: performance of a contract (Article 6(1)(b)) — sign-in, purchases, support, diagnostics; legal obligation (Article 6(1)(c)) — income accounting; legitimate interests (Article 6(1)(f)) — security and defending legal claims; consent (Article 6(1)(a)) and explicit consent for health data (Article 9(2)(a)) — the AI coach, information about the child in requests, analytics, attribution. You have the right to access, rectify and erase your data, restrict processing, data portability, object to processing based on legitimate interests, withdraw consent and complain to the supervisory authority where you live. We reply within one month.',
        '**Russian Federation.** Purchase data is processed to perform the contract (Article 6(1)(5) of the Federal Law “On personal data”); the child’s health information only with your consent. We answer requests about your data within 10 working days.',
        '**United States.** The child’s health information you enter is consumer health data under the laws of Washington, Nevada and Connecticut. We collect it from you for the features in section 3, share it only with the recipients in section 4, never sell it and never use it for advertising. You may learn what data we have and who received it, delete it and withdraw consent; if we decline a request, write to us with the subject “Appeal” and we will reply within 45 days. The Website does not track visitors across third-party sites, so Do Not Track signals do not change how it works.',
      ],
    },
    {
      title: '13. Changes',
      blocks: [
        '13.1. A new edition is published on this page with its date. We give at least 30 days’ notice of material changes by e-mail or in the App. For new purposes we ask for new consent.',
      ],
    },
  ];
}

export function Privacy({ lang }: { lang: Lang }) {
  const ctx: Ctx = { email: merchant.email, operator: sellerLine(lang), offer: subscriptionPath(lang, '/offer') };
  return (
    <DocumentPage lang={lang} page="/privacy" title={privacyTitle[lang]} updated={editionLabel('privacy', lang)}>
      <LegalBody sections={lang === 'ru' ? ru(ctx) : en(ctx)} />
      <h2>{lang === 'ru' ? '14. Оператор' : '14. Operator'}</h2>
      <SellerBlock lang={lang} />
      <p>{lang === 'ru' ? `По вопросам персональных данных: ${merchant.email}.` : `Personal data questions: ${merchant.email}.`}</p>
    </DocumentPage>
  );
}
