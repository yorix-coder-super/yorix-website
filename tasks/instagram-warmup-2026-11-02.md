# Instagram warm-up landing — 2026-11-02

## Outcome
Build a five-language campaign at `/start` and `/{ru,tr,de,en,ar}/start` for Instagram visitors: recognition, useful context, a clear product demonstration, and an honest App Store handoff. `/start` selects a supported browser language. Preserve the main marketing site and all checkout behavior.

## Requirements and decisions
- [x] Inspect production, assets, product claims and competitor public landing pages.
- [x] Use the reference's four-stage story, Yorix indigo/periwinkle/gold palette and existing brand art; no pink or invented testimonials.
- [x] Implement responsive, accessible, server-visible landing with progress, illustrative plan card, real product imagery and share fallback.
- [x] Implement direct App Store links, campaign attribution, a genuine static QR and copy/share fallback.
- [x] Write campaign strategy, copy sequence, campaign links and measurement limitations.
- [x] Verify TypeScript, production build, Chrome/WebKit desktop/mobile, reduced motion, no-JS, link attribution and QR decoding.
- [x] Commit and push verified source to the working branch and main without overwriting remote history.
- [x] Deploy after explicit owner request, per repository AGENTS.md (authorized and published on 2026-11-02).

## Scope
Initial Russian-only scrolling story: SUPERSEDED by the owner-provided five-language DOCX on 2026-11-02. Implement four sequential screens, short CTAs, a bottom mobile action, progress dots and Arabic RTL. Copy lives under `app/i18n/campaigns/`, separate from the general site dictionary. All five campaign variants are complete; other languages do not expose a partial campaign.

The DOCX is reference material. Google Play is omitted because the product is iOS-only. The outcome-led final headline is replaced with an invitation to log one sleep; paid predictions are disclosed. Official Apple badges are used unmodified.

## Next action
Premium design, QR fixes and motion are verified and pushed in `dce638b` to both branches. Source checkpoint: `checkpoint/2026-11-02-instagram-premium`. Production is now published; see the deployment record below. The earlier functional baseline is preserved in `708ee9c` and `checkpoint/2026-11-02-instagram-funnel`.

## Completion pass — 2026-11-02

Owner requested completion, then a bright premium design reference matching the existing site.

- Implemented and verified: hydration-safe screen state, keyboard-accessible QR link, persistent language selection, and supported-language negotiation (for example `fr-FR,de;q=0.8` selects German instead of falling back to English).
- Verification: TypeScript and production build passed; no lint findings in new code. The full repository lint still reports 50 existing errors outside the new paths.
- Chrome and WebKit: all five languages at 390 and 1280 pixels, all four steps (80 screenshots); no page/console errors, broken images or horizontal overflow. History, reload, language changes, campaign tags, no-JavaScript navigation, 320-pixel layout and reduced motion passed.
- Additional checks passed: copy/share fallback, denied clipboard manual input, bounded campaign tags, keyboard QR activation, App Store click event, Android and Instagram guidance. Apple Vision decoded all five rendered QR codes to the expected localized App Store campaign links.
- Generated concept: `design-specs/web/instagram/assets/premium-funnel-reference.png` (1704 × 923). This is a reference board, not the implemented appearance. Existing pale campaign styling remains in the verified source.
- Analytics limitation remains explicit: client hooks and Apple campaign links exist; no remote analytics collector has been installed and no conversion uplift is claimed.
- Production deployment has not been requested or performed in this pass.

## Approved premium implementation — 2026-11-02

Owner approved the generated premium reference and requested implementation. This supersedes the pale campaign styling and the concept-only status above.

- [x] Implement the approved night-sky composition with existing Yorix artwork, live localized text, gold emphasis and white primary actions.
- [x] Adapt the shorter reference copy in all five campaign languages; preserve Premium disclosure and the illustrative forecast label.
- [x] Verify production build, Chrome/WebKit, desktop/mobile/RTL, reduced motion, no-JS navigation and existing attribution/share behavior.
- [x] Commit and push verified source to both working branch and main.
- [x] Production published after the subsequent explicit owner request; see the publication record below.

Verified premium source delivered in `dce638b` to `origin/main` and `origin/premium-web-payments`, with immutable source checkpoint `checkpoint/2026-11-02-instagram-premium`. Production was subsequently authorized and published; see the deployment record below.

### Owner follow-up — QR and wide-screen artwork

