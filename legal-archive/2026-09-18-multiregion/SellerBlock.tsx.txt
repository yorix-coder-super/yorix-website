import type { Lang } from '../i18n';
import { merchant } from '../merchant';

export function sellerLine(lang: Lang) {
  return lang === 'ru'
    ? `${merchant.fullName}, ${merchant.status.ru.toLowerCase()}${merchant.unp ? `, УНП ${merchant.unp}` : ''}`
    : `${merchant.fullName} (${merchant.latinName}), ${merchant.status.en.toLowerCase()}${merchant.unp ? `, taxpayer number ${merchant.unp}` : ''}`;
}

export function SellerBlock({ lang }: { lang: Lang }) {
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
      <br />
      E-mail: <a href={`mailto:${merchant.email}`}>{merchant.email}</a>
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
