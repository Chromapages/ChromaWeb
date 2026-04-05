# Component Spec

## Purpose
This document defines the functional behavior and content requirements of reusable components for the Chromapages marketing website.

This is not a visual design doc. It defines what each component does, what content it accepts, how it behaves, and what implementation rules apply.

---

## 1. Global Principles

### Component Rules
- components should be reusable
- each component should have a clear purpose
- content inputs should be predictable
- accessibility requirements apply to every interactive component
- components should support content changes without code rewrites

### Content Philosophy
Where possible, components should accept structured content rather than hardcoded copy.

---

## 2. Header

## Purpose
Provide top-level navigation and access to the primary CTA.

### Required Elements
- logo
- primary nav items
- primary CTA
- mobile menu toggle

### Behavior
- visible on all core pages
- sticky on scroll
- current page state should be identifiable
- mobile menu should open/close predictably
- mobile menu should not trap focus incorrectly

### Content Inputs
- nav items
- CTA label
- CTA destination

---

## 3. Footer

## Purpose
Provide secondary navigation, legal links, and contact/support information.

### Required Elements
- logo or short brand label
- footer nav groups
- legal links
- contact details if available

### Behavior
- consistent across all primary pages
- support future link expansion without layout rewrites

### Content Inputs
- footer sections
- legal links
- contact/email/social links

---

## 4. Hero

## Purpose
Open a page with the main message and next step.

### Required Elements
- headline
- supporting subheadline
- primary CTA

### Optional Elements
- secondary CTA
- proof strip
- supporting metric or trust statement

### Behavior
- should clearly communicate page purpose
- should support fast scanning
- CTA should be immediately available

### Content Inputs
- headline
- subheadline
- primary CTA label/href
- secondary CTA label/href
- optional proof items

---

## 5. CTA Block

## Purpose
Provide a reusable conversion block across pages.

### Required Elements
- headline
- primary CTA

### Optional Elements
- supporting body copy
- secondary CTA

### Behavior
- can be used mid-page or near page end
- should always map to the next logical conversion step

### Content Inputs
- title
- body
- primary label/href
- secondary label/href

---

## 6. Service Card

## Purpose
Summarize a service and route users deeper.

### Required Elements
- service title
- short summary
- CTA link

### Optional Elements
- outcome bullets
- service tag/category

### Behavior
- usable on homepage and services overview
- should support linking to service detail page

### Content Inputs
- title
- summary
- bullets
- href

---

## 7. Project Card

## Purpose
Summarize a featured project or case study.

### Required Elements
- project title
- short summary
- link to work page or case study

### Optional Elements
- industry label
- result snippet
- image reference

### Behavior
- supports scanning on Work page and homepage
- should not require full case study content to exist immediately

### Content Inputs
- title
- summary
- href
- optional metadata

---

## 8. Testimonial Block

## Purpose
Provide trust and social proof.

### Required Elements
- quote
- name

### Optional Elements
- role
- company
- related service/project

### Behavior
- reusable across pages
- can appear standalone or in grouped sections

### Content Inputs
- quote
- name
- role/company

---

## 9. FAQ Accordion

## Purpose
Answer objections in a compact format.

### Required Elements
- question
- answer

### Behavior
- question trigger must be a button
- expand/collapse state should be accessible
- multiple items may be opened or single-open, but behavior should be consistent
- should support grouped FAQ lists by topic

### Content Inputs
- faq items array
- optional category heading

---

## 10. Process Steps Block

## Purpose
Communicate the project process clearly.

### Required Elements
- step title
- short description

### Behavior
- should support a fixed sequence
- should work on homepage and Process page
- should be easy to reorder if process changes later

### Content Inputs
- ordered step list

---

## 11. Pricing / Offer Block

## Purpose
Explain an engagement model or offer path.

### Required Elements
- offer name
- summary
- CTA

### Optional Elements
- fit explanation
- key inclusions
- price range or investment framing

### Behavior
- must support value framing, not just price display
- should work on homepage preview and full Pricing page

### Content Inputs
- offer title
- summary
- bullets
- CTA
- optional investment note

---

## 12. Contact Form

## Purpose
Capture qualified inbound leads.

### Required Fields
- name
- email
- project type
- message

### Optional Fields
- company
- website
- budget range
- timeline

### Behavior
- validates required fields
- shows error states clearly
- shows success state or redirect
- supports analytics tracking
- supports spam protection
- supports future webhook/CRM integration

### Content Inputs
- intro copy
- field labels
- helper text
- submit label
- success message

---

## 13. Proof Strip

## Purpose
Provide concise trust reinforcement.

### Possible Content
- short proof statements
- client logos
- capability markers
- trust metrics

### Behavior
- compact, scannable
- can sit below hero or mid-page

### Content Inputs
- proof item array

---

## 14. Rich Text Section

## Purpose
Handle structured content sections where standard cards are not enough.

### Behavior
- used sparingly
- should support headings, paragraphs, lists, and links cleanly
- should not become a dumping ground for weak structure

### Content Inputs
- heading
- rich text body
- optional CTA

---

## 15. Reusable Props Guidance

### Keep Prop Surfaces Clean
Each component should accept only what it actually needs.

### Avoid
- giant catch-all config objects
- content hidden behind hardcoded assumptions
- overly coupled page-specific logic

### Prefer
- typed props
- small, clear interfaces
- shared content shapes where appropriate

---

## 16. Recommendation

Build the site from a small set of well-defined reusable blocks:
- Header
- Footer
- Hero
- CTA Block
- Service Card
- Project Card
- Testimonial Block
- FAQ Accordion
- Process Steps Block
- Pricing Block
- Contact Form

That is enough to build a strong marketing site without turning the component system into its own project.
