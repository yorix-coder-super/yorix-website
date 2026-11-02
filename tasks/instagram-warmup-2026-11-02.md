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
- [x] Prepare verified source for delivery to the working branch and main without overwriting remote history.
- [ ] Deploy only after explicit owner request, per repository AGENTS.md.

## Scope
Initial Russian-only scrolling story: SUPERSEDED by the owner-provided five-language DOCX on 2026-11-02. Implement four sequential screens, short CTAs, a bottom mobile action, progress dots and Arabic RTL. Copy lives under `app/i18n/campaigns/`, separate from the general site dictionary. All five campaign variants are complete; other languages do not expose a partial campaign.

The DOCX is reference material. Google Play is omitted because the product is iOS-only. The outcome-led final headline is replaced with an invitation to log one sleep; paid predictions are disclosed. Official Apple badges are used unmodified.

## Next action
Deliver the verified source to both branches. The premium visual reference is a separate concept; implementation of that direction and production deployment remain pending an owner request.

## Completion pass — 2026-11-02

Owner requested completion, then a bright premium design reference matching the existing site.

- Implemented and verified: hydration-safe screen state, keyboard-accessible QR link, persistent language selection, and supported-language negotiation (for example `fr-FR,de;q=0.8` selects German instead of falling back to English).
- Verification: TypeScript and production build passed; no lint findings in new code. The full repository lint still reports 50 existing errors outside the new paths.
- Chrome and WebKit: all five languages at 390 and 1280 pixels, all four steps (80 screenshots); no page/console errors, broken images or horizontal overflow. History, reload, language changes, campaign tags, no-JavaScript navigation, 320-pixel layout and reduced motion passed.
- Additional checks passed: copy/share fallback, denied clipboard manual input, bounded campaign tags, keyboard QR activation, App Store click event, Android and Instagram guidance. Apple Vision decoded all five rendered QR codes to the expected localized App Store campaign links.
- Generated concept: `design-specs/web/instagram/assets/premium-funnel-reference.png` (1704 × 923). This is a reference board, not the implemented appearance. Existing pale campaign styling remains in the verified source.
- Analytics limitation remains explicit: client hooks and Apple campaign links exist; no remote analytics collector has been installed and no conversion uplift is claimed.
- Production deployment has not been requested or performed in this pass.
