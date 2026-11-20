# SEO Strategy

## Purpose
This document defines the SEO strategy for the Chromapages marketing website, including target keyword directions, metadata structure, heading hierarchy, internal linking logic, and schema markup recommendations.

This is a foundational SEO document for a service-based marketing site. The goal is to create a clean technical and content structure that supports discoverability now and scalable search growth later.

---

## 0. Current status and audit — 2026-10-24 (Elliot)

**Scope and method.** Read-only inspection of the current worktree (`app/`, `components/`, `lib/`, `docs/`, `public/`, `.env.local` presence checks) plus the repository's documented contract tests. No deployment, production configuration change, CMS change, or external submission was performed. Website copy was not edited; copy recommendations are listed separately in §0.6.

**Finding tags used below**

| Tag | Meaning |
|---|---|
| **Observed** | Directly verified in the current code/config in this worktree. |
| **Documented** | Asserted in an approved planning doc, not verified in running code. |
| **Inferred** | A reasonable conclusion from code, not independently verified. |
| **Unknown** | No evidence in the inspected sources; needs an owner decision or external proof. |

**Sources read for this audit (Documented):** `docs/scope.md`, `docs/sitemap.md`, `docs/seo-strategy.md` (this file), `docs/qa-checklist.md` (§6 SEO, §11 launch blockers), `docs/launch-plan.md` (§3 pre-launch, §9 decision rule), `docs/repair-handoff.md`, `docs/forms-and-leads.md`, `docs/redirects.md`, and the ChromaPages brand source available to this pass.

**Team Charter (Unknown).** No document titled "Team Charter" was found in the inspected `docs/` set or in the company-brain sources available to this pass. The closest approved brand/strategy source describes an umbrella positioning ("Revenue-Driven Websites & Digital Products For Service Businesses") whose ICP excludes "small businesses" and "startups" as primary framing, which conflicts with some current site copy (see §0.2 number 1). Because the charter could not be located, **no strategy-level change was made** (keywords, services, offers, navigation). Those items are recorded here as dependencies only. See §0.5.

### 0.1 What each page needs the right visitor to understand and do

| Route | The right visitor must understand → then do | Rendered `<title>` | Meta description | Canonical | Indexable | In sitemap | Structured data | Primary CTA (event) |
|---|---|---|---|---|---|---|---|---|
| `/` | Chromapages builds conversion-focused sites/web apps for service businesses → book a call or send an inquiry | `Digital Design Elevated. \| Chromapages` | Yes | `/` (added) | Yes | Yes | Organization + WebSite (added) | Hero "Book A Call" → `/contact` (`click_cta`, `hero`) |
| `/services` | The service stack is focused; pick the fit → open a service or contact | `Services \| Chromapages` | Yes | `/services` (added) | Yes | Yes | Organization + WebSite | Hero "Book A Call" → `/contact` (`click_cta`, `hero`); bottom CTA |
| `/services/[slug]` | What this specific service includes and who it is for → start a project | `<Service> \| Chromapages` (duplicate brand fixed) | Yes (service summary) | `/services/<slug>` (added) | Yes | Yes (eligible only) | Organization + WebSite | Hero primary → service `ctaLink` or `/contact`; sidebar "Book A Call" (untracked) |
| `/work` | Chromapages applies a clear structure and standard → open a case study or contact | `Work \| Chromapages` | Yes | `/work` (added) | Yes | Yes | Organization + WebSite | Hero "Book A Call"; project cards "View case study" (`click_cta`, `project-card`) |
| `/work/[slug]` | The problem, approach, and verified result → start a project | `<Title> \| Case Study \| Chromapages` | Yes (excerpt) | `/work/<slug>` (added) | Yes (approved docs only) | Yes (approved docs only) | Organization + WebSite | Hero "Start Your Project" → `/contact`; bottom CTA |
| `/process` | The engagement is structured and predictable → view pricing or contact | `Process \| Chromapages` | Yes | `/process` (added) | Yes | Yes | Organization + WebSite | Hero "Book A Call"; bottom CTA |
| `/pricing` | The engagement shapes and fit → contact with context | `Pricing \| Chromapages` | Yes | `/pricing` (added) | Yes | Yes | Organization + WebSite; FAQPage **not** added (see §0.2 no. 11) | Hero "Book A Call"; offer buttons (`click_cta`, `pricing-snapshot`) |
| `/about` | Who Chromapages is and how it works → contact | `About \| Chromapages` | Yes | `/about` (added) | Yes | Yes | Organization + WebSite | Hero "Book A Call" (page is internally orphaned — §0.2 no. 2) |
| `/contact` | A short inquiry is welcome; context helps → submit the form or email | `Contact \| Chromapages` | Yes | `/contact` (added) | Yes | Yes | Organization + WebSite | Form submit (`form_submit`); "Email us" mailto (`click_cta`, `contact-page`) |
| `/privacy-policy` | How submitted information is handled → contact if needed | `Privacy Policy \| Chromapages` | Yes | `/privacy-policy` (added) | Yes | Yes | Organization + WebSite | Bottom CTA → `/contact` |
| `/thank-you` | The inquiry was received and what happens next → view work or return home | `Thank You \| Chromapages` | Yes | — | **No** (`robots: index:false, follow:false`) | **No** | Organization + WebSite | "View Work", "Back to Home" |
| `404` (`not-found`) | This page does not exist → go home or contact | `Chromapages` (root default) | Root default | — | Unknown (see §0.2 no. 16) | No | Organization + WebSite | "Back home", "Contact" (`click_cta`, `not-found`) |

