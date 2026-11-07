# YooMoney checkout preview

Owner requested implementing card-funded wallet payments and checking the site without changing public documents. Added a dormant YooMoney POST handoff to the existing checkout. The active provider remains YooKassa; seller identity and legal editions/text are unchanged. There was no deployment or real transfer.

Verified: TypeScript and production build pass. Lint has the same 50 existing findings as baseline, with no additions. Actual gift checkout and paid return pass in Chromium/WebKit at 390/1280px, with all remote requests intercepted. The browser validates production-only wallet handoff, exact destination, fixed fields and local return path. Existing provider redirects remain supported.

Backend implementation, 799 tests and activation requirements are in the BabySleepCoach repository: `docs/adr/2026-11-07-yoomoney-wallet-checkout.md`. The reproducible browser script is `CloudflareWorker/scripts/yoomoney-site-check.mjs` there; set SITE_CHECK_BASE to this site's local dev server. Evidence uses fictional wallet/order data only.

Pending outside this implementation: provider eligibility confirmation, seller/payment disclosure alignment, secure wallet credentials and an explicitly authorized real-payment smoke test. The development server was stopped after verification.
