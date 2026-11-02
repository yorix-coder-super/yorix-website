import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { encode } from 'uqr';
import { campaignCopy, type CampaignLocale } from '../i18n/campaigns/instagram';
import { campaignLinks, type CampaignParams } from '../ru/start/campaign';
import { Funnel } from './Funnel';
import './funnel.css';

export function campaignMetadata(locale: CampaignLocale): Metadata {
  const copy = campaignCopy(locale);
  const title = `${copy.screens[0].title} | Yorix`;
  const description = copy.screens[2].body;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `/${locale}/start`, languages: { ru: '/ru/start', tr: '/tr/start', de: '/de/start', en: '/en/start', ar: '/ar/start', 'x-default': '/start' } },
    openGraph: { title, description, url: `/${locale}/start`, locale: { ru: 'ru_RU', tr: 'tr_TR', de: 'de_DE', en: 'en_US', ar: 'ar_AR' }[locale], images: [{ url: '/og.png', width: 1024, height: 1024 }] },
    twitter: { card: 'summary', title, description, images: ['/og.png'] },
  };
}

export function CampaignPage({ locale, params = {} }: { locale: CampaignLocale; params?: CampaignParams }) {
  const copy = campaignCopy(locale);
  const links = campaignLinks(params, locale);
  const { data, size } = encode(links.qr, { ecc: 'M', border: 4 });
  const path = data.flatMap((row, y) => row.map((dark, x) => dark ? `M${x} ${y}h1v1h-1z` : '')).join('');
  const query = new URLSearchParams();
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params[key];
    if (typeof value === 'string' && /^[a-z0-9_-]{1,64}$/i.test(value)) query.set(key, value);
  }
  const qr = <svg aria-hidden="true" viewBox={`0 0 ${size} ${size}`} width={size * 3} height={size * 3} style={{ '--qr-size': size } as CSSProperties} shapeRendering="crispEdges"><rect width={size} height={size} fill="white" /><path d={path} fill="#242046" /></svg>;
  return <Funnel locale={locale} copy={copy} links={links} qr={qr} languageQuery={query.size ? `?${query}` : ''} />;
}
