# Chromapages `design.md` v1.0

**Status:** Implementation design authority  
**Project:** Chromapages Marketing / Business Website  
**Brand:** Chromapages  
**Visual territory:** Precision Chroma  
**Image territory:** Precision in Practice  
**Primary stack:** Next.js App Router + TypeScript + Sanity CMS  
**Motion system:** Aperture Transition + restrained Precision Chroma motion  
**Core narrative:** Your business has evolved. Your website should show it.  
**Core value:** Bring the digital presence up to the level of the business.  
**Proof doctrine:** Evidence before adjectives.  
**Operating standard:** Look Premium → Convert Clearly → Load Fast → Launch Clean → Keep Improving

---

# 0. Document Role and Authority

This file is the implementation-facing design authority for the Chromapages v1 website.

It consolidates and applies the approved:

- Brand Strategy v1.0
- Value–Pain–ICP Messaging Matrix
- Precision Chroma Core Visual Identity
- Photography + Image Art Direction
- Proof + Data Visualization System
- Website Design System
- Aperture Transition Motion Specification
- Platform Scope + Requirements
- Sitemap + User Flows
- Marketing System
- Marketing Content Architecture
- PRD and technical direction

This document does **not** replace the locked brand strategy or identity systems. It translates them into a coherent website design system that can be implemented by designers and Codex without inventing a parallel visual language.

## Decision precedence

When implementation materials conflict, use this order:

1. **Brand Strategy / proof doctrine / commercial guardrails**
2. **Platform Scope + Sitemap / User Flows**
3. **Precision Chroma Core Visual Identity**
4. **Photography + Proof + Motion systems**
5. **This `design.md` implementation synthesis**
6. Page-specific mockups and one-off production notes

A visual treatment must never override a strategy, proof, accessibility, or performance requirement.

---

# 1. Product Design Thesis

> **Make the business feel elevated before asking the buyer to believe it. Then prove why they should.**

Chromapages sells premium digital experiences to established service businesses whose companies have become more credible, sophisticated, or ambitious than their websites.

Therefore the Chromapages website must itself demonstrate:

- premium judgment
- commercial clarity
- technical restraint
- strong customer paths
- performance discipline
- launch-level precision
- evidence-led credibility

The experience should move the buyer through:

> **Recognition → Desire → Confidence → Fit → Action**

In Chromapages language:

> **See the gap → See the upgrade → See the evidence → Understand the engagement → Take the next step**

The website is not primarily a portfolio, blog, or service catalog.

It is a **positioning, proof, qualification, and conversion system**.

---

# 2. What the Design Must Make the User Feel

The desired emotional progression is deliberate.

## 2.1 First impression — Control

The user should immediately feel:

- this is considered
- this is premium
- this is clear
- this team understands digital craft

Do not lead with visual noise.

## 2.2 Recognition — Relevance

The user should think:

> **This is describing the problem our business actually has.**

The design should make the Digital Mismatch tangible without insulting the visitor's current site.

## 2.3 Evaluation — Confidence

The user should see:

- deliberate interfaces
- process evidence
- real work
- real artifacts
- controlled design decisions
- clear offer boundaries

## 2.4 Decision — Safety

The user should feel:

> **This does not look like another chaotic agency engagement.**

Process, QA, scope, proof, and Project Fit should reduce perceived risk.

## 2.5 Action — Clarity

At high intent, the user should never wonder:

> What do I do next?

Primary action:

**Plan Your Digital Upgrade**

Diagnostic action:

**Start With an Audit**

---

# 3. Non-Negotiable Design Principles

## 3.1 Clarity Before Decoration

Every visual element must clarify at least one of:

- hierarchy
- relationship
- action
- sequence
- proof
- progress
- state

Remove elements that do none of these.

## 3.2 Editorial Composition Before Component Repetition

Avoid:

```text
Headline
3 cards

Headline
3 cards

Headline
3 cards
```

Prefer:

```text
Statement
↓
Evidence
↓
Space
↓
System
↓
Image
↓
Proof
↓
Action
```

The site should feel composed, not assembled from a SaaS component kit.

## 3.3 One Dominant Job Per Section

Every section needs one communication role.

| Section family | Dominant job |
|---|---|
| Hero | Establish relevance |
| Problem | Create recognition |
| Work | Establish capability |
| Standard | Explain quality system |
| Proof | Establish credibility |
| Offer | Clarify buying path |
| Process | Reduce uncertainty |
| Industry | Establish contextual relevance |
| CTA | Create action |

Do not make one section sell multiple offers, explain the process, show testimonials, and ask for contact simultaneously.

## 3.4 Proof Sits Near the Claim

If the site says:

**Load Fast**

show nearby:

- performance methodology
- technical architecture
- real measurements when available

If it says:

**Launch Clean**

show nearby:

- QA
- approval gates
- testing
- analytics verification
- launch documentation

Do not put all proof in one separate "trust" section.

## 3.5 Premium Means Restraint

Premium comes from:

- proportion
- hierarchy
- typography
- spacing
- imagery
- editing
- consistency
- confidence

Not from:

- constant animation
- giant gradients
- glassmorphism
- glow
- decorative 3D
- random noise
- floating UI fragments
- excessive dark mode
- over-rounded cards

## 3.6 Performance Is a Design Decision

The design cannot create an experience that contradicts **Load Fast**.

No visual flourish is exempt from:

- page-weight scrutiny
- layout-stability requirements
- mobile constraints
- reduced-motion behavior
- accessibility

## 3.7 Evidence Before Adjectives

Never create visual "proof theater."

No:

- fabricated dashboards
- fake logos
- fake reviews
- decorative percentages
- unsupported metrics
- concept work presented as client work

---

# 4. Core Experience Model

The site architecture supports multiple entry points, but all paths belong to the same buyer-decision system.

```text
DIGITAL MISMATCH
        ↓
WHY IT MATTERS
        ↓
CHROMAPAGES APPROACH
        ↓
THE STANDARD
        ↓
PROOF
        ↓
ENGAGEMENT FIT
        ↓
PROJECT FIT / AUDIT
```

Do not make every visitor consume this entire sequence.

Each page should be capable of advancing the user from wherever they enter.

## Buyer-state behavior

### Low awareness
Teach and create recognition.

### Problem aware
Connect the problem to the Standard, Work, and Audit.

