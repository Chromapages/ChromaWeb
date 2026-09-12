# Services Outcome Pathways — Design QA

- Source visual truth: `C:\Users\ericb\AppData\Local\Temp\codex-clipboard-5a815e23-55bf-48a9-8a4f-53d73529e336.png`
- Implementation: `http://localhost:3000/services#outcome-pathways-title`
- Viewport: desktop, 1630 × 904 CSS pixels, device scale factor 1
- Source: 1536 × 1024 pixels
- State: Outcome 01 selected; proof rail showing the verified-evidence empty state
- Implementation screenshot: Codex in-app browser capture from the Services route

## Full-view comparison evidence

The implementation reproduces the reference's primary structure: four-item vertical selection rail, large recommendation detail surface, and a proof rail aligned beneath only the detail column. The separate Compare Engagements section remains unchanged below it.

## Focused-region comparison evidence

The Outcome Pathways and proof-rail regions were inspected at desktop width. The rail is correctly nested in the desktop Outcome Pathways grid. Sanity currently returns no approved case study related to Signature Website, so the truthful evidence-preparation state renders instead of fabricated project imagery or results.

## Required fidelity surfaces

- Fonts and typography: existing Montserrat/Inter hierarchy retained; scale, weights, and compact uppercase labels align with the reference.
- Spacing and layout: vertical 320px rail, flexible detail register, and aligned lower proof rail match the reference's column structure without overflow.
- Colors and tokens: Precision Ink selected state, Teal interaction accent, Indigo structure, and light paper surface use existing brand tokens.
- Image quality: no placeholder or fabricated image is rendered. Approved case-study media is reused through the existing project-media component when Sanity supplies it.
- Copy and content: offer and proof content remain Sanity-sourced. The empty state explains the evidence gate without implying nonexistent work.

## Comparison history

- Initial pass: horizontal four-card rail and split recommendation card differed materially from the reference.
- Fix: added the lower proof rail to the right-hand Outcome Pathways column and connected it to the existing published case-study query.
- Post-fix evidence: desktop browser capture shows the rail directly beneath the recommendation panel, while Compare Engagements remains separate and unchanged.

## Findings

No actionable P0, P1, or P2 implementation differences remain within the requested Outcome Pathways scope. The populated visual state depends on publishing and linking approved case-study content in Sanity.

## Primary interactions tested

- Desktop Outcome Pathways rendering
- Proof rail placement under the recommendation column
- Evidence-empty-state link to `/work`
- Conditional carousel controls remain absent when there are no slides

## Console errors checked

No visible Next.js compilation or runtime error overlay appeared after refresh and interaction.

final result: passed

---

# Insights Theme Icon Fit — Design QA

- Source visual truth: `C:\Users\ericb\AppData\Local\Temp\codex-clipboard-1cf403d2-4d4e-4036-9e26-4ef375208220.png`
- Implementation: `http://localhost:3000/insights`
- Browser-rendered evidence: refreshed Codex in-app browser capture

## Findings

- Initial pass [P2]: CSS scaling enlarged each icon inside an overflow-hidden box, clipping parts of the line artwork.
  - Fix: trimmed each transparent icon canvas to its alpha bounds, added a consistent internal padding canvas, and removed the CSS scale/crop wrapper. The icon URLs were versioned again so the browser receives the new fit.
  - Post-fix evidence: all five browser-rendered icons fit inside their 24px slots without clipping.

final result: passed

---

# Insights Theme Icon Cache Verification — Design QA

- Source visual truth: `C:\Users\ericb\AppData\Local\Temp\codex-clipboard-80e1d35f-4513-4958-9f32-61ee280416ae.png`
- Implementation: `http://localhost:3000/insights`
- Browser-rendered evidence: refreshed Codex in-app browser capture

## Findings

- Initial delivery [P2]: a previously optimized image response could keep the old opaque icon version in a browser cache despite the PNG files having transparent corner and center pixels.
  - Fix: bypassed image optimization for these five small static icon assets and versioned their URLs. The browser now requests the transparency-correct asset directly.
  - Post-fix evidence: refreshed browser capture shows only the cyan icon strokes; no pale tile background remains.

final result: passed

---

# Insights Theme Icon Cleanup — Design QA

- Source visual truth: `C:\Users\ericb\AppData\Local\Temp\codex-clipboard-80e1d35f-4513-4958-9f32-61ee280416ae.png`
- Implementation: `http://localhost:3000/insights`
- Browser-rendered evidence: Codex in-app browser capture after asset cleanup
- State: default Insights register sidebar

## Findings

- Initial pass [P2]: every generated theme icon retained a pale square background, creating visible tile boundaries that differed from the clean line icons in the target.
  - Fix: converted near-neutral light pixels in only the five generated theme assets to transparency, preserving cyan icon pixels; retained the current 24px crop and layout.
  - Post-fix evidence: the browser capture shows clean cyan icons without white tile boundaries, aligned with the target’s theme rows.

## Required fidelity surfaces

- Fonts and spacing: unchanged.
- Colors: cyan icon strokes remain intact; neutral background now blends into the Off-White page surface.
- Image quality: the edited PNG assets use alpha transparency and remain crisp at their rendered 24px size.
- Copy and content: unchanged.

final result: passed

---

# Insights Editorial Register — Design QA

- Source visual truth: `C:\Users\ericb\Downloads\6e666b8d-6555-448c-a3d1-0389c122f32b.png`
- Implementation: `http://localhost:3000/insights?insights-redesign=5`
- Browser-rendered evidence: Codex in-app browser capture of the route above
- Source: 1536 × 768 pixels
- Implementation viewport: 1864 × 904 CSS pixels, device scale factor 1
- State: one published guide; default Latest sort; no theme filter selected; existing Global CTA remains directly after the register

