import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { sellsHere } from '../region';
import { LegalBody, type LegalSection } from './LegalBody';
import { sellerLine } from './SellerBlock';
import { editionLabel } from './versions';

export const termsTitle = { ru: 'Условия использования', en: 'Terms of use' } as const;

type Ctx = { seller: string; privacy: string; offer: string; payment: string; contact: string; web: boolean };

const appleEula = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
const appleSubscriptions = 'https://support.apple.com/118428';
const appleRefunds = 'https://reportaproblem.apple.com';

function ru({ seller, privacy, offer, payment, contact, web }: Ctx): LegalSection[] {
  return [
    {
      title: '1. Общие положения',
      blocks: [
        `1.1. Эти условия определяют порядок использования мобильного приложения «Yorix» и сайта yorix-app.com (вместе — Сервис), которые предоставляет ${seller} (далее — «мы»). Устанавливая или используя Сервис, вы принимаете эти условия. Если вы с ними не согласны, не пользуйтесь Сервисом.`,
        '1.2. Сервис предназначен для взрослых — родителей и других лиц, которые заботятся о ребёнке. Пользоваться им могут лица не моложе 18 лет.',
        `1.3. Как мы обрабатываем персональные данные, описано в [Политике обработки персональных данных](${privacy}).`,
        '1.4. **Права потребителя.** Ничто в этих условиях не ограничивает права, которые закон страны вашего проживания не позволяет ограничить или исключить договором, в том числе права потребителя. Каждое ограничение и исключение ответственности и гарантий в этих условиях действует только в пределах, допускаемых таким законом.',
      ],
    },
    {
      title: '2. Что такое Yorix и чем он не является',
      blocks: [
        '2.1. Yorix — информационный инструмент для родителей: дневник ухода за ребёнком, прогнозы сна, программы, статьи и ИИ-коуч.',
        '2.2. **Yorix не является медицинской помощью и медицинским изделием.** Сервис не ставит диагнозы, не назначает лечение и не заменяет консультацию врача. Пользование Сервисом не создаёт отношений «врач — пациент» ни с вами, ни с ребёнком.',
        '2.3. **Сервис не для экстренных ситуаций.** Если жизни или здоровью ребёнка угрожает опасность, звоните в скорую помощь по номеру 103 или 112 либо по местному номеру экстренной службы. Ни Сервис, ни ИИ-коуч, ни служба поддержки не являются экстренной линией.',
        '2.4. Не откладывайте обращение к врачу и не меняйте его назначения из-за сведений Сервиса — даже если статья, прогноз или ответ Коуча говорят иное.',
        '2.5. **Безопасный сон.** Сервис не является радионяней или монитором дыхания, не наблюдает за ребёнком и не может предупредить об опасности. Ответственность за безопасный сон и присмотр за ребёнком остаётся за взрослым, который о нём заботится. Напоминания и уведомления могут не сработать — не полагайтесь на них в вопросах безопасности ребёнка.',
        '2.6. Прогнозы и рекомендации — вероятностная оценка, а не предписание. Они строятся на ваших записях и общих возрастных нормах и могут не подойти конкретному ребёнку. Решения об уходе за ребёнком принимаете вы.',
      ],
    },
    {
      title: '3. ИИ-коуч',
      blocks: [
        "3.1. Ответы Коуча создаёт программа. Они могут содержать вымышленные факты, ссылки и объяснения, быть неточными, неполными или неподходящими для вашей ситуации, даже если звучат уверенно. Проверяйте существенную информацию независимо; не используйте ответ как единственное основание решения о здоровье или безопасности ребёнка. Ответ не проходит индивидуальную проверку врачом.",
        "3.2. Коуч предназначен для общей информации, а не для диагностики, назначения лечения или расчёта дозировок. Ограничители безопасности снижают риск, но не гарантируют обнаружения каждого опасного запроса или ответа. Мы вправе отказать в ответе или ограничить использование для безопасности и предотвращения злоупотреблений.",
        '3.3. Не сообщайте Коучу и не вносите в дневник сведения о других людях — например, о втором родителе или няне — без их согласия или иного законного основания.',
        '3.4. **ИИ-кредиты** — внутренняя единица учёта сообщений Коучу. Они не являются деньгами, не имеют денежной стоимости, не обмениваются на деньги и не передаются на другой аккаунт. Кредиты, входящие в подписку, обновляются каждый расчётный период и не переносятся на следующий; купленные пакеты кредитов не сгорают, пока существуют ваш аккаунт и Коуч.',
      ],
    },
    {
      title: '4. Правила использования',
      blocks: [
        '4.1. Сервис предназначен для личного некоммерческого использования.',
        '4.2. Нельзя нарушать работу Сервиса, обходить его защиту и ограничения, автоматически собирать данные, передавать доступ третьим лицам (кроме совместного ведения дневника со вторым взрослым через функцию совместного доступа), использовать материалы Сервиса и ответы Коуча для обучения моделей или создания конкурирующих продуктов, а также использовать Сервис с нарушением закона.',
        '4.3. Вы отвечаете за сохранность доступа к своему аккаунту Apple или Google и к своим устройствам.',
        '4.4. При нарушении этих условий мы вправе ограничить или прекратить доступ к Сервису (раздел 13).',
      ],
    },
    {
      title: '5. Ваш контент',
      blocks: [
        '5.1. Записи, заметки, фотографии и сообщения, которые вы вносите в Сервис (ваш контент), принадлежат вам.',
        '5.2. Вы предоставляете нам безвозмездную неисключительную лицензию хранить, обрабатывать и передавать ваш контент, в том числе нашим поставщикам из Политики обработки персональных данных, — только чтобы предоставлять вам Сервис, пока вы им пользуетесь, и в сроки хранения, указанные в Политике.',
        '5.3. Вы отвечаете за свой контент: он должен быть законным и не нарушать прав других людей. Фотографии других людей, кроме своего ребёнка, добавляйте только с их согласия.',
        "5.4. Основной дневник хранится на устройстве и в частной базе iCloud пользователя. У нас нет полной резервной копии для восстановления. Отдельные данные могут передаваться для ИИ и поддержки, как описано в Политике. Используйте доступный экспорт для собственной копии; мы не гарантируем восстановление удалённых записей.",
        '5.5. Отзывы и предложения, которые вы нам присылаете, мы можем использовать для улучшения Сервиса без вознаграждения.',
      ],
    },
    {
      title: '6. Права на Сервис',
      blocks: [
        `6.1. Права на Сервис — приложение, сайт, тексты, программы, иллюстрации, персонажей и алгоритмы — принадлежат нам или нашим правообладателям. Вы получаете личную непередаваемую лицензию на использование приложения на условиях [стандартного лицензионного соглашения Apple](${appleEula}).`,
      ],
    },
    {
      title: '7. Покупки',
      blocks: [
        `7.1. **Покупки через App Store.** Возврат денежных средств за подписки, программы и ИИ-кредиты, оплаченные через App Store, рассматривает и осуществляет Apple по своим правилам и применимому законодательству. Yorix не оформляет такие возвраты, не принимает решение об их одобрении или отказе и не может изменить решение Apple либо гарантировать результат или срок возврата. Направьте запрос на [странице Apple](${appleRefunds}); если запрос там недоступен, обратитесь в [поддержку Apple](https://getsupport.apple.com/). Подписки продлеваются автоматически, пока вы их не отмените в [настройках аккаунта Apple](${appleSubscriptions}). Отмена подписки прекращает будущее продление и сама по себе не возвращает уже уплаченные деньги. Пробный период, если он есть, переходит в платную подписку, если вы не отмените её до его окончания. Удаление приложения или аккаунта Yorix подписку не отменяет. Обязательные права потребителя сохраняются.`,
        '7.2. **Программы** покупаются разово. Покупка даёт бессрочный доступ к материалам этой программы на вашем аккаунте Apple, пока работает Сервис. Мы можем обновлять, дополнять и исправлять материалы программы, сохраняя её назначение.',
        ...(web ? [`7.3. Покупка подписки картой на сайте и подарочные подписки регулируются [публичным договором](${offer}) и страницей [«Оплата, доставка и возврат»](${payment}).`] : []),
        `${web ? '7.4' : '7.3'}. Цены, состав функций, способы оплаты и доступность покупок могут различаться по странам и меняться. Изменение цены не затрагивает уже оплаченный период.`,
      ],
    },
    {
      title: '8. Сторонние сервисы',
      blocks: [
        "8.1. Сервис зависит от Apple, Google, платёжных и инфраструктурных поставщиков, а также поставщиков ИИ. Их функции регулируются их условиями. Мы не гарантируем доступность сторонних систем и не контролируем решения их операторов; это не исключает наших обязанностей, которые закон возлагает на нас за привлечённых исполнителей или обработчиков данных.",
        '8.2. Ссылки на сторонние сайты и материалы приводятся для удобства; за их содержание мы не отвечаем.',
      ],
    },
    {
      title: '9. Доступность и изменения Сервиса',
      blocks: [
        "9.1. Доступность Сервиса не гарантируется непрерывно: возможны обновления, технические работы, сбои, ограничения сети, устройства или стороннего поставщика. Если отдельно письменно не согласовано иное, мы не предоставляем SLA или гарантированного времени ответа поддержки. Обязательные сроки рассмотрения законных требований сохраняются.",
        "9.2. Мы можем развивать и изменять функции, интерфейс, используемые модели ИИ, лимиты и поддерживаемые версии системы. Уже оплаченные права и обязательные средства защиты сохраняются; если существенная оплаченная функция прекращается, применяются правила возврата и закон.",
        '9.3. Мы можем прекратить работу Сервиса или отдельной функции. Когда это возможно, мы заранее сообщим об этом в Приложении или на сайте. Возврат за неиспользованный оплаченный период — по правилам Apple, публичного договора и закона.',
        '9.4. Функции, материалы и покупки могут быть доступны не во всех странах.',
      ],
    },
    {
      title: '10. Отказ от гарантий',
      blocks: [
        "10.1. В пределах, допускаемых законом, Сервис предоставляется «как есть» и «по мере доступности», без дополнительных гарантий точности, полноты, своевременности, пригодности для конкретной цели, совместимости с любым устройством, бесперебойности или отсутствия ошибок. Мы не гарантируем улучшение сна, здоровья, развития или иной индивидуальный результат. Демонстрационные примеры и отзывы отражают отдельные ситуации и не обещают аналогичного результата. Это не отменяет явно согласованные характеристики покупки и обязательные гарантии закона.",
      ],
    },
    {
      title: '11. Ограничение ответственности',
      blocks: [
        '11.1. В пределах, допускаемых законом (п. 1.4), мы не отвечаем:',
        {
          ul: [
            'за косвенные и последующие убытки и упущенную выгоду;',
            'за утрату данных, в том числе из-за сбоя устройства или iCloud либо удаления записей;',
            'за решения, принятые на основании сведений Сервиса без обращения к врачу;',
            'за работу и сбои сторонних сервисов (раздел 8);',
            'за последствия нарушения вами этих условий.',
          ],
        },
        "11.2. Только в пределах, допускаемых законом, совокупная ответственность по требованиям, связанным с Сервисом, ограничена большей из сумм: уплаченная вами за Сервис за 12 месяцев до события, вызвавшего требование, либо эквивалент 50 долларов США. Это ограничение не уменьшает обязательный возврат оплаты или иную сумму, которую закон не позволяет ограничить.",
        '11.3. Ограничения этого раздела не применяются к ответственности, которую закон не позволяет ограничить, — в том числе за вред жизни или здоровью, за умышленное нарушение и грубую неосторожность, — и не затрагивают прав потребителя (п. 1.4).',
      ],
    },
    {
      title: '12. Обстоятельства непреодолимой силы',
      blocks: [
        '12.1. Мы не отвечаем за неисполнение или задержку исполнения обязательств, вызванные обстоятельствами вне нашего разумного контроля, — на время их действия. К ним, в частности, относятся:',
        {
          ul: [
            'стихийные бедствия, пожары, наводнения, эпидемии и связанные с ними ограничения;',
            'военные действия, террористические акты, массовые беспорядки;',
            'акты органов власти, санкции, запреты и ограничения платежей, блокировка интернет-ресурсов;',
            'прекращение или массовые сбои сервисов Apple, Google, Cloudflare, OpenAI и других поставщиков инфраструктуры, ИИ и платежей, если мы не могли в разумный срок обеспечить работу иначе;',
            'аварии и сбои сетей связи, Интернета и электроснабжения;',
            'кибератаки, несмотря на принятые разумные меры защиты.',
          ],
        },
        "12.2. В предусмотренных законом пределах срок исполнения затронутого обязательства может быть продлён на время препятствия. Мы принимаем разумные меры для уменьшения последствий. Это положение не отменяет обязательных прав на расторжение и возврат и не продлевает сроки, которые закон запрещает продлевать.",
        ...(web ? ['12.3. Для покупок на сайте действует раздел 12 публичного договора, включая право отказаться от договора, если обстоятельства длятся больше 30 дней.'] : []),
      ],
    },
    {
      title: '13. Прекращение использования',
      blocks: [
        '13.1. Вы можете в любой момент перестать пользоваться Сервисом и удалить аккаунт и данные в Приложении. Удаление аккаунта не отменяет подписку App Store — отмените её в настройках аккаунта Apple.',
        '13.2. Мы вправе приостановить или прекратить ваш доступ при существенном или повторном нарушении этих условий или закона, при мошенничестве с платежами, а также если этого требует закон. Причину мы сообщим, если закон этого не запрещает.',
        '13.3. Разделы 5, 10, 11, 14, 16 и 17 действуют и после прекращения использования Сервиса.',
      ],
    },
    {
      title: '14. Возмещение',
      blocks: [
        "14.1. Ответственность пользователя за незаконное использование и нарушение прав третьих лиц определяется применимым законом. Для потребителя этот раздел не создаёт безусловной обязанности возмещать наши расходы, штрафы, судебные издержки или последствия наших собственных нарушений.",
      ],
    },
    {
      title: '15. Изменение условий',
      blocks: [
        '15.1. Мы можем изменять эти условия. Новая редакция публикуется на этой странице с датой. О существенных изменениях мы сообщаем заранее в Приложении или на сайте.',
        '15.2. Продолжая пользоваться Сервисом после вступления новой редакции в силу, вы её принимаете. Если вы не согласны, прекратите пользоваться Сервисом.',
      ],
    },
    {
      title: '16. Претензии и споры',
      blocks: [
        `16.1. Для урегулирования вопроса можно направить обращение через форму [«Написать нам»](${contact}), описав ситуацию и указав контакт для ответа. Мы рассматриваем требования в обязательные сроки, предусмотренные применимым законом. Обращение в поддержку не ограничивает право обратиться непосредственно в суд или надзорный орган.`,
        '16.2. Если спор не урегулирован, он рассматривается судом по правилам законодательства о гражданском судопроизводстве. Это не лишает потребителя права обратиться в суд напрямую и по месту своего жительства, если такое право дано ему законом.',
      ],
    },
    {
      title: '17. Применимое право',
      blocks: [
        "17.1. Эти условия регулируются правом Грузии. Выбор права не лишает потребителя защиты обязательных норм страны его обычного проживания, когда они применимы.",
      ],
    },
    {
      title: '18. Заключительные положения',
      blocks: [
        '18.1. Если какое-либо положение будет признано недействительным или неисполнимым, оно применяется в допустимой мере, а остальные сохраняют силу.',
        `18.2. Эти условия, Политика обработки персональных данных и правила Apple для покупок в App Store${web ? ', а для покупок на сайте — публичный договор,' : ''} составляют всё соглашение между вами и нами о Сервисе.${web ? ' При расхождении с публичным договором к покупке на сайте применяется договор.' : ''}`,
        '18.3. Если мы не воспользовались каким-либо правом, это не означает отказа от него.',
        '18.4. Вы не вправе передавать свои права и обязанности по этим условиям другому лицу. Мы вправе передать их лицу, которое продолжит работу Сервиса на условиях не хуже действующих, уведомив вас.',
        '18.5. Условия составлены на русском языке. Переводы предоставляются для удобства; при расхождении применяется русский текст.',
        `18.6. Вопросы об условиях направляйте через форму [«Написать нам»](${contact}).`,
      ],
    },
  ];
}

