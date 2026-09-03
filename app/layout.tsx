import type { Metadata } from 'next';
import { siteUrl } from './content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Baby Schedule App | Calm Nap and Feeding Routine',
    template: '%s | Yorix',
  },
  description:
    'Build a calmer baby schedule with nap windows, feeding rhythm, sleep tracking, and gentle routine support for parents.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Baby Schedule App | Calm Nap and Feeding Routine',
    description:
      'Track sleep, feeds, diapers, and daily rhythm to create a baby schedule that follows your real day.',
    url: '/',
    siteName: 'Yorix',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1024,
        height: 1024,
        alt: 'Yorix app icon with a sleeping baby on a crescent moon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Baby Schedule App | Calm Nap and Feeding Routine',
    description:
      'Track sleep, feeds, diapers, and daily rhythm to create a baby schedule that follows your real day.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/app-icon.png',
    shortcut: '/app-icon.png',
    apple: '/app-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
