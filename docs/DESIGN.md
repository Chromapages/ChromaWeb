# Design System Strategy: Elevated Utility (2026 Edition)

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built on the philosophy of **The Digital Curator**. It moves away from the noisy, cluttered "dashboard" aesthetic of the early 2020s and moves toward a refined, editorial-led experience. It balances the precision of Swiss Grid design with the soul of a high-end fashion or architectural journal.

To break the "template" look, we utilize **intentional asymmetry**. Not every column needs to be equal; large-scale typography should overlap with imagery, and white space is treated as a functional element rather than "empty" space. The goal is a UI that feels curated, quiet, and authoritative.

---

## 2. Colors & Surface Philosophy
The palette is rooted in high-contrast neutrals with a single, commanding accent.

### Color Tokens (Material 3 Derived)
- **Primary (The Accent):** `primary` (#111e7c) and `primary_container` (#2c3892). Use sparingly for focus and conversion.
- **Surface (The Canvas):** `surface` (#f9f9f7) and `surface_container_lowest` (#ffffff).
- **Ink (The Content):** `on_surface` (#1a1c1b) and `on_background` (#1a1c1b).

### The "No-Line" Rule
Sectioning must be achieved through **background color shifts**, never through 1px solid borders. 
- *Application:* A main content area on `surface` should transition into a footer or sidebar using `surface_container_low` (#f4f4f2). This creates a sophisticated "block-printed" feel that is much cleaner than a wireframe-style line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
- **Level 0 (Background):** `surface` (#f9f9f7).
- **Level 1 (Main UI Elements):** `surface_container` (#eeeeec).
- **Level 2 (Active/High Focus):** `surface_container_highest` (#e2e3e1).
By nesting a "High" container within a "Low" container, you create depth without the visual noise of shadows.

### Glass & Texture
To achieve the 2026 editorial feel, use **Glassmorphism** for floating navigation and overlays. Use `surface_container_lowest` with 80% opacity and a `20px` backdrop blur. 
- **Signature Gradient:** For Hero backgrounds or CTAs, use a subtle linear gradient from `primary` (#111e7c) to `primary_container` (#2c3892) at a 135-degree angle to provide a sense of "light" and movement.

---

## 3. Typography: Editorial Authority
We utilize **Manrope** for structural displays and **Inter** for high-utility reading. (Note: Montserrat 300/400 is the spiritual guide—ensure your weights remain light and airy).

| Level | Token | Font | Weight | Size | Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 300 | 3.5rem | Use for Hero headlines with -2% letter spacing. |
| **Headline**| `headline-md`| Manrope | 400 | 1.75rem | Clear, Swiss-style section headers. |
| **Title** | `title-lg` | Inter | 500 | 1.375rem | For card titles and secondary navigation. |
| **Body** | `body-lg` | Inter | 300 | 1rem | Main reading text. Leading should be generous (1.6). |
| **Label** | `label-md` | Inter | 500 | 0.75rem | All-caps, tracked out (+5%) for metadata. |

---

## 4. Elevation & Depth
In this design system, elevation is **felt, not seen.**

- **The Layering Principle:** Avoid the "Floating Card" look. Instead, use "Inset Layering." If a card needs to stand out, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#eeeeec) background.
- **Ambient Shadows:** Standard drop shadows are forbidden. If an element must float (e.g., a Modal), use an extra-diffused shadow: `0px 24px 48px rgba(15, 23, 42, 0.06)`. 
- **The Ghost Border:** If accessibility requires a container boundary, use the `outline_variant` (#c6c5d4) at 15% opacity. It should be nearly invisible, acting as a "suggestion" of a boundary.

---

## 5. Components

### Buttons
- **Primary:** `primary` background with `on_primary` text. No border. `0.25rem` (ROUND_FOUR) corner radius. Use the signature gradient on hover.
- **Secondary:** `surface_container_high` background. Text is `on_surface`.
- **Tertiary (Minimal):** Text only in `primary_container`. No background until hover (use 5% opacity of primary).

### Cards
- **Construction:** Absolutely no borders. Use `surface_container_low` for the card body. 
- **Spacing:** Use 32px (2rem) internal padding to maintain the "Airy" requirement.
- **Interaction:** On hover, shift the background to `surface_container_highest` and apply a subtle "Ghost Border."

### Input Fields
- **Default:** `surface_container_low` background with a bottom-only `outline_variant` at 20% opacity.
- **Focus:** Transition the bottom border to `primary` (#111e7c) at 2px thickness. 
- **Editorial Touch:** Labels should use `label-sm` and be positioned 8px above the input, never inside it.

### Progress & Utility
- **Chips:** `surface_container_high` with `label-md` text. Roundness should be `full` (9999px) for a modern, pill-shaped look.
- **Lists:** No horizontal dividers. Use 16px of vertical whitespace between items.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use large, high-resolution imagery that bleeds off the edge of the grid.
- **Do** use `ROUND_FOUR` (0.25rem) for functional elements (buttons, inputs) and `ROUND_EIGHT` (0.5rem) for structural elements (cards).
- **Do** allow typography to be the "hero." If a page feels empty, increase the font size and line height rather than adding icons or lines.

### Don’t:
- **Don’t** use 1px solid borders to separate content. It breaks the "Elevated Utility" flow.
- **Don’t** use pure black (#000000). Always use `on_surface` (#1a1c1b) to maintain a soft, premium feel.
- **Don’t** use generic icon libraries. Use thin-stroke (1px or 1.5px) icons that match the `light 300` weight of the typography.
- **Don’t** crowd the screen. If you think there is enough whitespace, add 20% more.