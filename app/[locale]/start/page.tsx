import { notFound } from 'next/navigation';
import { campaignLocales, isCampaignLocale } from '../../i18n/campaigns/instagram';
import { CampaignPage, campaignMetadata } from '../../start/CampaignPage';
import type { CampaignParams } from '../../ru/start/campaign';

type Props = { params: { locale: string }; searchParams?: CampaignParams };
export function generateStaticParams() { return campaignLocales.filter(locale => locale !== 'ru').map(locale => ({ locale })); }
export function generateMetadata({ params }: Props) { return isCampaignLocale(params.locale) ? campaignMetadata(params.locale) : {}; }
export default function LocalizedCampaign({ params, searchParams }: Props) {
  if (!isCampaignLocale(params.locale)) notFound();
  return <CampaignPage locale={params.locale} params={searchParams} />;
}
