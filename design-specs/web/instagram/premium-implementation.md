# Premium campaign implementation

Approved 2026-11-02 from `assets/premium-funnel-reference.png`. The night-sky design replaces the earlier pale concept.

## Composition

At 390 pixels, each screen stacks a concise heading and supporting sentence, a large illustrated scene, optional supporting content, then the primary action and four progress links. The screen fills the small viewport height when content fits and grows naturally on short screens or with larger text. Navigation never covers copy. At 768 and 1280 pixels, the copy/action occupy the leading column and the illustration occupies the trailing column, within 1120 pixels. Arabic mirrors the composition while keeping text, official badges and the real QR unmirrored.

1. Recognition: moon baby with rabbit, periwinkle cloud bank, gold star; question headline and one supporting sentence.
2. Timing: nightlight plus clock; three glass-bordered guidance rows below the scene on mobile.
3. Product: gold star above an illustrative indigo forecast card; example label, next-sleep window and Premium disclosure.
4. Install: baby holding the star, clouds, official localized App Store badge, free-versus-Premium disclosure, QR next to the store badge on every screen size and share fallback.

## Visual and motion rules

Use site direction S1: midnight `#11102e`, indigo `#242060`, periwinkle `#b9b3ff`, gold `#ffe49a`, white headings and muted lavender body text. Headlines are 34 pixels on a 390-pixel phone and up to 58 pixels on desktop. One gold phrase per title is encoded in the campaign copy, not guessed from word positions. Buttons are white pills with dark text; information rows use a thin lavender border and translucent indigo fill.

Server HTML remains visible. After hydration, copy enters with 10-pixel translation and opacity over 500 ms; the scene follows over 650 ms. Ambient artwork uses the existing float/twinkle vocabulary; the LCP moon baby stays still. The cloud bank drifts by at most 7 pixels on the compositor, and the final baby floats slowly; ambient motion pauses offscreen, in background tabs and under Reduced Motion. Reuse the site's Magnetic wrapper for pointer-only CTA feedback. Reduced motion removes all entrance and ambient motion. Decorative layers never animate layout or intercept input. QR and the official store badge remain still. No new image download is needed: reuse the shipped WebP art.

## Verification

Inspect four-screen compositions at 390 and 1280 pixels in Chrome and WebKit, plus 320/768 widths. Check no text/art/action overlap, preserved Arabic direction, readable disclosure and visible focus. Repeat the functional campaign matrix for navigation, language, history, App Store attribution, QR decoding and share fallbacks.

## Verification result — 2026-11-02

Production build, TypeScript and focused lint passed. The five-language Chrome/WebKit matrix passed at 390/1280 pixels (80 screen captures), including navigation, attribution, no-JS and reduced motion. Additional narrow, tablet and wide-monitor cases cover 320, 768, 1920 and 2560 pixels. The cloud bank uses an elliptical opacity mask on desktop so its rectangular source edges do not show. All 22 final QR captures decoded successfully with Apple Vision: five locales at mobile/desktop sizes in Chrome and WebKit, plus long campaign IDs. Integer-sized QR modules avoid rasterization artifacts.

Reviewed screenshots: `assets/premium-implemented-mobile.png` (four actual Russian browser captures) and `assets/premium-implemented-wide.png` (1920-pixel product screen). The image-generation reference is not used as a screenshot or flattened interface.

## Motion and loading implementation

Entrances use CSS transforms and opacity with a decelerating curve: copy 500 ms, scene 650 ms, guidance rows staggered by 70 ms, primary action delayed 120 ms. Initial entrances are skipped after slow hydration, and all server-rendered content stays visible before JavaScript. Menu and press feedback are brief and do not block input.

An IntersectionObserver and visibility listener pause only the visible scene's ambient CSS animations when offscreen or hidden; the Reduced Motion media query also updates live. The next scene's images are prepared during idle time after critical loading. Hero image priority remains high; decorative art has low fetch priority. No new runtime dependency was added. The short campaign opts into native scrolling, so the site's dynamically imported Lenis library and continuous frame loop are skipped here; other pages retain their existing smooth scrolling.

References: [web.dev animation guidance](https://web.dev/articles/animations-guide) and [LCP optimization guidance](https://web.dev/articles/optimize-lcp), consulted 2026-11-02.
