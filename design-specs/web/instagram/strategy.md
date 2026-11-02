# Instagram to App Store campaign

## Decision

Use a four-screen, mobile-first introduction at `/start`, localized into Russian, Turkish, German, English and Arabic. Localized campaign URLs are stable (`/ru/start`, `/tr/start`, `/de/start`, `/en/start`, `/ar/start`); the short URL chooses a supported browser language and otherwise English. This is a campaign creative, independent of the 24-language general site dictionary. Do not expose a half-translated campaign in other locales.

The reference document is `Yorix_website_funnel_5_languages.docx`, supplied by the owner on 2026-11-02. Its copy is a source, not verified evidence of functionality or medical outcomes. Keep the useful four-step structure and translated language; replace the outcome-led final headline with “Start with one nap.” Only offer the actual iOS product. A Google Play button would mislead visitors.

## Why this sequence

| Stage | Visitor's question | Page response | Action |
| --- | --- | --- | --- |
| Recognition | Why does settling feel difficult? | Acknowledge the experience without blaming the parent or diagnosing the baby. | What can I change? |
| Understanding | What is worth noticing? | Explain that timing and the preceding nap can matter, while the baby's cues remain important. | How do I find the time? |
| Product | What does Yorix do for me? | A clearly labelled sample sleep-window card and an explanation that the next suggestion updates after recorded sleep. Disclose Premium here. | Try Yorix |
| Installation | How do I start? | A simple first action, free versus Premium disclosure, official localized App Store badge, adjacent QR on all screen sizes, share/copy. | Open the App Store |

Do not block installation behind a quiz, email address, account creation, autoplay, countdown or mandatory completion. A download shortcut and progress links are always available. No automatic slide advance. Back, browser history, deep hashes and locale changes preserve orientation. Without JavaScript the four sections and ordinary anchor links remain available.

## Research and limits

Public pages inspected on 2026-11-02. These are observable patterns, not competitor conversion data; no claim that one competitor's funnel converts better is supported by public evidence.