### Solution aware
Clarify scope, proof, process, and investment.

### Vendor evaluating
Make Work, Process, About, and proof easily traversable.

### High intent
Remove narrative friction and allow direct Project Fit access.

---

# 5. Global Visual Character

The Chromapages website should feel:

- premium
- precise
- modern
- structured
- digitally fluent
- editorial
- commercially purposeful
- human
- technically controlled

It should not feel:

- generic SaaS
- futuristic for its own sake
- luxury-fashion minimalism detached from business utility
- gamer / crypto dashboard
- overproduced agency portfolio
- AI-tech neon
- template marketplace

## Visual shorthand

> **Editorial technology with consulting-level clarity and product-level precision.**

---

# 6. Core Color System

## 6.1 Brand Tokens

| Token | Name | Value | Role |
|---|---|---:|---|
| `--cp-indigo-700` | Deep Indigo | `#2C3892` | Authority / structure |
| `--cp-indigo-800` | Indigo Pressed | `#24317E` | Indigo hover / active |
| `--cp-indigo-500` | Indigo Bright | `#6673E8` | Dark-surface authority |
| `--cp-indigo-100` | Indigo Mist | `#E7E9F7` | Quiet structural tint |
| `--cp-teal-700` | Teal Blue | `#23698C` | Action / interaction |
| `--cp-teal-800` | Teal Pressed | `#1F5F80` | Teal hover / active |
| `--cp-teal-500` | Teal Bright | `#51B4D9` | Dark-surface action |
| `--cp-teal-100` | Teal Mist | `#E1EFF4` | Quiet action tint |
| `--cp-canvas` | Off-White | `#EFEFED` | Default canvas |
| `--cp-paper` | White | `#FFFFFF` | Elevated light surface |
| `--cp-ink-950` | Precision Ink | `#0F1115` | Main text / dark anchor |
| `--cp-ink-900` | Elevated Ink | `#171A21` | Dark raised surface |
| `--cp-text-muted-light` | Muted Ink | `#5F636C` | Secondary light text |
| `--cp-line-light` | Light Line | `#D9DADC` | Light borders |
| `--cp-line-dark` | Dark Line | `#353943` | Dark borders |
| `--cp-text-muted-dark` | Dark Muted Text | `#B4B7BD` | Secondary dark text |

## 6.2 Semantic Rule

> **Indigo establishes authority. Teal invites action.**

### Deep Indigo

Use for:

- headline emphasis
- section indexes
- brand diagrams
- project classification
- structural labels
- active navigation indicators

Do not turn Indigo into the default button color.

### Teal

Use for:

- primary CTAs
- links
- interactive states
- focus signals
- active process indicators
- small progress accents

Teal should be scarce enough to preserve behavioral meaning.

## 6.3 Recommended Page Distribution

| Family | Approx. use |
|---|---:|
| Off-White / White | 60–70% |
| Ink / dark surfaces / text | 15–22% |
| Deep Indigo | 6–10% |
| Teal | 3–7% |
| Bright / mist variants | 2–5% |

## 6.4 Light / Dark Rhythm

The identity is **light-first**.

Recommended page balance:

> **~70% light / ~30% dark anchors**

Use dark sections for:

- Chromapages Standard
- major proof
- featured case study moments
- technical credibility
- decisive CTA
- footer

Do not alternate backgrounds mechanically.

Preferred long-page rhythm:

```text
Light
Light
Dark anchor
Light
Light
Dark resolution
```

Avoid:

```text
Light
Dark
Light
Dark
Light
Dark
```

which creates visual striping.

---

# 7. Typography

## 7.1 Families

### Display / Headline

**Plus Jakarta Sans**

### Body / Interface

**Inter**

No additional font family should be introduced in v1 without a design-system revision.

## 7.2 Weight Hierarchy

| Role | Family | Weight |
|---|---|---:|
| Hero display | Plus Jakarta Sans | 800 |
| Page H1 | Plus Jakarta Sans | 800 |
| Section heading | Plus Jakarta Sans | 700 |
| Subsection / card title | Plus Jakarta Sans | 600–700 |
| Metric | Plus Jakarta Sans | 500–600 |
| Section index | Plus Jakarta Sans | 500–600 |
| Navigation | Inter | 500–600 |
| Button | Inter | 600 |
| Label | Inter | 500–600 |
| Body | Inter | 400 |
| Body emphasis | Inter | 600 |

Plus Jakarta Sans ExtraBold (800) is reserved for short, high-impact statements.

## 7.3 Responsive Type Scale

```css
--cp-display-xl: clamp(3rem, 7vw, 7rem);
--cp-display-lg: clamp(2.75rem, 5.5vw, 5.5rem);
--cp-heading-1: clamp(2.5rem, 4.25vw, 4rem);
--cp-heading-2: clamp(2rem, 3.4vw, 3rem);
--cp-heading-3: clamp(1.5rem, 2.25vw, 2rem);
--cp-heading-4: clamp(1.25rem, 1.75vw, 1.5rem);
--cp-body-xl: clamp(1.125rem, 1.4vw, 1.25rem);
--cp-body-md: 1rem;
--cp-body-sm: 0.875rem;
--cp-label: 0.75rem;
--cp-metric-xl: clamp(3.5rem, 6vw, 6.5rem);
--cp-index-xl: clamp(4.5rem, 10vw, 10rem);
```

## 7.4 Display Rules

Hero headlines:

- 2–4 lines
- generally 8–14 words
- left aligned by default
- no gradient text
- no more than one Indigo-emphasized phrase
- avoid orphaned single short words

Section headings:

- generally 2–3 lines max
- one clear thought
- Plus Jakarta Sans 700 by default

Body:

- Inter 400
- target ~62–72 characters
- short paragraphs
- no long centered copy

Labels:

- Inter SemiBold
- uppercase permitted
- increased tracking
- examples:
  - `SELECTED WORK`
  - `THE CHROMAPAGES STANDARD`
  - `CASE STUDY 01`
  - `LAUNCH QA`

## 7.5 Semantic Rules

- One semantic `h1` per page.
- Visual size does not determine semantic heading level.
- Never skip heading structure for design reasons.
- Large decorative numerals are not headings.

---

# 8. Grid and Container System

## 8.1 Responsive Grid

