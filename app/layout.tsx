import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://baby-schedule.example';

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
        url: '/app-screenshot.png',
        width: 1242,
        height: 2688,
        alt: 'Yorix baby schedule app next nap screen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby Schedule App | Calm Nap and Feeding Routine',
    description:
      'Track sleep, feeds, diapers, and daily rhythm to create a baby schedule that follows your real day.',
    images: ['/app-screenshot.png'],
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
