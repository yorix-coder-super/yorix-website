# Georgian business identity and legal-document migration

## Objective and owner decisions

On 2026-11-02 the owner requested replacing Belarusian seller details with the Georgian individual entrepreneur, reducing unnecessary repetition of personal identity, and updating the offer, terms, privacy and payment documents. The owner then requested comparison with OpenAI and comparable policies, avoiding unsupported promises and adding lawful provider protections.

Confirmed in the conversation:

- Registered name: Individual Entrepreneur YAHOR BAZYK; registration/tax number `304699431`. Verified against the owner's English NAPR extract dated 18 December 2023.
- The owner confirmed the registered address remains Georgia, Tbilisi, Krtsanisi district, Fonichala settlement 3, building 5, auxiliary warehouse.
- Future acquiring will be contracted with the Georgian IE. This confirms the intended merchant, not an already executed acquiring contract.
- The owner said their passport changed and likely was unnecessary. No new passport search or publication is needed. Do not publish passport numbers, birth dates, personal identification documents or the registration extract.
- Keep the Yorix support form and existing business mailbox. No personal telephone is added.
- Superseded: the initial assumption that the business particulars and future payment-account holder were still unknown.

## Implementation status

- [x] Inspect website identity, legal documents, footer and receipt examples.
- [x] Identify matching Worker identity in payment and gift confirmation mail.
- [x] Obtain and verify business particulars; confirm the address and intended acquiring entity with the owner.
- [x] Compare relevant primary-source policies and Georgian legislation.
- [x] Prepare consistent Georgian business identity in RU/EN documents and edition-aware mail.
- [x] Reduce identity repetition: marketing/footer links to requisites; identifiers only in the business disclosure blocks and transactional seller identification; illustrative receipt has no real identifiers.
- [x] Archive preceding document sources and associated seller/receipt configuration; set the prepared editions to 2026-11-02.
- [x] Preserve the seller accepted with historical orders rather than relabelling them retrospectively.
- [x] Align refunds across offer, payment terms, FAQ and new-edition immediate-access mail.
- [x] Remove fixed support/activation-resolution promises and absolute claims about AI safety or complete absence of server-side diary data.
- [x] Complete final source and rendered-page checks (record below).
- [x] Publish the prepared controller/seller identity on the owner’s subsequent request; unresolved arrangements remain tracked below.

This is a prepared migration, not a claim that the business contracts or processing arrangements have already migrated. Public API verification on 2026-11-02 reported test checkout, review open and YooKassa as provider. This work does not enable live payments, change the acquirer, alter prices or widen sales geography.

## Research and drafting decisions

