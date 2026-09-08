# Chromapages Platform Scope + Requirements v1.0

**Platform:** Chromapages Marketing / Business Website  
**Document type:** Platform Scope + Requirements  
**Version:** 1.0  
**Status:** Pre-build implementation scope  
**Primary stack:** Next.js (App Router) + TypeScript + Sanity CMS  
**Deployment model:** Vercel-style Next.js deployment  
**Brand system:** Precision Chroma  
**Core narrative:** Your business has evolved. Your website should show it.  
**Proof doctrine:** Evidence before adjectives.  
**Operating standard:** Look Premium → Convert Clearly → Load Fast → Launch Clean → Keep Improving

---

# 1. Document Purpose

This document defines the **platform boundary and implementation requirements** for the Chromapages v1 marketing website.

It converts the approved brand strategy, discovery direction, offer architecture, proof system, visual identity, photography direction, motion system, and marketing architecture into a single build-level scope.

This document answers:

- What the v1 platform includes.
- What the v1 platform does not include.
- Which user journeys must be supported.
- Which content types must exist in Sanity.
- Which parts of the site must be editor-controlled.
- Which functional systems are required.
- Which proof and claims controls must be enforced.
- Which analytics and SEO capabilities must be installed.
- Which accessibility, performance, security, and QA standards apply.
- Which integrations are required versus still unresolved.
- What constitutes launch readiness.

This is **not** a page-copy document, a final design specification, a campaign plan, or a substitute for the technical implementation specification.

---

# 2. Platform Definition

For v1, the Chromapages platform consists of four coordinated layers.

## 2.1 Public Website

The customer-facing marketing website responsible for:

- positioning
- problem recognition
- offer education
- proof
- vertical relevance
- Insights
- qualification
- inquiry conversion

## 2.2 Content Platform

Sanity CMS responsible for structured editorial control over:

- offers
- case studies
- industries
- Insights
- proof
- page content
- SEO metadata
- selected global settings

## 2.3 Measurement Layer

The analytics and event system responsible for establishing the first reliable baseline for:

- visitor behavior
- CTA usage
- service interest
- case-study engagement
- industry interest
- Project Fit progression
- completed inquiries

## 2.4 Delivery Layer

The Next.js deployment and operational system responsible for:

- rendering
- routing
- performance
- accessibility
- image optimization
- preview
- deployment
- launch QA
- continued maintainability

The platform is not a SaaS product, CRM, commerce engine, customer portal, or internal operations system.

---

# 3. Product Objective

The platform exists to generate:

> **Qualified commercial conversations with businesses whose growth has outpaced their digital presence.**

The site should help the right visitor move through:

**Recognition → Understanding → Confidence → Proof → Offer Fit → Action**

The website should not optimize primarily for maximum inquiry volume.

The objective is:

> **Qualified demand, not maximum demand.**

---

# 4. Strategic Platform Jobs

The platform must perform seven primary jobs.

## 4.1 Create Recognition

Help the visitor recognize the Digital Mismatch:

> The business has evolved faster than the digital experience.

## 4.2 Clarify Consequence

Explain how a weak digital experience can create friction around:

- perception
- clarity
- trust
- customer action
- growth flexibility

without publishing unsupported outcome claims.

## 4.3 Position Chromapages

Establish Chromapages as:

> **The premium, launch-safe digital upgrade partner for service businesses that have outgrown ordinary websites.**

## 4.4 Demonstrate the Standard

Make the Chromapages Standard visible and credible:

1. Look Premium
2. Convert Clearly
3. Load Fast
4. Launch Clean
5. Keep Improving

## 4.5 Organize Proof

Show evidence with explicit context and classification.

## 4.6 Clarify Engagement Options

Explain the difference between:

- Signature Website
- Landing Page Sprint
- Digital Product Build
- Growth Partnership
- Digital Elevation Audit
- Site Care where appropriate

## 4.7 Convert and Qualify

Route strong prospects toward:

- Project Fit
- Digital Elevation Audit
- relevant service pages
- relevant industry pages
- relevant case studies

---

# 5. Platform Audiences

The platform should support four primary buyer roles.

## Founder / Owner

Core thought:

> “The company looks better in person than it does online.”

Needs:

