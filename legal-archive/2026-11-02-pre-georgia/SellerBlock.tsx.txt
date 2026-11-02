import type { Lang } from '../i18n';
import { merchant } from '../merchant';

export function sellerLine(lang: Lang) {
  return lang === 'ru'
    ? `${merchant.fullName}, ${merchant.status.ru.toLowerCase()}${merchant.unp ? `, УНП ${merchant.unp}` : ''}`
    : `${merchant.fullName} (${merchant.latinName}), ${merchant.status.en.toLowerCase()}${merchant.unp ? `, taxpayer number ${merchant.unp}` : ''}`;
}

// The e-mail appears only where a seller's requisites must carry it (the
// offer); everywhere else people write through the site's form.
export function SellerBlock({ lang, email = true }: { lang: Lang; email?: boolean }) {
  const address = [merchant.country[lang], merchant.postalAddress].filter(Boolean).join(', ');
  return (
    <p>
      {lang === 'ru' ? merchant.fullName : `${merchant.fullName} (${merchant.latinName})`}
      <br />
      {merchant.status[lang]}
      {merchant.unp ? (
        <>
          <br />
          {lang === 'ru' ? 'УНП' : 'Taxpayer number (УНП)'} {merchant.unp}
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
