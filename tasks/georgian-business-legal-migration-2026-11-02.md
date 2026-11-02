# Georgian business identity and legal-document migration

## Owner request

On 2026-11-02 the owner requested updating the privacy policy, public agreement and related documents, removing unnecessary repetition of personal identity/number, and using the Georgian individual entrepreneur Yahor Bazyk instead of Belarusian seller details. This supersedes the previous preference to keep Belarusian seller details, but does not establish the Georgian registration details or the payment-account holder.

## Status

- [x] Inspect current website identity, legal documents, footer and receipt examples.
- [x] Locate the matching Worker identity used in transactional mail.
- [x] Check the Georgian statutory disclosure requirement against an official source.
- [ ] Obtain the registered business name, registration/tax identifier, legal/contact address, business contact and effective transition date.
- [ ] Confirm whether the active payment account contracts with the Georgian business, and who remains responsible for existing orders/refunds.
- [ ] Implement consistent business identity and reduce unnecessary personal-data repetition.
- [ ] Update RU/EN offer, payment/refund terms, terms of use and privacy policy against the actual business and processing arrangements.
- [ ] Archive superseded editions, bump document versions, and preserve the identity/terms applicable to historical purchases.
- [ ] Verify rendered legal pages, checkout disclosures and transactional mail, then deliver the coordinated migration.

No runtime identity or legal text has been replaced yet. Missing business and payment facts are required for the replacement; do not fabricate registration details or imply that a payment account has migrated.

## Confirmed implementation map

| Surface | Source | Required change after facts are supplied |
| --- | --- | --- |
| Website business identity | `app/subscription/merchant.ts` | Replace Belarusian NPD status and taxpayer identity with verified Georgian registration; use business contact details. The current phone and street-address fields are empty. |
| Repeated identity in legal text | `app/subscription/legal/SellerBlock.tsx` | Use a consistent legal name and generic registration-number label; avoid redundant Cyrillic/Latin name repetition. |
| Public agreement | `app/subscription/legal/Offer.tsx` | Review provider, governing law, statutory references, withdrawals, liability and dispute provisions; retain mandatory consumer protections. |
| Payment and refunds | `app/subscription/legal/PaymentTerms.tsx` | Match the actual contracted seller, provider and refund process. Website acquirer selection currently names YooKassa; this does not prove its account holder. |
| App/site terms | `app/subscription/legal/Terms.tsx` | Update provider and applicable legal provisions without changing product promises incidentally. |
| Privacy policy | `app/subscription/legal/Privacy.tsx` | Establish the actual controller and location, legal bases, transfers, rights and supervisory authority; preserve the verified data-processing inventory. |
| Sample receipts | `app/subscription/SampleReceipt.tsx` | Remove real personal identifiers from illustrative documents; replace the Belarusian NPD receipt representation if it no longer describes the actual seller. |
| Document versions | `app/subscription/legal/versions.ts`, `legal-archive/` | Keep previous accepted editions; assign new editions only to completed replacement documents. |
| General footer | `app/SellerFooter.tsx` | Already links to requisites instead of printing personal identity on every page. Preserve that approach. |
| Transactional seller identity | BabySleepCoach `CloudflareWorker/src/web/seller.ts` | Coordinate the identity in payment/gift messages with website disclosure and historical-order responsibilities. |
| Localized labels | `app/i18n/*.ts` | Replace Belarus-specific identifier labels where actually rendered; update all affected locale dictionaries consistently. |

## Legal research boundary

The [Georgian Law on Electronic Commerce, Article 4](https://www.matsne.gov.ge/ru/document/view/5825902?fullscreen=1&impose=parallelEnRu) requires easily accessible supplier name/legal form, address, contact details and registered identification number. A Georgian IE therefore does not by itself make all identifying details optional. Keep business disclosures accessible in the legal/contact surface rather than repeating them in marketing UI.

The [official consumer-protection law](https://www.matsne.gov.ge/en/document/view/5420598?impose=original) and current Georgian personal-data law must be reviewed in their applicable consolidated editions before replacing jurisdiction-specific provisions. Research is preliminary; this ledger does not establish a final legal conclusion about the owner's business or payment eligibility.

## Next action

Use the owner's business particulars and payment-account clarification to complete the migration. If web payments still belong to the Belarusian seller, resolve whether to retain a separate, clearly identified seller for that channel or suspend/migrate it before publishing a universal Georgian-provider claim. Do not change checkout availability without an owner decision.
