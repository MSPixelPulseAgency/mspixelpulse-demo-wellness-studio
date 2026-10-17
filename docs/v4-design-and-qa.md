# V4 implementation and release checks

The user authorized development, testing and production deployment to the existing wellness repository/project/domain, and confirmed unique clips on all 36 treatment pages.

## Design and content

- White #FFFFFF and blush #FFF7FB foundation; plum #392044, purple #71349A, orchid #9254C8, pink #DB4D9B, gold #C9A46C and ice-blue #A9D8FF details. Dark closing/footer chapters are intentional contrast.
- Shared centered 1200px maximum frame; 24px desktop gutters, 16–18px narrow-screen gutters. Floating white liquid-glass pill header: 72px desktop, 66px tablet, 62px mobile, 999px radius for fully rounded ends.
- Bodoni Moda display headings use clamp; Manrope navigation is 17px, essential body/form/button text at least 16px. Pink/purple gradient interactions, focus outlines, restrained elevation and reduced-motion support remain.
- Split home hero retains rounded media and glass details with a new treatment clip, rather than a pool film. Overlays avoid the guest’s face. Editorial arch masks and existing responsive photos are retained throughout.
- All 36 services, six categories, original service URLs and illustrative CAD pricing retained. Search, category, duration, price and shared-experience filters combine, with removable chips and reset/empty states.
- New routes: /reviews (clearly labeled samples), /feedback (private moderation flow), /wellness-tips (nine general self-care topics and two optional official-source YouTube guides). Existing /studio alias has its own clip. 48 routes total.

## Media

50 unique Pexels source IDs: one per route plus two distinct lower-page films. All licensed under https://www.pexels.com/license/; no purchases. See v4-video-sources.json for source/license/download URLs, review status, exact SHA-256, duration and bytes. Silent H.264 fast-start at 24fps; 3.25–6 second loops, maximum 960px and 850KB each. Responsive WebP posters preserve aspect ratio; portrait posters are bounded to the encoded resolution. Original downloads are not committed.

Ambient source attachment waits for page load and visibility. Playback pauses offscreen, in hidden tabs and with the footer preference; OS reduced motion and data saving retain posters without automatic downloads. Autoplay rejection/media failure preserve the poster. No ambient Play/Watch Film prompts. Educational YouTube is separate: two real AAD/NHS sources, no iframe before a click, youtube-nocookie embeds and autoplay=0.

## Functional verification before release

- 432 browser layout checks: all 48 routes at 320, 375, 390, 430, 768, 1024, 1200, 1440 and 1920px. One H1, no horizontal overflow, no detected clipped essential text or primary frame wider than 1200px. Saved screenshot per route/width and nine visually reviewed overview sheets. Browser emulation is not physical-device testing.
- Mobile and desktop menus; Services dialog search, arrow navigation, Escape/focus restoration; Journal open/Escape; catalogue category search plus price/duration combination and reset/empty state.
- Gallery category filtering, 16-image load-more, keyboard next and Escape with focus restoration. FAQ search and accordion.
- Complete seven-step booking in the real unconfigured UI, including preselection, retained date/time/details, review/edit and disabled delivery. Loopback-only fixture confirms actual handler routing to two mock email payloads and a truthful demo confirmation. No real email was sent.
- Feedback fixture stores a synthetic private pending_moderation record without publication/email; unconfigured UI prepares a local preview and explicitly says nothing was submitted or stored. Reviews search/rating/empty/reset; both educational embeds load actual YouTube player metadata without autoplay.
- Real hero playback progress observed, lower clip source remains unattached while offscreen, footer pause verified. Intentional MP4 404 retains a loaded poster. Controller tests verify hidden-tab/reduced-motion/data-saving/autoplay-rejection paths.
- npm run lint, npm test (24 passing), npm run build and git diff --check pass. Tests exercise actual catalogue data, all media hashes/encoding/provenance and submission validation/rate-limit/idempotency/failure behavior.

Local mobile Lighthouse lab: Home 92, Treatments 91, Booking 94, Feedback 96, Wellness Tips 94, optimized Gallery 93; all six score 100 for Accessibility, Best Practices and SEO. Initial gallery 87 was corrected by sizing portrait posters to the encoded video dimensions. Production runs and release identity are recorded separately after deployment. Lighthouse is a lab measurement and may vary.

## Delivery and storage limitation

The existing Vercel project had zero environment variables. Booking emails to mspixelpulse@gmail.com and the submitted customer address are implemented but live acceptance/inbox delivery is not proven or enabled. Private feedback storage is likewise pending. Five required server settings and exact verification steps are in v4-configuration.md and .env.example. No account, paid resource, sender verification, DNS, billing or authentication was created or changed. No actual appointments or genuine customer reviews are claimed. The contact enquiry builder remains a local preview.

## Release boundary

Use only MSPixelPulseAgency/mspixelpulse-demo-wellness-studio, Vercel prj_wtsYNiyFergsugt5YlYg5i5mOLXl and wellness.mspixelpulse.com. Baseline production cc0b15be4530c411f641d79f48dea813b4410819 / dpl_8NwMTTaXGLcfNQBocfrrHJDyPdJd is the rollback reference. Existing main auto-deployment, Vite/npm install/npm run build/dist/root ./ are preserved. Verify the merged SHA, READY deployment, canonical alias, deployed resource hashes, API capability/failure behavior, browser smoke tests and actual production Lighthouse before claiming release.
