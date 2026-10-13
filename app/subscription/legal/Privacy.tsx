import { acquirer } from '../merchant';
import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { LegalBody, type LegalSection } from './LegalBody';
import { SellerBlock, sellerLine } from './SellerBlock';
import { editionLabel } from './versions';

export const privacyTitle = { ru: 'Политика обработки персональных данных', en: 'Personal data policy' } as const;

type Ctx = { operator: string; offer: string; contact: string };

// The acquirer is named from merchant.ts, so switching banks never edits the policy.
const bankRu = acquirer.name.ru;
const bankEn = acquirer.name.en;

// One policy for the site, the app and support. Every processor, data field
// and retention period below was checked against the app, the Worker and the
// site code on 18.09.2026; the support diary, the edge relay, the desk notices
// and the acquirer row again on 01.10.2026; the whole inventory again on
// 13.10.2026 (coach on DeepInfra with OpenAI guards, support drafts, Adapty
// attributes, Apple Health, weather fallback, gift e-mail, deletion paths) —
// change the text together with the code.
function ru({ operator, offer, contact }: Ctx): LegalSection[] {
  return [
    {
      title: '1. Общие положения',
      blocks: [
        `1.1. Политика определяет, как ${operator} (далее — Оператор, «мы») обрабатывает персональные данные пользователей сайта yorix-app.com (далее — Сайт), мобильного приложения «Yorix» для iPhone и iPad (далее — Приложение), службы поддержки и связанных онлайн-сервисов (вместе — Сервис). Политика разработана в соответствии с Законом Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных» (далее — Закон № 99-З).`,
        '1.2. Политика объясняет, какие данные мы обрабатываем, зачем и на каком основании, кому их передаём, как долго храним и как вы можете реализовать свои права. Политика не является согласием и не требует «принятия». Если обработка основана на согласии, мы просим его отдельно, в момент, когда оно нужно, и вы можете его отозвать.',
        '1.3. Сервис предназначен для взрослых — родителей и других лиц, которые заботятся о ребёнке. Сведения о ребёнке вносит взрослый; дети Сервисом не пользуются, и мы не собираем данные непосредственно у детей.',
        '1.4. Термины «персональные данные», «специальные персональные данные» (в том числе сведения о здоровье), «обработка», «уполномоченное лицо» и «трансграничная передача» используются в значении Закона № 99-З.',
      ],
    },
    {
      title: '2. Где хранится дневник и что остаётся на устройстве',
      blocks: [
        '2.1. Записи дневника — имя или прозвище ребёнка, дата рождения или предполагаемая дата родов, пол, недоношенность, особенности здоровья, вскармливания и сна из профиля; сон, кормления, сцеживание, подгузники, прогулки, купание, рост, вес и окружность головы; сведения о здоровье (температура, симптомы, лекарства, прививки, визиты к врачу, самочувствие и настроение); записи программ (прикорм и реакции на продукты, зубы, прививки, развитие); заметки и фотографии; имя и роль взрослого; история диалогов с ИИ-коучем — хранятся на вашем устройстве и синхронизируются через вашу частную базу данных iCloud (Apple CloudKit). **У Оператора нет доступа к этой базе, и мы не можем прочитать её содержимое.**',
        '2.2. **Совместный доступ.** Второго взрослого вы приглашаете ссылкой iCloud. Присоединиться может любой, у кого есть ссылка, поэтому отправляйте её только тому, кому доверяете. Участник видит профиль ребёнка и записи дневника и программ с заметками; диалоги с Коучем остаются только у вас. Вы можете в любой момент удалить участника.',
        '2.3. Прогнозы сна, план дня и аналитика дневника рассчитываются на вашем устройстве. Виджеты и Live Activity показывают на экране устройства, в том числе заблокированного, имя ребёнка и состояние сна; эти данные остаются на устройстве.',
        '2.4. **Геопозиция.** Для прогноза погоды в программе «Одеваемся на улицу» Приложение с вашего разрешения однократно определяет местоположение с точностью около 1 км; вместо этого можно ввести город вручную. Прогноз запрашивается у Apple WeatherKit на устройстве. Если он недоступен, координаты передаются на наш сервер, который округляет их примерно до 1 км и запрашивает прогноз у Apple. Координаты не сохраняются; на устройстве хранятся последний прогноз и название населённого пункта.',
        '2.5. **Apple Health и датчик движения.** При записи прогулки Приложение с вашего разрешения читает ваши (взрослого) шаги, расстояние и активные калории из Apple Health и датчика движения — только за время этой прогулки. Эти сведения показываются на устройстве, не сохраняются, не синхронизируются, не передаются нам и третьим лицам и не используются для рекламы и аналитики. Приложение ничего не записывает в Apple Health.',
        '2.6. Напоминания — локальные уведомления устройства. Для синхронизации iCloud Приложение получает от Apple служебные push-уведомления; токен устройства нам не передаётся.',
        '2.7. Сведения из дневника попадают к Оператору только в случаях, описанных в разделе 3: когда вы пользуетесь ИИ-коучем, когда отправляете обращение или отзыв из Приложения и в виде событий аналитики без значений измерений и заметок.',
        '2.8. Выгрузить дневник можно в Приложении: Настройки → Экспорт данных (CSV, PDF или JSON).',
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
                `Код аккаунта, e-mail, тариф, цена и валюта, номер заказа, номер и статус операции ${bankRu}, даты оплаты и срока доступа, язык, редакции принятых документов`,
                'Договор; обязанности по законодательству — учёт дохода и чеки (абз. 20 ст. 6)',
                '3 года после окончания срока доступа; документы учёта дохода — в сроки налогового законодательства',
              ],
              [
                'Подписка в подарок',
                `Без аккаунта: e-mail покупателя (на него приходят ссылка, код подарка и подтверждение оплаты), тариф, цена, номер заказа, данные операции ${bankRu}, текст открытки (кому и пожелание — вводит покупатель), код подарка и его статус, хэш ключа браузера покупателя; при активации — аккаунт получателя`,
                'Договор; обязанности по законодательству — учёт дохода и чеки (абз. 20 ст. 6)',
                '3 года после активации или окончания срока кода; документы учёта дохода — в сроки налогового законодательства',
              ],
              [
                'Покупки в App Store',
                'Сведения Apple о покупке: продукт, даты, статус, страна магазина; уведомления Apple о продлении, отмене и возврате. Платёжные данные мы не получаем',
                'Договор',
                'Пока существует аккаунт и 3 года после окончания подписки',
              ],
              [
                'Учёт подписки, ИИ-кредитов и совместного доступа к Premium',
                'Идентификатор установки Приложения, случайный идентификатор устройства, идентификаторы покупок App Store, продукт, даты пробного периода и окончания подписки, баланс и история ИИ-кредитов, язык, часовой пояс, модель устройства, версия Приложения, время последней активности',
                'Договор',
                'Пока используется установка Приложения или действует подписка, и 3 года после этого',
              ],
              [
                'ИИ-коуч и персональные подсказки',
                'Ваши сообщения и ответы Коуча; имя, возраст, пол ребёнка, недоношенность и особенности здоровья, вскармливания и сна из профиля; если включена «Персонализация ИИ» — записи дневника и программ, нужные для ответа, в том числе сведения о здоровье (раздел 7); язык, часовой пояс; идентификатор установки или аккаунта для сессии',
                'Согласие (ст. 5 и 8 Закона № 99-З); передача в США — с согласия после информирования о рисках (абз. 2 п. 1 ст. 9)',
                'На сервере — 30 дней после последнего сообщения в диалоге. История диалогов в Приложении хранится в вашем iCloud, пока вы её не удалите',
              ],
              [
                'Поддержка и обратная связь',
                'Текст обращения или отзыва, оценка, до 3 снимков экрана; e-mail и имя — если вы их указали (в форме «Написать нам» e-mail обязателен); сведения для ответа: имя и роль взрослого, имя, возраст, пол и дата рождения ребёнка, тариф и ИИ-кредиты, идентификаторы покупки, установки и аналитики, модель устройства, версии iOS и Приложения, язык, часовой пояс. К обращению в чат поддержки Приложение прикладывает записи дневника не более чем за 30 последних дней и план дня (кроме вопросов об оплате) и сообщает об этом в чате; к отзыву и к опросу при отмене подписки — записи за 7 дней, включая заметки, температуру и названия лекарств',
                'Договор; для сведений о ребёнке — согласие',
                'Вложения и записи дневника на сервере — 90 дней; переписка, в том числе её копии с вложениями в почтовом ящике поддержки, — 3 года после закрытия обращения',
              ],
              [
                'Диагностика сбоев',
                'Отчёты о сбоях, зависаниях и завершении работы Приложения, случайный идентификатор устройства для диагностики, модель устройства, версии iOS и Приложения',
                'Договор (обеспечение работоспособности)',
                '90 дней',
              ],
              [
                'Аналитика использования',
                'Идентификатор аккаунта или псевдонимный идентификатор; модель устройства, версии iOS и Приложения, язык, страна и город по IP-адресу (определяет сервис аналитики); экраны и действия в Приложении, в том числе тип добавленной записи (например, «сон», «кормление», «лекарство», «температура», «симптом» и степень его выраженности, «реакция на продукт»), возраст ребёнка в месяцах, число записей, статус подписки и купленные программы — без значений измерений, заметок и имён',
                'Согласие',
                'До 2 лет',
              ],
              [
                'Экран подписки и статистика покупок',
                'Идентификатор аккаунта или псевдонимный идентификатор, идентификаторы аналитики, покупки и уведомления App Store, показы экрана подписки, возраст ребёнка в месяцах, число записей, купленные программы и число записей в них, причина отмены подписки, если вы её указали',
                'Договор; для свойств использования — согласие',
                'Пока существует аккаунт и 3 года после окончания подписки',
              ],
              [
                'Атрибуция рекламы',
                'События установки и запуска Приложения, регистрации, начала пробного периода и покупок (продукт, сумма, валюта); рекламный идентификатор устройства — только если вы разрешили отслеживание в системном запросе Apple (раздел 8); обезличенные сводные данные Apple SKAdNetwork',
                'Согласие',
                'До 2 лет',
              ],
              [
                'Прогноз погоды',
                'Координаты (с точностью около 1 км), язык, страна, часовой пояс — только если прогноз недоступен на устройстве (п. 2.4)',
                'Договор',
                'Координаты не сохраняются; прогноз для района, округлённого примерно до 1 км, хранится на сервере 15 минут',
              ],
              [
                'Безопасность и защита от злоупотреблений',
                'IP-адрес, время и адрес запросов, идентификаторы установки и сессии, ключ проверки подлинности Приложения (Apple App Attest), токен входа Firebase для проверки',
                'Договор',
                'IP-адрес и журналы запросов — до 30 дней; ключ — пока используется установка Приложения',
              ],
              [
                'Работа Сайта',
                'Выбранный язык (cookie yorix-lang); данные входа (Firebase Authentication), ссылки и ключи купленных подарков, код подарка до активации, отметки в чек-листах статей — в хранилище браузера',
                'Договор; технические данные, без которых Сайт не работает',
                'Cookie языка — 1 год; данные входа — до закрытия вкладки или выхода; остальное — пока вы не очистите хранилище браузера',
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
        `3.1. Данные банковской карты вводятся только на платёжной странице ${bankRu}. Мы их не получаем и не храним.`,
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
              ['Apple Inc.', 'США', 'Вход через Apple; ваша частная база iCloud и совместный доступ (у Оператора нет к ним доступа); покупки в App Store и уведомления о них; координаты для прогноза погоды; проверка подлинности Приложения', 'Вход, хранение и синхронизация дневника, покупки, погода, защита'],
              ['Google LLC (Firebase)', 'США', 'Вход через Apple и Google: идентификатор аккаунта, e-mail, имя, способ входа. Аналитика: идентификатор аккаунта, события запуска, онбординга, регистрации, пробного периода, покупок, экрана подписки и просмотров экранов, возраст ребёнка в месяцах, статус подписки, язык; рекламный идентификатор и рекламные сигналы Google Ads — только с вашего разрешения отслеживания', 'Вход, аналитика, атрибуция рекламы'],
              ['Cloudflare, Inc.', 'США; серверы по всему миру', 'Данные, которые проходят через наш сервер: заказы, диалоги с Коучем, обращения, отчёты о сбоях, журналы запросов; текст вопроса Коучу — для поиска по статьям (Workers AI)', 'Размещение Сайта и сервера, поиск по статьям'],
              ['UpCloud Ltd', 'Нидерланды', 'IP-адрес и данные, которые проходят через наш сервер', 'Ретрансляция соединений с Сайтом и сервером для сетей, где Cloudflare недоступен'],
              ['DeepInfra', 'США', 'Сообщения Коучу, реплики диалога за день, сведения о ребёнке и сводка из дневника (раздел 7)', 'Ответы Коуча (модель DeepSeek, размещённая на серверах DeepInfra; разработчику модели данные не передаются); резервная проверка безопасности'],
              ['OpenAI', 'США', 'Вопрос Коучу с краткой сводкой предыдущих реплик и ответ Коуча; текст обращения в поддержку с именем взрослого, именем, возрастом, полом и датой рождения ребёнка и тарифом — без записей дневника', 'Проверка безопасности вопросов и ответов Коуча, резервный поставщик ответов; черновики ответов поддержки и перевод переписки — каждый ответ проверяет и отправляет человек'],
              ['Mixpanel, Amplitude', 'США', 'События аналитики, идентификатор аккаунта или псевдонимный идентификатор, свойства использования; события сервера — с хэшированными идентификаторами', 'Аналитика использования'],
              ['Adapty', 'США', 'Идентификатор аккаунта или псевдонимный идентификатор, идентификаторы аналитики, покупки и уведомления App Store, показы экрана подписки, свойства использования (раздел 3)', 'Экран подписки, эксперименты с ценами и статистика покупок'],
              ['Meta Platforms', 'США, Ирландия', 'Только если вы разрешили отслеживание: события установки и запуска, регистрации, пробного периода и покупок, рекламный идентификатор', 'Атрибуция рекламы'],
              ['Resend', 'США', 'E-mail и текст писем: подтверждения оплаты и подарки; копии обращений, отзывов и сообщений формы «Написать нам» с вложениями, в том числе записями дневника, — для почтового ящика поддержки', 'Отправка служебных писем'],
              ['Microsoft (Outlook.com)', 'США', 'Переписка с поддержкой; копии обращений и отзывов с вложениями — снимками экрана и записями дневника', 'Почтовый ящик поддержки'],
              ['Telegram', 'ОАЭ; серверы в разных странах', 'Уведомление о новом обращении: кто пишет (родитель, имя и возраст ребёнка), тема, начало текста, e-mail для ответа — если вы его указали', 'Уведомления команды поддержки'],
              [acquirer.recipient.ru, acquirer.recipient.country.ru, 'Данные заказа и платежа', 'Приём платежей и возвраты'],
            ],
          },
        },
        '4.2. Поставщики ИИ получают сообщения, сведения о ребёнке и сводку из дневника без вашего e-mail, платёжных данных и идентификатора аккаунта. По их условиям данные, переданные через API, не используются для обучения моделей: DeepInfra не сохраняет запросы, OpenAI хранит их не дольше 30 дней для контроля злоупотреблений.',
        '4.3. Сведения о расчётах (сумма, дата, наименование услуги) передаются в Министерство по налогам и сборам через приложение «Налог на профессиональный доход». Иным государственным органам данные предоставляются только в случаях, предусмотренных законодательством.',
        '4.4. Если Сервис перейдёт к другому лицу (продажа или реорганизация), данные перейдут к нему вместе с Сервисом и только для тех же целей. Мы заранее сообщим об этом на этой странице или в Приложении.',
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
        '6.2. Сведения о здоровье — специальные персональные данные. Мы обрабатываем их только для функций, которыми вы пользуетесь, и принимаем комплекс мер для их защиты (п. 3 ст. 8): минимизация, шифрование при передаче, доступ только у Оператора и допущенных им сотрудников поддержки, обязанных сохранять конфиденциальность.',
        '6.3. Если вы узнали, что ребёнок сам передал нам свои данные, напишите нам — мы их удалим.',
      ],
    },
    {
      title: '7. ИИ-коуч',
      blocks: [
        '7.1. Когда вы задаёте вопрос, Приложение отправляет на наш сервер сообщение и сведения о ребёнке из профиля: имя, возраст, пол, недоношенность, особенности здоровья, вскармливания и сна. Если в Настройках → Конфиденциальность и ИИ включена «Персонализация ИИ», добавляется сводка из дневника, нужная для ответа: записи за сегодня и итоги за 7 дней, рост, вес и окружность головы, симптомы за 14 дней, температура, прививки, настроение, сцеживание и сведения о программах. Названия лекарств и заметки Коучу не передаются. Сервер передаёт данные поставщику модели ИИ (раздел 4), а текст вопроса использует для поиска по статьям Yorix.',
        '7.2. Ответы формируются автоматически. Решений, порождающих для вас юридические последствия, Коуч не принимает.',
        '7.3. Пользоваться Коучем не обязательно: дневник и прогнозы работают без него. Перед первым вопросом Приложение спрашивает согласие на передачу данных поставщикам ИИ; без него ничего не передаётся, а отозвать его можно в Настройках → «Конфиденциальность и ИИ». Если вы отзовёте согласие, Коуч станет недоступен. Выключив «Персонализацию ИИ», вы прекращаете передачу записей дневника и сведений профиля: с вопросом передаётся только возраст ребёнка (с поправкой на недоношенность).',
        '7.4. «Очистить историю чата с ИИ» (Настройки → Конфиденциальность и ИИ) удаляет диалоги на устройстве, в iCloud и на нашем сервере.',
      ],
    },
    {
      title: '8. Cookie, хранилище браузера и отслеживание',
      blocks: [
        '8.1. Сайт не использует рекламные и аналитические cookie, пиксели и счётчики.',
        '8.2. Сайт использует только технические средства: cookie yorix-lang с выбранным языком и хранилище браузера, в котором Firebase Authentication хранит данные входа, а Сайт — ссылки и ключи купленных подарков, код подарка до активации и отметки в чек-листах статей. Без них Сайт не работает, поэтому согласия на них не требуется. Вы можете удалить их в настройках браузера.',
        '8.3. **Отслеживание в Приложении.** Приложение показывает системный запрос Apple на отслеживание (App Tracking Transparency). Только если вы его разрешите, Приложение передаёт Meta события установки, запуска, регистрации, пробного периода и покупок, Meta и Google — рекламный идентификатор устройства для атрибуции рекламы, а Google — рекламные сигналы (Google Ads). Если вы откажете, Приложение работает так же: Meta не получает ничего, Google — только аналитику использования (Firebase Analytics) без рекламного идентификатора и рекламных сигналов, а Apple SKAdNetwork сообщает рекламным сетям только обезличенные сводные данные.',
        '8.4. Изменить решение можно в любой момент: Настройки iOS → Конфиденциальность и безопасность → Отслеживание.',
      ],
    },
    {
      title: '9. Удаление данных',
      blocks: [
        '9.1. В Приложении вы можете удалить отдельные записи; удалить ребёнка вместе со всеми его записями и совместным доступом; очистить историю чата с ИИ (п. 7.4); удалить аккаунт (Настройки → Аккаунт) — это удаляет учётную запись входа, все данные на устройстве и в вашей частной базе iCloud и закрывает совместный доступ.',
        `9.2. Данные на нашем сервере и у получателей из раздела 4 — обращения, заказы, учёт подписки и кредитов, аналитика — не связаны с вашей базой iCloud. Чтобы удалить и их, напишите нам через форму [«Написать нам»](${contact}), указав e-mail аккаунта. Мы удаляем данные в течение 15 дней после запроса или отзыва согласия, кроме сведений, хранение которых обязательно по законодательству (например, о платежах). Из резервных копий данные удаляются не позднее 30 дней.`,
        '9.3. Данные в вашей частной базе iCloud удаляете вы — в Приложении или в настройках iCloud (Настройки iOS → ваше имя → iCloud → Управление хранилищем → Yorix).',
      ],
    },
    {
      title: '10. Ваши права',
      blocks: [
        {
          table: {
            head: ['Право', 'Срок ответа'],
            rows: [
              ['Отозвать согласие — в той же форме, в которой оно дано (в Приложении или через форму «Написать нам»)', '15 дней'],
              ['Получить информацию об обработке своих данных', '5 рабочих дней, бесплатно'],
              ['Потребовать изменить неточные или устаревшие данные', '15 дней'],
              ['Получить информацию о предоставлении данных третьим лицам (раз в год бесплатно)', '15 дней'],
              ['Потребовать прекратить обработку и удалить данные', '15 дней'],
              ['Обжаловать действия Оператора в Национальный центр защиты персональных данных (cpd.by)', '—'],
            ],
          },
        },
        `10.1. Заявление подаётся в письменной форме или в виде электронного документа и содержит фамилию, имя, отчество, адрес места жительства (места пребывания), дату рождения, идентификационный номер (если он указывался при даче согласия), изложение сути требований и подпись (ст. 14 Закона № 99-З). Для удобства мы также рассматриваем в те же сроки запросы, отправленные через форму [«Написать нам»](${contact}) на сайте с указанием адреса электронной почты вашего аккаунта, и можем попросить подтвердить, что запрос исходит от вас.`,
      ],
    },
    {
      title: '11. Защита данных',
      blocks: [
        '11.1. Мы шифруем данные при передаче (TLS); для запросов к Коучу и учёта ИИ-кредитов Приложение дополнительно проверяет сертификат нашего сервера (закрепление сертификата). Мы проверяем подлинность Приложения (Apple App Attest), ограничиваем доступ к данным кругом лиц, которым он нужен для работы, и храним данные минимально необходимое время.',
        '11.2. О нарушении систем защиты мы уведомляем Национальный центр защиты персональных данных незамедлительно, но не позднее трёх рабочих дней, а вас — без неоправданной задержки, если нарушение может затронуть ваши права, — в Приложении, по электронной почте или на этой странице.',
      ],
    },
    {
      title: '12. Пользователям из других стран',
      blocks: [
        '**ЕС, ЕЭЗ и Великобритания.** Оператор — лицо, указанное в разделе 14. Правовые основания по GDPR и UK GDPR: исполнение договора (ст. 6(1)(b)) — вход, покупки, поддержка, диагностика, погода; юридическая обязанность (ст. 6(1)(c)) — учёт дохода; законный интерес (ст. 6(1)(f)) — безопасность и защита прав в спорах; согласие (ст. 6(1)(a)) и явное согласие на данные о здоровье (ст. 9(2)(a)) — ИИ-коуч, сведения о ребёнке в обращениях, аналитика, атрибуция. Вы вправе получить доступ к данным, исправить, удалить их, ограничить обработку, получить их в переносимом формате (в том числе через экспорт дневника), возразить против обработки на основании законного интереса, отозвать согласие и подать жалобу в надзорный орган по месту жительства. Мы отвечаем в течение месяца, а о нарушении безопасности уведомляем надзорный орган в течение 72 часов, если этого требует GDPR.',
        '**Российская Федерация.** Оператор находится в Республике Беларусь. Данные покупателей и пользователей из России обрабатываются для исполнения договора (п. 5 ч. 1 ст. 6 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»), сведения о здоровье ребёнка и данные ИИ-коуча — только с вашего согласия. Данные передаются Оператору в Республику Беларусь и получателям из раздела 4, в том числе в США, которые могут не обеспечивать адекватную защиту прав субъектов персональных данных; риски такой передачи описаны в п. 5.2. На запрос о ваших данных мы отвечаем в течение 10 рабочих дней.',
        '**США.** Сведения о здоровье ребёнка, которые вы вносите, являются consumer health data по законам штатов Вашингтон, Невада и Коннектикут. Мы собираем их у вас для функций, описанных в разделе 3, передаём только получателям из раздела 4, не продаём и не используем для рекламы. Вы вправе узнать, какие данные мы получили и кому передали, удалить их и отозвать согласие; если мы отклоним запрос, напишите нам с темой «Appeal» — мы ответим в течение 45 дней. Сайт не отслеживает посетителей на сторонних сайтах, поэтому сигналы Do Not Track не меняют его работу.',
      ],
    },
    {
      title: '13. Изменения Политики',
      blocks: [
        '13.1. Новая редакция публикуется на этой странице с датой. О существенных изменениях мы сообщаем заранее на этой странице или в Приложении. Для новых целей обработки мы запрашиваем новое согласие.',
      ],
    },
  ];
}

