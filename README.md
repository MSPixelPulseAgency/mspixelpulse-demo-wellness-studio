# MSPixelPulse Wellness Studio — V3

A fictional Toronto spa, wellness and cosmetic-beauty demonstration. Production: **https://wellness.mspixelpulse.com**.

React 19 / Vite / React Router / Lucide / CSS. The current NOIRÉ collection combines detached liquid-glass navigation, rounded editorial layouts, purple/pink/plum gradients, local Bodoni Moda/Manrope fonts and deliberate mobile compositions.

## Explore

- 36 services, six collections: Massage, Facials, Body, Wellness, Packages and Beauty.
- Search names/categories/descriptions; combine category, duration and shared-experience filters. Query filters preserve input focus.
- Native modal service chooser with categories, search, clear/reset, keyboard arrows/Home/End/Enter/Escape and focus restoration.
- Four-step local request: ritual → preferred date/time → sample details → review/edit/copy/clear.
- Improved Contact with enquiry topics and clearly fictional example hours/location; searchable FAQs; 16-photo filterable keyboard gallery.
- 22 licensed photo/poster sources with 88 responsive WebP variants. The silent 10-second pool film is 736 KiB. It autoplays in the homepage hero only after page load, while visible; reduced motion prevents automatic loading. The poster and explicit play/pause/retry control remain available. Below-fold and Experience films still load only after Play. All films pause offscreen or in a hidden tab.
- All original routes, six service IDs, CAD prices and durations retained. 45 routes including 36 details and the /studio alias.

**Demo safety:** no operating spa, practitioner credentials, real availability, reviews, health outcomes, bookings, payments, emails or server persistence are represented. Use fictional sample details. No medical or sensitive questions. Media is illustrative stock, not an actual studio.

## Run and maintain

```sh
npm install
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

This existing JavaScript/JSX project has no TypeScript configuration. Maintain data in `src/data/studio.js`, filters in `src/data/discovery.js` and the route-responsive image preload map in `index.html`. Shared UI, chooser, discovery, film and request components are in `src/components/`. Check the nine requested widths and every route after changes.

Research and interaction/QA contracts: [V3 design and QA](docs/v3-design-and-qa.md). Image credits: [media sources](docs/noire-media-sources.json). Film encoding/license: [video source](docs/v3-video-sources.json). Earlier V2 research remains in [the NOIRÉ transformation history](docs/noire-transformation.md).

Use only the existing MSPixelPulseAgency/mspixelpulse-demo-wellness-studio repository and Vercel project prj_wtsYNiyFergsugt5YlYg5i5mOLXl. Production deploys from main; Vite / npm install / npm run build / dist / root ./ and wellness.mspixelpulse.com remain. Follow current user release authorization and the five `.ai-agents` maintenance guides. Never edit unrelated projects, DNS, authentication or billing for demo revisions.
