import type { Lang } from '../i18n';
import { merchant, serviceOperator } from '../merchant';

export function sellerLine(lang: Lang, operator = false) {
  if (!operator) return lang === 'ru' ? `${merchant.fullName}, плательщик НПД (Беларусь)` : `${merchant.latinName}, professional income tax payer (Belarus)`;
  return lang === 'ru'
    ? `ИП ${serviceOperator.fullName} (Грузия)`
    : `Individual Entrepreneur ${serviceOperator.latinName} (Georgia)`;
}

// The e-mail appears only where a seller's requisites must carry it (the
// offer); everywhere else people write through the site's form.
export function SellerBlock({ lang, email = true, operator = false }: { lang: Lang; email?: boolean; operator?: boolean }) {
  const identity = operator ? serviceOperator : merchant;
  const address = [identity.country[lang], identity.postalAddress].filter(Boolean).join(', ');
  return (
    <p>
      {sellerLine(lang, operator)}
      <br />
      {identity.status[lang]}
      {identity.registrationNumber ? (
        <>
          <br />
          {operator ? (lang === 'ru' ? 'Регистрационный / налоговый номер' : 'Registration / tax number') : (lang === 'ru' ? 'УНП' : 'Taxpayer number')} {identity.registrationNumber}
        </>
      ) : null}
      <br />
      {address}
      {email ? (
        <>
          <br />
          E-mail: {identity.email}
        </>
      ) : null}
      {identity.phone ? (
        <>
          <br />
          {lang === 'ru' ? 'Телефон' : 'Phone'}: {identity.phone}
        </>
      ) : null}
      <br />
      {identity.hours[lang]}
    </p>
  );
}