- [Huckleberry](https://huckleberrycare.com/) leads with a clear promise, product download, trust evidence and educational articles. [SweetSpot](https://huckleberrycare.com/product/sweetspot) gives its prediction feature a simple name and explains its paid-plan placement. Adopt a clear explanation of the mechanism and honest entitlement copy; do not copy its scale, endorsements or outcomes.
- [Napper](https://napper.app/en/) combines emotional brand art, product screens, benefit sections and download/trial actions. Adopt a coherent visual world and tangible product explanation; do not borrow its reviews, awards or trial offer.
- [Huckleberry's SweetSpot explanation](https://huckleberry.zendesk.com/hc/en-us/articles/360025566414-What-is-SweetSpot) presents a prediction as guidance alongside the child's cues. Keep the sample explicitly illustrative and avoid presenting timings as advice for the visitor's child.
- [Apple's marketing guidance](https://developer.apple.com/app-store/marketing/guidelines/) provides localized official badges. Downloaded unmodified black badges from Apple's Marketing Tools endpoint; keep QR stationary, maintain badge clear space and do not invent an Android listing.

## Art direction

Approved premium direction (2026-11-02): deep midnight indigo, periwinkle clouds, warm gold headline accents, white pill actions and the existing Yorix baby/star illustrations. No pink. Desktop uses a spacious two-column scene; mobile stacks concise copy, a large scene, optional guidance and the action in normal flow so navigation cannot cover the product card. Implementation details: `premium-implementation.md`; approved visual: `assets/premium-funnel-reference.png`.

Motion: a 450–600 ms opacity/10 px entrance after enhancement; decorative stars and the clock float by 7 px over 7–8 s. The primary pill uses the site's pointer-only Magnetic wrapper and 2 px hover lift. The LCP baby, QR and official store badge remain stationary; clouds drift subtly using compositor transforms. Ambient motion pauses offscreen and in background tabs. Reduced-motion disables all motion. Arabic mirrors the composition and arrow direction; branded badges and QR remain unmirrored.

## Traffic and copy sequence

1. Instagram Reel: show one concrete problem, such as repeatedly checking the time after a nap. End with a natural invitation to see how Yorix organizes the day. Avoid promising fewer night wakings or a fixed number of hours of sleep.
2. Story: a short demonstration or question about remembering the last nap. The link sticker promises a brief explanation of the app, not a personalized diagnosis or a free Premium plan.
3. Bio: a stable language-specific link. Use `/start` for a multilingual account.
4. Landing: explain one idea per panel; keep the same promise as the ad. The actual downloadable product is iPhone/iPad, iOS 18+.
5. App Store: use a campaign-matched product page later if one is created and approved in App Store Connect. This implementation uses the existing verified listing; it does not invent a custom product page ID.
6. First session: the parent's first useful action is logging a sleep. Subsequent app onboarding and subscription behavior stay unchanged in this website task.

Suggested English production briefs (localize naturally before publishing):

| Placement | Opening | Link promise | utm_content |
| --- | --- | --- | --- |
| Profile bio | A sleep diary and a plan that follows your day. | Meet Yorix | bio |
| Story | Another nap ended earlier than expected? | See how the next suggestion updates | story |
| Reel | The mental checklist after every nap. | Less calculating, more clarity | reel01 |
| Partner | How I keep track of our baby's day. | A short look at the app | partner01 |

Use first-person endorsement only when the actual creator has used the product and approves the wording. Do not invent parent testimonials.

## Campaign links

After deployment, the primary Russian bio link is:

`https://yorix-app.com/ru/start?utm_source=instagram&utm_medium=social&utm_campaign=sleep&utm_content=bio`

Stories:

`https://yorix-app.com/ru/start?utm_source=instagram&utm_medium=social&utm_campaign=sleep&utm_content=story`

Replace `/ru/` with `/tr/`, `/de/`, `/en/` or `/ar/` for the other creatives. Use `paid_social` as the medium for ads. Keep campaign identifiers short, lowercase and free of personal information. Google/Meta click identifiers are intentionally not forwarded to Apple or copied into share links.

Apple campaign IDs follow `ig-<locale>-<campaign>-<creative>-cta` or `-qr`. Shared links use `share` as the source prefix and preserve the selected language. Campaign/creative identifiers are bounded so the CTA/QR suffix survives Apple's 40-character limit. App Store attribution identifies a campaign, not a particular parent; availability and reporting thresholds remain subject to App Store Connect.

## Measurement and experiments

Implemented: bounded campaign tags on direct links and QR, local `dataLayer` events and `yorix:funnel` custom events: `funnel_step_view` (screen 1–4, once per screen per page mount), `funnel_app_store_click`, `funnel_qr_click`, `funnel_share`, `funnel_copy`. Back/forward does not count repeated views. A QR **scan** is not the browser's QR **click** event; it is identified downstream by the Apple `-qr` campaign.

No analytics collector, advertising pixel, persistent visitor identifier or dashboard is installed by this change. Client events are integration hooks and are not retained remotely. App Store campaign links work independently of those hooks. Before buying significant traffic, connect a selected analytics collector to these events with the appropriate consent policy, then verify real delivery and reporting. Do not report client events as collected conversions.

Measure: landing visits → screen 2 → screen 3 → screen 4 → App Store clicks; separately inspect App Store campaign downloads and in-app activation. Do not divide Apple installs by raw page loads and call that exact person-level conversion. Keep QR and direct CTA cohorts separate.

Initial experiment: compare the four-step campaign against a direct App Store destination using matched creative, language, audience and spend. A warm-up page is a hypothesis, not automatically an improvement. Predefine a primary metric (cost per activated user, when available), minimum sample and stopping rule before launch. Compare the first headline only after the basic funnel has enough volume; change one variable at a time. Do not invent numeric uplift targets from competitor visuals.

## Delivery

Source work can be committed independently of deployment. Repository AGENTS.md requires an explicit request before a production deploy. Verify the five production URLs, localized badges, CSP, real App Store handoff and QR on a physical phone after publishing; browser emulation cannot prove Instagram's native handoff behavior.
