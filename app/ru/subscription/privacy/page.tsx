import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { Privacy, privacyTitle } from '../../../subscription/legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['ru'],
  description: 'Какие персональные данные обрабатывают сайт, приложение и поддержка Yorix, зачем и на каком основании, кому передаются, сколько хранятся и как реализовать свои права.',
  alternates: { canonical: subscriptionPath('ru', '/privacy'), languages: subscriptionAlternates('/privacy') },
  openGraph: {
    title: privacyTitle['ru'],
    description: 'Какие персональные данные обрабатывают сайт, приложение и поддержка Yorix, зачем и на каком основании, кому передаются, сколько хранятся и как реализовать свои права.',
    url: subscriptionPath('ru', '/privacy'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <Privacy lang="ru" />;
}
