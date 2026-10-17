# MSPixelPulse Wellness Studio — V4

A fictional Toronto spa, wellness and cosmetic-beauty demonstration. Production: **https://wellness.mspixelpulse.com**.

React 19 / Vite / React Router / Lucide / CSS. White and blush editorial layouts preserve the pink/purple identity, local Bodoni Moda/Manrope typography, compact floating glass pill header and rounded media.

## Explore

- 48 routes: 36 treatment pages, nine existing main pages including the studio alias, and Reviews, Feedback and Wellness Tips.
- 50 unique licensed silent ambient clips, responsive posters, visibility-aware autoplay, reduced-motion/data-saving support and graceful poster fallback. Every treatment has its own clip.
- Searchable category dropdown, keyword, duration, price and shared-experience filters; keyboard service picker and clear/reset states.
- Seven-step demo booking request with review/edit, server validation, shared rate limits and idempotent agency/customer email routing when configured.
- Private moderated feedback when configured; clearly labeled sample reviews with search/rating filters.
- Nine wellness journal topics and two official-source educational YouTube guides loaded only on request without autoplay.
- Searchable FAQ, filterable keyboard gallery and local contact enquiry preview.

**Demo safety:** no operating spa, actual availability, credentials, health outcomes, real testimonials, reservations or payments. Media is illustrative stock. Email delivery and private storage require the five server settings in [configuration](docs/v4-configuration.md); missing settings visibly disable delivery and never fabricate success. Provider acceptance is not proof of inbox delivery.

## Run and maintain

```sh
npm install
npm run dev
npm test
npm run lint
npm run build
```

For built browser QA with real unconfigured API handlers: `node scripts/qa-server.mjs` (loopback port 4176). The isolated `--mock-delivery` fixture uses port 4179 and synthetic data, with no external email or storage calls.

Maintain `src/data/studio.js`, `src/data/discovery.js`, `src/data/videos.json`, shared components, `src/v4.css` and the route-responsive poster preload map in `index.html`. Check every route at 320/375/390/430/768/1024/1200/1440/1920px. No TypeScript configuration is present.

Sources: [V4 video inventory](docs/v4-video-sources.json), [photo credits](docs/noire-media-sources.json), [media license](docs/media-license.md). Historical design notes remain in docs; V4 rules supersede their local-only booking and V3 film controls.

Use only the existing repository and Vercel project `prj_wtsYNiyFergsugt5YlYg5i5mOLXl`. Production deploys from main with Vite / npm install / npm run build / dist / root ./. Follow current user release authorization and the five `.ai-agents` guides. Preserve the production domain and never edit unrelated projects, DNS, authentication or billing.