function en({ seller, privacy, offer, payment, contact, web }: Ctx): LegalSection[] {
  return [
    {
      title: '1. General',
      blocks: [
        `1.1. These terms govern the use of the Yorix mobile app and the yorix-app.com site (together, the “Service”) provided by ${seller} (“we”). By installing or using the Service you accept these terms. If you do not agree, do not use the Service.`,
        '1.2. The Service is for adults — parents and others caring for a child. You must be at least 18 to use it.',
        `1.3. How we process personal data is described in the [Personal data policy](${privacy}).`,
        '1.4. **Consumer rights.** Nothing in these terms limits rights that the law of your country of residence does not allow a contract to limit or exclude, including consumer rights. Every limitation and exclusion of liability and warranties in these terms applies only to the extent that law allows.',
      ],
    },
    {
      title: '2. What Yorix is and is not',
      blocks: [
        '2.1. Yorix is an information tool for parents: a baby care diary, sleep forecasts, programs, articles and an AI coach.',
        '2.2. **Yorix is not medical care and not a medical device.** The Service does not diagnose, prescribe treatment or replace a doctor’s advice. Using it creates no doctor–patient relationship with you or your child.',
        '2.3. **Not for emergencies.** If a child’s life or health is at risk, call emergency services on 103 or 112, or your local emergency number. Neither the Service, the AI coach nor support is an emergency line.',
        '2.4. Never delay seeing a doctor or change a doctor’s instructions because of the Service — even if an article, a forecast or a Coach answer suggests otherwise.',
        '2.5. **Safe sleep.** The Service is not a baby monitor or breathing monitor, does not watch the child and cannot warn of danger. Responsibility for safe sleep and supervision stays with the adult caring for the child. Reminders and notifications may fail — do not rely on them for the child’s safety.',
        '2.6. Forecasts and recommendations are probabilistic estimates, not instructions. They are based on your records and general age norms and may not fit a particular child. You make the decisions about your child’s care.',
      ],
    },
    {
      title: '3. AI coach',
      blocks: [
        "3.1. Coach responses are generated by software. They may include invented facts, references or explanations and may be inaccurate, incomplete or unsuitable, even when confident. Independently check important information; do not use a response as the sole basis for decisions about a child’s health or safety. Responses are not individually reviewed by a clinician.",
        "3.2. The Coach is intended for general information, not diagnosis, treatment or medication dosing. Safety measures reduce risk but cannot guarantee detection of every unsafe request or response. We may refuse a response or limit use for safety and abuse prevention.",
        '3.3. Do not tell the Coach or enter in the diary information about other people — for example, the other parent or a nanny — without their consent or another lawful basis.',
        '3.4. **AI credits** are an internal unit for counting messages to the Coach. They are not money, have no cash value, cannot be exchanged for money and cannot be moved to another account. Credits included in a subscription refresh every billing period and do not carry over; purchased credit packs do not expire while your account and the Coach exist.',
      ],
    },
    {
      title: '4. Rules of use',
      blocks: [
        '4.1. The Service is for personal, non-commercial use.',
        '4.2. You may not disrupt the Service, circumvent its protection or limits, scrape data automatically, share access with third parties (except keeping the diary together with a second adult through the sharing feature), use Service materials or Coach answers to train models or build competing products, or use the Service unlawfully.',
        '4.3. You are responsible for keeping access to your Apple or Google account and your devices secure.',
        '4.4. If these terms are breached, we may restrict or end access to the Service (section 13).',
      ],
    },
    {
      title: '5. Your content',
      blocks: [
        '5.1. The records, notes, photos and messages you enter in the Service (your content) belong to you.',
        '5.2. You grant us a free, non-exclusive licence to store, process and transmit your content, including to our providers listed in the Personal data policy, solely to provide the Service to you, while you use it and for the retention periods in that policy.',
        '5.3. You are responsible for your content: it must be lawful and must not infringe other people’s rights. Add photos of people other than your child only with their consent.',
        "5.4. The primary diary is stored on the user’s device and in their private iCloud database. We do not hold a complete backup for restoration. Selected data may be transmitted for AI and support as described in the Policy. Use the available export to keep your own copy; restoration of deleted entries is not guaranteed.",
        '5.5. We may use feedback and suggestions you send us to improve the Service without payment.',
      ],
    },
    {
      title: '6. Rights to the Service',
      blocks: [
        `6.1. The rights to the Service — the app, the site, texts, programs, illustrations, characters and algorithms — belong to us or our licensors. You receive a personal, non-transferable licence to use the app under [Apple’s standard licence agreement](${appleEula}).`,
      ],
    },
    {
      title: '7. Purchases',
      blocks: [
        `7.1. **Purchases through the App Store.** Apple reviews and processes monetary refunds for subscriptions, programs and AI credits billed through the App Store under its rules and applicable law. Yorix does not issue these refunds, decide whether to approve or decline them, or override Apple’s decision, and cannot guarantee a refund or its timing. Submit a request on [Apple’s refund page](${appleRefunds}); if a request is unavailable there, contact [Apple Support](https://getsupport.apple.com/). Subscriptions renew automatically until cancelled in [your Apple Account settings](${appleSubscriptions}). Cancellation stops future renewal and does not itself refund an existing charge. A trial, if offered, becomes a paid subscription unless cancelled before it ends. Deleting the app or your Yorix account does not cancel a subscription. Mandatory consumer rights remain unaffected.`,
        '7.2. **Programs** are one-time purchases. A purchase gives lifetime access to that program’s content on your Apple Account for as long as the Service operates. We may update, extend and correct a program’s content while keeping its purpose.',
        ...(web ? [`7.3. Buying a subscription by card on the website and gift subscriptions are governed by the [public offer](${offer}) and the [“Payment, delivery and refunds”](${payment}) page.`] : []),
        `${web ? '7.4' : '7.3'}. Prices, features, payment methods and the availability of purchases may differ by country and may change. A price change does not affect a period already paid for.`,
      ],
    },
    {
      title: '8. Third-party services',
      blocks: [
        "8.1. The Service depends on Apple, Google, payment and infrastructure providers and AI suppliers. Their features are subject to their terms. We do not guarantee their availability or control their operators’ decisions; this does not exclude duties the law imposes on us for contractors or data processors.",
        '8.2. Links to third-party sites and materials are provided for convenience; we are not responsible for their content.',
      ],
    },
    {
      title: '9. Availability and changes to the Service',
      blocks: [
        "9.1. Continuous availability is not guaranteed: updates, maintenance, failures and network, device or supplier restrictions may occur. Unless separately agreed in writing, we provide no uptime SLA or guaranteed support response time. Mandatory deadlines for legal requests remain applicable.",
        "9.2. We may develop or change features, interfaces, AI models, limits and supported operating-system versions. Paid entitlements and mandatory remedies remain protected; refund rules and law apply if a material paid feature is discontinued.",
        '9.3. We may discontinue the Service or a feature. Where feasible, we will give notice in advance in the App or on the site. Refunds for an unused paid period follow Apple’s rules, the public offer and the law.',
        '9.4. Features, content and purchases may not be available in every country.',
      ],
    },
    {
      title: '10. No warranty',
      blocks: [
        "10.1. To the extent permitted by law, the Service is provided as is and as available, without additional warranties of accuracy, completeness, timeliness, fitness for a particular purpose, compatibility with every device, uninterrupted operation or freedom from errors. We do not guarantee improved sleep, health, development or other individual outcomes. Examples and testimonials describe individual situations and do not promise similar results. Expressly agreed purchase features and mandatory statutory warranties remain unaffected.",
      ],
    },
    {
      title: '11. Limitation of liability',
      blocks: [
        '11.1. To the extent the law allows (clause 1.4), we are not liable for:',
        {
          ul: [
            'indirect or consequential losses and lost profits;',
            'lost data, including through a device or iCloud failure or deleted records;',
            'decisions made on the basis of the Service without seeing a doctor;',
            'the operation and outages of third-party services (section 8);',
            'the consequences of your breach of these terms.',
          ],
        },
        "11.2. Only to the extent permitted by law, aggregate liability for claims connected with the Service is limited to the greater of the amount you paid for the Service in the 12 months before the event giving rise to the claim or the equivalent of USD 50. This limit does not reduce a mandatory refund or any other amount that cannot lawfully be limited.",
        '11.3. The limits in this section do not apply to liability that the law does not allow to be limited — including for harm to life or health, intentional breach and gross negligence — and do not affect consumer rights (clause 1.4).',
      ],
    },
    {
      title: '12. Force majeure',
      blocks: [
        '12.1. We are not liable for non-performance or delayed performance caused by circumstances beyond our reasonable control, for as long as they last. These include, in particular:',
        {
          ul: [
            'natural disasters, fires, floods, epidemics and related restrictions;',
            'war, terrorist acts, riots;',
            'acts of authorities, sanctions, payment bans and restrictions, blocking of internet resources;',
            'discontinuation or mass outages of the services of Apple, Google, Cloudflare, OpenAI and other infrastructure, AI and payment providers, where we could not keep the Service running by other means within a reasonable time;',
            'failures of telecom networks, the Internet and power supply;',
            'cyberattacks despite reasonable protective measures.',
          ],
        },
        "12.2. Where law permits, the affected obligation may be delayed for the duration of the impediment. We take reasonable measures to mitigate its effects. This does not remove mandatory termination or refund rights or extend deadlines that cannot lawfully be extended.",
        ...(web ? ['12.3. Purchases on the website follow section 12 of the public offer, including the right to withdraw if the circumstances last more than 30 days.'] : []),
      ],
    },
    {
      title: '13. Termination',
      blocks: [
        '13.1. You may stop using the Service at any time and delete your account and data in the App. Deleting the account does not cancel an App Store subscription — cancel it in your Apple Account settings.',
        '13.2. We may suspend or end your access for a material or repeated breach of these terms or the law, for payment fraud, or where the law requires it. We will tell you the reason unless the law prohibits it.',
        '13.3. Sections 5, 10, 11, 14, 16 and 17 survive the end of your use of the Service.',
      ],
    },
    {
      title: '14. Indemnity',
      blocks: [
        "14.1. A user’s liability for unlawful use or infringement of third-party rights is determined by applicable law. For a consumer, this section creates no unconditional duty to pay our costs, penalties, legal fees or losses caused by our own breach.",
      ],
    },
    {
      title: '15. Changes to the terms',
      blocks: [
        '15.1. We may change these terms. A new edition is published on this page with its date. We announce material changes in advance in the App or on the site.',
        '15.2. By continuing to use the Service after a new edition takes effect, you accept it. If you do not agree, stop using the Service.',
      ],
    },
    {
      title: '16. Claims and disputes',
      blocks: [
        `16.1. You may seek resolution through the [support form](${contact}), describing the issue and providing a reply contact. We handle legal requests within mandatory applicable deadlines. Contacting support does not limit direct access to a court or supervisory authority.`,
        '16.2. If the dispute is not settled, it is heard by a court under the law on civil proceedings. This does not deprive a consumer of the right to go to court directly and at their place of residence where the law gives them that right.',
      ],
    },
    {
      title: '17. Governing law',
      blocks: [
        "17.1. Georgian law governs these terms. This choice does not deprive consumers of mandatory protections of their habitual residence where applicable.",
      ],
    },
    {
      title: '18. Final provisions',
      blocks: [
        '18.1. If any provision is held invalid or unenforceable, it applies to the extent permitted and the rest remain in force.',
        `18.2. These terms, the Personal data policy and Apple’s rules for App Store purchases${web ? ', together with the public offer for purchases on the website,' : ''} are the entire agreement between you and us about the Service.${web ? ' Where they differ from the public offer, the offer governs a purchase on the website.' : ''}`,
        '18.3. If we do not exercise a right, that does not mean we waive it.',
        '18.4. You may not assign your rights and obligations under these terms. We may assign them to a person who will continue the Service on terms no worse than these, notifying you.',
        '18.5. These terms are written in Russian. Translations are provided for convenience; in case of discrepancy the Russian text prevails.',
        `18.6. Questions about these terms: use the [“Write to us”](${contact}) form.`,
      ],
    },
  ];
}

export async function Terms({ lang }: { lang: Lang }) {
  const ctx: Ctx = {
    seller: sellerLine(lang, true),
    privacy: subscriptionPath(lang, '/privacy'),
    offer: subscriptionPath(lang, '/offer'),
    payment: subscriptionPath(lang, '/payment'),
    contact: `${lang === 'ru' ? '/ru' : ''}/support#contact`,
    web: await sellsHere(),
  };
  return (
    <DocumentPage lang={lang} page="/terms" title={termsTitle[lang]} updated={editionLabel('terms', lang)}>
      <LegalBody sections={lang === 'ru' ? ru(ctx) : en(ctx)} />
    </DocumentPage>
  );
}
