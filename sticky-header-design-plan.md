# Sticky Header Design Plan

## Intent
Create a compact, editorial sticky header: official logo at left, five primary links centered on desktop, and a persistent “Start a project” CTA at right. At compact widths, retain the CTA and move the links into a menu.

## Confirmed Direction
- Desktop (≥1024px): 72px-tall sticky header using a three-column grid so links stay visually centered regardless of logo and CTA width.
- Compact (<1024px): 56px-tall sticky header with the logo, “Start a project” CTA, and a labelled menu button. The menu contains Work, Services, Process, About, and Insights; Contact is intentionally omitted because the CTA links to `/contact`.
- Visual language: opaque off-white canvas, a thin ink divider, official artwork at a restrained responsive width, indigo navigation, and teal CTA. No scroll animation or decorative effects.
- Accessibility: semantic `nav`, a descriptive home-link name, keyboard-operable menu, visible focus states, proper expanded state, and Escape/outside-or-navigation-close behavior if custom interaction is used.

## Operating Assumptions
- No CMS, analytics, external API, or new dependency is needed; the header keeps the existing static link configuration.
- The interaction is client-side only when required for the compact menu, with no user data collection or storage.
- The header must add negligible script and rendering cost, remain available with JavaScript disabled where practical, and be maintained in the existing shared header component.

## Decision Log
- Use a single responsive header rather than separate desktop/mobile components: less duplication and one navigation source of truth.
- Use 1024px as the switch point: the five links, logo, and CTA have enough breathing room on desktop; smaller layouts avoid cramped wrapping.
- Keep the CTA visible on compact screens: it preserves the site’s primary conversion action.
- Keep the header opaque instead of blur/translucency: clearer contrast, no backdrop-filter cost, and predictable legibility over page content.

## Tasks
- [x] Refactor `src/components/SiteHeader.tsx` around desktop and compact header layouts, reusing the official `/brand/chromapages-logo.svg` asset. → Verify: desktop has logo/centered links/CTA; compact header has logo/CTA/menu at the specified heights.
- [x] Implement the compact navigation disclosure with accessible state, keyboard controls, and focus handling; keep the five primary links in one shared data source. → Verify: Tab, Enter/Space, Escape, and link activation work without a pointer.
- [x] Add sticky positioning, stacking, responsive sizing, and menu-panel styles using existing Tailwind brand tokens. → Verify: the header stays pinned on scroll, never exceeds 72px desktop or 56px compact, and does not overlap content or the skip link.
- [ ] Check the official wordmark at 320px, 375px, 768px, 1024px, and 1440px. → Verify: it remains proportional, legible, and never competes with the CTA/menu.
- [ ] Run `pnpm lint` and `pnpm build`; inspect public pages plus `/studio`. → Verify: both commands pass, public navigation works, and Studio still renders without the website header.

## Done When
- [ ] Desktop and compact headers meet their height limits and retain the same information architecture.
- [ ] The primary CTA is always available, primary navigation is accessible, and no layout shift or horizontal overflow is introduced.
