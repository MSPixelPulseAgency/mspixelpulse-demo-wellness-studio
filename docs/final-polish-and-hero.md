# Final V3 UI polish and cinematic hero

Focused refinement of the existing NOIRÉ purple/pink identity, split composition, rounded media, imagery, liquid-glass header and demonstration functionality.

## Changes

- Deep pink-to-purple control gradients with animated background-position, subtle elevation/glow, readable hover/focus/active states and deliberate icon motion. Services no longer inherits a pale background with pale text. Selected chooser rows and filters retain clear white text.
- The final glass header is a fully rounded capsule: 72px desktop, 66px tablet and 62px mobile, with preserved 44px mobile controls. Desktop navigation is 17px, with 16px CTA text and a spacious header. The mobile menu starts below 1280px, rather than shrinking navigation. Essential controls, labels and body copy are at least 16px. Decorative labels remain secondary. Booking progress uses two columns and actions wrap naturally.
- Homepage hero uses the existing licensed, silent, locally hosted spa-pool film in the original rounded portrait area, alongside the existing inset treatment image. Its portrait pool poster preserves the scene and warm palette. The floating ritual note sits above the face area.
- `HeroFilm.jsx` and `heroPlayback.js` attach the source only after page load and while visible. Playback is muted, looping and inline; it pauses offscreen or in a hidden tab. Explicit pause persists across visibility changes. Reduced motion prevents automatic source attachment and playback; manual Play remains available. A failed play/network request retains the still image and offers retry. One shared 753,357-byte MP4 is reused from cache; below-fold/Experience films remain click-to-load.
- Escape closes the service chooser first, retaining focus in mobile navigation. A second Escape closes navigation and returns focus to its toggle.

## Verification before release

- Build and ESLint pass; 12 Node tests pass, including real media-container/provenance checks and playback lifecycle, reduced motion, manual pause, rejection, network error and cleanup.
- 45 existing routes (including `/studio`) checked at 320, 375, 390, 430, 768, 1024, 1440 and 1920px: 360 unique route/width checks, full-page captures and visual route sheets. No horizontal overflow, clipped controls or missing H1. Visual review additionally corrected the long Aromatherapy heading at 320px.
- Browser checks: chooser search/keyboard arrows/Escape/focus return, mobile menu; booking validation/date/time/sample details/review/edit/copy/clear; catalogue search, combined duration/couples filters; 16-photo gallery load-more, category filtering, lightbox next/previous/Escape; contact review; FAQ search/accordion.
- Browser confirms real moving hero frames, offscreen pause, manual pause persistence and no automatic source on the secondary film. A separate local server intentionally returns video 404: the still image remains loaded, failed video is hidden and retry feedback is visible. Reduced motion, autoplay denial and hidden-tab transitions are covered by isolated playback tests; the in-app browser keeps its background pages visible, so its tab switching cannot prove a native hidden-tab transition.
- Local Lighthouse 12.8.2, mobile simulation: Home 92/100/100/100; Services 94/100/100/100; Booking 96/100/100/100; Gallery 94/100/100/100 (Performance/Accessibility/Best Practices/SEO). An additional unweighted accessible-name mismatch in the initial Home report was corrected before release. Final production reports are recorded separately.
- Compiled and browser-computed header blur remains `blur(28px) saturate(1.45)`. Keep prefixed backdrop-filter before the standard declaration when changing CSS.

All contact details, service prices and request data remain fictional. No real appointments, payments or server submissions were added. Asset source/license is in `docs/v3-video-sources.json` and `docs/media-license.md`; license rechecked against Pexels on 2026-10-17. No purchases or new dependencies.

Evidence is stored outside the repository in the `2026-10-17-wellness-final-polish` operations audit. Responsive checks use browser emulation, not physical-device testing. Lighthouse is a lab measurement, not field Core Web Vitals.
