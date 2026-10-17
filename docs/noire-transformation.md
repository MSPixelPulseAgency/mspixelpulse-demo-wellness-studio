# The NOIRÉ edit — luxury spa transformation

2026-10-17 · Existing MSPixelPulse Wellness Studio repository and domain.

## Scope and baseline

Repository: MSPixelPulseAgency/mspixelpulse-demo-wellness-studio. Baseline production source: 90957ba3fd930cd7e518cdc4c2c553f6f3dbea4b. Existing Vercel project: prj_wtsYNiyFergsugt5YlYg5i5mOLXl, team team_zccbJjixiq0C3YRhUkZlSnF9. Rollback deployment confirmed before release: dpl_7eBJe3ZQ5EaJSwhsjWDUQxxUDTZU. Vite / root ./ / npm install / npm run build / dist. No other project is changed.

Every existing main route and six treatment detail pages were opened in production before implementation. Desktop/mobile home and navigation captures, route captures and observations are retained in the local evidence directory. The previous ivory/olive system, repeated card arrangements, six reused photos and restrained photographic hero were functional but lacked the visual richness requested in the new brief. Filters, the native gallery dialog, transparent local request review/edit/clear and routes were retained.

## Live visual research

Observed in desktop and mobile browsers on 2026-10-17. Observations are design judgments, not performance or accessibility certifications of reference sites. No reference assets, copy, logos or layouts were copied.

