# Wallet checkout production rollout

Owner requested live payments and accepts that the first real transfer will be made by customers. The owner confirmed the seller for new website purchases is their Belarusian professional-income-tax individual; the Georgian app operator remains unchanged. Do not publish passport or phone details. Describe supported cards by country only, without naming Belkart.

- [x] Prepare the YooMoney profile and shared country-restriction note for plan and gift checkout.
- [x] Archive prior documents and update the offer, payment and privacy editions to 2026-11-07.
- [x] Preserve the Georgian app operator and historical seller identities.
- [x] Verify typechecking, build, and Chromium/WebKit at phone and desktop widths; baseline lint findings remain unchanged.
- [x] Publish the site and coordinate notification routing with the main API before enabling production purchases.
- [x] Verify public pages/configuration and document that real-money settlement remains unverified.

No real payment was made by the agent. The provider's signed notification test is verified; a Belarusian-card attempt failed on the provider page. Bootstrap runs on yorix-app.com, with production notifications destined for api.yorix-app.com/v1/web/yoomoney/notify. No tunnel is used.

Delivered source `7968efa`, website version `c5924995-f979-4a5e-a00b-20949dd1516a`; production API version `17018e4b-53ae-4f19-be7d-65afd9fc9759`. Live configuration reports production YooMoney checkout and reviewOpen=false. The real provider test was verified at the working notification endpoint; real-money settlement remains unverified by explicit owner decision. Live mobile checkout was inspected without accepting terms or submitting payment.
