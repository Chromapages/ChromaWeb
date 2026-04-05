# Accessibility

## Purpose
This document defines the accessibility targets and implementation requirements for the Chromapages marketing website.

The goal is to make the site usable for a broad range of users, reduce avoidable barriers, and establish a practical accessibility baseline for a modern marketing site. This is not a legal opinion. It is an implementation guide for building and QA.

---

## 1. Accessibility Target

## Compliance Goal
Target **WCAG 2.2 Level AA** as the working standard for the public-facing marketing website.

### What This Means In Practice
The site should be built and tested to support:
- clear semantics
- keyboard navigation
- readable content structure
- accessible forms
- visible focus states
- sufficient color contrast
- meaningful labels and error states
- predictable navigation and interactions

### Scope
This applies to:
- all core marketing pages
- navigation
- forms
- CTA components
- FAQs and accordions
- media embeds where used
- future service pages and case studies

---

## 2. Accessibility Principles

### 1. Use Native HTML First
Prefer semantic HTML over ARIA-heavy workarounds.

Examples:
- use `<button>` for actions
- use `<a>` for navigation
- use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`
- use `<form>`, `<label>`, `<input>`, `<textarea>`

### 2. ARIA Only When Needed
ARIA should enhance semantics when native HTML cannot express the needed behavior cleanly.

### 3. Keyboard Access Is Non-Negotiable
Every interactive element must be reachable and usable by keyboard alone.

### 4. Content Structure Must Make Sense
Headings, landmarks, labels, and focus order should reflect the actual meaning and order of the page.

---

## 3. WCAG-Oriented Requirements

## Perceivable

### Text Alternatives
- all meaningful images must have appropriate `alt` text
- decorative images should use empty alt attributes
- icon-only controls must have accessible labels

### Contrast
- text and interactive elements should meet WCAG 2.2 AA contrast requirements
- placeholder text should not be relied on as the only label
- focus indicators must be visible against the background

### Responsive Reflow
- content must remain usable across supported viewport sizes
- text should not become clipped or unusable when zoomed
- layouts should not require horizontal scrolling at common zoom levels except where unavoidable

### Media
- embedded video should support captions when applicable
- autoplay should be avoided where it creates usability problems
- motion should not be required to understand content

---

## Operable

### Keyboard Navigation
- all interactive elements must be keyboard accessible
- no keyboard traps
- tab order must be logical
- dropdowns, dialogs, accordions, and menus must be operable without a mouse

### Focus Visibility
- every interactive element must have a visible focus state
- focus should not be removed without replacement
- custom controls must preserve clear focus behavior

### Skip Link
Include a **Skip To Content** link at the top of the page to improve keyboard navigation efficiency.

### Timing / Motion
- avoid interactions that rely on timing precision
- honor reduced motion preferences where animations exist
- do not auto-advance important content without controls

---

## Understandable

### Headings And Structure
- one clear H1 per page
- headings must follow a logical nested order
- sections should be labeled clearly

### Forms
- every form field must have a programmatically associated label
- required fields must be indicated clearly
- validation errors must be understandable
- error messages should identify what needs to be fixed
- success and failure states should be obvious

### Navigation Consistency
- repeated navigation patterns should stay consistent
- primary actions should remain predictable across pages
- button and link labeling should be clear and intentional

---

## Robust

### Semantic HTML
- use proper landmark elements
- use valid interactive patterns
- avoid misusing divs/spans as controls

### Screen Reader Compatibility
- components should expose correct semantics
- hidden content should be handled carefully
- dynamic state changes should be communicated where appropriate

### Progressive Enhancement
Core content and navigation should remain available even if some JavaScript-enhanced behavior fails.

---

## 4. Keyboard Navigation Requirements

## Global Rules
- users must be able to navigate the site using only keyboard input
- tab order must follow visible reading/interaction order
- focus should move predictably
- focus should never disappear

## Required Keyboard Coverage
The following must be tested and functional:
- header navigation
- mobile menu
- CTA buttons and links
- contact form
- FAQ accordions
- footer navigation
- any embedded booking element
- any modal or overlay if introduced later

## Interaction Expectations

### Navigation Menus
- tab into menu items in logical order
- if expandable menus exist later, they must support arrow/escape/tab behavior where appropriate
- mobile menu toggle must be keyboard reachable and operable

### Accordions / FAQ
- triggers must be buttons
- enter/space should toggle open/close state
- expanded state should be exposed programmatically

### Forms
- tab through all fields in order
- submit action reachable by keyboard
- errors should be announced or at least discoverable immediately after submission

---

## 5. ARIA Notes

## Use ARIA Sparingly
Native semantics come first.

### Appropriate ARIA Use Cases
- `aria-expanded` for accordions or menu toggles
- `aria-controls` where a control expands/collapses content
- `aria-current="page"` for current navigation item
- `aria-label` for icon-only buttons or ambiguous controls
- `aria-describedby` for helper text or error associations
- `aria-live` for dynamic status messages where necessary

### ARIA Misuse To Avoid
- adding ARIA roles to native elements that already have correct semantics
- using clickable divs instead of buttons
- duplicating visible labels poorly
- relying on ARIA to fix weak HTML structure

---

## 6. Forms Accessibility Requirements

## Contact Form Requirements
- every field has a label
- required fields indicated in text, not color alone
- validation messages tied to the relevant field
- focus moves to the first invalid field or error summary on failed submit
- success confirmation is clearly presented
- helper text should be associated programmatically where used

### Field Considerations
- email fields use correct input type
- website URL field uses appropriate type if present
- textareas include labels and error support
- submit button text should clearly indicate action

---

## 7. Landmarks And Structure

## Required Page Landmarks
Each page should generally include:
- `<header>`
- `<nav>`
- `<main>`
- `<footer>`

### Optional / Contextual Landmarks
- `<aside>`
- `<section>` with accessible labeling where needed
- `<form>` for contact areas

### Structural Rule
Do not overuse landmarks. Use them to create meaningful page structure.

---

## 8. Accessible Component Notes

## Buttons
- use real button elements for actions
- ensure button text is descriptive
- disabled states should remain understandable

## Links
- link text should make sense out of context where possible
- avoid generic repeated “Click Here” language
- distinguish links from surrounding text clearly

## FAQ / Accordion
- use button triggers
- expose open/closed state
- preserve keyboard support
- keep content readable when expanded

## Mobile Menu
- toggle button labeled clearly
- focus handling predictable
- escape behavior supported if menu behaves like an overlay
- hidden menu items should not remain focusable

---

## 9. QA Checklist

### Manual Accessibility Checks
- can navigate all core pages by keyboard
- skip link works
- focus states are visible
- heading order is logical
- form labels are present
- form errors are understandable
- links/buttons are clearly labeled
- accordion/menu states are accessible
- alt text is appropriate
- page remains usable at zoom
- no obvious keyboard traps

### Tooling Checks
Use automated checks as support, not as the only validation.

Suggested tools:
- browser accessibility tree inspection
- Lighthouse accessibility audits
- axe or equivalent automated checks

---

## 10. Known Practical Standard For Launch

For phase one, the site should launch with:
- semantic HTML
- visible focus states
- keyboard-safe navigation and forms
- proper labels and heading structure
- reasonable contrast compliance
- low-friction content structure for assistive tech

This is the minimum credible standard for a public-facing professional website.

---

## 11. Final Recommendation

Accessibility should not be treated as a cleanup task at the end. It should be built into:
- components
- content structure
- form logic
- QA

If a feature cannot be used without a mouse, cannot be understood with a screen reader, or becomes confusing at zoom, it is not ready.
