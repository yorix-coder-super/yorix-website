import { headers } from 'next/headers';
import { currencyForVisitor, sellsOnWeb } from './currency';

// Card checkout exists only for Belarus and Russia (and Russian-language
// browsers). Everyone else sees the site as the app's showcase: no prices,
// payment pages, card logos or seller requisites.
export async function sellsHere() {
  const requestHeaders = await headers();
  return sellsOnWeb(currencyForVisitor(requestHeaders.get('cf-ipcountry'), requestHeaders.get('accept-language')));
}