## Full-view comparison evidence

The page now matches the reference’s information architecture: dark editorial image hero, knowledge-register header with count and sort control, a numbered featured guide row, five-theme sidebar, topic CTA card, and a second numbered “coming soon” row. The existing dark Global CTA remains in its original position after the register.

## Focused-region comparison evidence

The hero was checked against the supplied reference for left-hand editorial copy, right-hand laptop image focal point, and the narrow secondary statement. The register was checked for the horizontal featured-guide arrangement, sidebar boundary, article metadata row, control density, and the lower topic card. The target did not include an interactive sort/filter state, so the default state was compared; the native sort control and theme buttons are available in the rendered page.

## Comparison history

- Initial implementation: the visual structure was present, but the hero had too much desktop height and the theme list lacked the source’s icon anchors.
- Fix: reduced desktop hero and register top spacing; added five dedicated cyan editorial image assets for Strategy, Design + UX, Performance, Launch + Growth, and Industry.
- Post-fix evidence: browser capture shows the compact hero-to-register handoff and icon-led theme rows aligned with the reference’s visual density.

## Required fidelity surfaces

- Fonts and typography: existing display/body font system preserves the large editorial H1, compact uppercase labels, strong guide title, and quiet metadata hierarchy. Content strings remain Sanity-sourced instead of being replaced with reference copy.
- Spacing and layout rhythm: desktop uses a compact hero, a left content register/right 19rem theme sidebar, structural rules, and numbered rows. Mobile retains a single-column flow below the desktop breakpoint.
- Colors and tokens: Precision Ink hero, Off-White register, Indigo structure, Teal accents, and low-contrast borders map to the existing design tokens.
- Image quality and asset fidelity: the hero is a generated editorial image with the laptop text contained in the source image. Guide imagery remains the approved Sanity asset. Theme icons are individual generated raster assets, not CSS or SVG approximations.
- Copy and content: page title, introduction, featured guide, summary, author, date, and closing CTA remain connected to current CMS content. Supporting register and topic copy are editorial interface copy.

## Findings

No actionable P0, P1, or P2 differences remain in the requested Insights-page scope.

## Primary interactions tested

- Article title routes to its existing insight detail page.
- Native Latest/Oldest sort control is present and exposed in the browser accessibility tree.
- Five theme controls and topic/get-notified routes are exposed in the browser accessibility tree.
- Global CTA, including its primary and audit routes, remains after the redesign.

## Console errors checked

No visible Next.js compilation or runtime error overlay appeared after refresh.

## Follow-up polish

- P3: Add an approved `heroImage` through the new Insights Page Sanity field when a final licensed brand photograph is available; the generated local fallback will continue to display until then.

final result: passed

---

# Process Global CTA — Design QA

- Source visual truth: `C:\Users\ericb\AppData\Local\Temp\codex-clipboard-74e6df59-fb25-4114-bd5a-0f683b21a35d.png`
- Implementation: `http://localhost:3000/process?global-cta-qa=1#project-fit`
- Browser-rendered evidence: Codex in-app browser capture at desktop viewport (same browser state as implementation URL)
- Viewport: desktop, 1864 × 904 CSS pixels, device scale factor 1
- Source: 2172 × 196 pixels (resized to 2048 × 185 for review)
- State: final process CTA, default state; the primary CTA retains its published Sanity label and href

## Full-view comparison evidence

The desktop CTA now follows the source’s two-path structure: dark navy field, left editorial message with teal emphasis, a structural vertical divider, paired primary and audit actions with supporting captions, a right-edge lockup, and restrained concentric arc artwork.

## Focused-region comparison evidence

The CTA region was visually compared against the supplied source and the browser-rendered implementation. The revised 1.1/1.25 desktop grid keeps the headline on one line, matching the source’s compact horizontal rhythm. The decorative arc is a generated raster asset rather than an inline or CSS-drawn approximation.

## Required fidelity surfaces

- Fonts and typography: existing display and interface fonts, uppercase eyebrow, teal headline emphasis, and compact button labels match the source’s hierarchy. The primary button label remains Sanity-sourced, so its longer published label is an intentional content difference.
- Spacing and layout: the CTA uses a compact desktop grid with a left divider, equal action columns, a reserved signature column, and mobile stacking below the desktop breakpoint.
- Colors and tokens: Precision Ink anchor, Teal primary action/accent, Off-White text, and low-contrast structural borders match the existing palette and source contrast.
- Image quality: `public/process-global-cta-arc.png` is a crisp decorative raster image placed with `next/image`; it is decorative (`alt=""`) and does not present fabricated proof.
- Copy and content: reference-style supporting copy and audit path are present; the primary action preserves the existing published Sanity action rather than replacing editorial data.

## Findings

No actionable P0, P1, or P2 differences remain in the requested desktop CTA scope.

## Primary interactions tested

- Primary CTA remains a real route link to the Sanity-defined destination.
- Audit CTA is a real link to `/services#audit-bridge-title`.
- Browser accessibility tree exposes both actions as links and retains the final CTA heading.

## Console errors checked

No visible Next.js compilation or runtime error overlay appeared after refresh.

## Follow-up polish

- P3: If the published Process CTA label is shortened in Sanity to “Plan Your Digital Upgrade →”, it will match the source button copy exactly without component changes.

final result: passed
