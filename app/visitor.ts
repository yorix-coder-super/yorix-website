/**
 * The visitor's country. Behind the edge proxy — a server outside Cloudflare
 * for the networks that drop it — Cloudflare sees only the proxy, so the
 * proxy's own lookup comes first. Here it decides no more than which prices
 * are shown; the API checks the country again, signed, before it takes money.
 */
export function visitorCountry(headers: { get(name: string): string | null }): string | null {
  const edge = (headers.get('x-yorix-client-country') ?? '').toUpperCase();
  if (/^[A-Z]{2}$/.test(edge) && edge !== 'ZZ') return edge;
  return headers.get('cf-ipcountry');
}