| Primary source | Relevant pattern | Yorix adaptation |
| --- | --- | --- |
| [OpenAI ROW Terms, 1 January 2026](https://openai.com/policies/row-terms-of-use/) | Probabilistic output; no sole reliance; as-is availability; limited liability subject to law | No guaranteed sleep, health or development outcomes, no guaranteed error-free AI or uptime, no additional support SLA. Liability cap is the greater of 12 months of fees or USD 50 equivalent, subject to mandatory exceptions. This is a drafting choice, not a finding that every court will enforce it. |
| [OpenAI Europe Terms, 16 January 2026](https://openai.com/policies/eu-terms-of-use/) | Consumer protections vary by jurisdiction | Preserve mandatory rights, remedies, refunds and access to competent courts. Do not import US arbitration or an unconditional consumer indemnity. |
| [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/) and [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy) | Describe actual processing, legal bases, retention, transfers and reasonable security measures | Keep the Yorix processing inventory; no promise of absolute security, no imported AI-training permission, and no claim that Yorix processes no child data. Anthropic's consumer contract was not relied on because the retrieved page was not the intended English edition. |
| [Huckleberry disclaimer](https://huckleberrycare.com/disclaimer) | Parenting information does not replace professional care or real-time supervision | State informational purpose, no emergency monitoring, possible AI mistakes and no individual clinical review. No claim that disclaimers themselves establish medical-device classification. |
| [Georgian electronic commerce law, Article 4](https://www.matsne.gov.ge/ru/document/view/5825902?fullscreen=1&impose=parallelEnRu) | Accessible supplier identity, form, address, contact and registration details | Retain necessary Georgian business disclosures rather than hiding the contracting party. |
| [Georgian consumer-protection law, consolidated](https://new.matsne.gov.ge/en/document/view/5420598) | Mandatory pre-contract information, withdrawal and remedies | Preserve statutory withdrawal where applicable; activation alone does not waive rights. No separate refund fee. Remove unsupported Belarus-specific references. |
| [Georgian personal-data law, consolidated](https://www.matsne.gov.ge/en/document/view/5827307) | Rights deadlines, special-category data, transfer grounds and supervisory oversight | Update rights and regulator to the State Audit Office of Georgia; distinguish consent from accepting terms. Qualifying incidents have the statutory notification requirements. |

These sources inform original Yorix wording; their contracts are not copied wholesale. Contract language cannot eliminate mandatory liability, cure a misleading product claim or replace compliance in operation. Existing paid entitlements and applicable consumer law remain protected.

## Changed surfaces

Website:

- `app/subscription/merchant.ts`: confirmed Georgian entity and address, registration-number label, business contact only.
- `app/subscription/legal/SellerBlock.tsx`: name once per disclosure block, no repeated number in introductory seller references.
- `Offer.tsx`, `PaymentTerms.tsx`, `Terms.tsx`, `Privacy.tsx`: coordinated RU/EN prepared editions.
- `app/subscription/copy.ts`: refund FAQ points to authoritative terms, removing stale deadlines and expense deductions.
- `app/subscription/SampleReceipt.tsx`: illustrative card confirmation, no Belarusian NPD receipt or real identity.
- `app/subscription/legal/versions.ts`: edition 2026-11-02.
- `legal-archive/2026-11-02-pre-georgia/`: exact preceding source from `f96c491`, including merchant and receipt configuration. Historical documents retain their historical identities; these are not public routes.

BabySleepCoach Worker:

- `CloudflareWorker/src/web/seller.ts`: select seller from the order's accepted offer edition; missing/old editions retain historical seller.
- `CloudflareWorker/src/web/confirmation.ts`: use edition-aware identity in buyer/gift mail; new immediate-start language preserves statutory refunds.
- `CloudflareWorker/test/webTerms.spec.ts`: RU/EN new and historical identity, gift identity and immediate-start regression checks.

## Publication readiness — unresolved external facts

1. **International-transfer basis.** Article 37 of Georgian data-protection law requires an applicable transfer basis. Contractual safeguards under Article 37(2)(b) require supervisory permission under Article 37(3); a user contract or policy publication is not sufficient by itself. The session has not established destination adequacy, applicable exceptions, regulator permission or qualifying informed consent for every actual transfer. Confirm a documented basis per relevant recipient/flow before publishing the new controller identity. The draft does not assert that permission exists.
2. **Consent and operations.** Verify actual health-data/AI consent collection and evidence against the Georgian requirements, including transfers, rather than assuming an older consent meets them. Policy text cannot stand in for a missing interface or record. Confirm processor agreements, retention/deletion execution and incident handling under the new controller. This task did not perform a complete operational privacy audit or alter the iOS consent flows.
3. **Acquiring and other account contracts.** The owner confirmed the future contracting party; obtain/verify the executed merchant contract and settlement/tax-document setup before live payments. Confirm applicable platform/provider account identity and the transition date. Existing historical orders retain their original disclosures and obligations.
4. **Coordinated release.** The prepared website edition and Worker mail mapping must be released together once ready. If the actual release uses a later edition date, update the website edition, Worker migration threshold and tests consistently; preserve this prepared state in history. Verify live test mode remains in place until the merchant setup is approved.

A Georgia-qualified review of these actual arrangements and the cross-border consumer clauses is appropriate before publication. This is a specific readiness gap, not a claim that the new text guarantees immunity or that every overseas transfer necessarily lacks a lawful basis.

## Verification and delivery

- Website TypeScript check and production build passed.
- Chrome at 390 px and WebKit at 1280 px: RU/EN offer, privacy, terms and payment pages passed (16 combinations). Checked the prepared edition, one registration-number disclosure per relevant page, no former identity in live-page content, no horizontal overflow, a single illustrative receipt and no page/resource errors. Inspected rendered identity and receipt screenshots.
- Local preview initially retained a stale asset manifest after the rebuild; restarting the owned preview fixed the CSS/chunk 404s. The final 16-case run passed with asset-error assertions enabled.
- Focused website lint: two pre-existing internal-anchor findings in PaymentTerms, verified against the preceding source; no new findings. No unrelated lint cleanup.
- Worker typecheck and full suite: 72 test files, 736 tests passed; generated website prices remain in sync. The added immediate-start text test normalises mail line wrapping.
- Archived files match `f96c491` byte-for-byte. No duplicate static clause numbers per language were found; `git diff --check` passed for the owned changes.
- Generated local registration-extract intermediates were deleted; original owner files remain untouched.

Source delivery uses website `premium-web-payments` with `main` fast-forwarded, and BabySleepCoach `main`; only the owned Worker files and preference memory are included in the latter commit. Unrelated iOS/catalog/art changes are excluded.

The production website remains on its earlier published edition; no legal migration deployment or app release has been performed. Next action: resolve the documented transfer/consent and account-contract facts, then select the effective date and coordinate the website/Worker release upon request.

## Publication authorization and execution — 2 November 2026

After the prepared state and remaining legal/contract facts were reported, the owner replied “okay, go ahead”. Proceed with publication of the prepared website documents and matching transactional-mail identity. This supersedes the publication deferral above; it does not establish that transfer permissions, qualifying consent or acquiring agreements exist. Those remain open operational/legal follow-ups, and live checkout stays disabled.

- [x] Confirm deployment scope: current API production is `d891992e-6098-4e09-b0ea-daaa29fe8d74`, source `afcf51439`; only seller identity/confirmation runtime changes differ in the Worker. Unrelated iOS working-tree changes are excluded.
- [x] Confirm production checkout remains `test`, review open, provider YooKassa.
- [x] Publish the compatible Worker mail mapping, then website documents.
- [x] Verify current production versions, RU/EN documents, entry funnel and unchanged checkout mode.
- [x] Record final deployment provenance and source delivery.

Previous website version: `2657f69c-db92-4c89-a070-4c35e2fc3218`. Prepared runtime source: website `ec08e7d`, API `a2aab2e54`.

Published versions, both read back at 100% traffic:

| Service | Deployed source | Production version |
| --- | --- | --- |
| Website `yorix-website` | `3361dda` (runtime `ec08e7d`) | `f4c82f34-bb83-4119-955f-392dfbcff627` |
| API `babysleepcoach-ai-proxy` | `a2aab2e54` | `3dc6e56c-46a5-401b-afde-4a274c8e2aef` |

Both dry-run bundles passed. The API's deployed plain-text variables matched the checked-in configuration before release; public config after release still reports test checkout, review open, YooKassa. No live purchase or customer email was generated for verification. No iOS build was released.

Final production verification:

- 16 rendered checks passed on `https://yorix-app.com`: Chrome at 390 px and WebKit at 1280 px, RU/EN offer/privacy/terms/payment. Edition 2 November 2026, Georgian identity, one registration-number disclosure, no former seller identity, no overflow, receipt and links all passed; no page or first-party resource errors. Rendered identity and receipt screenshots were inspected.
- English sales-page checks used an English language cookie with a Russian-compatible browser-language list, respecting the existing sales gate. The English-only request from outside the sales region correctly redirected to the showcase; no gate was changed.
- Chrome and WebKit passed `/ru/start`, `/ru/support` and neutral `/start` resolving to `/ru/start` with the saved Russian language (six checks). A bare Python-urllib probe received 403; the actual browser checks passed.
- `scripts/check-edge-encoding.mjs` passed all eight cold/warm checks: zstd, Brotli, gzip and identity decoded to the same JavaScript.
- Public API still reports `checkoutMode: test`, `reviewOpen: true`, `provider: yookassa`.

Publication is complete. Subsequent commits only record evidence/preferences; all runtime changes in this batch are live. The open next actions are the transfer/consent and provider-contract verification described above, plus an executed Georgian acquiring arrangement before live payments. No such facts are inferred from the owner's publication authorization.
