import type { Lang } from '../i18n';
import { merchant } from '../merchant';

export function sellerLine(lang: Lang) {
  return lang === 'ru'
    ? `ИП ${merchant.fullName} (Грузия)`
    : `Individual Entrepreneur ${merchant.latinName} (Georgia)`;
}

// The e-mail appears only where a seller's requisites must carry it (the
// offer); everywhere else people write through the site's form.
export function SellerBlock({ lang, email = true }: { lang: Lang; email?: boolean }) {
  const address = [merchant.country[lang], merchant.postalAddress].filter(Boolean).join(', ');
  return (
    <p>
      {sellerLine(lang)}
      <br />
      {merchant.status[lang]}
      {merchant.registrationNumber ? (
        <>
          <br />
          {lang === 'ru' ? 'Регистрационный / налоговый номер' : 'Registration / tax number'} {merchant.registrationNumber}
        </>
      ) : null}
      <br />
      {address}
      {email ? (
        <>
          <br />
          E-mail: {merchant.email}
        </>
      ) : null}
      {merchant.phone ? (
        <>
          <br />
          {lang === 'ru' ? 'Телефон' : 'Phone'}: {merchant.phone}
        </>
      ) : null}
      <br />
      {merchant.hours[lang]}
    </p>
  );
}
