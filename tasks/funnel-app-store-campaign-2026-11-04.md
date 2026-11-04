# Funnel App Store attribution

Owner request, 4 November 2026: use the supplied App Store campaign URL on the last screen reached from https://yorix-app.com/start.

Exact destination: https://apps.apple.com/app/apple-store/id6788705252?pt=129050076&ct=Website_Voronka&mt=8

- [x] Set the final App Store button and its QR destination to the exact URL for all funnel languages. Preserve the separate website event tag and share-link UTM parameters.
- [x] Verify types/build and the final rendered button/QR destinations.
- [x] Commit, push, publish and verify the production funnel.

Completed: published and verified the website-only change. QR artwork is generated from the same destination by CampaignPage; no separate static QR replacement is required.

Verification: TypeScript, targeted lint and production build passed. Chrome production walkthroughs passed through neutral /start in RU, EN, TR, DE and AR, including the final visible screen, exact button/QR URLs despite incoming UTM parameters, no overflow and no page errors. Russian final-screen capture inspected.

Delivery: source `a43ba48`, production version `cca8b040-eaa8-42d8-bfea-218fcfbffc4d`, read back at 100% traffic. Source pushed to premium-web-payments and main. Ledger-only follow-up needs no redeployment.