- confidence
- credibility
- investment logic
- clear next step
- low-chaos engagement

## Managing Partner / Principal

Core thought:

> “Our expertise is stronger than our presentation.”

Needs:

- authority
- clear service architecture
- trust
- professionalism
- proof

## Marketing Leader

Core thought:

> “The site is slowing everything else down.”

Needs:

- CMS flexibility
- campaign destinations
- clear customer paths
- analytics
- reliable delivery
- performance

## Operations / Growth Leader

Core thought:

> “The business added locations, services, or complexity and the site has not kept up.”

Needs:

- scalable information architecture
- structured content
- location or service expansion support
- integrations
- measurable customer journeys

---

# 6. Priority Vertical Scope

## Tier 1 — Required Launch Support

### Tax / Accounting / Advisory

The platform must support an industry-specific landing page and related content around:

- credibility
- expertise architecture
- offer clarity
- consultation paths
- advisory positioning

### Restaurant / QSR Growth Brands

The platform must support an industry-specific landing page and related content around:

- product truth
- mobile experience
- ordering
- locations
- catering
- expansion
- franchise ambition where relevant

## Tier 2 — Content Model Ready, Launch Timing Flexible

The platform architecture must be able to add:

- Insurance
- B2B Professional Services
- Multi-Location Service + Hospitality

without new engineering for the basic landing-page model.

## Brand Routing

The platform must maintain routing awareness for:

- Contractors / home services → BuiltExpert
- Churches / nonprofits / mission-driven organizations → ServeStrategy

The v1 Chromapages platform does not include full standalone builds for either sub-brand.

---

# 7. Required Route Architecture

```text
/
├── /work
│   └── /work/[slug]
│
├── /services
│   ├── /services/signature-website
│   ├── /services/landing-page-sprint
│   ├── /services/digital-product-build
│   ├── /services/growth-partnership
│   └── /services/digital-elevation-audit
│
├── /process
│
├── /industries
│   └── /industries/[slug]
│
├── /about
│
├── /insights
│   └── /insights/[slug]
│
└── /contact
```

The exact public URL naming may be refined before implementation, but the information architecture must preserve these content families.

Site Care does not require a dedicated top-level public page unless later approved.

---

# 8. Homepage Scope

The homepage must follow:

1. Digital mismatch
2. Business consequence
3. Dependable solution
4. Chromapages Standard
5. Evidence
6. Defined offer
7. Next step

Required modules include:

- hero
- Digital Mismatch / recognition
- business consequence
- Chromapages solution
- Chromapages Standard
- selected proof / work
- offer overview
- industry relevance
- process confidence
- Project Fit CTA

The homepage must not depend on fake client-logo walls, unsupported statistics, generic agency service grids, invented dashboards, or concept work presented as client proof.

---

# 9. Service Platform Scope

Each primary offer requires a dedicated page.

## Signature Website

Commercial framing:

> **When the business has outgrown the website.**

Must support:

- buyer situation
- problem
- engagement scope
- process
- deliverables
- timeline
- investment language
- proof
- related work
- relevant industries
- CTA

## Landing Page Sprint

Commercial framing:

> **When the campaign is ready but the destination isn't.**

Must preserve:

**one audience → one offer → one primary action**

## Digital Product Build

Commercial framing:

> **When the workflow has outgrown generic software.**

Must explain paid discovery before high-uncertainty builds.

## Growth Partnership

Commercial framing:

> **When launch creates the next set of priorities.**

Must communicate defined capacity rather than unlimited support.

## Digital Elevation Audit

Commercial framing:

> **Know what deserves to change before you pay to rebuild it.**

Must communicate its diagnostic role and path into larger engagements.

---

# 10. Work + Case Study Scope

Every case study requires one classification:

```text
real-public-client
confidential-client
white-label
concept-study
internal-prototype
owned-brand
```

Publishing without classification must be blocked at the CMS validation layer.

The model must support:

- project identity
- classification
- business context
- challenge
- baseline where available
- scope
- strategy
- design decisions
- development decisions
- launch
- proof
- methodology
- attribution limitations
- approved testimonial
- imagery
- live URL where allowed
- related offers
- related industries
- next stage

The platform must permit honest omission where evidence does not exist.

---

