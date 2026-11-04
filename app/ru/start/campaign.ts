import { siteUrl } from '../../content';

const funnelAppStoreUrl = 'https://apps.apple.com/app/apple-store/id6788705252?pt=129050076&ct=Website_Voronka&mt=8';

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
    download: funnelAppStoreUrl,
    qr: funnelAppStoreUrl,
    share: share.toString(),
  };
}