| Breakpoint | Columns | Outer margin | Gutter |
|---|---:|---:|---:|
| `<640px` | 4 | `20px` | `16px` |
| `640–1023px` | 8 | `32px` | `24px` |
| `1024–1439px` | 12 | `48px` | `24px` |
| `1440px+` | 12 | `80px` | `32px` |

## 8.2 Containers

| Container | Max width |
|---|---:|
| Full visual canvas | `1600px` |
| Wide content | `1440px` |
| Main content | `1280px` |
| Editorial copy | `760px` |
| Narrow form / article | `640px` |

## 8.3 Common Desktop Spans

| Content | Span |
|---|---:|
| Hero copy | 5 cols |
| Hero visual | 7 cols |
| Section introduction | 4–5 cols |
| Section content | 7–8 cols |
| Service module | 4 cols when grid-based |
| Feature card | 6–8 cols |
| Proof metric | 3 cols |
| Case-study image | 7–8 cols |
| Case-study summary | 4–5 cols |
| Long-form article | 6–7 cols |

## 8.4 Grid Rules

- Align important elements to columns.
- Use asymmetry intentionally.
- Do not center every section.
- One dominant object may break the grid when surrounding alignment remains obvious.
- Use full-bleed media selectively.
- Maintain one primary alignment axis per component.

> **Break the grid deliberately, never accidentally.**

---

# 9. Spacing System

Use only the established spacing scale unless a documented optical correction is required.

```css
--cp-space-1: 4px;
--cp-space-2: 8px;
--cp-space-3: 12px;
--cp-space-4: 16px;
--cp-space-5: 24px;
--cp-space-6: 32px;
--cp-space-7: 48px;
--cp-space-8: 64px;
--cp-space-9: 80px;
--cp-space-10: 96px;
--cp-space-11: 128px;
--cp-space-12: 160px;
```

## Standard Relationships

| Relationship | Space |
|---|---:|
| Eyebrow → headline | `12px` |
| Headline → intro | `20–24px` |
| Body → actions | `32px` |
| Icon → label | `8–12px` |
| Card title → description | `12–16px` |
| Card content → action | `24px` |
| Standard card padding | `24–32px` |
| Feature card padding | `32–48px` |
| Section intro → content | `40–48px` |

## Section Padding

### Desktop
- standard: `96px`
- major: `128px`

### Tablet
- standard: `72px`
- major: `96px`

### Mobile
- standard: `56px`
- major: `72px`

Outer space should generally be 2–3× larger than the most important internal gap.

---

# 10. Radius, Borders, and Elevation

## Radius Tokens

```css
--cp-radius-xs: 4px;
--cp-radius-sm: 8px;
--cp-radius-md: 12px;
--cp-radius-lg: 16px;
--cp-radius-full: 999px;
```

Use:

- buttons / inputs → `8px`
- standard cards → `12px`
- feature media → `16px`
- pills only for genuine status / capsule behavior
- square corners allowed for editorial full-width frames

Do not use large friendly SaaS pill radii across the marketing site.

## Surface Philosophy

> **Border-first. Shadow-second.**

### Light
- page: Off-White
- raised: White
- border: Light Line
- default shadow: none

### Dark
- page: Precision Ink
- raised: Elevated Ink
- border: Dark Line
- default shadow: none

### Approved shadows

```css
--cp-shadow-soft: 0 1px 2px rgba(15, 17, 21, 0.06);
--cp-shadow-feature: 0 20px 56px rgba(15, 17, 21, 0.10);
```

Use shadows only when spatial elevation has actual meaning.

Never combine a heavy shadow with the Page Stack.

---

# 11. Signature Graphic Devices

## 11.1 Page Stack

The Page Stack represents:

- pages
- digital layers
- systems
- progress
- elevation
- structured transformation

### Construction

Front:
- real content / interface / image
- White or Elevated Ink
- `12px`–`16px` radius

Middle:
- 1px Indigo outline
- ~`6px` upper-right offset

Back:
- 1px Teal outline
- ~`12px` upper-right offset

Mobile:
- ~`4px` + `8px` offsets
- two layers permitted when space requires

### Use for

- homepage hero
- featured work
- flagship service
- case-study opener
- responsive-system demonstration

### Rules

- normally one major Page Stack per viewport
- maximum 3 layers
- always moves upper-right
- never randomly rotated
- never repeated on ordinary cards
- never obscure meaningful interface content

## 11.2 Chroma Edge

A dual-line open corner treatment.

### Construction

- 1px Indigo line
- 1px Teal line
- 4px separation
- top-right default orientation
- line length ~28–40% of parent edge
- radius matches parent

On dark:
- Indigo Bright
- Teal Bright

### Use for

- featured project
- major proof
- hero media
- active state
- selected CTA/detail
- case-study cover

### Rules

- roughly 1–2 prominent uses per viewport
- never a full gradient border
- never on ordinary form fields
- never all four corners
- may use bottom-left secondary orientation when composition requires balance

## 11.3 Section Numbers

Format:

```text
01
02
03
```

or:

```text
01 / 05
```

Use for:

- Standard
- process stages
- case-study chapters
- audit findings

Do not number arbitrary homepage sections merely as decoration.

---

# 12. Iconography

Base implementation:

**Lucide**, normalized to Chromapages rules.

| Attribute | Rule |
|---|---|
| Grid | 24 × 24 |
| Stroke | 1.75px |
| Caps | rounded |
| Joins | rounded |
| Primary sizes | 16 / 20 / 24 / 32 |
| Feature | 40–48 |
| Default | monoline outline |

Use Teal for interaction.

Use Indigo for structure / information.

On dark surfaces use Bright variants.

## Custom Standard Icons

Develop / preserve a unified set for:

1. Look Premium — faceted diamond
2. Convert Clearly — target / directional path
3. Load Fast — precision speedometer
4. Launch Clean — check in controlled ring
5. Keep Improving — rising path / progressive steps

Do not mix random filled, 3D, hand-drawn, and outline styles.

---

# 13. Button + Link System

## 13.1 Primary

Use Teal.

```text
Background: Teal Blue
Text: White
Radius: 8px
Font: Inter 600
Height: 48px standard / 56px large
```

Hover:
- Teal Pressed

Focus:
- visible Indigo Bright focus ring

