import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { LegalBody, type LegalSection } from './LegalBody';
import { SellerBlock, sellerLine } from './SellerBlock';
import { editionLabel } from './versions';

export const offerTitle = { ru: 'Публичный договор (оферта)', en: 'Public offer agreement' } as const;

type Ctx = { payment: string; privacy: string; seller: string };

function ru({ payment, privacy, seller }: Ctx): LegalSection[] {
  return [
    {
      title: '1. Общие положения',
      blocks: [
        `1.1. Настоящий документ — предложение ${seller} (далее — Исполнитель, Yorix) заключить дистанционный договор на изложенных ниже условиях (далее — Договор) с дееспособным физическим лицом не моложе 18 лет (далее — Пользователь). Регистрационные и контактные данные Исполнителя приведены в разделе 17.`,
        "1.2. Пользователь принимает оферту, отмечая согласие с Договором перед оплатой. Договор заключается после подтверждения успешной реальной оплаты Платёжным сервисом. Тестовые операции не являются оплатой и не создают платной подписки.",
        "1.3. Договор регулирует покупки на Сайте. Покупки в App Store оформляются через Apple и регулируются также её условиями. Доступные способы оплаты зависят от страны и фактически подключённого Платёжного сервиса.",
        `1.4. Неотъемлемая часть Договора — страница [«Оплата, доставка и возврат»](${payment}). Персональные данные, необходимые для заключения и исполнения Договора, обрабатываются на основании Договора в порядке, описанном в [Политике обработки персональных данных](${privacy}). Сведения о здоровье ребёнка и данные для ИИ-функций обрабатываются только с отдельного согласия Пользователя; принятие Договора таким согласием не является.`,
        '1.5. К Договору применяется редакция оферты, действовавшая в момент оплаты. Дата редакции указана в начале документа.',
      ],
    },
    {
      title: '2. Термины',
      blocks: [
        {
          ul: [
            '**Сервис** — мобильное приложение «Yorix» для iPhone и iPad (далее — Приложение) и связанные с ним онлайн-сервисы, включая сайт yorix-app.com (далее — Сайт).',
            '**Аккаунт** — учётная запись Пользователя в Сервисе, созданная входом через Apple («Вход с Apple»).',
            '**Подписка** — предоставляемый за плату на Период доступа доступ к платным функциям Сервиса: ИИ-коучу, персональному прогнозу следующего сна, аналитике дневника и ежедневным рекомендациям (далее — Основные функции) в объёме, описанном на странице тарифов Сайта на дату оплаты. Программы из раздела «Программы» в Подписку не входят.',
            '**Период доступа** — 7, 30 или 365 календарных суток, исчисляемых с момента активации Подписки; сутки — 24 часа.',
            '**Платёжный сервис** — процессинговая система и банк-эквайер, через которые принимается оплата; они указаны на странице «Оплата, доставка и возврат».',
            '**ИИ-коуч (Коуч)** — функция Сервиса, формирующая ответы автоматически с помощью моделей искусственного интеллекта, в том числе сторонних поставщиков.',
            '**Прогнозы** — рассчитанные алгоритмом окна сна и бодрствования, план дня и иные расчётные показатели.',
          ],
        },
      ],
    },
    {
      title: '3. Предмет Договора и характер Сервиса',
      blocks: [
        '3.1. Исполнитель предоставляет Пользователю на Период доступа доступ к платным функциям Сервиса на Аккаунте, от имени которого совершена оплата, а Пользователь оплачивает его. В составе доступа Пользователю предоставляется простая (неисключительная), непередаваемая лицензия на использование Приложения в объёме, необходимом для платных функций, на срок Периода доступа, без права сублицензирования. Вознаграждение за лицензию включено в цену Подписки.',
        '3.2. Услуга оказывается дистанционно через сеть Интернет; физические носители не передаются. Для работы нужны iPhone или iPad с iOS 18 или новее, Приложение из App Store и вход в Аккаунт.',
        '3.3. **Сервис не является медицинской помощью.** Сервис — информационно-справочный инструмент для родителей: он помогает вести дневник ухода за ребёнком и получать общие сведения и ориентиры по режиму сна и бодрствования, сформированные автоматически на основании введённых Пользователем данных. Исполнитель не является медицинской организацией или медицинским работником, не оказывает медицинскую и психологическую помощь, не ставит диагнозы и не назначает лечение. Сервис не является медицинским изделием и не предназначен для диагностики, мониторинга, профилактики или лечения заболеваний.',
        '3.4. Информация Сервиса — статьи, аналитика, Прогнозы, ответы Коуча — носит общий характер и не заменяет консультацию врача-педиатра, которому известны состояние и история здоровья ребёнка. Не откладывайте обращение к врачу и не изменяйте его назначения на основании сведений Сервиса. Показатели, которые Пользователь вносит в дневник (температура, рост, вес, симптомы и др.), отображаются для удобства и не получают медицинской оценки.',
        '3.5. **Сервис не предназначен для экстренных ситуаций.** Если жизни или здоровью ребёнка угрожает опасность, немедленно вызовите скорую помощь по номеру 103 или 112 либо по местному номеру экстренной службы. Ни Коуч, ни служба поддержки не работают как экстренная линия.',
        '3.6. **Безопасный сон.** Сервис не является радионяней или монитором дыхания, не наблюдает за ребёнком в реальном времени и не может обнаружить или предотвратить синдром внезапной детской смерти или иные опасные состояния. Рекомендации о режиме не заменяют правил безопасного сна и присмотра взрослого. Напоминания и уведомления могут не сработать из-за настроек устройства или сбоев связи — не полагайтесь на них в вопросах безопасности ребёнка.',
        "3.7. ИИ-коуч предназначен для общей информации, а не для диагностики, лечения и дозировок лекарств. Ответы создаются автоматически и не проходят индивидуальную проверку врачом; они могут быть ошибочными, вымышленными, неполными или неподходящими, даже если звучат уверенно. Ограничители безопасности не гарантируют обнаружения каждого опасного ответа. Не используйте ответ как единственное основание решения о здоровье или безопасности ребёнка.",
        '3.8. **Прогнозы** — вероятностная оценка, а не предписание. Их точность зависит от полноты и своевременности записей, а фактическое поведение ребёнка может от них отличаться. Исполнитель не гарантирует конкретного результата, например продолжительности сна.',
        '3.9. Для стабильной работы и защиты от злоупотреблений Исполнитель вправе устанавливать разумные ограничения использования Коуча (например, число сообщений за период). Действующие ограничения отображаются в Приложении.',
      ],
    },
    {
      title: '4. Цена и порядок оплаты',
      blocks: [
        '4.1. Цена Подписки указывается на странице тарифов Сайта в валюте страны покупателя — в белорусских или российских рублях. Перед оплатой Пользователю показывается сумма к списанию; если валюта списания отличается от валюты карты, сумму в валюте карты и комиссию определяет банк, выпустивший карту. Цены для отдельных категорий потребителей устанавливаются решением Исполнителя.',
        '4.2. Цена фиксируется на момент оплаты. Её последующее изменение не влияет на оплаченные Подписки.',
        '4.3. Оплата производится банковской платёжной картой через Платёжный сервис на его защищённой странице. Данные карты вводятся только на стороне Платёжного сервиса; Исполнитель их не получает и не хранит.',
        '4.4. **Платёж разовый.** Автоматическое продление и повторные списания не производятся. Для продления Пользователь оформляет новый заказ.',
        "4.5. Подтверждение операции выдаётся Платёжным сервисом. Документы о покупке и реквизиты продавца предоставляются в порядке, предусмотренном применимым законодательством; запрос можно направить через форму поддержки.",
        '4.6. Если цена указана с явной технической ошибкой, Исполнитель сообщает об этом Пользователю. Пользователь вправе подтвердить заказ по правильной цене или отказаться от него с полным возвратом оплаты.',
      ],
    },
    {
      title: '5. Предоставление доступа',
      blocks: [
        '5.1. Подписка активируется автоматически после получения Исполнителем от Платёжного сервиса подтверждения успешной оплаты и привязывается к Аккаунту, от имени которого совершена оплата. Период доступа исчисляется с момента активации. Для подарка действуют п. 5.7–5.10.',
        "5.2. Если Подписка не активировалась после оплаты, Пользователь сообщает об этом через форму «Написать нам» на Сайте либо по контакту Исполнителя (раздел 17). Исполнитель проверяет платёж и устраняет проблему в разумный срок с соблюдением обязательных требований закона. Если доступ не предоставлен, Пользователь вправе потребовать возврат по разделу 7.",
        '5.3. Если на момент оплаты у Пользователя есть действующая Подписка, новый Период доступа начинается после окончания текущего.',
        '5.4. Услуга считается оказанной надлежащим образом, если в течение Периода доступа платные функции доступны на Аккаунте Пользователя. Факт предоставления доступа подтверждается журналами Сервиса и Платёжного сервиса; это не лишает Пользователя права представлять иные доказательства.',
        '5.5. По окончании Периода доступа платные функции отключаются. Бесплатные функции и данные, внесённые Пользователем, сохраняются.',
        '5.6. Покупки в App Store совершаются по правилам Apple: списания, отмена автопродления и возвраты по ним осуществляются через Apple. Покупка на Сайте не отменяет автопродление подписки App Store.',
        '5.7. **Подписка в подарок.** Пользователь может оплатить Подписку на 30 или 365 суток для другого лица. Вход в Аккаунт для покупки подарка не требуется — Пользователь указывает только адрес электронной почты. После оплаты ссылка, код и открытка с кодом показываются Пользователю на странице результата оплаты и остаются доступны на странице подарка в браузере, в котором совершена оплата; ссылка, код и подтверждение оплаты, кроме того, направляются на указанный адрес. Передать подарок получателю — забота Пользователя: Исполнитель получателю ничего не направляет.',
        '5.8. Код действует 12 месяцев с даты оплаты и активируется один раз: получатель переходит по ссылке или вводит код на Сайте и входит через Apple, после чего Период доступа начинается на его Аккаунте, а если у получателя уже есть Подписка, оплаченная на Сайте, — добавляется к ней. Активировать код может любой, у кого есть ссылка или код, поэтому Пользователь передаёт их только получателю. До активации Пользователь может заменить код на странице подарка — прежние ссылка и код перестают действовать. Исполнитель не отвечает за активацию кода лицом, которому ссылку или код передал Пользователь или получатель. Код, не активированный в этот срок, прекращает действие; Пользователь вправе отказаться от Договора с возвратом в порядке раздела 7.',
        '5.9. В течение 6 месяцев с даты оплаты и до активации кода Пользователь вправе отказаться от Договора с возвратом полной стоимости подарка, код при этом аннулируется. По истечении этого срока неактивированный код продолжает действовать до конца срока, указанного в п. 5.8, но добровольный возврат не производится; обязательные права на возврат сохраняются. После активации отказ и возврат производятся в порядке раздела 7, доступ получателя при этом прекращается.',
        '5.10. Стороной Договора остаётся Пользователь, оплативший подарок. Получатель пользуется Подпиской на условиях этой оферты и условий использования Сервиса.',
      ],
    },
    {
      title: '6. Доступность Сервиса',
      blocks: [
        '6.1. Исполнитель стремится обеспечивать круглосуточную работу Сервиса. Возможны перерывы на технические работы и по обстоятельствам раздела 12.',
        '6.2. Работа Сервиса зависит от средств, которые Пользователь использует самостоятельно: устройства и его операционной системы, операторов связи, App Store, аккаунта Apple и iCloud.',
      ],
    },
    {
      id: 'refunds',
      title: '7. Отказ от Договора и возврат денежных средств',
      blocks: [
        "7.1. Пользователь вправе отказаться от Договора, направив однозначное заявление через форму поддержки или по контакту из раздела 17 с номером заказа и сведениями, необходимыми для поиска платежа. Причину отказа можно не указывать. Законное право на отказ от дистанционного договора в течение 14 календарных дней применяется в предусмотренных законом случаях; эти условия не устанавливают отказ от такого права.",
        "7.2. Если применяется законное право на отказ, размер возврата и допустимость удержаний определяются обязательными нормами. Само включение доступа или принятие общей оферты не означает отказа от права на возврат. Вне обязательных случаев полного возврата при досрочном отказе возвращается стоимость неиспользованных полных суток: цена × оставшиеся полные сутки ÷ сутки оплаченного периода.",
        '7.3. Уплаченная сумма возвращается **полностью**, если: (а) Подписка не была активирована; (б) списание повторное или ошибочное — в размере лишнего платежа; (в) услуга оказана с существенными недостатками или Договор расторгается по вине Исполнителя; (г) в иных случаях, предусмотренных законодательством.',
        "7.4. Возврат производится на исходное средство оплаты в валюте фактического списания не позднее 14 календарных дней с момента получения заявления, если закон не требует более короткого срока. Срок отражения возврата в выписке зависит от банка. Мы не взимаем отдельную комиссию за возврат и не заменяем обязательный денежный возврат бонусами.",
        '7.5. Права Пользователя при недостатках услуги (безвозмездное устранение, уменьшение цены, возврат) и сроки их удовлетворения определяются законодательством о защите прав потребителей.',
        '7.6. **Оспаривание платежа (chargeback).** Прежде чем оспаривать платёж в банке, обратитесь к Исполнителю: большинство вопросов решается быстрее напрямую. На время разбирательства Исполнитель вправе приостановить доступ, оплаченный оспариваемым платежом, и передать Платёжному сервису и банку сведения о заказе, активации и использовании Подписки в объёме, необходимом для разбирательства. Если платёж возвращён Пользователю, доступ за соответствующий период прекращается.',
      ],
    },
    {
      title: '8. Права и обязанности Сторон',
      blocks: [
        '8.1. Исполнитель обязуется: активировать Подписку в сроки раздела 5; обеспечивать доступ к платным функциям в течение Периода доступа с учётом раздела 6; рассматривать обращения Пользователя; обрабатывать персональные данные в соответствии с законодательством и Политикой обработки персональных данных.',
        '8.2. Исполнитель вправе: развивать Сервис, добавлять, изменять и заменять функции с соблюдением раздела 13; проводить технические работы; приостанавливать и прекращать доступ в случаях раздела 9; привлекать третьих лиц к обеспечению работы Сервиса, оставаясь ответственным за их действия перед Пользователем.',
        '8.3. Пользователь обязуется: оплачивать Подписку и использовать Сервис в соответствии с Договором и законодательством; входить с тем Аккаунтом, на котором должна действовать Подписка; обеспечивать конфиденциальность доступа к своему аккаунту Apple и устройствам и незамедлительно сообщать о несанкционированном доступе; вносить достоверные сведения; соблюдать правила использования (раздел 9).',
        '8.4. Пользователь вправе: пользоваться платными функциями в течение Периода доступа; отказаться от Договора (раздел 7); удалить Аккаунт и данные в Приложении; получать информацию о Сервисе и об обработке своих персональных данных.',
      ],
    },
    {
      title: '9. Правила использования, приостановление и прекращение доступа',
      blocks: [
        '9.1. Сервис используется для личных некоммерческих целей, связанных с уходом за ребёнком. Запрещается:',
        {
          ul: [
            'передавать, продавать или иным образом предоставлять Подписку и доступ к Аккаунту третьим лицам, кроме совместного ведения дневника со вторым родителем или иным взрослым, заботящимся о ребёнке, через функцию совместного доступа;',
            'копировать, изменять и распространять Сервис и его материалы, декомпилировать и выполнять обратную разработку программного обеспечения, кроме случаев, прямо разрешённых законодательством;',
            'использовать роботов, парсеры и иные автоматизированные средства доступа и сбора данных, в том числе для массовых запросов к Коучу;',
            'использовать материалы Сервиса, ответы Коуча и Прогнозы для обучения моделей машинного обучения или создания конкурирующих продуктов;',
            'обходить лимиты, технические, платёжные и защитные механизмы, в том числе защитные механизмы Коуча, и пытаться получить его служебные инструкции;',
            'вмешиваться в работу Сервиса, получать неправомерный доступ к данным других пользователей, распространять вредоносное программное обеспечение;',
            'совершать мошеннические действия с платежами и возвратами;',
            'выдавать сведения Сервиса за заключение специалиста;',
            'вносить в Сервис сведения о других лицах без законных оснований.',
          ],
        },
        '9.2. При нарушении п. 9.1 (мошенническая оплата, передача доступа, автоматизированный сбор данных, обход защиты, атаки на Сервис) Исполнитель вправе приостановить доступ до выяснения обстоятельств, сообщив Пользователю причину.',
        "9.3. При подтверждённом существенном нарушении, которое не устранено после уведомления, Исполнитель вправе прекратить доступ в допускаемом законом порядке. При угрозе безопасности или мошенничестве допускается немедленное ограничение. Обязательные права на возврат сохраняются; убытки взыскиваются только при наличии законных оснований.",
      ],
    },
    {
      title: '10. Интеллектуальная собственность и данные Пользователя',
      blocks: [
        '10.1. Исключительные права на Сервис — Приложение, Сайт, программный код, дизайн, тексты, статьи, иллюстрации, персонажей, методику и алгоритмы Прогнозов, инструкции Коуча, товарные знаки — принадлежат Исполнителю или его правообладателям. Оплата Подписки не передаёт Пользователю права на эти объекты, кроме лицензии по п. 3.1.',
        '10.2. Права на сведения, которые Пользователь вносит в дневник, и на его сообщения Коучу принадлежат Пользователю в той мере, в какой такие права существуют. Исполнитель использует их только для работы Сервиса, исполнения Договора и обеспечения безопасности; персональные данные обрабатываются по основаниям, указанным в Политике обработки персональных данных и отдельных согласиях.',
        '10.3. Исполнитель не продаёт данные дневника и не использует сведения о здоровье ребёнка для рекламы.',
        '10.4. Отзывы и предложения, направленные Исполнителю, могут использоваться для улучшения Сервиса без выплаты вознаграждения. Публикация отзыва с именем Пользователя или сведениями о ребёнке допускается только с отдельного согласия Пользователя.',
      ],
    },
    {
      title: '11. Ответственность',
      blocks: [
        "11.1. Ответственность определяется применимым законодательством. Ничто в Договоре не исключает ответственность за умысел, грубую неосторожность, причинение вреда жизни или здоровью либо иную ответственность, которую закон запрещает ограничивать.",
        '11.2. Исполнитель не несёт ответственности за неисполнение или ненадлежащее исполнение обязательств, если оно произошло: вследствие непреодолимой силы (раздел 12); по вине Пользователя, в том числе из-за внесения недостоверных сведений или нарушения правил использования, доведённых до его сведения; вследствие действий третьих лиц, не привлечённых Исполнителем к исполнению Договора.',
        '11.3. Исполнитель не отвечает за неработоспособность оборудования, программного обеспечения и каналов связи Пользователя, за сохранность данных на устройствах Пользователя и в его iCloud, к которым Исполнитель не имеет доступа, за последствия утраты Пользователем доступа к своему аккаунту Apple, а также за решения, принятые Пользователем вопреки разделу 3 без обращения к врачу.',
        "11.4. В допустимых законом пределах исключаются косвенные убытки и упущенная выгода; совокупная ответственность ограничена большей из сумм: оплата за Сервис за 12 месяцев до события либо эквивалент 50 долларов США. Ограничение не применяется к обязательным возвратам и случаям из п. 11.1. Дополнительные гарантии точности прогнозов, результата, непрерывной доступности и пригодности для конкретного ребёнка не предоставляются.",
      ],
    },
    {
      title: '12. Обстоятельства непреодолимой силы',
      blocks: [
        '12.1. Стороны освобождаются от ответственности за полное или частичное неисполнение обязательств, если оно вызвано обстоятельствами непреодолимой силы — чрезвычайными и непредотвратимыми при данных условиях обстоятельствами, возникшими после заключения Договора.',
        '12.2. К таким обстоятельствам Стороны, в частности, относят, если они отвечают признакам п. 12.1:',
        {
          ul: [
            'стихийные бедствия, пожары, наводнения, эпидемии и связанные с ними ограничительные меры;',
            'военные действия, террористические акты, массовые беспорядки, забастовки;',
            'акты органов власти Грузии, других государств и международных организаций, делающие исполнение невозможным или незаконным, в том числе санкции и иные ограничительные меры, запреты и ограничения платежей, блокировку интернет-ресурсов;',
            'прекращение, приостановление или существенное ограничение услуг банков, платёжных систем, магазинов приложений, служб авторизации, облачной инфраструктуры и поставщиков технологий искусственного интеллекта по причинам, не зависящим от Исполнителя (санкции, решения органов власти, массовый сбой у поставщика), если Исполнитель не мог в разумный срок обеспечить исполнение иными доступными способами;',
            'крупные аварии и массовые сбои сетей связи, Интернета, электроснабжения, центров обработки данных;',
            'кибератаки (DDoS-атаки, вредоносное программное обеспечение, неправомерный доступ), если Исполнитель принял разумные меры защиты.',
          ],
        },
        "12.3. Сторона уведомляет о препятствии в разумный срок и принимает разумные меры для уменьшения последствий. Продление затронутого срока допускается только в пределах закона и не отменяет обязательных прав на возврат.",
        '12.4. Если обстоятельства длятся более 30 дней, каждая Сторона вправе отказаться от Договора; Пользователю возвращается стоимость неиспользованной части Периода доступа.',
        "12.5. Обстоятельства подтверждаются относимыми доказательствами, включая официальные акты и сообщения поставщиков. Обычная техническая ошибка или отсутствие денег сами по себе не освобождают от обязательств. Обязательные права на возврат сохраняются.",
      ],
    },
    {
      title: '13. Изменение оферты и Сервиса',
      blocks: [
        '13.1. Исполнитель вправе изменять оферту. Новая редакция публикуется на Сайте с датой и применяется к договорам, заключённым после её опубликования.',
        '13.2. К Договорам с неистекшим Периодом доступа новая редакция применяется только в части, которая не ухудшает положение Пользователя (не увеличивает цену, не сокращает оплаченный объём платных функций, не возлагает новых обязанностей), либо обусловлена требованиями законодательства.',
        '13.3. При прекращении работы Сервиса Исполнитель либо обеспечивает доступ до окончания оплаченных Периодов, либо возвращает стоимость неиспользованных полных суток.',
        '13.4. Исполнитель вправе прекратить поддержку устаревших версий iOS.',
      ],
    },
    {
      title: '14. Сообщения, доказательства и язык',
      blocks: [
        "14.1. Стороны могут обмениваться сообщениями через Сайт, Приложение и указанные ими контакты. Юридическая сила и момент получения сообщения определяются применимым законом. Пользователь поддерживает актуальность контакта для сообщений о покупке.",
        '14.2. Стороны признают, что данные журналов Сервиса и Платёжного сервиса об оплатах, предоставлении и прекращении доступа, а также переписка по электронной почте могут использоваться в качестве доказательств. Это не ограничивает право Пользователя представлять иные доказательства.',
        '14.3. Оферта составлена на русском языке. Переводы на другие языки предоставляются для удобства; при расхождении применяется текст на русском языке.',
      ],
    },
    {
      title: '15. Применимое право, претензии и споры',
      blocks: [
        "15.1. К Договору применяется право Грузии. Этот выбор не лишает потребителя защиты обязательных норм страны его обычного проживания, когда они подлежат применению.",
        `15.2. Претензии направляются через форму «Написать нам» на Сайте, на адрес электронной почты или по почтовому адресу Исполнителя (раздел 17). Исполнитель рассматривает претензию в сроки, установленные законодательством о защите прав потребителей. Претензионный порядок не является обязательным условием обращения потребителя в суд.`,
        "15.3. Спор рассматривается компетентным судом по применимым правилам подсудности. Обращение в поддержку не является обязательным условием обращения в суд или надзорный орган, если закон не предусматривает иное.",
      ],
    },
    {
      title: '16. Заключительные положения',
      blocks: [
        '16.1. Если какое-либо положение Договора будет признано недействительным, остальные положения сохраняют силу.',
        '16.2. Оферта и страница «Оплата, доставка и возврат» составляют всё соглашение Сторон о Подписке.',
        '16.3. Пользователь не вправе передавать права и обязанности по Договору третьим лицам. Исполнитель вправе передать их лицу, которое продолжит оказывать услуги на условиях не хуже действующих, уведомив Пользователя.',
        '16.4. Положения об ответственности, возвратах, интеллектуальной собственности, персональных данных и порядке разрешения споров действуют и после прекращения Договора.',
        '16.5. Договор действует до полного исполнения Сторонами своих обязательств.',
      ],
    },
  ];
}