- [x] Place the real QR next to the App Store badge in the install action area, including narrow screens.
- [x] Remove the visible vertical edge of the cloud art on wide monitors; inspect 1920/2560-pixel layouts and Arabic mirroring.
- [x] Recheck rendered QR decoding after changing its size.

### Premium verification results

- Production build, TypeScript and focused lint passed. All five copy sets are complete and all 20 gold headline accents match their localized text.
- Chrome and WebKit: all five languages at 390 and 1280 pixels, all four screens, 80 screenshots, 29 grouped checks. No console/page errors, broken images, horizontal overflow or content/action overlap. History, reload, language preference, deep hashes, no-JS and reduced-motion paths passed.
- Additional 320/768-pixel and 1920/2560-pixel cases passed, including Arabic mirroring. Fixed an actual narrow-screen nightlight overlap and corrected artwork dimensions; initial deep links now start at the top of the selected screen.
- Final QR verification: 22 rendered captures decoded to the expected App Store campaign URLs with Apple Vision (five languages × two sizes × Chrome/WebKit, plus two long campaign-ID cases). QR cells occupy integer CSS pixels to avoid aliasing. QR is adjacent to the official badge, stationary and unmirrored.
- Share/copy, denied clipboard manual fallback, bounded campaign IDs, QR keyboard activation, App Store event, Android and Instagram guidance passed.
- Inspected browser evidence: `design-specs/web/instagram/assets/premium-implemented-mobile.png` and `premium-implemented-wide.png`. The original generated reference remains available for comparison.

### Owner follow-up — motion and performance

- [x] Apply consistent, restrained motion across all four screens and interactive controls; honor Reduced Motion.
- [x] Pause ambient animation offscreen/in background, prepare only the next scene after critical loading, and avoid continuous scroll work on this short campaign.
- [x] Measure the local production build with a Chrome trace and throttled loading/interaction checks; report lab evidence without claiming real-user Core Web Vitals.
- [x] Resolve QR rasterization: size each module to two pixels on mobile/tablet and three on desktop; all 22 final decoding cases pass, including Arabic and long campaign IDs.

Performance audit: trace → load/layout/interaction metrics → resource inspection → accessibility and motion states → targeted source changes.

Motion verification passed in Chrome and WebKit: live Reduced Motion, offscreen pause/resume, next-scene image decoding, entrance sampling and preservation of home-page Lenis behavior. The production build passed after the final integer-sized QR change. See `design-specs/web/instagram/performance.md` for measured results and limits.

## Production publication — 2026-11-02

Owner explicitly requested publishing all completed website changes. This supersedes the earlier pending-publication status.

- [x] Confirm clean source, matching remote branches and the existing production Worker target.
- [x] Build and publish the complete verified website batch to `yorix-website`.
- [x] Verify the public campaign in all five languages, navigation, assets and App Store/QR destinations.
- [x] Record deployment version and source revision after production verification.

Published source: `a6cedaf`. Worker: `yorix-website`; production version: `2657f69c-db92-4c89-a070-4c35e2fc3218` at 100% traffic. Public campaign: `https://yorix-app.com/ru/start`. Previous production version: `8d89db78-3e79-4238-b5c4-0616031647fd`.

Production verification found an existing edge-cache defect: static asset cache keys ignored Accept-Encoding and could send a Chrome-warmed zstd response to WebKit. The direct Cloudflare origin negotiated Brotli correctly. Remediation is limited to the two website static-asset locations: include Accept-Encoding in a new cache-key namespace and emit Vary. Existing API and page proxy behavior is unchanged. The exact patch is stored in `scripts/edge-encoding-cache.patch`.

Final public verification passed in Chrome (390 px) and WebKit (1920 px), all five languages and all four screens: no JavaScript errors, broken artwork or horizontal overflow; expected App Store and QR campaign links. Home, Russian home, support and privacy return 200; browser-language negotiation preserves the campaign query. Actual Russian mobile and wide rendered states were inspected.

The edge patch passed `nginx -t` and was activated with a graceful reload. Backup: `/etc/nginx/conf.d/yorix-edge.conf.bak-20261102-encoding`. `node scripts/check-edge-encoding.mjs` verifies identical decoded JavaScript for zstd, Brotli, gzip and identity across repeated cache hits. [Nginx proxy cache key reference](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_key). No website runtime changes remain unpublished; the subsequent repository commit records deployment evidence and the applied infrastructure patch.