### 0.2 Ranked audit

| # | Severity | Finding | Tag | Evidence (files) | Action taken | Owner | Status |
|---:|---|---|---|---|---|---|---|
| 1 | High | Positioning drift: site copy still frames "small businesses" and "startups" (README audience, `faqItems`, keyword map) while the umbrella positioning excludes those as primary ICP. | Documented vs Observed | `docs/README.md`, `lib/site.ts` (`faqItems`), this file §3 | None (strategy/copy — needs owner) | Sloane + Owner | Open |
| 2 | High | **Orphan pages.** `/about` and all five `/services/*` detail pages have **no inbound internal links**. Header renders only `items.slice(0,4)`; footer hardcodes Work/Services/Process/Contact; `footerGroups` (which contains About + service links) is never imported; `components/cards/service-card.tsx` (the only component linking `/services/${slug}`) is never imported; homepage `ServicesGrid` uses `homepageServices` which links only to `/contact`. | Observed | `components/global/header.tsx`, `components/global/footer.tsx`, `lib/site.ts`, `components/cards/service-card.tsx`, `components/sections/services-grid.tsx` | None (navigation — owner-locked) | Sloane + Marcus + Builder | Open |
| 3 | High | Production canonical host unverified. `metadataBase`, `sitemap.xml`, and `robots.txt` all derive from `NEXT_PUBLIC_SITE_URL ?? "https://chromapages.com"`; locally it is `http://localhost:3000`. | Observed (local) / Unknown (prod) | `.env.local`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` | None (env only) | Builder/Dev + Owner | Open — launch blocker (qa-checklist §11) |
| 4 | High | Homepage trust bar publishes unverified proof: "Trusted by industry leaders" with placeholder logos "Partner 1–6". Conflicts with the no-fabricated-proof standard and cannot be surfaced in structured data. | Observed | `components/sections/trust-bar.tsx` | None (copy — needs owner) | Content Owner + Owner | Open |
| 5 | High | Homepage service cards do not map to the approved service set: names differ ("Digital Experience Design", "Landing Pages & Funnels", "Performance SEO") and every card links to `/contact`, so `/services/*` intents get no homepage support. | Observed vs Documented | `components/cards/glass-service-card.tsx`, this file §4 | None (strategy/content/nav) | Sloane + Content Owner | Open |
| 6 | Medium | Duplicate brand token in service-detail titles ("`<Service> \| Chromapages \| Chromapages`"). | Observed | `app/(marketing)/services/[slug]/page.tsx` | **Fixed** (title now inherits the root `%s \| Chromapages` template) | Elliot | Resolved |
| 7 | Medium | No canonical URLs on any page. | Observed | all `app/(marketing)/**/page.tsx` | **Fixed** (self-referencing `alternates.canonical` added to every indexable public route) | Elliot | Resolved |
| 8 | Medium | Open Graph / Twitter title+description are brand-generic on every page: root `openGraph`/`twitter` values are inherited unchanged by all child routes (verified against the installed Next.js metadata resolver). | Observed (+ Documented in Next) | `app/layout.tsx` | None (needs share-copy authoring) | Elliot + Content Owner | Open |
| 9 | Medium | Sitemap marked every URL `lastModified: new Date()` (build time) — a misleading freshness signal. | Observed | `app/sitemap.ts` | **Fixed** (`lastModified` omitted) | Elliot | Resolved |
| 10 | Medium | Service detail pages render thin content without a configured CMS: the page reads `title/summary/description/features`, but the static fallback objects use `label/summary/body/includes/audience/outcomes`. With no Sanity client, the rich-text description is empty and "Key Deliverables" shows generic fallback strings. | Observed / Inferred | `app/(marketing)/services/[slug]/page.tsx`, `lib/site.ts`, `types/sanity.ts` | None (needs source-of-truth decision) | Builder + CMS Owner | Open |
| 11 | Medium | FAQ content is not rendered: `lib/site.ts` `faqItems` is unused; homepage has no FAQ section; service detail pages do not render `service.faq`; only `/pricing` renders an FAQ (a local array). | Observed vs Documented | `lib/site.ts`, `app/(marketing)/pricing/page.tsx`, `app/(marketing)/services/[slug]/page.tsx` | None (content decision; also enables FAQPage schema) | Content Owner | Open |
| 12 | Low | `robots.txt` did not disallow the protected admin portal `/portal-admin`. | Observed | `app/robots.ts` | **Fixed** (`/admin`, `/portal-admin`, `/api` disallowed) | Elliot | Resolved |
| 13 | Low | No structured data anywhere. | Observed | `app/layout.tsx` | **Partially fixed** (Organization + WebSite added with verified-visible facts only; Service / FAQPage / BreadcrumbList / LocalBusiness deferred) | Elliot | Partial |
| 14 | Low | Footer "Legal" group links to `/thank-you`, a `noindex` utility page. | Observed | `components/global/footer.tsx`, `lib/site.ts` | None (navigation) | Sloane | Open |
| 15 | Low | Sitemap correctly excludes `/thank-you` and includes `/privacy-policy`; documented `/faq` and `/terms` are not built and correctly absent. | Observed | `app/sitemap.ts`, `docs/sitemap.md` | None (no action) | Elliot | OK |
| 16 | Unknown | 404 route exports no explicit `robots` directive; whether the framework emits `noindex` for `not-found` was not verified either way. | Unknown | `app/not-found.tsx` | None | Builder | Open — verify in release |
| 17 | Unknown | Redirect map is placeholder-only; no existing-live-URL audit has been done. | Documented / Unknown | `docs/redirects.md` | None | Elliot | Open |

**Positive checks (Observed, no action):** unique title + meta description exist on every core page; every page renders exactly one `<h1>` (via `Hero` or `not-found`); `metadataBase` is set; `/thank-you` is `noindex, nofollow` and excluded from the sitemap; the OG image `/og-image.png` exists in `public/` (≈88 KB) and is referenced at 1200×630; sitemap service and case-study URLs derive from the same eligibility predicates the pages use.

### 0.3 Launch checks (SEO)

| # | Check | Owner | Status |
|---:|---|---|---|
| 1 | Confirm production `NEXT_PUBLIC_SITE_URL` and chosen canonical host (apex vs www); verify `sitemap.xml` and `robots.txt` emit that domain. | Builder/Dev + Owner | Open |
| 2 | Confirm apex↔www redirect direction; verify no duplicate-host serving. | Builder/Dev | Open |
| 3 | Verify self-referencing `rel=canonical` renders on every indexable route in the release build. | Elliot | Pending release |
| 4 | Confirm no invented proof is public (trust bar, homepage services, case studies). | Content Owner + Owner | Open |
| 5 | Decide and restore internal links to `/about` and `/services/*`. | Sloane + Marcus | Open |
| 6 | Add per-page Open Graph/Twitter title+description (or approve share copy). | Elliot + Content Owner | Open |
| 7 | Submit/verify sitemap; check Coverage for orphan/noindex/redirect surprises. | Elliot | Pending release |
| 8 | Re-run `docs/qa-checklist.md` §6 SEO checks against the live domain. | QA Owner (Quinn) | Pending release |

### 0.4 Owners

| Role | Owner |
|---|---|
| Final approval / go-no-go | Owner (Eric Black, Tier 0) |
| SEO & measurement | Elliot |
| Strategy / positioning / navigation | Sloane |
| Design system & visual acceptance | Marcus |
| QA checklist completion | Quinn |
| Build / environment / deployment | Builder-Dev — **Unknown** (not named in inspected sources) |
| Content & copy approval | Content Owner — **Unknown** (launch-plan defines the role; not named) |
| CMS source of truth | CMS Owner — **Unknown** |

### 0.5 Unresolved dependencies (SEO)

1. **Production domain** (Unknown) — required before canonicals/sitemap/robots can be trusted.
2. **Team Charter** (Unknown) — required before any keyword, service, offer, or navigation change.
3. **Sanity project ID + dataset + approved `caseStudy` documents** (Unknown) — required for real `/work` content, `generateStaticParams`, and sitemap proof URLs.
4. **Content approvals** — trust bar, homepage service set, FAQ rendering, per-page share copy.
5. **Navigation/footer approval** — internal linking to `/about` and `/services/*` (see `footerGroups`).
6. **Redirect audit** of any existing live URLs.

### 0.6 Copy recommendations (recorded, **not applied**)

These are copy/strategy items and were intentionally left unchanged:

- Replace "Trusted by industry leaders" + placeholder partner logos with approved, real partner/client evidence, or remove the section.
- Align homepage service names and links with the five approved service pages.
- Consider rendering approved FAQ content on home and service pages (enables FAQPage schema).
- Resolve positioning drift: choose language consistent with the umbrella ICP rather than "small businesses"/"startups" if the charter confirms it.
- Author per-page Open Graph/Twitter titles and descriptions.

### 0.7 Changes applied in this pass (code)

| File | Change |
|---|---|
| `app/(marketing)/services/[slug]/page.tsx` | Removed duplicated brand suffix in `generateMetadata` title. |
| `app/(marketing)/**/page.tsx` (home, services, services/`[slug]`, work, work/`[slug]`, process, pricing, about, contact, privacy-policy) | Added self-referencing `alternates.canonical`. |
| `app/robots.ts` | Added `/portal-admin` to `disallow`. |
| `app/sitemap.ts` | Removed misleading `lastModified`. |
| `app/layout.tsx` | Added Organization + WebSite JSON-LD using only verified-visible facts (name, URL, public email, configured description). |

No route was renamed; no redirect was added; no copy or offer text was changed.

---

## 1. SEO Goals

The SEO strategy should help Chromapages:

- rank for relevant service-intent queries
- capture branded and non-branded demand
- support local and niche service visibility where relevant
- create scalable page structures for future SEO expansion
- improve click-through rates through stronger metadata
- make every important page understandable to search engines

---

## 2. SEO Positioning Strategy

Chromapages should not try to rank broadly for every generic web term immediately. That is a common trap.

Instead, the SEO strategy should focus on:

- branded search dominance
- service-intent keywords
- local or regional business-intent modifiers where relevant
- future long-tail growth through service pages, case studies, and industry pages

### SEO Philosophy
Prioritize:
- relevance
- clarity
- intent match
- structured content
- strong internal linking

Do not chase traffic that has no conversion intent.

---

## 3. Keyword Strategy

## Branded Keywords
These should be owned completely.

### Primary Branded Targets
- Chromapages
- Chromapages web design
- Chromapages website development
- Chromapages digital design studio

---

## Core Service Keywords
These are the core commercial-intent keyword buckets.

### Website Services
- web design agency
- website design company
- website development company
- custom website design
- marketing website design
- small business website design
- lead generation website design

### Landing Pages
- landing page design
- landing page development
- conversion-focused landing pages
- paid traffic landing page design

### Web Apps / MVPs
- web app development agency
- MVP development agency
- custom web application development
- startup MVP website development

### E-Commerce
- ecommerce website design
- ecommerce development agency
- Shopify website design
- ecommerce conversion design

### Ongoing Support
- website maintenance service
- website support retainer
- ongoing website support

---

## Local / Geo-Modified Keyword Opportunities
Use only if location targeting becomes important in the live strategy.

Examples:
- web design agency in [city]
- website developer in [city]
- small business website design [city]
- landing page design [region]

### Recommendation
Only create local landing pages if Chromapages is intentionally pursuing local SEO. Do not manufacture weak local pages without a real business reason.

---

## Future Long-Tail Keyword Opportunities

### Service + Audience
- website design for contractors
- website design for startups
- website design for service businesses
- landing pages for home service companies

### Service + Outcome
- website that gets more leads
- conversion-focused website design
- fast website for SEO and ads

### Process / Evaluation Queries
- how much does a business website cost
- how to choose a web design agency
- what makes a good landing page
- website redesign checklist

These are better suited for future blog, resource, or landing page content.

---

## 4. Page-Level Keyword Mapping

| Page | Primary Keyword Direction | Secondary Direction |
|---|---|---|
| `/` | web design and development studio | marketing websites, web apps |
| `/services` | web design services | website development services |
| `/services/marketing-websites` | marketing website design | lead generation website |
| `/services/landing-pages` | landing page design | landing page development |
| `/services/ecommerce` | ecommerce website design | Shopify design |
| `/services/web-apps` | web app development agency | MVP development |
| `/services/ongoing-support` | website maintenance service | website support retainer |
| `/work` | web design portfolio | website case studies |
| `/process` | web design process | website project process |
| `/pricing` | website design pricing | web design cost |
| `/about` | about Chromapages | web design studio |
| `/contact` | contact Chromapages | book web design consultation |

---

## 5. Metadata Strategy

## Title Tag Structure
Use page titles that combine:
- page topic
- business value or relevance
- brand name

### Recommended Patterns
- `Primary Topic | Chromapages`
- `Primary Topic For Specific Audience | Chromapages`
- `Service Name | Chromapages`

### Examples
- `Marketing Website Design | Chromapages`
- `Landing Page Design And Development | Chromapages`
- `Web Design Process | Chromapages`
- `Pricing | Chromapages`

## Meta Description Structure
Meta descriptions should:
- clearly explain the page
- reinforce value
- improve click-through rate
- avoid keyword stuffing

### Recommended Pattern
`What the page is + who it helps + why it matters.`

### Example
`Explore Chromapages services for businesses that need faster, higher-converting websites and landing pages built to support growth.`

---

## 6. Heading Hierarchy Strategy

## Core Rules
- one clear H1 per page
- H2s should define major page sections
- H3s should support subsections under H2s
- headings should be descriptive, not decorative
- headings should support both readability and topical clarity

## Recommended Heading Pattern For Service Pages
```txt
H1: Service Name
H2: Who This Is For
H2: What’s Included
H2: Why It Matters
H2: How It Works
H2: FAQs
H2: Next Steps
```

## Recommended Heading Pattern For Homepage
```txt
H1: Primary Value Proposition
H2: Services
H2: Featured Work
H2: Process
H2: Why Chromapages
H2: Pricing
H2: FAQs
H2: Next Steps
```

## Recommended Heading Pattern For Case Studies
```txt
H1: Project Title
H2: Overview
H2: Problem
H2: Approach
H2: Build
H2: Results
H2: Next Steps
```

### Rule
Do not use headings purely for style. Use them to organize meaning.

---

## 7. Schema Markup Strategy

## Core Recommended Schemas

### 1. Organization
Use on the site globally to define the business entity.

### 2. WebSite
Use to define the site as a whole and support branded clarity.

### 3. Service
Use on service pages to clarify the service offering.

### 4. FAQPage
Use where FAQs are structured and visible on-page.

### 5. BreadcrumbList
Use on interior pages where hierarchy matters.

### 6. Article
Use for future blog/resource pages.

### 7. LocalBusiness
Use only if local business targeting is part of the live strategy and contact/location information supports it.

---

## 8. Internal Linking Strategy

SEO and UX both benefit from strong internal linking.

### Core Internal Linking Paths
- homepage -> services
- homepage -> work
- homepage -> process
- homepage -> pricing
- services -> service detail pages
- service pages -> related case studies
- case studies -> relevant services
- pricing -> contact
- about -> contact
- future blog posts -> service pages
- future landing pages -> contact or service pages

### Internal Linking Rules
- use descriptive anchor text
- link to the most relevant next page
- do not overlink every paragraph
- make sure important pages are reachable in a few clicks

---

## 9. URL Strategy

### Best Practices
- keep URLs short and readable
- use hyphenated slugs
- align slugs with page intent
- avoid unnecessary dates or filler words

### Good Examples
- `/services/landing-pages`
- `/services/web-apps`
- `/work/hvac-lead-generation-website`

### Avoid
- `/services/page-1`
- `/work/our-best-project-ever-2026-final`
- `/blog/post?id=13`

---

## 10. Indexing Strategy

### High-Value Pages To Index
- homepage
- services page
- service detail pages
- work overview
- case studies
- process
- pricing
- about
- contact

### Pages That May Be Noindexed Later If Needed
- thank-you page
- certain campaign landing pages
- low-value utility pages
- filtered archive views if they exist later

### Recommendation
The thank-you page should generally be excluded from indexation.

---

## 11. Image SEO Strategy

### Requirements
- descriptive file names
- useful alt text
- compressed image delivery
- logical image placement relative to content

### Alt Text Rule
Alt text should describe the content or function of the image, not stuff keywords unnaturally.

---

## 12. Technical SEO Baseline

The site should support:

- clean metadata handling
- canonical tags
- robots directives
- sitemap generation
- fast page performance
- mobile-friendly rendering
- structured headings
- internal linking
- schema output
- proper status codes

### Recommendation
Use shared SEO utilities rather than hardcoding metadata page by page.

---

## 13. Future SEO Expansion Plan

### Phase 1
- launch core pages
- optimize metadata
- define heading hierarchy
- add schema markup
- build internal linking foundation

### Phase 2
- add service detail pages
- add case studies
- strengthen keyword/page match
- improve proof content

### Phase 3
- add industry pages
- add educational content
- create long-tail topic clusters
- support search growth with blog/resources

---

## 14. Meta Structure Template

### Basic Meta Template
```txt
Title: [Primary Topic] | Chromapages
Meta Description: [Clear summary of page value and audience relevance.]
Canonical: [Preferred live URL]
OG Title: [Can mirror title or use CTR-focused variant]
OG Description: [Can mirror meta description]
OG Image: [Default or page-specific image]
```

---

## 15. Final Recommendation

The SEO strategy should focus on high-intent service visibility first, not vanity traffic.

If a page cannot clearly answer:
- what it is about,
- who it is for,
- and what next step it supports,

it will likely underperform for both SEO and conversion.