Optional arrow:
- small right-arrow
- may translate ~3px on hover

Primary labels:

- Plan Your Digital Upgrade
- Start With an Audit
- Request a Project Fit Review

## 13.2 Secondary

Light surface:
- transparent
- Precision Ink border/text
- hover → Ink fill / White text

Dark surface:
- transparent
- Off-White border/text
- hover → Off-White fill / Ink text

## 13.3 Tertiary

No permanent container.

Light:
- Deep Indigo

Dark:
- Teal Bright

Use directional line / underline / arrow on hover.

Examples:

- View Selected Work →
- Read the Breakdown →
- See How We Work →

## Rules

- sentence case
- one primary filled action per section
- no gradient buttons
- no ordinary pill CTAs
- no multiple competing filled CTAs
- full-width only when mobile composition benefits

---

# 14. Navigation Design

## 14.1 Desktop Header

Required destinations:

- Work
- Services
- Process
- Industries
- Insights
- About

Primary CTA:

**Plan Your Digital Upgrade**

### Visual behavior

- quiet
- editorial
- Off-White by default
- subtle border or spatial separation
- no giant glass navbar
- no heavy shadow
- no oversized pill container
- header should not compete with hero

### Services menu

If using a menu, keep it concise:

- Signature Website
- Landing Page Sprint
- Digital Product Build
- Growth Partnership
- Digital Elevation Audit

No giant software-style megamenu.

## 14.2 Mobile Navigation

Mobile menu should prioritize orientation.

Recommended order:

```text
01 Work
02 Services
03 Process
04 Industries
05 Insights
06 About
```

Primary CTA:
**Plan Your Digital Upgrade**

Secondary:
**Start With an Audit**

Requirements:

- clear close
- large targets
- immediate hierarchy
- no animation delay
- accessible focus containment
- no essential path hidden under nested menus

---

# 15. Form Design

Forms should feel like premium consultation interfaces, not enterprise intake software.

## Fields

- persistent visible labels
- White light fields / Elevated Ink dark fields
- 8px radius
- clear helper text
- Teal focus state
- functional colors only for actual validation
- minimum comfortable mobile target height

## Validation

- inline
- plain language
- never color-only
- preserve entered values
- focus first invalid field on submission where appropriate

## Project Fit

The form should feel progressively qualifying, not interrogative.

Recommended visual sequence:

```text
Business
↓
Current situation
↓
Trigger
↓
Desired customer action
↓
Likely engagement
↓
Timing / investment context
↓
Contact
```

Use conditional disclosure only if it materially reduces cognitive load.

## Submission State

No confetti.

Use:

```text
PROJECT RECEIVED

Your project is in review.
```

Then explain what happens next.

---

# 16. Proof + Data Visualization Design

> **Do not decorate proof. Organize it.**

Proof should feel:

- editorial
- verified
- calm
- understandable
- transparent

Not:

- SaaS dashboard overload
- crypto UI
- vanity metrics
- performance theater

## Evidence hierarchy

1. Business Outcome
2. Client Evidence
3. Technical Proof
4. Process Proof
5. Craft Proof

Use the strongest available level. Do not visually imply a stronger level than exists.

## Core Proof Components

### Proof Tile

```text
LABEL
PRIMARY EVIDENCE
Supporting explanation
Source / context
```

Light:
- White
- 1px Light Line
- 12px radius
- optional restrained Chroma Edge

### Metric Block

One verified metric.

Must include:
- metric
- label
- period / context
- source when appropriate

### Before / Decision / Better

Preferred over shallow Before / After.

```text
BEFORE
What was not working

DECISION
What changed and why

BETTER
What became clearer / stronger / easier
```

Do not use "result" unless a result is actually evidenced.

### QA Checklist

Dark anchor:

- Precision Ink
- Off-White
- Teal check indicators
- editorial spacing

### Conversion Path Map

Use customer language and simple arrows.

Avoid developer architecture diagrams unless the audience needs them.

## Charts

### Bar
- simple
- direct labels
- minimal grid

### Line
- one primary line
- limited annotations

### Donut
- rare
- only when composition/allocation is meaningful

No rainbow charts.

## Proof Motion

Metric:
1. label
2. number
3. context

Chart:
1. axis
2. data
3. annotation

Before / Better:
1. old state
2. transition
3. improved state

No dramatic wipes.

---

# 17. Photography + Image Art Direction

Lead territory:

> **Precision in Practice**

> **Real businesses, real environments, and real digital work—captured with editorial restraint and technical precision.**

Photography should do one or more jobs:

- humanize
- contextualize
- demonstrate
- prove
- elevate

## Six Pillars

1. Human Expertise
2. Operational Detail
3. Spatial Confidence
4. Digital Outcome
5. Product Truth
6. Proof in Context

## Page Emphasis

### Homepage
One coherent visual direction above fold.

Never combine unrelated industry imagery in one hero.

### Work / Case Studies
Highest image density.

### Services
More process / system-oriented.

### Industries
Most market-specific.

### About
Most human.

### Insights
Most editorial / diagrammatic.

## Lighting

Default:

> **Soft directional light with controlled contrast and visible texture.**

Avoid:

- flat overhead office light
- aggressive teal/orange grading
- neon without context
- extreme HDR
- blown windows
- black detail-less shadows
- unnecessary lens flare

## Product Truth — QSR

Preserve:

- shape
- ingredients
- proportions
- texture
- color
- packaging

Never fabricate:

- steam
- impossible ingredients
- excessive gloss
- misleading scale

## Interface Images

Approved:

- clean screenshots
- editorial crops
- responsive comparison
- interface in context
- Page Stack hero

Avoid:

- extreme perspective
- floating laptop walls
- meaningless UI
- fake metrics

## AI Imagery

Allowed:
- concepting
- previsualization
- clearly labeled concepts

Not allowed:
- fake client proof
- fake staff
- fake locations presented as real
- fabricated outcomes
- fake testimonials
- synthetic dashboards presented as evidence

---

# 18. Motion System

Motion should communicate:

- where something came from
- what changed
- what relates
- what can be interacted with
- where attention should move

## Motion Categories

### Micro
`120–160ms`

Use:
- button
- nav
- focus / hover feedback

### Component
`~240ms`

Use:
- accordion
- cards
- tabs
- compact state changes

### Section
`~320ms`

