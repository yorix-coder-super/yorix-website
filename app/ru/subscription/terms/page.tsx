import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { Terms, termsTitle } from '../../../subscription/legal/Terms';

const description = 'Условия использования приложения и сайта Yorix: что такое сервис и чем он не является, правила использования и пределы ответственности.';

export const metadata: Metadata = {
  title: termsTitle['ru'],
  description,
  alternates: { canonical: subscriptionPath('ru', '/terms'), languages: subscriptionAlternates('/terms') },
  openGraph: { title: termsTitle['ru'], description, url: subscriptionPath('ru', '/terms'), type: 'website', locale: 'ru_RU' },
};

export default function Page() {
  return <Terms lang="ru" />;
}