function en({ payment, privacy, seller }: Ctx): LegalSection[] {
  return [
    {
      title: '1. General',
      blocks: [
        `1.1. This document is an offer by ${seller} (the Provider, Yorix) to enter a distance contract on the following terms (the Agreement) with a legally capable individual aged at least 18 (the User). The Provider’s registration and contact details appear in section 17.`,
        "1.2. The User accepts this offer by confirming agreement before payment. The Agreement is concluded when the Payment Service confirms a successful real payment. Test transactions do not constitute payment or create a paid subscription.",
        "1.3. This Agreement covers purchases on the Website. App Store purchases are made through Apple and are also governed by its terms. Available payment methods depend on the country and the Payment Service actually enabled.",
        `1.4. The [“Payment, delivery and refunds”](${payment}) page forms part of the Agreement. Personal data needed to conclude and perform the Agreement is processed on the basis of the Agreement as described in the [Personal data policy](${privacy}). The child’s health information and data for AI features are processed only with the User’s separate consent; accepting the Agreement is not such consent.`,
        '1.5. The version of the offer in force at the moment of payment applies. The edition date is shown at the top of this document.',
      ],
    },
    {
      title: '2. Definitions',
      blocks: [
        {
          ul: [
            '**Service** — the Yorix mobile app for iPhone and iPad (the “App”) and related online services, including the yorix-app.com site (the “Website”).',
            '**Account** — the User’s account in the Service, created with Sign in with Apple.',
            '**Subscription** — paid access, for an Access Period, to the Service’s paid features: the AI coach, the personal next-sleep forecast, diary analytics and daily recommendations (the “Core Features”), as described on the Website’s plans page on the date of payment. Programs from the “Programs” section are not included.',
            '**Access Period** — 7, 30 or 365 calendar days counted from activation of the Subscription; a day is 24 hours.',
            '**Payment Service** — the processing system and the acquiring bank that accept the payment, named on the “Payment, delivery and refunds” page.',
            '**AI coach (Coach)** — a Service feature that generates answers automatically using artificial intelligence models, including those of third-party providers.',
            '**Forecasts** — sleep and wake windows, the day plan and other figures calculated by the algorithm.',
          ],
        },
      ],
    },
    {
      title: '3. Subject and nature of the Service',
      blocks: [
        '3.1. The Provider gives the User access to the Service’s paid features for the Access Period on the Account used to pay, and the User pays for it. The access includes a simple (non-exclusive), non-transferable licence to use the App to the extent needed for the paid features, for the Access Period, without the right to sublicense. The licence fee is included in the price.',
        '3.2. The service is provided remotely over the Internet; no physical media are delivered. It requires an iPhone or iPad with iOS 18 or later, the App from the App Store and signing in to the Account.',
        '3.3. **The Service is not medical care.** It is an information tool for parents: it helps keep a child-care diary and gives general information and guidance on sleep and wake routines, generated automatically from the data the User enters. The Provider is not a medical organisation or professional, does not provide medical or psychological care, diagnoses or treatment. The Service is not a medical device and is not intended to diagnose, monitor, prevent or treat any disease.',
        '3.4. Information in the Service — articles, analytics, Forecasts, Coach answers — is general and does not replace a consultation with a paediatrician who knows the child. Do not delay seeing a doctor or change a doctor’s instructions because of the Service. Values entered in the diary (temperature, height, weight, symptoms, etc.) are shown for convenience and are not medically assessed.',
        '3.5. **Not for emergencies.** If a child’s life or health is at risk, call emergency services immediately on 103 or 112, or your local emergency number. Neither the Coach nor support is an emergency line.',
        '3.6. **Safe sleep.** The Service is not a baby monitor or breathing monitor, does not watch the child in real time and cannot detect or prevent sudden infant death syndrome or other dangerous conditions. Routine guidance does not replace safe-sleep rules and adult supervision. Reminders and notifications may fail because of device settings or connectivity — do not rely on them for the child’s safety.',
        "3.7. The AI Coach provides general information, not diagnosis, treatment or medication dosing. Responses are generated automatically without individual clinical review and may be wrong, invented, incomplete or unsuitable even when confident. Safety measures cannot detect every unsafe response. Do not use a response as the sole basis for a child’s health or safety decisions.",
        '3.8. **Forecasts** are probabilistic estimates, not instructions; their accuracy depends on complete and timely records, and the child’s actual behaviour may differ. The Provider does not guarantee a specific result such as sleep duration.',
        '3.9. To keep the Service stable and prevent abuse, the Provider may set reasonable limits on Coach use (for example, messages per period), shown in the App.',
      ],
    },
    {
      title: '4. Price and payment',
      blocks: [
        '4.1. The Subscription price is shown on the Website’s plans page in the buyer’s currency — Belarusian or Russian rubles. Before paying, the User sees the amount to be charged; if it is in a currency other than the card’s, the amount in the card’s currency and any fee are set by the card-issuing bank. Prices for certain categories of consumers are set by the Provider’s decision.',
        '4.2. The price is fixed at the moment of payment; later changes do not affect paid Subscriptions.',
        '4.3. Payment is made by bank card through the Payment Service on its secure page. Card details are entered only with the Payment Service; the Provider neither receives nor stores them.',
        '4.4. **One-off payment.** There is no automatic renewal and no repeat charge. To extend, the User places a new order.',
        "4.5. The Payment Service provides transaction confirmation. Purchase documents and seller details are supplied as required by applicable law and may be requested through support.",
        '4.6. If a price is shown with an obvious technical error, the Provider informs the User, who may confirm the order at the correct price or cancel it with a full refund.',
      ],
    },
    {
      title: '5. Provision of access',
      blocks: [
        '5.1. The Subscription is activated automatically once the Payment Service confirms a successful payment, and is tied to the Account used to pay. The Access Period runs from activation. Gifts follow clauses 5.7–5.10.',
        "5.2. If the Subscription has not activated after payment, the User contacts support through the Website or the Provider’s contact in section 17. The Provider checks the payment and remedies the issue within a reasonable time, subject to mandatory legal requirements. If access is not provided, the User may request a refund under section 7.",
        '5.3. If the User already has an active Subscription, the new Access Period starts when the current one ends.',
        '5.4. The service is duly provided when the paid features are available on the User’s Account during the Access Period. This is evidenced by the logs of the Service and the Payment Service; the User may present other evidence.',
        '5.5. When the Access Period ends, the paid features switch off. Free features and the User’s data are kept.',
        '5.6. App Store purchases follow Apple’s rules: charges, cancelling auto-renewal and refunds are handled by Apple. A Website purchase does not cancel an App Store auto-renewal.',
        '5.7. **Gift subscriptions.** The User may pay for a 30- or 365-day Subscription for someone else. No Account is needed to buy a gift — the User only gives an e-mail address. After payment the gift link, the code and a card with the code are shown to the User on the payment result page and stay available on the gift page in the browser used to pay; the link, the code and the payment confirmation are also sent to that address. Passing the gift to the recipient is up to the User: the Provider sends the recipient nothing.',
        '5.8. The code is valid for 12 months from payment and can be redeemed once: the recipient opens the link or enters the code on the Website and signs in with Apple, and the Access Period starts on their Account or, if the recipient already has a Subscription paid on the Website, is added to it. Anyone who has the link or the code can redeem it, so the User passes them to the recipient only. Before redemption the User may replace the code on the gift page, and the previous link and code stop working. The Provider is not responsible for redemption by a person to whom the User or the recipient passed the link or the code. A code not redeemed within that time stops working; the User may withdraw with a refund under section 7.',
        '5.9. Within 6 months of payment and before the code is redeemed the User may withdraw with a full refund of the gift, and the code is cancelled. After that period an unredeemed code stays valid to the end of the term in clause 5.8, but no discretionary refund is offered; mandatory refund rights remain. After redemption, withdrawal and refunds follow section 7, and the recipient’s access ends.',
        '5.10. The User who paid for the gift remains the party to the Agreement. The recipient uses the Subscription under this offer and the terms of use of the Service.',
      ],
    },
    {
      title: '6. Availability',
      blocks: [
        '6.1. The Provider aims to keep the Service available around the clock. There may be interruptions for maintenance and under section 12.',
        '6.2. The Service depends on means the User uses independently: the device and its operating system, telecom operators, the App Store, their Apple Account and iCloud.',
      ],
    },
    {
      id: 'refunds',
      title: '7. Withdrawal and refunds',
      blocks: [
        "7.1. The User may withdraw by sending a clear statement through support or the contact in section 17, identifying the order and the payment. No reason is required. The statutory 14-calendar-day distance-contract withdrawal right applies where provided by law; these terms do not impose a waiver of that right.",
        "7.2. Where a statutory withdrawal right applies, mandatory law determines the refund and any permitted deduction. Activating access or accepting general terms does not itself waive refund rights. Outside mandatory full-refund cases, early cancellation is refunded for unused full days: price × remaining full days ÷ days in the paid period.",
        '7.3. The payment is refunded **in full** if: (a) the Subscription was never activated; (b) a charge is duplicate or mistaken — the excess amount; (c) the service had material defects or the Agreement ends through the Provider’s fault; (d) in other cases provided by law.',
        "7.4. Refunds are made to the original payment method in the currency actually charged within 14 calendar days after receiving the request, or sooner where law requires. The bank determines when the credit appears on the statement. We charge no separate refund fee and do not replace a mandatory monetary refund with credits.",
        '7.5. The User’s rights for defects in the service (free remedy, price reduction, refund) and the time limits for them are set by consumer protection law.',
        '7.6. **Chargebacks.** Before disputing a payment with your bank, contact the Provider — most issues are solved faster directly. During a dispute the Provider may suspend the access paid for by the disputed payment and give the Payment Service and the bank the order, activation and usage details needed for the dispute. If the payment is returned to the User, access for the corresponding period ends.',
      ],
    },
    {
      title: '8. Rights and obligations',
      blocks: [
        '8.1. The Provider shall: activate the Subscription within the times in section 5; keep the paid features available during the Access Period subject to section 6; consider the User’s requests; process personal data in line with the law and the Personal data policy.',
        '8.2. The Provider may: develop the Service and add, change and replace features subject to section 13; carry out maintenance; suspend and end access in the cases in section 9; engage third parties to run the Service, remaining responsible to the User for them.',
        '8.3. The User shall: pay for the Subscription and use the Service in line with the Agreement and the law; sign in with the Account that is to carry the Subscription; keep access to their Apple Account and devices confidential and report unauthorised access promptly; enter accurate information; follow the rules of use (section 9).',
        '8.4. The User may: use the paid features during the Access Period; withdraw from the Agreement (section 7); delete the Account and data in the App; obtain information about the Service and the processing of their personal data.',
      ],
    },
    {
      title: '9. Rules of use, suspension and termination',
      blocks: [
        '9.1. The Service is for personal, non-commercial use related to caring for a child. It is prohibited to:',
        {
          ul: [
            'transfer, sell or otherwise give the Subscription or Account access to third parties, except shared diary keeping with the other parent or another adult caring for the child through the sharing feature;',
            'copy, modify or distribute the Service and its materials, decompile or reverse-engineer its software, except where expressly allowed by law;',
            'use bots, scrapers or other automated means of access or data collection, including bulk requests to the Coach;',
            'use Service materials, Coach answers or Forecasts to train machine-learning models or build competing products;',
            'circumvent limits and technical, payment or security measures, including the Coach’s safeguards, or try to extract its system instructions;',
            'interfere with the Service, gain unauthorised access to other users’ data or spread malware;',
            'commit fraud with payments or refunds;',
            'present Service information as a professional’s opinion;',
            'enter information about other people without a lawful basis.',
          ],
        },
        '9.2. On a breach of clause 9.1 (fraudulent payment, sharing access, automated scraping, circumventing protection, attacks), the Provider may suspend access while it looks into the matter, telling the User the reason.',
        "9.3. For a confirmed material breach not remedied after notice, the Provider may terminate access as permitted by law. Immediate restrictions may apply to security threats or fraud. Mandatory refund rights remain; damages are recoverable only on a lawful basis.",
      ],
    },
    {
      title: '10. Intellectual property and User data',
      blocks: [
        '10.1. Exclusive rights to the Service — the App, the Website, code, design, texts, articles, illustrations, characters, the Forecast method and algorithms, Coach instructions and trademarks — belong to the Provider or its licensors. Paying for the Subscription does not transfer them to the User, except for the licence in clause 3.1.',
        '10.2. Rights to the information the User enters in the diary and to their messages to the Coach belong to the User to the extent such rights exist. The Provider uses them only to run the Service, perform the Agreement and keep it secure; personal data is processed on the grounds in the Personal data policy and separate consents.',
        '10.3. The Provider does not sell diary data and does not use the child’s health information for advertising.',
        '10.4. Feedback and suggestions sent to the Provider may be used to improve the Service without payment. A review with the User’s name or information about the child is published only with the User’s separate consent.',
      ],
    },
    {
      title: '11. Liability',
      blocks: [
        "11.1. Liability is governed by applicable law. Nothing in this Agreement excludes liability for intent, gross negligence, death or personal injury, or other liability that cannot lawfully be limited.",
        '11.2. The Provider is not liable for non-performance or improper performance caused by force majeure (section 12); by the User’s fault, including inaccurate information or breach of rules of use brought to their attention; or by acts of third parties not engaged by the Provider to perform the Agreement.',
        '11.3. The Provider is not liable for the User’s own equipment, software and connections not working, for keeping data on the User’s devices and in their iCloud, which the Provider cannot access, for the consequences of the User losing access to their Apple Account, or for decisions the User makes contrary to section 3 without seeing a doctor.',
        "11.4. To the extent permitted by law, indirect losses and lost profits are excluded; aggregate liability is limited to the greater of payments for the Service in the preceding 12 months or the equivalent of USD 50. Mandatory refunds and the cases in clause 11.1 are excluded from this limit. No additional guarantee of prediction accuracy, outcomes, continuous availability or suitability for a particular child is provided.",
      ],
    },
    {
      title: '12. Force majeure',
      blocks: [
        '12.1. The parties are released from liability for full or partial non-performance caused by force majeure — extraordinary and unavoidable circumstances under the given conditions arising after the Agreement was concluded.',
        '12.2. The parties treat as such, in particular, where they meet clause 12.1:',
        {
          ul: [
            'natural disasters, fires, floods, epidemics and related restrictions;',
            'military action, terrorist acts, riots, strikes;',
            'acts of the authorities of Georgia, other states and international organisations that make performance impossible or unlawful, including sanctions and other restrictive measures, payment bans and restrictions, blocking of internet resources;',
            'termination, suspension or material restriction of services of banks, payment systems, app stores, sign-in services, cloud infrastructure and artificial-intelligence providers for reasons beyond the Provider’s control (sanctions, government decisions, a mass outage at the provider), where the Provider could not perform by other available means within a reasonable time;',
            'major accidents and mass outages of telecom networks, the Internet, power supply or data centres;',
            'cyberattacks (DDoS, malware, unauthorised access) where the Provider had taken reasonable protective measures.',
          ],
        },
        "12.3. The affected party gives notice within a reasonable time and takes reasonable measures to mitigate effects. An affected deadline may be extended only where law permits, without removing mandatory refund rights.",
        '12.4. If the circumstances last more than 30 days, either party may withdraw from the Agreement; the User receives the price of the unused part of the Access Period.',
        "12.5. Relevant evidence may include official acts and provider notices. An ordinary technical error or lack of funds does not itself excuse performance. Mandatory refund rights remain unaffected.",
      ],
    },
    {
      title: '13. Changes to the offer and the Service',
      blocks: [
        '13.1. The Provider may change the offer. A new edition is published on the Website with its date and applies to agreements concluded after publication.',
        '13.2. For Agreements with an unexpired Access Period, a new edition applies only where it does not worsen the User’s position (does not raise the price, reduce the paid features or add obligations) or where the law requires it.',
        '13.3. If the Service closes, the Provider either keeps access until paid Periods end or refunds the unused full days.',
        '13.4. The Provider may end support for outdated iOS versions.',
      ],
    },
    {
      title: '14. Notices, evidence and language',
      blocks: [
        "14.1. The parties may communicate through the Website, App and the contacts they provide. Applicable law determines a notice’s legal effect and time of receipt. The User keeps purchase-related contact details current.",
        '14.2. The parties accept that the logs of the Service and the Payment Service on payments, granting and ending access, and e-mail correspondence may be used as evidence. This does not limit the User’s right to present other evidence.',
        '14.3. The offer is written in Russian. Translations are provided for convenience; in case of discrepancy the Russian text prevails.',
      ],
    },
    {
      title: '15. Governing law, claims and disputes',
      blocks: [
        "15.1. Georgian law governs this Agreement. This choice does not deprive a consumer of mandatory protections of their habitual residence where those protections apply.",
        `15.2. Claims are sent through the “Write to us” form on the Website, to the Provider’s e-mail address or to its postal address (section 17). The Provider considers a claim within the time set by consumer protection law. The claims procedure is not a precondition for a consumer to go to court.`,
        "15.3. Disputes are heard by the competent court under applicable jurisdiction rules. Contacting support is not a prerequisite to a court or regulatory complaint unless the law requires otherwise.",
      ],
    },
    {
      title: '16. Final provisions',
      blocks: [
        '16.1. If any provision is held invalid, the rest remain in force.',
        '16.2. The offer and the “Payment, delivery and refunds” page make up the entire agreement of the parties on the Subscription.',
        '16.3. The User may not assign rights and obligations under the Agreement. The Provider may assign them to a person who will continue the service on terms no worse, notifying the User.',
        '16.4. Provisions on liability, refunds, intellectual property, personal data and disputes survive termination.',
        '16.5. The Agreement remains in force until the parties have fully performed their obligations.',
      ],
    },
  ];
}

export function Offer({ lang }: { lang: Lang }) {
  const ctx: Ctx = {
    payment: subscriptionPath(lang, '/payment'),
    privacy: subscriptionPath(lang, '/privacy'),
    seller: sellerLine(lang),
  };
  return (
    <DocumentPage lang={lang} page="/offer" title={offerTitle[lang]} updated={editionLabel('offer', lang)}>
      <LegalBody sections={lang === 'ru' ? ru(ctx) : en(ctx)} />
      <h2 id="seller">{lang === 'ru' ? '17. Исполнитель' : '17. Provider'}</h2>
      <SellerBlock lang={lang} />
    </DocumentPage>
  );
}