Use:
- editorial reveal
- Page Stack settle
- content sequencing

### Proof
`600–900ms` when explaining data

### Signature
Aperture Transition.

## Easing

Default:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid:

- bounce
- elastic
- overshoot
- playful spring motion unless a specific functional reason exists

---

# 19. Aperture Transition

The first-visit brand entrance is the approved **Aperture Transition**.

## Desktop

Runtime:

**1.4s**

Sequence:

```text
Closed aperture
→ Aperture activation
→ Indigo registration
→ Teal registration
→ Logo resolution
→ Portal expansion
→ Hero
```

## Mobile

Runtime:

**0.8s**

Simplify:

```text
Open
→ Logo
→ Hero
```

Remove secondary registration animation / long hold.

## Returning Visitor

Bypass intro.

Persist:

```text
chromapages_intro_seen=true
```

## Reduced Motion

Immediate final state.

No delay.

## Budget

Desktop:
- JS <20kb
- SVG <30kb
- total <75kb

Mobile:
- target <50kb

No:
- video
- WebGL
- canvas
- heavy motion dependencies solely for loader spectacle

The homepage must already be available behind the reveal.

---

# 20. Section Library

Pages must be built from a disciplined family of section patterns.

| Family | Approved variants |
|---|---|
| Hero | Primary, Split, Statement, Case Study |
| Editorial Intro | Standard, Numbered, Compact |
| Problem | Split, Signals, Before/Decision/Better |
| Proof | Metric, QA, Quote, Technical, Timeline |
| Work | Featured, Pair, Archive Row |
| Service | Featured, Editorial Rows, Select Grid |
| Process | Linear, Indexed, Detailed |
| Standard | Five-row dark system |
| Media | Full-width, Split, Page Stack |
| Industry | Journey, Challenges, Requirements |
| CTA | Inline, Light Full-width, Dark Closing |
| Content | Article, Pull Quote, Diagram |
| Form | Project Fit, Audit, Compact |
| Footer | Master Footer |

> **Templates choose from the section system. Pages do not invent a new visual language.**

---

# 21. Homepage Design Blueprint

The homepage is the master narrative.

Required sequence:

> **Digital mismatch → business consequence → dependable solution → Standard → evidence → defined offer → next step**

## H01 — Header

Quiet.

Do not compete with hero.

---

## H02 — Hero

### Job

Establish relevance and premium capability immediately.

### Desktop

**5-column copy / 7-column visual**

Left:

Eyebrow:

`PREMIUM WEB DESIGN + DEVELOPMENT FOR SERVICE BUSINESSES`

H1:

> **Your business has evolved.  
> Your website should show it.**

Supporting copy:

> Chromapages brings your digital presence up to the level of your business—so customers can understand what makes you valuable, trust what they see, and find a clear next step.

Capability support:

> Strategy, design, development, performance, QA, and launch through one controlled engagement.

Actions:

**Plan Your Digital Upgrade**

**View Selected Work →**

Right:

One major Page Stack.

Preferred front layer:
- real Chromapages work
- owned-brand work
- clearly classified project
- clearly labeled concept if necessary

### Hero visual rule

One idea only.

Do not add:

- floating KPI cards
- abstract orbs
- decorative UI fragments
- rotating awards
- particle backgrounds

### Mobile

Copy first.

Media second.

CTA above media.

Page Stack offsets reduced.

No hero content dependent on motion.

---

## H03 — The Digital Gap

### Job

Recognition.

Eyebrow:

`THE DIGITAL GAP`

Headline:

> **The company grew. The website stayed behind.**

Use editorial split.

Left:
- statement

Right:
- 4–5 buyer signals

Examples:

- the site feels behind the real-world business
- the offer became more sophisticated
- mobile weakens perception
- new services / locations outgrew architecture
- leadership no longer trusts the site as a sales touchpoint

No hard CTA.

---

## H04 — Business Consequence

### Job

Explain why the mismatch matters without unsupported outcome claims.

Visual structure:

One dominant headline + three controlled consequence lanes:

**Perception**  
**Clarity**  
**Action**

Avoid generic icon-card trio treatment.

Use editorial columns or a progressive horizontal sequence.

---

## H05 — The Digital Upgrade

### Job

Define Chromapages' value.

Headline:

> **Not another redesign. A digital upgrade.**

Three system lenses:

### Presence
How the business looks and feels.

### Customer Path
How people understand, trust, and act.

### Digital System
How the experience performs, launches, and evolves.

Light section.

Minimal decoration.

---

## H06 — Chromapages Standard

### Job

Explain proprietary quality criteria and reduce uncertainty.

**Dark anchor.**

Precision Ink.

Headline:

> **Five standards. One stronger digital presence.**

Use five indexed editorial rows:

```text
01 Look Premium
02 Convert Clearly
03 Load Fast
04 Launch Clean
05 Keep Improving
```

Each row:
- index
- custom icon
- title
- concise result
- supporting proof / methodology where applicable

Not five generic rounded cards.

On desktop, one row may become active/focused as user progresses.

On mobile, stack cleanly; no horizontal-scroll gimmick.

---

## H07 — Selected Work

### Job

Prove capability.

Return to Off-White.

Header:

`SELECTED WORK`

Headline:

> **See the upgrade.**

Hierarchy:

**1 flagship project → 2 supporting**

Flagship:
- media 8 cols
- summary 4 cols

Include:
- classification
- project
- buyer problem
- scope
- transformation statement
- verified evidence only

Do not make every project equal.

---

## H08 — Proof in Practice

### Job

Convert craft into confidence.

If outcome proof is limited, prioritize:

- QA
- process artifacts
- performance methodology
- responsive work
- launch checklist
- real client statement
- accessibility / technical evidence

Potential design:

one dominant proof statement + 2–3 contextual proof components.

Never fabricate proof to make the section feel full.

If evidence inventory is thin, reduce the section rather than manufacture density.

---

## H09 — Offers

### Job

Give the buyer the correct path.

Headline:

> **Different problems need different engagements.**

Do not use four identical pricing cards.

Hierarchy:

### Flagship
Signature Website

Largest module.

### Focused
Landing Page Sprint

### Product
Digital Product Build

### Continuity
Growth Partnership

### Diagnostic
Digital Elevation Audit

Use situation-led copy.

