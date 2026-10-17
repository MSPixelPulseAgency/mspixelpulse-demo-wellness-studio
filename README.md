# MSPixelPulse Wellness Studio

The NOIRÉ edit: an original cinematic luxury wellness/spa/beauty/relaxation-massage website concept for Toronto. Fictional services, illustrative CAD prices, licensed stock photography and a local demo appointment request; no operating spa, real bookings or payments.

## Development

React 19, Vite, React Router and Lucide. Run `npm install`, `npm run dev`, `npm run build`; output is `dist`. `npm run lint` checks source; `npm test` checks route/content/media contracts. This is JavaScript/JSX, with no TypeScript compiler configuration. Content lives in `src/data/studio.js`; reusable UI in `src/components/`; route compositions in `src/pages/StudioPages.jsx`; design tokens in `src/index.css`; responsive image metadata in `src/data/media.json`. Self-hosted Bodoni Moda and Manrope, deep burgundy/midnight plum/champagne/ivory/rose, and fifteen licensed local photo sources create a distinct editorial direction.

## Routes

`/`, `/services`, six `/services/:id` treatments, `/about`, `/experience`, `/gallery`, `/booking`, `/contact`, `/faq`; `/studio` is an experience alias.

## Production identity

- Repository: https://github.com/MSPixelPulseAgency/mspixelpulse-demo-wellness-studio
- Production: https://wellness.mspixelpulse.com
- Existing Vercel fallback: https://mspixelpulse-demo-wellness-studio.vercel.app
- Existing project: prj_wtsYNiyFergsugt5YlYg5i5mOLXl
- Build: Vite, npm install, npm run build, dist, root ./

All contact details are placeholders: hello@mspixelpulse.com, +1 (000) 000-0000, Toronto, Ontario, Canada. No real spa address or practitioner claims. Forms prepare a request in memory and do not send it; never collect health data. No hair, barber, nail or medical-spa service claims.

See [current NOIRÉ research and QA](docs/noire-transformation.md), [previous redesign record](docs/redesign-and-qa.md), [media licensing](docs/media-license.md) and the five role-specific `.ai-agents/` maintenance guides. Preserve current user release instructions and verify actual production after publishing.
