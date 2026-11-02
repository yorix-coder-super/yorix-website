import { NextRequest, NextResponse } from 'next/server';
import { LANG_COOKIE } from '../language';
import { visitorCountry } from '../visitor';
import { isCampaignLocale } from '../i18n/campaigns/instagram';

export function GET(request: NextRequest) {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  const preferences = (request.headers.get('accept-language') ?? '').split(',')
    .map(part => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const quality = params.map(param => param.trim()).find(param => param.startsWith('q='));
      const primary = tag.split('-')[0];
      return { locale: primary === 'be' ? 'ru' : primary, quality: quality ? Number(quality.slice(2)) : 1 };
    })
    .filter(entry => entry.quality > 0 && isCampaignLocale(entry.locale))
    .sort((a, b) => b.quality - a.quality);
  const fallback = ['BY', 'RU', 'KZ', 'KG'].includes(visitorCountry(request.headers) ?? '') ? 'ru' : 'en';
  const locale = saved && isCampaignLocale(saved) ? saved : preferences[0]?.locale ?? fallback;
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}/start`;
  const response = NextResponse.redirect(target, 307);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Accept-Language, Cookie, CF-IPCountry');
  return response;
}