function en({ operator, offer, contact }: Ctx): LegalSection[] {
  return [
    {
      title: '1. General',
      blocks: [
        `1.1. This policy sets out how ${operator} (the “Operator”, “we”) processes the personal data of users of the yorix-app.com site (the “Website”), the Yorix mobile app for iPhone and iPad (the “App”), support and related online services (together, the “Service”). It follows the Law of the Republic of Belarus of 7 May 2021 No. 99-З “On personal data protection” (“Law 99-З”).`,
        '1.2. It explains what data we process, why and on what basis, who we share it with, how long we keep it and how you can exercise your rights. The policy is not consent and does not need to be “accepted”. Where processing relies on consent, we ask for it separately, when it is needed, and you can withdraw it.',
        '1.3. The Service is for adults — parents and others caring for a child. Information about the child is entered by an adult; children do not use the Service and we do not collect data directly from children.',
        '1.4. The terms “personal data”, “special personal data” (including health information), “processing”, “authorised person” and “cross-border transfer” have the meaning given in Law 99-З.',
      ],
    },
    {
      title: '2. Where the diary is kept and what stays on the device',
      blocks: [
        '2.1. Diary records — the child’s name or nickname, date of birth or due date, sex, prematurity, health, feeding and sleep details from the profile; sleep, feeds, pumping, diapers, walks, baths, height, weight and head circumference; health information (temperature, symptoms, medicines, vaccinations, doctor visits, wellbeing and mood); program records (solids and reactions to foods, teeth, vaccinations, development); notes and photos; the adult’s name and role; the AI coach conversation history — are stored on your device and synced through your private iCloud database (Apple CloudKit). **The Operator has no access to that database and cannot read it.**',
        '2.2. **Sharing.** You invite a second adult with an iCloud link. Anyone who has the link can join, so send it only to someone you trust. The participant sees the child’s profile and the diary and program records with notes; Coach conversations stay with you only. You can remove a participant at any time.',
        '2.3. Sleep forecasts, the day plan and diary analytics are calculated on your device. Widgets and Live Activities show the child’s name and sleep state on the device screen, including the lock screen; that data stays on the device.',
        '2.4. **Location.** For the weather forecast in the “Dressed for outside” program, the App, with your permission, takes a single location fix accurate to about 1 km; you can type a city instead. The forecast is requested from Apple WeatherKit on the device. If that is unavailable, the coordinates go to our server, which rounds them to about 1 km and requests the forecast from Apple. Coordinates are not stored; the device keeps the last forecast and the place name.',
        '2.5. **Apple Health and motion.** When you log a walk, the App, with your permission, reads your own (the adult’s) steps, distance and active calories from Apple Health and the motion sensor — only for the length of that walk. This is shown on the device, is not stored or synced, is not sent to us or third parties, and is not used for advertising or analytics. The App writes nothing to Apple Health.',
        '2.6. Reminders are local notifications on the device. To sync iCloud, the App receives service push notifications from Apple; the device token is not sent to us.',
        '2.7. Diary information reaches the Operator only in the cases in section 3: when you use the AI coach, when you send a request or feedback from the App, and as analytics events without measured values or notes.',
        '2.8. You can export the diary in the App: Settings → Export Data (CSV, PDF or JSON).',
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
                `Account code, e-mail, plan, price and currency, order number, ${bankEn} transaction number and status, payment and access dates, language, editions of the documents accepted`,
                'Contract; legal obligations — income accounting and receipts (Article 6, paragraph 20)',
                '3 years after the access period ends; income accounting documents — as required by tax law',
              ],
              [
                'Gift subscriptions',
                `No account: the buyer’s e-mail (the link, the gift code and the payment confirmation are sent there), plan, price, order number, ${bankEn} transaction details, the card text (recipient and message, typed by the buyer), the gift code and its status, a hash of the buyer’s browser key; on redemption — the recipient’s account`,
                'Contract; legal obligations — income accounting and receipts (Article 6, paragraph 20)',
                '3 years after redemption or the end of the code’s validity; income accounting documents — as required by tax law',
              ],
              [
                'App Store purchases',
                'Apple’s purchase details: product, dates, status, storefront country; Apple’s notices of renewal, cancellation and refund. We never receive payment details',
                'Contract',
                'While the account exists and 3 years after the subscription ends',
              ],
              [
                'Subscription, AI credit and shared Premium accounting',
                'App installation identifier, a random device identifier, App Store transaction identifiers, product, trial and expiry dates, AI credit balance and history, language, time zone, device model, App version, time of last activity',
                'Contract',
                'While the App installation is in use or the subscription is active, and 3 years after that',
              ],
              [
                'AI coach and personal tips',
                'Your messages and the Coach’s answers; the child’s name, age, sex, prematurity and health, feeding and sleep details from the profile; if “AI Personalization” is on — the diary and program records needed for the answer, including health information (section 7); language, time zone; installation or account identifier for the session',
                'Consent (Articles 5 and 8, Law 99-З); transfer to the US — with consent after being informed of the risks (Article 9(1), paragraph 2)',
                'On the server — 30 days after the last message in the conversation. Conversation history in the App stays in your iCloud until you delete it',
              ],
              [
                'Support and feedback',
                'The text of the request or feedback, a rating, up to 3 screenshots; e-mail and name if you give them (the “Write to us” form requires an e-mail); details for the reply: the adult’s name and role, the child’s name, age, sex and date of birth, plan and AI credits, purchase, installation and analytics identifiers, device model, iOS and App versions, language, time zone. A support chat request includes the diary records of up to the last 30 days and the day plan (except payment questions), and the chat says so; feedback and the cancellation survey include the last 7 days, with notes, temperatures and medicine names',
                'Contract; for information about the child — consent',
                'Attachments and diary records on the server — 90 days; correspondence, including its copies with attachments in the support mailbox — 3 years after the request is closed',
              ],
              [
                'Crash diagnostics',
                'Crash, hang and exit reports, a random device identifier for diagnostics, device model, iOS and App versions',
                'Contract (keeping the Service working)',
                '90 days',
              ],
              [
                'Usage analytics',
                'Account identifier or a pseudonymous identifier; device model, iOS and App versions, language, country and city derived from the IP address (by the analytics service); screens and actions in the App, including the type of record added (for example “sleep”, “feed”, “medicine”, “temperature”, “symptom” and its severity, “food reaction”), the child’s age in months, the number of records, subscription status and programs bought — without measured values, notes or names',
                'Consent',
                'Up to 2 years',
              ],
              [
                'Subscription screen and purchase statistics',
                'Account identifier or a pseudonymous identifier, analytics identifiers, App Store purchases and notices, subscription screen views, the child’s age in months, the number of records, programs bought and the number of records in them, the reason for cancelling if you gave one',
                'Contract; for usage properties — consent',
                'While the account exists and 3 years after the subscription ends',
              ],
              [
                'Advertising attribution',
                'App install and launch, sign-up, trial start and purchase events (product, amount, currency); the device advertising identifier — only if you allowed tracking in Apple’s system prompt (section 8); anonymous aggregate Apple SKAdNetwork data',
                'Consent',
                'Up to 2 years',
              ],
              [
                'Weather forecast',
                'Coordinates (accurate to about 1 km), language, country, time zone — only when the forecast is unavailable on the device (clause 2.4)',
                'Contract',
                'Coordinates are not stored; the forecast for the area, rounded to about 1 km, is cached on the server for 15 minutes',
              ],
              [
                'Security and abuse prevention',
                'IP address, request times and paths, installation and session identifiers, the App’s attestation key (Apple App Attest), the Firebase sign-in token for verification',
                'Contract',
                'IP address and request logs — up to 30 days; key — while the App installation is in use',
              ],
              [
                'Running the Website',
                'Chosen language (yorix-lang cookie); in browser storage — sign-in data (Firebase Authentication), links and keys of gifts you bought, a gift code awaiting redemption, ticks in article checklists',
                'Contract; technical data the Website cannot work without',
                'Language cookie — 1 year; sign-in data — until the tab is closed or you sign out; the rest — until you clear browser storage',
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
        `3.1. Bank card details are entered only on the ${bankEn} payment page. We never receive or store them.`,
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
              ['Apple Inc.', 'USA', 'Sign in with Apple; your private iCloud database and sharing (the Operator has no access); App Store purchases and notices about them; coordinates for the weather forecast; App attestation', 'Sign-in, storing and syncing the diary, purchases, weather, security'],
              ['Google LLC (Firebase)', 'USA', 'Sign-in with Apple and Google: account identifier, e-mail, name, sign-in method. Analytics: account identifier, launch, onboarding, sign-up, trial, purchase, subscription screen and screen view events, the child’s age in months, subscription status, language; the advertising identifier and Google Ads advertising signals — only if you allow tracking', 'Sign-in, analytics, advertising attribution'],
              ['Cloudflare, Inc.', 'USA; servers worldwide', 'Data passing through our server: orders, Coach conversations, requests, crash reports, request logs; the text of a question to the Coach — to search the articles (Workers AI)', 'Hosting the Website and the server, article search'],
              ['UpCloud Ltd', 'Netherlands', 'IP address and data passing through our server', 'Relaying connections to the Website and the server for networks that cannot reach Cloudflare'],
              ['DeepInfra', 'USA', 'Messages to the Coach, the day’s conversation, information about the child and the diary summary (section 7)', 'Coach answers (the DeepSeek model hosted on DeepInfra’s servers; nothing is sent to the model’s developer); backup safety checks'],
              ['OpenAI', 'USA', 'A question to the Coach with a short summary of earlier turns, and the Coach’s answer; the text of a support request with the adult’s name, the child’s name, age, sex and date of birth and the plan — without diary records', 'Safety checks of Coach questions and answers, backup answer provider; drafts of support replies and translation of the conversation — a person reviews and sends every reply'],
              ['Mixpanel, Amplitude', 'USA', 'Analytics events, account identifier or a pseudonymous identifier, usage properties; server events — with hashed identifiers', 'Usage analytics'],
              ['Adapty', 'USA', 'Account identifier or a pseudonymous identifier, analytics identifiers, App Store purchases and notices, subscription screen views, usage properties (section 3)', 'Subscription screen, price experiments and purchase statistics'],
              ['Meta Platforms', 'USA, Ireland', 'Only if you allowed tracking: install and launch, sign-up, trial and purchase events, the advertising identifier', 'Advertising attribution'],
              ['Resend', 'USA', 'E-mail address and message text: payment confirmations and gifts; copies of requests, feedback and “Write to us” messages with attachments, including diary records, for the support mailbox', 'Sending service e-mails'],
              ['Microsoft (Outlook.com)', 'USA', 'Support correspondence; copies of requests and feedback with attachments — screenshots and diary records', 'Support mailbox'],
              ['Telegram', 'UAE; servers in several countries', 'A new-request notice: who is writing (parent, child’s name and age), topic, the start of the text, the reply e-mail if you gave one', 'Notifying the support team'],
              [acquirer.recipient.en, acquirer.recipient.country.en, 'Order and payment details', 'Taking payments and refunds'],
            ],
          },
        },
        '4.2. AI providers receive messages, information about the child and the diary summary without your e-mail, payment details or account identifier. Under their terms, data sent through the API is not used to train models: DeepInfra does not store requests, and OpenAI keeps them for up to 30 days for abuse monitoring.',
        '4.3. Payment details (amount, date, name of the service) go to the Ministry of Taxes and Duties through the “Professional income tax” app. Other authorities receive data only where the law requires it.',
        '4.4. If the Service passes to another person (a sale or reorganisation), the data passes with it and only for the same purposes. We will announce this in advance on this page or in the App.',
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
        '6.2. Health information is special personal data. We process it only for the features you use and protect it with a set of measures (Article 8(3)): minimisation, encryption in transit, access limited to the Operator and the support staff it admits, who are bound by confidentiality.',
        '6.3. If you learn that a child has sent us their own data, write to us and we will delete it.',
      ],
    },
    {
      title: '7. AI coach',
      blocks: [
        '7.1. When you ask a question, the App sends our server the message and the child’s profile details: name, age, sex, prematurity, health, feeding and sleep details. If “AI Personalization” is on in Settings → Privacy & AI, it adds the diary summary needed for the answer: today’s records and 7-day totals, height, weight and head circumference, symptoms of the last 14 days, temperatures, vaccinations, mood, pumping and program information. Medicine names and notes are not sent to the Coach. The server passes the data to the AI model provider (section 4) and uses the question text to search Yorix articles.',
        '7.2. Answers are generated automatically. The Coach makes no decisions with legal effects for you.',
        '7.3. Using the Coach is optional: the diary and forecasts work without it. Before the first question the App asks for your consent to send data to the AI providers; nothing is sent without it, and you can withdraw it in Settings → “Privacy & AI”. If you withdraw consent, the Coach becomes unavailable. Turning “AI Personalization” off stops sending diary records and profile details: only the child’s age (adjusted for prematurity) goes with a question.',
        '7.4. “Clear AI Chat History” (Settings → Privacy & AI) deletes conversations on the device, in iCloud and on our server.',
      ],
    },
    {
      title: '8. Cookies, browser storage and tracking',
      blocks: [
        '8.1. The Website uses no advertising or analytics cookies, pixels or counters.',
        '8.2. The Website uses only technical means: the yorix-lang cookie with the chosen language and browser storage, where Firebase Authentication keeps sign-in data and the Website keeps the links and keys of gifts you bought, a gift code awaiting redemption and ticks in article checklists. The Website cannot work without them, so no consent is needed. You can delete them in your browser settings.',
        '8.3. **Tracking in the App.** The App shows Apple’s system tracking prompt (App Tracking Transparency). Only if you allow it does the App send Meta install, launch, sign-up, trial and purchase events, pass the device advertising identifier to Meta and Google for advertising attribution, and send Google advertising signals (Google Ads). If you decline, the App works the same: Meta receives nothing, Google receives only usage analytics (Firebase Analytics) without the advertising identifier or advertising signals, and Apple SKAdNetwork reports only anonymous aggregate data to ad networks.',
        '8.4. You can change your choice at any time in iOS Settings → Privacy & Security → Tracking.',
      ],
    },
    {
      title: '9. Deleting data',
      blocks: [
        '9.1. In the App you can delete individual records; remove a child together with all their records and sharing; clear the AI chat history (clause 7.4); and delete the account (Settings → Account) — this deletes the sign-in account and all data on the device and in your private iCloud database, and ends sharing.',
        `9.2. Data on our server and with the recipients in section 4 — requests, orders, subscription and credit accounting, analytics — is not tied to your iCloud database. To have it deleted too, write to us through the [“Write to us”](${contact}) form, stating your account’s e-mail. We delete data within 15 days of the request or the withdrawal of consent, except information we must keep by law (for example, payment records). Backups are cleared within 30 days.`,
        '9.3. You delete the data in your private iCloud database yourself — in the App or in iCloud settings (iOS Settings → your name → iCloud → Manage Storage → Yorix).',
      ],
    },
    {
      title: '10. Your rights',
      blocks: [
        {
          table: {
            head: ['Right', 'Response time'],
            rows: [
              ['Withdraw consent — in the same form it was given (in the App or through the “Write to us” form)', '15 days'],
              ['Get information about the processing of your data', '5 working days, free of charge'],
              ['Have inaccurate or outdated data changed', '15 days'],
              ['Get information about data provided to third parties (once a year free of charge)', '15 days'],
              ['Have processing stopped and data deleted', '15 days'],
              ['Appeal to the National Personal Data Protection Center of Belarus (cpd.by)', '—'],
            ],
          },
        },
        `10.1. Under Law 99-З a request is made in writing or as an electronic document and states your full name, address of residence (stay), date of birth, identification number (if given with the consent), the substance of the request and your signature (Article 14). For convenience we also handle, within the same times, requests sent through the [“Write to us”](${contact}) form on the website that state your account’s e-mail address, and we may ask you to confirm that the request comes from you.`,
      ],
    },
    {
      title: '11. Security',
      blocks: [
        '11.1. We encrypt data in transit (TLS); for Coach and AI credit requests the App also checks our server’s certificate (certificate pinning). We verify the App’s authenticity (Apple App Attest), restrict access to data to the people who need it for their work, and keep data no longer than necessary.',
        '11.2. We notify the National Personal Data Protection Center of a security breach without delay and within three working days, and you — without undue delay if the breach may affect your rights — in the App, by e-mail or on this page.',
      ],
    },
    {
      title: '12. Users in other countries',
      blocks: [
        '**EU, EEA and UK.** The controller is the person named in section 14. Legal bases under the GDPR and UK GDPR: performance of a contract (Article 6(1)(b)) — sign-in, purchases, support, diagnostics, weather; legal obligation (Article 6(1)(c)) — income accounting; legitimate interests (Article 6(1)(f)) — security and defending legal claims; consent (Article 6(1)(a)) and explicit consent for health data (Article 9(2)(a)) — the AI coach, information about the child in requests, analytics, attribution. You have the right to access, rectify and erase your data, restrict processing, data portability (including through the diary export), object to processing based on legitimate interests, withdraw consent and complain to the supervisory authority where you live. We reply within one month, and notify the supervisory authority of a security breach within 72 hours where the GDPR requires it.',
        '**Russian Federation.** The Operator is in the Republic of Belarus. Data of buyers and users from Russia is processed to perform the contract (Article 6(1)(5) of Federal Law No. 152-FZ of 27.07.2006 “On personal data”); the child’s health information and AI coach data only with your consent. The data is transferred to the Operator in Belarus and to the recipients in section 4, including in the USA, which may not ensure adequate protection of data subjects’ rights; the risks of such transfers are set out in clause 5.2. We answer requests about your data within 10 working days.',
        '**United States.** The child’s health information you enter is consumer health data under the laws of Washington, Nevada and Connecticut. We collect it from you for the features in section 3, share it only with the recipients in section 4, never sell it and never use it for advertising. You may learn what data we have and who received it, delete it and withdraw consent; if we decline a request, write to us with the subject “Appeal” and we will reply within 45 days. The Website does not track visitors across third-party sites, so Do Not Track signals do not change how it works.',
      ],
    },
    {
      title: '13. Changes',
      blocks: [
        '13.1. A new edition is published on this page with its date. We announce material changes in advance on this page or in the App. For new purposes we ask for new consent.',
      ],
    },
  ];
}

export function Privacy({ lang }: { lang: Lang }) {
  const ctx: Ctx = {
    operator: sellerLine(lang),
    offer: subscriptionPath(lang, '/offer'),
    contact: `${lang === 'ru' ? '/ru' : ''}/support#contact`,
  };
  return (
    <DocumentPage lang={lang} page="/privacy" title={privacyTitle[lang]} updated={editionLabel('privacy', lang)}>
      <LegalBody sections={lang === 'ru' ? ru(ctx) : en(ctx)} />
      <h2>{lang === 'ru' ? '14. Оператор' : '14. Operator'}</h2>
      <SellerBlock email={false} lang={lang} />
      <p>{lang === 'ru' ? 'По вопросам персональных данных напишите нам через форму «Написать нам» на странице поддержки.' : 'For personal data questions use the “Write to us” form on the support page.'}</p>
    </DocumentPage>
  );
}
