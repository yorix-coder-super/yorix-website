# Yorix website — agent instructions

`yorix-app.com` is the Yorix marketing site and the only place the app is sold
outside the App Store. Next.js on Cloudflare Workers through **vinext**, built
with Vite, package manager **pnpm**. Reply to the owner in Russian; everything
that lands in this repository is written in English.

The checkout's backend is not here: it lives in the `CloudflareWorker`
directory of the **BabySleepCoach** repository. The site describes what that
worker actually does — when the two disagree, the worker is right.

## Working agreement

- **The working branch is `premium-web-payments`.** `main` is ~100 commits
  behind and is not where the site lives; do not "land the work on main" here
  without being told to.
- Commit every verified change. No Claude/Anthropic attribution in commit
  messages or anywhere else that leaves the machine.
- **Do not deploy per change.** Accumulate, then deploy when asked.
- Keep scope tied to the request; make routine reversible calls yourself.

## Single sources — do not create a second copy

| What | Where | Rule |
| --- | --- | --- |
| Seller requisites and the acquirer | `app/subscription/merchant.ts` | `ACQUIRER` is one switch that changes every page, document and logo. Cards, wallets, method notes and the bank's name are read from the acquirer profile — never name a bank or a card brand anywhere else. |
| Prices and charges | `app/subscription/prices.generated.ts` | Generated from the worker's `src/web/plans.ts`. Change a price there, then run `npm run sync:site-prices` in `CloudflareWorker`; its `npm test` fails while this copy is stale. Never hand-edit the generated file. |
| Who may buy | `proxy.ts` (`salesRedirect`) | Cards sell to Belarus and Russia only. The storefront, offer, payment terms and gift page send everyone else home; the privacy policy and the acquirer's return pages stay reachable. `yorix-app.com` is canonical, older hosts 308 to it. |
| Legal text | `app/subscription/legal/` | Every document carries an edition date in `versions.ts`, shown on the page and sent with each order so the seller can prove which text the buyer accepted. **Change a document's wording → bump its edition date.** Superseded editions move to `legal-archive/`; never delete one. |
| Site copy | `app/i18n/<lang>.ts` | 22 locales plus ru/en. A new key goes into **every** file — a partially translated key is the bug that keeps coming back. `wire.ts` is how server-side copy reaches client components (functions cannot cross that boundary). |

## Design and copy rules

- Palette: indigo, periwinkle, gold. No pink. Elegant, not loud.
- Every new block ships with its entrance, hover and floating-art motion from
  the start, and is checked mirrored — `ar` and `he` are RTL, so use logical
  classes (`ms-`, `me-`, `ps-`, `pe-`), never `left`/`right`.
- **No e-mail address in the interface.** "Написать нам" is the form at
  `/support#contact`; the address appears only in the offer's requisites.
- Answers link to the page that holds the detail — `[label](/path)` — instead
  of restating it.
- Cards and surfaces follow the app's language: a border, not a shadow.

## Verification

- `./node_modules/.bin/tsc --noEmit`, then `pnpm build`.
- `pnpm lint` (oxlint) reports many pre-existing findings across the repo.
  Compare before and after your change; do not chase the rest.
- **Looking at a page.** `pnpm dev` serves on port 3000. vinext holds a lock
  and refuses to start a second server — it prints the stale PID, kill that
  one. Sales pages 302 to the home page unless the request looks Belarusian or
  Russian, so send `cf-ipcountry: BY` or a Russian `Accept-Language`.
  **Kill the server when you are done**: stale `vinext`/`workerd` processes
  pile up and thrash a nearly full disk.
- Under Tailscale, prefix dev and deploy with
  `NODE_OPTIONS=--dns-result-order=ipv4first`; otherwise miniflare dies with
  `fetch failed`.

## Deploy

`pnpm deploy` = `vinext build && wrangler deploy --config dist/server/wrangler.json --name yorix-website`.
Only on an explicit request. Say afterwards what is committed but not yet live.