| Reference                                                         | Observed pattern                                                                                                                                                                                                                   | Original application                                                                                                                                   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [AIRE Ancient Baths](https://beaire.com/en)                       | Candlelit architectural media, a tightly edited first screen, separate booking/gift actions and sensory chapters for baths and rituals. The mobile opening simplifies the booking controls and retains the immersive imagery.      | Dark atmospheric opening and a distinct exploration/appointment choice, without inventing operating baths or copying its booking system.               |
| [Six Senses Spas](https://www.sixsenses.com/en/spas/)             | Spacious serif hierarchy, location labels, image-and-text destination stories and consistent Discover actions.                                                                                                                     | Consistent treatment metadata with readable editorial stories and an ivory counterpoint to dark sections.                                              |
| [Airelles Spas & Wellness](https://airelles.com/en/spas-wellness) | Rich destination photography, restrained centred page introduction, generous editorial passages and repeated spa discovery actions. Mobile retains the image/story sequence. An initial gift overlay was dismissed for inspection. | An original asymmetric gallery and varied image scales; no partnership, treatment or facility claims imported.                                         |
| [Aman](https://www.aman.com/)                                     | Distinct Menu/Search/Reserve actions, an immersive seasonal media story, uncluttered destination articles and calm spacing. Mobile prioritizes the logo, menu and Reserve.                                                         | A small floating navigation, separate story/ritual pages and a quiet pace. No destination claims, endorsements or copied media.                        |
| [Equinox Hotels](https://equinox-hotels.com/)                     | Full-screen moving media, concise positioning, a persistent Book Now action and deeper destination/experience navigation.                                                                                                          | A cinematic image opening with layered gradients and accessible booking access. A still photograph gives atmosphere without adding autoplay bandwidth. |

The user's [SAVORA](https://restaurant.mspixelpulse.com), [Aurelia](https://bar.mspixelpulse.com) and [AUREL FRAME](https://photographer.mspixelpulse.com) were opened as internal quality benchmarks. Their strong first impressions, confident display type, layered media, category-specific content and clear primary/secondary actions informed the level of detail. Their source, imagery and identities were not reused.

## Original visual system

The brand remains **MSPixelPulse Wellness Studio**; NOIRÉ names the visual edit. The site has a cinematic portrait hero, a translucent floating navigation and treatment disclosure, arched portrait/inset still life, a large featured ritual with staggered secondary treatments, a full-width architectural atmosphere, a three-scale beauty story, a burgundy studio chapter, an asymmetric gallery, an appointment introduction and an immersive final invitation. Interior pages receive their own media-led openings and consistently redesigned content, catalogues, forms and footer.

- Deep burgundy #4A1728; midnight plum #24131F; champagne gold #C8A46A; warm ivory #F5EDE3; soft rose #D8A9A5; charcoal #171417.
- Locally hosted **Bodoni Moda** display/italic and **Manrope** body/semibold. Bodoni's rendered high-contrast shapes provided the stronger editorial expression; Manrope keeps functional controls legible. SIL OFL licenses are included. Cormorant assets remain as legacy resources but are not used by this release.
- Responsive type scales, deliberate mobile image compositions, 44px primary controls, visible focus, native disclosure/accordion semantics, reduced motion, CSS transforms/opacity and IntersectionObserver section reveals. A subtle CSS view-timeline drift is progressively enhanced only where supported; there are no continuous scroll listeners or new animation dependencies.
- Fifteen new licensed Pexels photo sources, sixty local WebP derivatives at 480/800/1200/1800px. Actual dimensions and srcsets live in src/data/media.json. Below-fold photos are lazy; primary media is prioritized. No runtime image/font hotlinks. No video added: the still-photo treatment meets the visual goal with lower delivery cost.

## Preserved and improved functionality

All prior URLs remain: Home, Treatments, six treatment details, About, Experience (plus /studio alias), Gallery, Booking, Contact, FAQ and helpful fallback. Treatment filtering, query preselection, gallery filtering/keyboard arrows/Escape/focus restoration and appointment/enquiry validation remain. The treatment dropdown supports Escape. Request editing and clearing now return keyboard focus to the name field. Copy success and failure feedback remain.

The request journey is UI → browser FormData validation → in-memory review → edit/copy/clear. There is no API, database, email, payment or booking submission. Only fictional sample data was used. There is no operating spa, verified facility, practitioner credential, review or treatment-outcome claim. Source photographs show illustrative adult wellness settings, not an actual studio or endorsement. Existing agency contact placeholders are preserved.

## Validation

- All fifteen routes × 320/375/390/430/768/1024/1280/1440/1920: 135 browser measurements; no page overflow, no overflowing heading boxes, one H1 and description on each route, no missing image-alt attributes.
- Screenshots cover the requested breakpoints; full desktop/mobile compositions and interior page details were visually inspected. Full-page captures are supplemented by settled first-viewport crops because fixed headers and scroll-linked effects vary with capture position.
- Browser journeys: mobile navigation/Escape/focus; desktop treatment disclosure/Escape; Skin filter yields two services; treatment → preselected request; native required validation; successful local review; preserved editing; clipboard success; clearing; contact review; FAQ disclosure; gallery filter/next/keyboard/Escape/focus. No browser console warnings/errors observed in these checks.
- Four Node tests validate licensed local WebP assets, treatment identities/prices/media, all sitemap routes and gallery descriptions. npm test, npm run lint and npm run build pass. This existing JavaScript/JSX app has no TypeScript compiler configuration; no TypeScript result is claimed.
- Lighthouse 12.8.2 against the local production build, standard simulated mobile network/CPU: Home 93 Performance /100 Accessibility /100 Best Practices /100 SEO, LCP 3.0s, TBT 0ms, CLS 0. Booking 96/100/100/100 after fixing a decorative-label contrast issue. Gallery 90/100/100/100 after improving label size and accessible button names. Final Home and Gallery audits have no failed binary checks; the earlier Booking label-name warning was resolved by the shared wordmark change verified in the final Home audit. Final production measurement and release identifiers are recorded in the release evidence.

These are lab snapshots and browser responsive emulation. Field INP/Core Web Vitals and physical-device testing remain unverified. Automated accessibility scores are not a full WCAG conformance certification.

## Evidence and maintenance

Local evidence: /Users/mahak/Documents/MSPixelPulse/operations-audits/2026-10-17-noire-spa/ (before, references, local, production, responsive JSON and Lighthouse HTML/JSON). Media source URLs and authors: docs/noire-media-sources.json. Keep the original media/license history for provenance; unused legacy assets are retained for older public links. Future agents should follow the updated .ai-agents guides and avoid changing other demos, Aurelion data, deployment identity, authentication, DNS or billing.