# 11. Proof System Requirements

The platform must support:

## Level A — Business Outcome Proof

Requires:

- baseline
- timeframe
- methodology
- source
- attribution limits
- permission

## Level B — Client Evidence

Examples:

- testimonials
- reviews
- approved client statements

## Level C — Technical Proof

Examples:

- Core Web Vitals
- accessibility
- QA
- responsive testing

Requires date, tool, context, and conditions.

## Level D — Process Proof

Examples:

- discovery
- wireframes
- approval stages
- launch checklists

## Level E — Craft Proof

Examples:

- live interfaces
- component systems
- responsive designs
- prototypes

Craft proof must not be elevated into business-outcome proof.

---

# 12. Required Proof Components

The component system should support:

- Proof Tile
- Metric Block
- Before / Decision / Better
- Proof Timeline
- QA Checklist
- Performance Report
- Conversion Path Map
- System Diagram
- Evidence Quote
- Process Evidence
- Responsive Interface Comparison

All quantitative proof must include context.

---

# 13. Claims Governance

> **Evidence before adjectives.**

The platform must not knowingly publish:

- placeholder logos
- fake testimonials
- fictional outcomes
- unsupported metrics
- fake dashboards
- fake ranking claims
- unverified ROAS
- guaranteed revenue
- guaranteed conversions
- guaranteed rankings
- guaranteed traffic

Proof content should support internal states such as:

- Verified
- Permission Pending
- Internal Only
- Conceptual
- Unsupported

Only publicly cleared proof should render publicly.

---

# 14. Industry Platform Scope

Industry pages must use a repeatable structured model.

Each should support:

- industry
- buyer situation
- Digital Mismatch
- commercial implication
- customer actions
- Chromapages POV
- relevant Standard principles
- offer recommendations
- proof
- related work
- Insights
- CTA

Initial required pages:

- Tax / Accounting / Advisory
- Restaurant / QSR

Future industries should not require new engineering for the core template.

---

# 15. Insights Platform Scope

Insights is the canonical long-form knowledge base.

Required capabilities:

- index
- article pages
- categories
- author
- publish date
- update date
- featured image
- rich content
- internal links
- related offers
- related industries
- related work
- metadata
- structured data where appropriate

Priority editorial territories include:

- Digital Mismatch
- customer-path clarity
- premium perception
- performance
- QA
- IA
- proof
- multi-location systems
- accounting / advisory
- QSR customer journeys

---

# 16. Marketing Content Architecture Integration

Where practical, CMS metadata may support:

- Content ID
- pillar
- series
- vertical
- funnel stage
- buyer tension
- proof status
- destination
- CTA

The website should remain compatible with:

- The Digital Gap
- Field Notes
- The Standard
- The Breakdown
- Before / Decision / Better
- Proof in Practice
- Industry Signals
- Audit Notes
- Project Chapters
- Build Notes

The full social production database remains outside website v1.

---

# 17. Sanity CMS Content Types

Required document types:

### `siteSettings`

For global configuration.

### `offer`

For service / offer content.

### `caseStudy`

With required classification.

### `industry`

For segment pages.

### `insight`

For long-form publishing.

### `proof`

For reusable evidence.

### `page`

For managed editorial pages where required.

Supporting objects should cover:

- SEO
- CTAs
- image metadata
- proof context
- metric context
- rich text
- links
- media
- section labels

---

# 18. CMS Editorial Requirements

Authorized editors must be able to:

- create drafts
- update copy
- manage offers
- publish case studies
- set classification
- manage industries
- publish Insights
- add approved proof
- control SEO metadata
- control alt text
- manage conceptual / AI labels

Guarded fields should include:

- classification
- proof status
- permission
- metric source
- timeframe
- AI / concept status
- testimonial permission

---

# 19. Preview + Publishing

Required:

- draft preview
- authorized unpublished preview
- separation of draft and production content
- validation before publishing

Visual rendering alone must not allow evidence requirements to be bypassed.

---

# 20. Media Requirements

The platform must support:

- responsive delivery
- intrinsic dimensions
- focal points where useful
- alt text
- decorative treatment
- captions where required
- rights metadata where maintained
- project / concept classification

Preferred delivery formats include AVIF and WebP.

