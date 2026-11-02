import { CampaignPage, campaignMetadata } from '../../start/CampaignPage';
import type { CampaignParams } from './campaign';

export const metadata = campaignMetadata('ru');
export default function RussianCampaign({ searchParams }: { searchParams?: CampaignParams }) {
  return <CampaignPage locale="ru" params={searchParams} />;
}
