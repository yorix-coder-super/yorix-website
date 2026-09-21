# Yorix website — agent instructions

`yorix-app.com` is the Yorix marketing site and the only place the app is sold
outside the App Store. Next.js on Cloudflare Workers through **vinext**, built
with Vite, package manager **pnpm**. Reply to the owner in Russian; everything
that lands in this repository is written in English.

The checkout's backend is not here: it lives in the `CloudflareWorker`
directory of the **BabySleepCoach** repository. The site describes what that
worker actually does — when the two disagree, the worker is right.

## Working agreement

- **The working branch is `premium-web-payments`.** `main` follows it by
  fast-forward — the two were levelled and pushed on 2026-09-21. Move `main`
  up when a batch is done; never force-push and never let them diverge.
- Commit every verified change. No Claude/Anthropic attribution in commit
  messages or anywhere else that leaves the machine.
- **Do not deploy per change.** Accumulate, then deploy when asked.
- Keep scope tied to the request; make routine reversible calls yourself.

## Single sources — do not create a second copy

| What | Where | Rule |
| --- | --- | --- |
| Seller requisites and the acquirer | `app/subscription/merchant.ts` | `ACQUIRER` is one switch that changes every page, document and logo. Cards, wallets, method notes and the bank's name are read from the acquirer profile — never name a bank or a card brand anywhere else. |
| Prices and charges | `app/subscription/prices.generated.ts` | Generated from the worker's `src/web/plans.ts`. Change a price there, then run `npm run sync:site-prices` in `CloudflareWorker`; its `npm test` fails while this copy is stale. Never hand-edit the generated file. |
| Who may buy | `proxy.ts` (`salesRedirect`) and `sellsHere()` | Cards sell to Belarus and Russia only. `yorix-app.com` is canonical, older hosts 308 to it. |
| Legal text | `app/subscription/legal/` | Every document carries an edition date in `versions.ts`, shown on the page and sent with each order so the seller can prove which text the buyer accepted. **Change a document's wording → bump its edition date.** Superseded editions move to `legal-archive/`; never delete one. |
| Site copy | `app/i18n/<lang>.ts` | 22 locales plus ru/en. A new key goes into **every** file — a partially translated key is the bug that keeps coming back. `wire.ts` is how server-side copy reaches client components (functions cannot cross that boundary). |

## Outside Belarus and Russia the site is a showcase

One way on: the App Store button. No price, plan, gift, activation, acquirer
logo or seller requisite may appear, and the subscription documents — the
offer and the payment terms — stay out of the footer too.

`sellsHere()` (`app/subscription/region.ts`) is the one predicate; `proxy.ts`
uses `sellsOnWeb` directly because middleware has no `headers()`. It already
gates the header, the footer, home pricing, the storefront and the document
navigation. **Any new surface that names a price, a payment, a gift or the
acquirer goes behind it too** — that is how the last leak got in.

What stays open is not a sales page: the terms of use and the privacy policy,
which the App Store requires of the app itself; the acquirer's return and
cancel pages; and the **whole redeem path** — `/gift`, `/gift/<code>`,
`/g/<code>`. A gift is bought in Belarus or Russia and opened wherever the
family is, and every printed card carries that address, so gating it would
kill a gift already paid for. Hide the links to it, never the page.

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

`pnpm run deploy` = `vinext build && wrangler deploy --config
dist/server/wrangler.json --name yorix-website`. Write `run`: bare
`pnpm deploy` is pnpm's own command and fails with
`ERR_PNPM_INVALID_DEPLOY_TARGET`. Only on an explicit request. Say afterwards what is committed but not yet live.