PNG should be reserved for cases such as transparency or detailed interface assets.

---

# 21. Photography Requirements

The platform must support **Precision in Practice**:

1. Human Expertise
2. Operational Detail
3. Spatial Confidence
4. Digital Outcome
5. Product Truth
6. Proof in Context

Every image should humanize, contextualize, demonstrate, prove, or elevate.

---

# 22. AI Image Requirements

AI imagery may support:

- concepts
- art direction
- previsualization
- campaigns
- clearly labeled synthetic creative

It may not:

- impersonate clients
- fabricate locations
- invent employees
- fabricate results
- create fake testimonials
- fabricate proof
- materially misrepresent products

---

# 23. QSR Product Truth

Real or client-representative QSR imagery must preserve:

- shape
- ingredients
- proportions
- texture
- color
- packaging
- defining characteristics

Avoid:

- fake steam
- impossible ingredients
- excessive gloss
- misleading scale
- impossible product states

---

# 24. Visual System Requirements

Core palette:

```text
Deep Indigo      #2C3892
Teal Blue        #23698C
Off-White        #EFEFED
Precision Ink    #0F1115
```

Core behavior:

> **Indigo establishes authority. Teal invites action.**

Typography:

- Plus Jakarta Sans — display/headlines
- Inter — body/interface

Grid:

- 4-column mobile
- 8-column tablet
- 12-column desktop

Surface behavior:

- light-first
- dark sections as anchors
- border-first
- shadow-second
- controlled radius
- editorial composition
- deliberate asymmetry

---

# 25. Signature Visual Devices

## Page Stack

Requirements:

- maximum three layers
- upper-right direction
- restrained use
- no heavy shadow combination

## Chroma Edge

Requirements:

- open dual-line corner
- Indigo + Teal
- limited use
- no gradient-border substitution

## Section Numbering

Use only where sequence has meaning.

---

# 26. Motion Requirements

Motion must explain:

- hierarchy
- sequence
- relationship
- interaction
- state

Requirements:

- reduced-motion support
- no layout instability
- no content lockout
- no excessive scroll hijacking
- no unnecessary WebGL
- no default autoplay cinematic background media

---

# 27. Aperture Transition

The approved first-visit entrance is the **Aperture Transition**.

Desktop target:

**1.4 seconds**

Mobile target:

**0.8 seconds**

Implementation:

- SVG
- GSAP

Returning visitors bypass the intro.

`prefers-reduced-motion` receives the immediate final state.

Performance targets:

- desktop total under 75kb
- mobile total under 50kb

The entrance must never make the site feel slower than it is.

---

# 28. Navigation Requirements

Navigation must clearly expose:

- Work
- Services
- Process
- Industries
- Insights
- About
- Project Fit

Requirements include:

- keyboard access
- visible focus
- mobile-appropriate behavior
- clear orientation
- no novelty that hides essential navigation

---

# 29. CTA Requirements

CTA strength should match intent.

Examples:

Recognition:

No hard CTA required.

Education:

**Read the full breakdown →**

Proof:

**View the project →**

Service:

**Explore Signature Website →**

Diagnostic:

**Start With an Audit →**

High intent:

**Plan Your Digital Upgrade →**

Project inquiry:

**Request a Project Fit Review →**

Avoid generic `Learn More` where a specific action exists.

---

# 30. Project Fit Requirements

The inquiry experience must support qualification around:

- company
- website
- industry
- challenge
- trigger
- desired customer action
- likely engagement
- timing
- investment readiness
- decision-maker involvement
- context
- contact information

Successful submission requires:

- visible confirmation
- analytics event
- reliable routing

Final CRM, inbox, scheduling, and automation destination remain TBD.

---

# 31. Form Requirements

All forms require:

- semantic labels
- keyboard access
- accessible validation
- server validation
- success state
- error state
- appropriate spam protection
- privacy-conscious analytics

Sensitive raw form content must not be pushed into general analytics.

---

# 32. Analytics Requirements

No reliable historical baseline exists.

Launch establishes the initial baseline.

Required event categories include:

- primary CTA
- service CTA
- Project Fit start
- Project Fit submit
- Audit interest
- case-study engagement
- industry engagement
- Insights CTA progression

Campaign attribution should use consistent UTM conventions.