Service modules should answer:

- when this is appropriate
- what it solves
- next step

---

## H10 — Process Confidence

### Job

Reduce engagement anxiety.

Headline:

> **A controlled process from strategy to launch.**

Sequence:

```text
Discover
→ Structure
→ Design
→ Build
→ Verify
→ Launch
→ Improve
```

Do not confuse with the Standard.

**Standard = quality criteria.**

**Process = engagement movement.**

Use thin lines, indexes, or an editorial runway.

---

## H11 — Industries

### Job

Show contextual expertise without fragmenting the master brand.

Initial:

- Tax / Accounting / Advisory
- Restaurant / QSR

May preview future categories only if content is credible.

Each industry should show:
- buyer tension
- customer action
- relevant proof / insight
- route to industry page

No logo cloud.

---

## H12 — Final Conversion

**Dark resolution.**

Headline:

> **Your business already grew.  
> Now bring the website with it.**

Supporting:
- short
- grounded
- no hype

Primary:
**Plan Your Digital Upgrade**

Secondary:
**Start With an Audit →**

---

## H13 — Footer

Precision Ink.

Architecture:
- master brand
- proposition
- primary navigation
- services
- industries
- sub-brand routing
- utility / legal
- social
- final contact path

Architectural, not link-heavy.

---

# 22. Work Index Design

Route:

`/work`

## Hero

Eyebrow:

`SELECTED WORK`

Headline:

> **Digital upgrades, shown in context.**

Explain that projects are clearly classified.

## Project hierarchy

### Featured
Large, dominant.

### Supporting
2-column or asymmetric.

### Archive
Compact editorial rows.

Do not add filtering until enough projects exist to make it useful.

Portfolio should get quieter as the user moves deeper.

---

# 23. Case Study Design

Case studies are among the highest-value pages on the platform.

## C01 — Opener

- section number
- classification
- client / project
- transformation statement
- scope
- hero media

Use Page Stack or Chroma Edge selectively.

## C02 — Business Context

Editorial copy.

Use real business context, not design-industry language.

## C03 — The Gap

Explain actual customer / business friction.

## C04 — The Approach

Strategic decisions.

## C05 — Experience System

Show:
- IA
- wireframes
- responsive logic
- page architecture
- conversion path
- design system

## C06 — Visual Build

Mix:
- direct full-page crops
- interface detail
- mobile
- photography
- responsive comparison
- occasional Page Stack

No laptop-mockup wall.

## C07 — Technical / Launch Proof

Dark anchor.

Potential:
- QA
- performance
- accessibility
- analytics verification
- launch sequence

Only actual evidence.

## C08 — Outcome

Use strongest available evidence tier.

Do not force business metrics where only craft or technical proof exists.

## C09 — Quote

Only approved real quote.

## C10 — Next Project

Large transition with strong imagery.

Not a tiny footer link.

---

# 24. Service Page Design

All service pages share a system but should not feel like duplicated templates.

## Required sequence

```text
Service Hero
→ Who / When
→ Problem
→ Outcome
→ What We Build
→ Standard Applied
→ Engagement Sequence
→ Proof
→ Investment
→ FAQ
→ CTA
```

## Investment Design

Do not use:

- Basic / Pro / Enterprise
- SaaS pricing cards
- fake discount badges

Use:

```text
Starting investment
Typical range
What changes investment
```

Investment is editorial guidance.

## Deliverables

Use editorial rows, grouped systems, or sequential explanation.

Avoid 20-item icon checklist.

---

# 25. Digital Elevation Audit Design

The Audit page should feel like a diagnostic product.

Design sequence:

```text
Problem
→ What gets reviewed
→ What you receive
→ Who it is for
→ Sample structure / evidence
→ Investment
→ Start With an Audit
```

Visual opportunity:
- editorial report frames
- proof components
- annotated sample architecture
- sample audit pages clearly labeled `SAMPLE`

Never fabricate findings.

---

# 26. Process Page Design

Route:

`/process`

Two distinct parts:

## Part A — The Standard

```text
Presence
Persuasion
Performance
Precision
Progress
```

Dark, structured, indexed.

## Part B — The Engagement

```text
Discover
Structure
Design
Build
Verify
Launch
Improve
```

Light / dark rhythm may shift here to show transition from philosophy to operation.

Supporting proof:
- scope
- approvals
- QA
- testing
- analytics
- handoff

The page's job is to make **Launch without chaos** believable.

---

# 27. Industry Page Design

Industry pages change context, not identity.

Do not invent mini brands.

Verticalization comes through:

- language
- imagery
- proof
- customer journey
- relevant offers

## Template

### I01 — Industry Hero

Buyer-specific tension.

### I02 — Digital Friction

Specific to market.

### I03 — Customer Journey

Accounting:

```text
Search / referral
→ expertise
→ service fit
→ trust
→ consultation
```

QSR:

```text
Discover
→ crave
→ menu / location
→ order / visit
```

### I04 — What Matters

Industry-specific UX / content system.

### I05 — Relevant Offers

### I06 — Relevant Proof

### I07 — Relevant Insights

### I08 — CTA

---

# 28. About Page Design

The About page answers:

> **Why should I trust the people and system behind the work?**

Structure:

## A01 — Belief

> **A website should do more than represent the business. It should strengthen the business.**

## A02 — Why Chromapages Exists

Digital mismatch.

## A03 — How We Think

Standard / principles.

## A04 — Human Expertise

Use environmental portraits and real working moments.

No corporate headshot grid.

## A05 — Direct Partnership

Responsibilities, senior attention, controlled process.

## A06 — Brand Architecture

Explain BuiltExpert / ServeStrategy only where useful.

Do not turn this into a holding-company chart.

## A07 — CTA

---

# 29. Insights Design

## Index

Editorial publication feel.

Feature:
- one large article

Then:
- 2-column / editorial rows
- restrained topic navigation

Avoid generic blog card grids.

## Article

Target content width:

`~760px`

Hero:
- category
- title
- summary
- author / date

Use:
- diagrams
- proof examples
- direct interface crops
- pull statements
- related offer
- related industry
- contextual CTA

Do not add:
- sticky social clutter
- excessive sidebars
- tiny 500px reading width

---

# 30. Contact / Project Fit Design

Route:

`/contact`

