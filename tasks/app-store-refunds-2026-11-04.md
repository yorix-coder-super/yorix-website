# App Store refund responsibility clarification

Owner request, 4 November 2026: policies and related material must clearly state that Yorix does not issue refunds for Apple-billed purchases and Apple makes the refund decision.

- [x] Verify Apple refund request/status guidance (https://support.apple.com/118223 and https://support.apple.com/118224).
- [x] Archive the previous editions and update RU/EN terms, offer, payment and privacy text; edition 2026-11-04.
- [x] Align support knowledge and regenerate the Worker bundle.
- [x] Verify types, builds, relevant support checks and rendered legal pages.
- [ ] Commit and push the coordinated batch; publish and verify the website and support bundle.

Scope: Apple-billed subscriptions, programs and AI credits. Keep Website refund rights and mandatory consumer protections. Explain cancellation separately and retain truthful disclosure of usage information supplied to Apple. No iOS UI or consent changes.

Next action: finish support wording, verify and publish the batch using the existing website/Worker deployment workflow.

## Verification

- Website TypeScript and production build passed. Targeted lint retained the same two pre-existing internal-link findings in PaymentTerms; those statements are unchanged from the archived edition.
- Worker TypeScript and all 736 tests in 72 files passed; site prices remain in sync and the 51-article support bundle is fresh.
- Sixteen local Chrome checks passed: four documents in RU/EN at 390 and 1280 px, current edition, refund ownership, Apple links, no overflow or page/resource errors. Mobile RU and desktop EN refund-section screenshots inspected. WebKit was unavailable (missing installed browser executable); no WebKit pass is claimed.
- Archived files exactly match the preceding committed editions. API runtime delta from deployed source is only the generated support bundle; live variables match source, checkout remains test mode.