The specific analytics provider remains TBD.

---

# 33. Measurement Requirements

The platform should support eventual measurement of:

### Demand

- qualified inquiries
- ICP fit
- decision-maker involvement
- industry
- service interest

### Website

- CTA progression
- service engagement
- case-study engagement
- industry engagement
- Project Fit progression

### Sales

Where data becomes available:

- opportunities
- proposals
- wins
- project value
- source
- sales cycle

No invented historical comparison should be used.

---

# 34. SEO Requirements

Required capabilities:

- metadata
- descriptions
- canonicals
- Open Graph
- robots
- sitemap
- semantic headings
- internal linking
- structured data
- indexable services
- indexable industries
- indexable Insights

Structured data candidates:

- Organization
- Service
- Article
- BreadcrumbList

Only supported facts may be marked up.

---

# 35. Performance Requirements

“Load Fast” must be operational.

Requirements:

- server-first rendering
- limited JS
- responsive images
- responsible font loading
- fixed media dimensions
- lazy loading below fold
- correct hero priority
- limited third parties
- controlled motion

The site should be engineered toward good Core Web Vitals in real-world use.

Performance must not be sold as a permanent guaranteed score.

---

# 36. Accessibility Requirements

Target:

**WCAG 2.2 AA**

Requirements:

- semantic HTML
- logical headings
- keyboard navigation
- visible focus
- contrast
- accessible controls
- accessible forms
- error identification
- meaningful alt
- decorative-image handling
- reduced motion
- readable responsive typography
- adequate targets
- non-color-only states

---

# 37. Security Requirements

Required:

- environment-variable protection
- no secrets in client bundles
- restricted Sanity write credentials
- form validation
- framework-safe output handling
- dependency hygiene
- secure production configuration
- restricted preview
- least-privilege access where available

Enterprise authenticated-product security is outside v1 because no authenticated product is included.

---

# 38. Privacy + Consent

The platform must be capable of supporting applicable privacy requirements for:

- analytics
- forms
- retargeting
- email capture
- third-party embeds

Final implementation depends on selected tooling and jurisdictional needs.

Unnecessary tracking should not be installed before the measurement plan is defined.

---

# 39. Browser + Device Requirements

At minimum, QA must include:

- Chrome
- Safari
- mobile Safari

The platform must intentionally support:

- mobile
- tablet
- desktop
- wide desktop

Responsive design means recomposition, not desktop scaling.

---

# 40. Deployment Requirements

Deployment should use a Vercel-style workflow.

Required environments:

- local
- preview / branch
- production

Requirements:

- environment-specific config
- preview deployments
- safe production promotion
- rollback support
- no manual production-server edits

---

# 41. Sanity Environment Requirements

The exact dataset strategy remains an implementation decision.

The platform must support:

- production-safe content
- draft preview
- protected write access
- code-controlled schemas
- predictable migrations

Do not create unnecessary environment complexity without a real need.

---

# 42. Redirect + URL Governance

The platform must support redirects for:

- migrated URLs
- renamed pages
- replaced pages
- campaign cleanup

Redirects and broken-link verification are launch-QA requirements.

---

# 43. Error + Empty States

Required considered states include:

- 404
- server error where relevant
- empty Work
- empty Insights
- missing optional proof
- failed form
- unavailable external resource

The system must never fill missing proof with fake placeholders.

---

# 44. QA Scope

QA must cover:

### Content

Copy, claims, proof, classification, links, media.

### Responsive

Mobile, tablet, desktop, wide desktop.

### Functional

Navigation, forms, CTAs, relationships.

### SEO

Metadata, canonicals, sitemap, robots, structured data, redirects.

### Analytics

Events, attribution, form completion, sensitive-data protection.

### Accessibility

Keyboard, focus, headings, forms, contrast, alt, reduced motion.

### Performance

Images, loading, layout stability, third parties, intro motion.

---

# 45. Launch Gate

Do not launch until:

- launch pages are approved
- proof is classified
- unsupported claims are removed
- forms are tested
- routing is tested
- analytics is verified
- metadata exists
- sitemap / robots are correct
- redirects are installed
- keyboard navigation works
- responsive QA passes
- reduced motion works
- major performance regressions are resolved
- no critical broken links remain
- applicable commercial launch milestone is satisfied