Desktop:
- left context / expectations
- right Project Fit form

Mobile:
- concise context first
- form immediately after

The page should signal:

- qualification
- seriousness
- low friction
- no free speculative strategy

Do not use a generic `Name / Email / Message` form.

---

# 31. Responsive Design System

Responsive design means **recomposition**, not shrinkage.

## Desktop → Tablet

- 5/7 hero → 4/4
- large visual indexes reduce
- multi-column proof may move to 2-column
- feature splits tighten
- nav simplifies

## Tablet → Mobile

### Hero
Copy first → media second.

### Standard
Rows stack.

### Process
Horizontal → vertical.

### Proof
3–4 columns → 1–2.

### Case Study
Visual first → context second where helpful.

### CTA
Full width when it improves ease.

### Page Stack
Offsets reduce.

### Chroma Edge
Scale with component rather than automatically disappear.

### Typography
Maintain hierarchy; do not simply reduce everything proportionally.

---

# 32. Mobile Conversion Rules

Mobile is especially important for:

- QSR
- social
- referral
- local-service contexts
- executive browsing

Requirements:

- no hover-only meaning
- no tiny metadata links
- one obvious primary action
- buttons with comfortable touch height
- forms with native-friendly input behavior
- no forced horizontal tables
- no overlong animation
- navigation prioritizes Work / Services / Project Fit

---

# 33. Accessibility

Target:

> **WCAG 2.2 AA**

Requirements:

- semantic headings
- keyboard navigation
- visible focus
- persistent field labels
- accessible menus
- correct button/link semantics
- descriptive links
- contrast
- alt text
- reduced motion
- accessible validation
- logical focus
- captions / transcripts when relevant
- no information by color alone
- adequate touch targets

Accessibility is part of premium execution.

---

# 34. Performance as Design

Core design consequences:

## Hero
No huge autoplay video by default.

## Fonts
Two families only. Restrict weights.

## Images
Responsive variants. Dimensions reserved.

## Motion
Prefer transform / opacity for UI transitions.

## Layout
Reserve media geometry to protect CLS.

## Scripts
No dependency purely for one minor flourish.

## Third-party embeds
Lazy-load when appropriate.

## Loader
Never delay usable content for brand spectacle.

The site must demonstrate **Load Fast**, not merely state it.

---

# 35. CMS Design Constraints

Sanity controls content, not arbitrary visual styling.

Editors may select approved content blocks.

Potential block families:

- Section Header
- Rich Text
- Media
- Featured Work
- Proof Group
- Metric
- Testimonial
- Process
- Standard
- CTA
- FAQ
- Diagram
- Related Content

Editors should **not** control:

- arbitrary margins
- arbitrary colors
- custom type sizes
- freeform border radii
- independent shadows
- animation durations
- raw CSS
- per-section layout invention

> **The design system sits above CMS freedom.**

---

# 36. Content + Proof Governance in Design

Every design must gracefully handle missing evidence.

If no metric exists:
- do not render a metric placeholder

If no testimonial exists:
- do not render an anonymous quote

If a project is conceptual:
- label it

If proof is confidential:
- use only approved disclosure

If a section becomes visually sparse because evidence is unavailable:
- redesign for truthful sparsity
- do not manufacture density

This is a key Chromapages design principle.

---

# 37. Loading, Empty, and Error States

## Loading

Quiet skeletons matching final geometry.

No aggressive shimmer.

Reserve image aspect ratio.

Do not wipe form data.

## Empty Work

Explain that selected work is being curated if needed.

Do not show fake projects.

## Empty Proof

Omit or replace with process/craft evidence.

## 404

```text
404 / PAGE NOT FOUND

This page isn't where it used to be.
```

Actions:

**Return Home**

**View Our Work →**

Use restrained Register / Aperture graphic.

## Error

```text
Something didn't load correctly.
```

Offer:
- retry
- contact / navigation path

---

# 38. Footer Design

Precision Ink anchor.

Recommended architecture:

```text
Chromapages
Short proposition

Primary
Work
Services
Process
Industries
Insights
About

Services
Signature Website
Landing Page Sprint
Digital Product Build
Growth Partnership
Digital Elevation Audit

Industries
Accounting / Advisory
Restaurant / QSR

Companies
BuiltExpert
ServeStrategy

Action
Plan Your Digital Upgrade

Utility
Privacy
Terms if required
Social
```

Do not overload with every capability.

The footer should feel like a composed closing page, not a site-directory dump.

---

# 39. Anti-Patterns

Do not introduce any of the following unless the system is formally revised.

## Visual

- gradient-heavy brand fields
- glassmorphism
- glowing buttons
- neon outlines
- 3D floating shapes
- rainbow charts
- generic AI hero art
- huge serif luxury typography
- excessive all-caps body copy
- device-mockup walls
- random angled browser windows
- infinite-marquee decoration
- rounded pill everything
- repeated 3-card SaaS layouts
- excessive dark pages

## Motion

- scroll hijacking
- multi-second intro on every visit
- bouncing logo
- elastic UI
- decorative parallax everywhere
- forced animation before content access

## Trust

- logo walls without permission
- fake counters
- fake dashboards
- fake testimonials
- "world-class" without evidence
- invented conversion stats
- concept work presented as client work

## Conversion

- multiple competing primary buttons
- generic `Learn More` everywhere
- unclear form intent
- forcing low-intent readers into Project Fit on every section
- hiding pricing logic behind artificial mystery

---

# 40. Design Tokens — Implementation Baseline

