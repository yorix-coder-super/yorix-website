# Personal data policy, edition of 1 October 2026

The policy as it was live from 1 October 2026, the first edition the app's
privacy link pointed to after the Tilda page.

Replaced on 13 October 2026 after a full inventory of the app, the worker and
the site:

- OpenAI also drafts and translates support replies (with the adult's and the
  child's names, age, sex and date of birth, without the diary); Cloudflare
  Workers AI searches the articles by the question text; DeepInfra is also the
  backup for the safety checks.
- The Coach context is listed in full: the child's profile (name, age, sex,
  prematurity, health conditions) is sent even with "AI Personalization" off;
  notes and medicine names never are.
- Feedback and the cancellation survey carry 7 days of the diary with notes,
  temperatures and medicine names, and the feedback sheet does not announce it
  (the old text said the app always does); copies with attachments pass
  through Resend to the Outlook support mailbox.
- New rows: subscription, AI credit and shared Premium accounting; the
  subscription screen (Adapty attributes); analytics with the account
  identifier and health-related record categories; Firebase Analytics and
  Google ads attribution; Meta events regardless of the tracking answer.
- Weather is asked of WeatherKit on the device first, the server only as a
  fallback; Apple Health and motion, notifications, widgets, sharing by link,
  data export, ATT, the site's browser storage, the gift buyer's e-mail.
- Deletion: what "Delete Account", "Remove child" and "Clear AI Chat History"
  actually remove; server-side data on request within 15 days.
- Russia: cross-border transfer notice under 152-FZ; EU: 72-hour breach notice.

To bring it back:

    git show 5018d8f:app/subscription/legal/Privacy.tsx

(`5018d8f` is the last site commit with this edition). The `.txt` copies
here are for reading without git.
