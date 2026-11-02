# Campaign motion and performance verification

Measured 2026-11-02 against the local production build. These are single-run laboratory snapshots, not field Core Web Vitals or a guarantee for every device.

## Setup

Chrome headless, 390 × 844 viewport, cold cache, 4× CPU slowdown, 100 ms network latency, 1.6 Mbps download and 0.75 Mbps upload. Chrome DevTools Protocol recorded the performance timeline; PerformanceObserver collected LCP, layout shifts, long tasks and input-event timings. The idle CPU sample spans 1.5 seconds. Frame intervals were sampled with requestAnimationFrame during all three forward transitions.

## Observations

| Measurement | Before motion/performance pass | Final |
| --- | ---: | ---: |
| Largest Contentful Paint | 2.89 s | 2.91 s |
| Cumulative Layout Shift | 0 | 0 |
| Main-thread task time during 1.5 s idle | 162.4 ms | 55.0 ms |
| Largest observed input-event duration | 104 ms | 96 ms |
| Resource transfer observed after initial load | 638.0 KiB | 633.7 KiB |

Final transition frame-interval p95: 16.8 ms on each of the three transitions. One interval above 50 ms was observed in the first transition under CPU throttling; none in the remaining two. This is not a claim of perfect frame pacing. The initial load remains about 2.9 seconds under this network setup; no meaningful LCP improvement is claimed. The useful measured change is lower idle main-thread work with additional visual motion.

## Implementation

- CSS transforms and opacity for entrances, floating art and cloud drift; no animated layout, filters or shadows.
- Short decelerating entrances, 70 ms guidance staggering and non-blocking controls. Initial entrances are skipped after slow hydration; server content remains visible without JavaScript.
- The LCP baby, official store badge and QR remain still. Hero loading priority is high; decorative artwork is low priority.
- Ambient animation pauses when the active scene is offscreen, the document is hidden or Reduced Motion is enabled. No generic permanent `will-change` layer promotion.
- Only the next scene's existing images are decoded during idle time after critical loading. No new runtime package or animation asset was added.
- The campaign uses native scrolling. Lenis is dynamically imported only on other site pages, preserving their current behavior while removing its continuous campaign frame loop.

## Behavioral evidence

Chrome and WebKit passed live Reduced Motion changes, offscreen pause/resume, next-scene image readiness and sampled intermediate/final entrance states. The main Russian home page still initializes its existing Lenis scrolling. The separate five-language campaign matrix verifies history, localized links, no-JS behavior, RTL, images and action/content separation. Physical Instagram handoff and real-device battery use are not measured by these local tests.

## Sources

- [web.dev: high-performance CSS animation](https://web.dev/articles/animations-guide) — compositor-friendly properties and restraint with layer promotion.
- [web.dev: optimizing LCP](https://web.dev/articles/optimize-lcp) — prioritize critical loading and distinguish laboratory from field evidence.
