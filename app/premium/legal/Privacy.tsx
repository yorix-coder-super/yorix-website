import { DocumentPage } from '../DocumentPage';
import type { Lang } from '../i18n';
import { merchant } from '../merchant';

export const privacyTitle = { ru: 'Политика обработки персональных данных', en: 'Personal data policy' } as const;
export const privacyUpdated = { ru: '17 сентября 2026 г.', en: '17 September 2026' } as const;

export function Privacy({ lang }: { lang: Lang }) {
  const email = <a href={`mailto:${merchant.email}`}>{merchant.email}</a>;

  if (lang === 'en') {
    return (
      <DocumentPage lang={lang} page="/konfidencialnost" title={privacyTitle.en} updated={privacyUpdated.en}>
        <h2>1. Scope</h2>
        <p>
          This policy describes how buyers’ personal data is processed when ordering and paying for Yorix Premium on yorix.website, under the Law of
          the Republic of Belarus of 7 May 2021 No. 99-З “On personal data protection”. Data processing inside the Yorix app is described in the app’s
          privacy policy, linked from the app itself.
        </p>
        <h2>2. Controller</h2>
        <p>
          The controller is {merchant.fullName} ({merchant.latinName}), {merchant.status.en.toLowerCase()}, {merchant.country.en}
          {merchant.unp ? `, taxpayer number ${merchant.unp}` : ''}. Contact for personal data matters: {email}.
        </p>
        <h2>3. Data we receive</h2>
        <ul>
          <li>the account identifier, e-mail address and sign-in provider (Apple or Google) that Firebase Authentication passes to us when you sign in on the site;</li>
          <li>the e-mail address you write from and the text of the correspondence, if you order by e-mail;</li>
          <li>order and payment details: plan, amount, date, order number, transaction number and payment status, as passed by WebPay;</li>
          <li>technical data needed to protect the site from abuse: IP address and request time, kept for a short period.</li>
        </ul>
        <p>Bank card details (number, expiry date, CVC/CVC2) are entered only on the WebPay page. We never receive or store them.</p>
        <h2>4. Purposes and legal basis</h2>
        <ul>
          <li>concluding and performing the agreement: identifying the account, issuing the order, switching Premium on, support, refunds;</li>
          <li>meeting legal obligations: accounting for income and issuing a receipt in the “Professional income tax” app;</li>
          <li>answering your requests and protecting the service from abuse.</li>
        </ul>
        <p>The basis is processing necessary to conclude and perform an agreement with you and to meet obligations set by law. We send no marketing e-mails.</p>
        <h2>5. Recipients</h2>
        <ul>
          <li>the WebPay processing system and the acquiring bank — to process and refund the payment;</li>
          <li>Google (Firebase Authentication) — to sign you in with Apple or Google;</li>
          <li>the Ministry of Taxes and Duties through the “Professional income tax” app — to the extent needed for the receipt;</li>
          <li>providers of the services the mail and the site run on (Microsoft Outlook, Cloudflare, Google). Their servers may be outside the Republic of Belarus, so data may be transferred abroad.</li>
        </ul>
        <h2>6. Retention</h2>
        <p>
          Correspondence and order records — for the Premium period and three years after it, to resolve possible disputes. Documents related to income
          accounting — for the periods set by tax law. Technical data — up to 30 days.
        </p>
        <h2>7. Your rights</h2>
        <ul>
          <li>to obtain information about the processing of your data;</li>
          <li>to have inaccurate data corrected;</li>
          <li>to withdraw consent where processing is based on consent, or to demand that processing stop and data be deleted where there is no legal basis for it;</li>
          <li>to appeal our actions to the National Personal Data Protection Center of the Republic of Belarus.</li>
        </ul>
        <p>To exercise a right, write to {email}. We answer within 15 days.</p>
        <h2>8. Changes</h2>
        <p>The current version is always published on this page; its date is shown at the top of the document.</p>
      </DocumentPage>
    );
  }

  return (
    <DocumentPage lang={lang} page="/konfidencialnost" title={privacyTitle.ru} updated={privacyUpdated.ru}>
      <h2>1. О чём эта политика</h2>
      <p>
        Политика описывает, как обрабатываются персональные данные покупателей при заказе и оплате Yorix Premium на сайте yorix.website, в
        соответствии с Законом Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных». Обработка данных внутри приложения Yorix
        описана в политике конфиденциальности, ссылка на которую есть в самом приложении.
      </p>
      <h2>2. Оператор</h2>
      <p>
        Оператор — {merchant.fullName}, {merchant.status.ru.toLowerCase()}, {merchant.country.ru}
        {merchant.unp ? `, УНП ${merchant.unp}` : ''}. Контакт по вопросам персональных данных: {email}.
      </p>
      <h2>3. Какие данные мы получаем</h2>
      <ul>
        <li>идентификатор аккаунта, e-mail и способ входа (Apple или Google), которые передаёт нам Firebase Authentication при входе на сайте;</li>
        <li>e-mail, с которого вы пишете нам, и текст переписки — если вы оформляете заказ письмом;</li>
        <li>сведения о заказе и платеже: тариф, сумма, дата, номер заказа, номер транзакции и статус оплаты, которые передаёт WebPay;</li>
        <li>технические данные для защиты сайта от злоупотреблений: IP-адрес и время запроса, хранятся недолго.</li>
      </ul>
      <p>Данные платёжной карты (номер, срок действия, CVC/CVC2) вводятся только на странице WebPay. Мы их не получаем и не храним.</p>
      <h2>4. Зачем мы обрабатываем данные и на каком основании</h2>
      <ul>
        <li>заключение и исполнение договора: определение аккаунта, оформление заказа, включение Premium, поддержка, возврат платежа;</li>
        <li>исполнение обязанностей по законодательству: учёт дохода и формирование чека в приложении «Налог на профессиональный доход»;</li>
        <li>ответы на ваши обращения и защита сервиса от злоупотреблений.</li>
      </ul>
      <p>
        Основание — обработка, необходимая для заключения и исполнения договора с вами, а также для выполнения обязанностей, предусмотренных
        законодательством. Рекламные рассылки мы не отправляем.
      </p>
      <h2>5. Кому передаются данные</h2>
      <ul>
        <li>процессинговой системе WebPay и банку-эквайеру — для проведения и возврата платежа;</li>
        <li>Google (Firebase Authentication) — для входа через Apple или Google;</li>
        <li>Министерству по налогам и сборам через приложение «Налог на профессиональный доход» — в объёме, необходимом для чека;</li>
        <li>
          поставщикам сервисов, на которых работают почта и сайт (Microsoft Outlook, Cloudflare, Google). Их серверы могут находиться за пределами
          Республики Беларусь, поэтому данные могут передаваться за рубеж.
        </li>
      </ul>
      <h2>6. Сколько храним</h2>
      <p>
        Переписку и сведения о заказе — в течение срока действия Premium и трёх лет после него для разрешения возможных споров. Документы, связанные
        с учётом дохода, — в сроки, установленные налоговым законодательством. Технические данные — до 30 дней.
      </p>
      <h2>7. Ваши права</h2>
      <ul>
        <li>получить информацию об обработке ваших данных;</li>
        <li>потребовать исправить неточные данные;</li>
        <li>отозвать согласие, если обработка основана на согласии, или потребовать прекратить обработку и удалить данные, если для неё нет законных оснований;</li>
        <li>обжаловать наши действия в Национальный центр защиты персональных данных Республики Беларусь.</li>
      </ul>
      <p>Чтобы воспользоваться правом, напишите на {email}. Мы ответим в течение 15 дней.</p>
      <h2>8. Изменения</h2>
      <p>Актуальная редакция всегда опубликована на этой странице. Дата редакции указана в начале документа.</p>
    </DocumentPage>
  );
}