```css
:root {
  /* Brand */
  --cp-indigo-700: #2c3892;
  --cp-indigo-800: #24317e;
  --cp-indigo-500: #6673e8;
  --cp-indigo-100: #e7e9f7;

  --cp-teal-700: #23698c;
  --cp-teal-800: #1f5f80;
  --cp-teal-500: #51b4d9;
  --cp-teal-100: #e1eff4;

  /* Neutral */
  --cp-canvas: #efefed;
  --cp-paper: #ffffff;
  --cp-ink-950: #0f1115;
  --cp-ink-900: #171a21;
  --cp-text-muted-light: #5f636c;
  --cp-text-muted-dark: #b4b7bd;
  --cp-line-light: #d9dadc;
  --cp-line-dark: #353943;

  /* Functional */
  --cp-success: #027a48;
  --cp-warning: #b54708;
  --cp-error: #b42318;

  /* Fonts */
  --cp-font-display: "Plus Jakarta Sans", sans-serif;
  --cp-font-body: "Inter", sans-serif;

  /* Type */
  --cp-display-xl: clamp(3rem, 7vw, 7rem);
  --cp-display-lg: clamp(2.75rem, 5.5vw, 5.5rem);
  --cp-heading-1: clamp(2.5rem, 4.25vw, 4rem);
  --cp-heading-2: clamp(2rem, 3.4vw, 3rem);
  --cp-heading-3: clamp(1.5rem, 2.25vw, 2rem);
  --cp-heading-4: clamp(1.25rem, 1.75vw, 1.5rem);
  --cp-body-xl: clamp(1.125rem, 1.4vw, 1.25rem);
  --cp-body-md: 1rem;
  --cp-body-sm: 0.875rem;
  --cp-label: 0.75rem;

  /* Space */
  --cp-space-1: 4px;
  --cp-space-2: 8px;
  --cp-space-3: 12px;
  --cp-space-4: 16px;
  --cp-space-5: 24px;
  --cp-space-6: 32px;
  --cp-space-7: 48px;
  --cp-space-8: 64px;
  --cp-space-9: 80px;
  --cp-space-10: 96px;
  --cp-space-11: 128px;
  --cp-space-12: 160px;

  /* Radius */
  --cp-radius-xs: 4px;
  --cp-radius-sm: 8px;
  --cp-radius-md: 12px;
  --cp-radius-lg: 16px;
  --cp-radius-full: 999px;

  /* Motion */
  --cp-motion-fast: 160ms;
  --cp-motion-standard: 240ms;
  --cp-motion-slow: 320ms;
  --cp-ease-standard: cubic-bezier(0.22, 1, 0.36, 1);

  /* Shadow */
  --cp-shadow-soft: 0 1px 2px rgba(15,17,21,.06);
  --cp-shadow-feature: 0 20px 56px rgba(15,17,21,.10);
}
```

---

# 41. Codex Implementation Directives

When Codex implements the website:

## Must

- treat Server Components as default where architecture allows
- encode design tokens centrally
- build reusable section primitives
- keep page composition editorial
- preserve responsive grid rules
- enforce proof classification in CMS-rendered UI
- preserve reduced-motion behavior
- implement native semantic HTML
- keep CTA hierarchy explicit
- optimize images through the Next.js pipeline
- keep content CMS-driven without giving CMS arbitrary visual styling
- ensure mobile layouts are deliberately recomposed

## Must Not

- invent business metrics
- invent case studies
- add placeholder client logos
- add fake testimonials
- create generic dashboards
- add random gradients
- replace Precision Chroma with a different visual territory
- turn every section into cards
- add animation simply because a library makes it easy
- add a third font
- add new top-level service categories without strategy approval
- use visual complexity to mask missing proof

## Component Principle

Before creating a new component, ask:

1. Does an existing section family solve this?
2. Is the new pattern reusable?
3. Does it serve hierarchy, action, proof, state, or relationship?
4. Does it preserve Precision Chroma?
5. Does it remain responsive and accessible?
6. Is its performance cost justified?

If not, do not create it.

---

# 42. Page-Level Design QA

Before a page is approved:

## Strategy

- correct buyer?
- correct problem?
- clear job?
- clear next step?
- correct offer routing?

## Hierarchy

- one dominant H1?
- one primary CTA?
- clean visual waterfall?
- body measure controlled?
- no competing section jobs?

## Brand

- Off-White dominant?
- Indigo structural?
- Teal behavioral?
- signature devices scarce?
- Plus Jakarta Sans / Inter correct?

## Proof

- claims supported?
- classification visible where needed?
- metrics contextualized?
- concept work labeled?
- no proof theater?

## Imagery

- strategic role?
- accurate?
- rights / status appropriate?
- crop responsive?
- product truth preserved?

## Motion

- explains something?
- reduced-motion path?
- no content dependency?
- no layout shift?

## Mobile

- recomposed?
- primary action clear?
- no hover dependency?
- readable?
- tap targets comfortable?

## Accessibility

- semantics?
- focus?
- contrast?
- labels?
- validation?
- alt text?
- heading order?

## Performance

- image dimensions reserved?
- hero asset optimized?
- third parties controlled?
- animation weight justified?

---

# 43. Site-Level Design QA

The full website is not ready until:

- the light / dark rhythm feels intentional across complete journeys
- pages feel related without looking duplicated
- the homepage is clearly the master narrative
- case studies feel like the strongest proof environment
- service pages lead with buying situations
- the Audit feels diagnostic rather than discounted
- Process clearly differs from the Standard
- Industries feel contextual but remain Chromapages
- About feels human without becoming agency mythology
- Insights feel editorial
- Project Fit feels qualifying but usable
- mobile feels designed, not collapsed
- proof remains truthful everywhere
- the site itself visibly demonstrates the Chromapages Standard

---

# 44. Final Design Lock

The Chromapages website should feel like:

> **A premium editorial digital system engineered with the discipline of a product interface and the clarity of a high-end consulting document.**

The user should not leave thinking only:

> "That was a beautiful agency website."

They should think:

> **They understand why our current digital presence is behind the business.**

Then:

> **They have a disciplined way to bring it forward.**

Then:

> **The quality of this website makes their standard believable.**

The final design principle is:

> **Every pixel performs—but not every pixel needs to perform loudly.**

Restraint is part of the proof.

---

# 45. Recommended Next Production Artifacts

After this `design.md`, implementation should proceed through:

1. **Homepage Page Blueprint**
   - exact section-by-section content hierarchy
   - desktop / tablet / mobile composition
   - proof requirements
   - Sanity fields
   - motion rules

2. **Case Study Page Blueprint**
   - proof hierarchy
   - media sequence
   - classification treatment

3. **Signature Website Page Blueprint**

4. **Industry Page Blueprint**
   - Accounting / Advisory first
   - QSR second

5. **Project Fit UX Blueprint**

6. **Component Inventory + Storybook / implementation map**

7. **Codex Build Prompt**
   - points Codex to this `design.md`
   - platform scope
   - sitemap
   - technical spec
   - acceptance tests

This sequence creates the final bridge from strategy and identity into production.
