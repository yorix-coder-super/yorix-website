import { appStoreUrl, siteUrl } from '../../content';

export type CampaignParams = Record<string, string | string[] | undefined>;

function slug(value: string | string[] | undefined, fallback: string, max: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && /^[a-z0-9_-]+$/i.test(raw) ? raw.toLowerCase().slice(0, max) : fallback;
}

export function campaignLinks(params: CampaignParams = {}, locale = 'ru') {
  const campaign = slug(params.utm_campaign, 'sleep', 14);
  const creative = slug(params.utm_content, 'bio', 10);
  const source = params.utm_source === 'share' ? 'share' : 'ig';
  const tag = `${source}-${locale}-${campaign}-${creative}`;
  const share = new URL(`/${locale}/start`, siteUrl);
  share.searchParams.set('utm_source', 'share');
  share.searchParams.set('utm_medium', 'referral');
  share.searchParams.set('utm_campaign', campaign);
  share.searchParams.set('utm_content', creative);
  return {
    tag,
    download: appStoreUrl(`${tag}-cta`),
    qr: appStoreUrl(`${tag}-qr`),
    share: share.toString(),
  };
}