---

# 46. V1 Out of Scope

Unless separately added:

- BuiltExpert standalone build
- ServeStrategy standalone build
- e-commerce storefront
- client portal
- authenticated accounts
- SaaS application
- project-management portal
- customer dashboard
- online payment platform
- full CRM implementation
- full marketing automation
- social publishing platform
- advanced personalization
- broad paid-media management
- generic SEO platform
- unlimited landing-page generator
- large-scale localization
- multi-tenant architecture

---

# 47. Future-Ready, Not Required

Architecture should avoid blocking:

- additional industries
- Commerce Track
- Multi-Location Track
- richer case studies
- technical reports
- email capture
- campaign pages
- retargeting
- structured locations
- sub-brand routing
- Growth Partnership reporting
- future verified outcome proof

Future readiness is not permission for premature complexity.

---

# 48. Integrations — Required vs TBD

The platform must be able to integrate with:

- analytics
- lead routing
- scheduling or CRM where selected
- Sanity
- deployment

Still TBD:

- analytics provider
- CRM
- scheduler
- email marketing
- spam protection
- consent manager
- error monitoring

Selections should follow actual operational needs rather than assumptions.

---

# 49. Commercial Rules in Platform UX

The public website must not imply:

- unlimited revisions
- undefined project scope
- fixed-price uncertain product builds
- unpaid discovery
- guaranteed results
- unlimited support

Displayed pricing must remain clearly framed as starting points / working ranges subject to scope and calibration.

---

# 50. Platform Acceptance Criteria

V1 is complete when:

## Content

- required routes exist
- offers exist
- launch industries exist
- Work works
- Insights works
- Project Fit works

## CMS

- schemas exist
- editors can manage normal content
- case classification is required
- proof controls exist
- preview works

## Brand

- Precision Chroma is implemented
- typography is correct
- Indigo / Teal behavior is correct
- signature devices are restrained
- dark sections act as anchors

## Proof

- no fabricated proof
- every case is classified
- metrics include context
- concepts are labeled
- unsupported claims are absent

## Functional

- navigation works
- forms work
- states work
- events work
- redirects work

## Performance

- Core Web Vitals are treated seriously
- media is optimized
- motion avoids major regressions
- Aperture follows performance rules

## Accessibility

- WCAG 2.2 AA target
- keyboard / focus
- reduced motion
- accessible forms

## SEO

- metadata
- canonicals
- sitemap
- robots
- indexable content

## Launch

- QA complete
- proof cleared
- measurement installed
- production verified

---

# 51. Open Platform Decisions

## Proof

1. Which case studies launch?
2. Which logos/testimonials are permitted?
3. What Buddas Hawaiian material can publish?
4. Which verified metrics exist?

## Content

5. Which Tier 2 industries launch?
6. Which Insights launch?
7. Is Site Care public?

## Lead Flow

8. Where do Project Fit submissions go?
9. Is scheduling part of the flow?
10. Does the Audit get a separate inquiry flow?

## Measurement

11. Which analytics provider?
12. Which events are final conversion events?
13. Is email capture in v1?
14. Is retargeting in v1?

## Operations

15. What is the Sanity environment model?
16. Who may publish?
17. What monitoring is required?
18. What consent tooling is required?

---

# 52. Final Platform Scope Lock

The v1 Chromapages platform is:

> **A premium, CMS-driven marketing, proof, qualification, and lead-generation website for growth-minded service businesses that have outgrown their digital presence.**

It must demonstrate the same discipline Chromapages sells.

**Look Premium**  
through Precision Chroma and controlled editorial design.

**Convert Clearly**  
through deliberate information architecture, offer clarity, proof, and Project Fit.

**Load Fast**  
through performance-aware Next.js implementation and responsible media.

**Launch Clean**  
through structured CMS governance, QA, analytics, accessibility, SEO, and deployment controls.

**Keep Improving**  
through structured content, baseline measurement, Insights, industry expansion, and future proof accumulation.

The v1 platform should be sophisticated enough to support Chromapages' commercial strategy without becoming a bloated application platform before the business requires one.

> **Build the system the business needs now, while preserving a clean path to what it may need next.**
::: ​​
