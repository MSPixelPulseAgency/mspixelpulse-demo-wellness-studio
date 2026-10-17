# V4 demo request and feedback configuration

The existing wellness Vercel project had **zero environment variables** when inspected on 2026-10-17. No email account, sender, database, storage, billable resource or domain was created or modified. There are no credentials in source or browser code. The production form must remain explicit about setup pending until the following approved resources are supplied.

## Required server environment

| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Sending permission for an agency-approved existing Resend account. |
| `WELLNESS_EMAIL_FROM` | A sender on that account's verified domain, such as an approved display name and address. Do not use an unverified Gmail From address. |
| `WELLNESS_REDIS_REST_URL` | HTTPS REST endpoint of an approved existing private Upstash-compatible Redis database. |
| `WELLNESS_REDIS_REST_TOKEN` | Private read/write credential for that database, restricted to the agency operators. |
| `WELLNESS_SUBMISSION_SECRET` | An independently generated random secret of at least 32 characters, used for HMAC identifiers and IP hashes. |

Booking needs all five values. Private feedback needs Redis and the submission secret. No value uses a `VITE_` prefix. `.env.example` contains names only. Assign the values to the intended Preview/Production environments, redeploy, then check `/api/status` (capability booleans only). A configured flag indicates available configuration, not proven delivery.

The adapter uses the documented Resend batch endpoint and 24-hour idempotency keys. It sends only after server validation and shared anti-abuse checks. Agency destination is explicitly `mspixelpulse@gmail.com`; customer destination is the normalized submitted email. Both messages are marked DEMO and state that no reservation or actual availability exists. Customer email, phone, service and date/time preferences appear in the text, along with a deterministic demo reference. A successful API response means both emails were accepted by the provider, not necessarily delivered to inboxes. Provider errors never show a successful booking.

## Storage and moderation

- Atomic Redis counters limit this low-volume demo to three valid submissions per hashed network address per hour. Storage failure stops submission; no in-memory production fallback is used.
- Honeypot, minimum completion time, same-origin checking, JSON/body limits, bounded input fields, date/time/service validation and consent apply server-side.
- Atomic request reservation prevents duplicate processing across concurrent functions. Completed receipts are replayed for the same identity; provider requests use the same idempotency identity. Ambiguous failures retain a reservation for 24 hours: contact the agency with the reference rather than repeatedly creating new requests.
- IPs are HMAC hashed; booking receipts contain no customer details. Deduplication state expires after 24 hours; rate counters expire after one hour.
- Feedback is stored under private `wellness:feedback:*` keys with `pending_moderation` status, an explicit optional publication-consent field and a 30-day TTL. It is never automatically published. There is no public API to retrieve submissions. Authorized operators can review records through their existing private Redis tooling; remove declined records promptly. Provider backup/retention settings must align with the agency policy before enabling real collection.
- App logs contain request type, reference and delivery/moderation state only. Do not log request bodies, email addresses, phone numbers, raw IPs or provider secrets.
- The public reviews page shows only clearly labeled sample review layouts. No genuine customer testimonials or ratings are invented.

## Verification and limits

`npm test` exercises actual validation, email payload routing, mocked provider acceptance/failure, Redis atomic counter/reservation behavior, duplicate responses, moderation state and safe configuration failure. `node scripts/qa-server.mjs --mock-delivery` is a loopback-only browser fixture on port 4179, with synthetic credentials and no external network delivery. Its test email payloads and private records go to temporary `/tmp/wellness-v4-mock-*.json` files. Production API handlers never import the fixture. The ordinary QA server runs the real unconfigured handlers on port 4176.

After configuring approved accounts, perform one clearly marked, owner-authorized request using an authorized test recipient. Confirm agency and customer messages in actual inboxes/provider delivery events and verify duplicate submission does not resend. This live delivery test has **not** been possible without credentials. Do not claim real delivery on the strength of mocks or provider acceptance alone. No unsolicited customer emails should be generated.

Primary adapter documentation: [Resend batch emails](https://resend.com/docs/api-reference/emails/send-batch-emails), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Upstash Redis REST](https://upstash.com/docs/redis/features/restapi).
