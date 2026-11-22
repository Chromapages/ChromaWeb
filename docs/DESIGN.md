# Precision Chroma v1.1

Precision Chroma is the visual system for Chromapages' marketing pages. Lead with readable type, a clear next step, and proof the studio has permission to publish. Use the shared tokens in [`app/globals.css`](../app/globals.css); the design-review HTML files are historical studies, not the current specification.

## Palette and surfaces

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `bg`, `surface` | `#EFEFED` |
| Paper | `surface-lowest` | `#FFFFFF` |
| Process band | `surface-container-low` | `#F5F5F3` |
| Process questions inset | `surface-container` | `#EAEAE7` |
| Indigo tint | `indigo-wash` | `#E5E6F0` |
| Main text and dark anchor | `ink`, `on-surface` | `#0F1115` |
| Authority and light text links | `primary` | `#2C3892` |
| Filled action / pressed | `accent`, `accent-pressed` | `#23698C` / `#1F5F80` |
| Light-surface focus / dark-surface link and focus | `focus`, `accent-bright` | `#6673E8` / `#51B4D9` |
| Secondary text, light / dark | `muted`, `muted-dark` | `#5F636C` / `#B4B7BD` |
| Structural dividers, light / dark | `outline`, `outline-dark` | `#D9DADC` / `#353943` |
| Control boundary | `control` | `var(--color-muted)` |
| Validation states | `error`, `success` | `#B42318` / `#027A48` |

Use solid surfaces, restrained 1px dividers, and 8px control / 12px panel / 16px feature radii. No glass, decorative gradients, or floating-card shadows. Use Ink for the closing inquiry and footer; pair status color with text. Prefer Teal for the primary action and Indigo or bright Teal for underlined secondary links on light or Ink surfaces, respectively.

## Typography and layout

- Montserrat variable (400–900) for headings and display; Inter variable (100–900) for body, navigation, and controls. Both Latin fonts are local, use `font-display: swap`, and have system fallbacks.
- Hero heading: `clamp(2.5rem, 4.25vw, 4rem)` with .98 line height and −.04em tracking. Section heading: `clamp(2rem, 3.4vw, 3rem)` with 1.02 line height. Balance headings; allow natural wraps.
- Body: 16px / 1.6. Intro: 18–20px / 1.55, up to 68ch. Preserve readable copy rather than shrinking text to fit.
- Content width max 1280px. Use a 4/8/12-column grid at the base, 640px, and 1024px breakpoints. Gutter/gap: 20/16px, 32/24px, 48/24px, then 80/32px at 1440px. Use shared `cp-section` and `cp-major` spacing.

## Homepage bands

1. **Hero** — text-first, no image. One primary inquiry action; secondary link jumps to Work when approved proof exists, Services otherwise. Keep the five standards in an ordered list and label the service-page anatomy as illustrative, not proof. The desktop Page Stack uses two decorative edge offsets; content remains visible without JavaScript at every width.
2. **Services** — three featured rows with direct links, not a grid of promotional cards. The service index remains the full catalog.
3. **Work** — only approved, explicitly classified projects. Omit the band when empty; the dedicated Work page still explains the empty state. Keep project text and its link visible with or without media. Render a responsive image only with valid media and useful alt text.
4. **Process** — four concrete stages on the low surface, with a stronger inset for key questions. No guarantees about scope, price, or schedule.
5. **Inquiry** — Ink anchor with a short preparation checklist and “Send an inquiry” to `/contact`. An inquiry does not book a call.

## Interaction and verification

Keep navigation native, including the mobile disclosure. Aim for 44px or taller controls, keep a visible keyboard focus ring, and let the skip link focus the main landmark without adding an extra Tab stop. Make all content and core links usable before hydration. Respect reduced motion; no reveal state should be required to read or engage. Check narrow mobile through wide desktop, text/background contrast, keyboard order, and both populated and empty Work. Never substitute testimonials, client logos, or results for approved proof.
