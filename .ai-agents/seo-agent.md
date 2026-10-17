# SEO agent

Brand: MSPixelPulse Wellness Studio, a fictional Toronto spa and wellness concept.
Contact: mspixelpulse@gmail.com (agency demo requests), +1 (000) 000-0000, Toronto, Ontario, Canada. No real spa address, hours, availability or practitioner credentials. Social links remain labeled placeholders.

Pages: Home /, Treatments /services, 36 /services/:id pages, About /about, Studio Experience /experience (alias /studio), Gallery /gallery, Booking /booking, Contact /contact, FAQ /faq, Reviews /reviews, Feedback /feedback, Wellness Tips /wellness-tips, accessible fallback. Keep all existing URLs.

V4 design: white/blush with pink, orchid and plum identity, Bodoni Moda and Manrope fonts, maximum 1200px content, compact detached white liquid-glass pill header with fully rounded ends. Preserve responsive typography, contrast, gradient buttons and accessible focus. Maintain src/v4.css after the legacy styles. Do not return to a dark page theme.

Media: src/data/videos.json maps 50 distinct local licensed clips; docs/v4-video-sources.json contains provenance, hashes and review status. Each route, including every treatment and /studio, has a unique ambient clip. Two additional sections have distinct clips. AmbientVideo.jsx and ambientPlayback.js handle muted inline autoplay, visibility, hidden tabs, reduced motion, data saving, errors and poster fallback. Keep the footer motion preference. No ambient Play/Watch Film prompts. Do not introduce purchases or unlicensed assets. Educational YouTube embeds load only after explicit interaction and never autoplay.

Content and demo safety: all services, CAD prices, durations, ratings and review samples are illustrative. Never invent genuine reviews, awards, certifications, medical outcomes or an operating location. No medical or sensitive questions. No actual reservations or payments. BookingFlow.jsx is a seven-step demo request with server email acceptance only when configured. Feedback remains private and pending moderation; publication consent never means automatic publication. Contact's enquiry builder remains a local preview. Do not claim email delivery or saved feedback without live verification.

Server: api/status.js exposes capability booleans only; api/submit.js delegates to server/submissions.js. Follow docs/v4-configuration.md and .env.example. Never put credentials in VITE_ variables, source, logs or browser code. Keep validation, same-origin checks, shared rate limits, HMAC identifiers, honeypot/timing, atomic reservations and provider idempotency. No public feedback retrieval. Do not provision billable resources or change account access. Missing settings must fail safely and visibly.

SEO/accessibility: one H1, route-specific title/meta/canonical, logical headings, descriptive alt, sitemap and robots; canonical domain https://wellness.mspixelpulse.com. Preserve keyboard menus/Escape, labels, gallery dialog focus restoration, search/filter reset, readable 16px essential mobile text and reduced motion. Check all 48 routes at 320/375/390/430/768/1024/1200/1440/1920; verify no overflow or clipped text.

Deployment: only MSPixelPulseAgency/mspixelpulse-demo-wellness-studio and Vercel prj_wtsYNiyFergsugt5YlYg5i5mOLXl. Vite, npm install, npm run build, dist, root ./, production main. Run lint, tests, build, browser flows and Lighthouse before release. Follow current user authorization; verify exact production SHA, alias, APIs and assets. Record rollback deployment. Keep .ai-agents and evidence-based QA docs current.

Do not edit unrelated repositories, Oyemahak/Katrina-Studios, authentication, DNS or billing. Future revisions must protect existing work, placeholder details, old service IDs/prices and privacy. Never replace verified evidence with an assumed success.
