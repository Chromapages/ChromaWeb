# Tech Stack

## Purpose
This document defines the recommended technical stack for the Chromapages marketing website, including framework choices, supporting libraries, hosting, and the rationale behind each decision.

The goal is to keep the project modern, maintainable, fast, and scalable without introducing unnecessary complexity.

---

## Stack Summary

### Core Application Stack
- **Framework:** Next.js
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### Content Layer
- **CMS:** Headless CMS (recommended: Sanity or similar structured-content CMS)
- **Static Content Option:** Local MD/MDX or JSON/YAML for early-stage builds if CMS is deferred

### Hosting / Deployment
- **Primary Recommendation:** Vercel
- **Alternative:** Hostinger or comparable static/app hosting if needed

### Analytics
- **Baseline:** GA4
- **Optional:** Meta Pixel and additional ad-platform pixels

### Forms / Lead Capture
- **Option A:** Simple managed form endpoint
- **Option B:** Custom API route with spam protection and email/webhook delivery

### Scheduling / Conversion
- **Recommended:** External booking system integration via link or embed

---

## Core Framework Choices

## 1. Next.js

### Why Next.js
Next.js is the best-fit framework for this project because it supports:

- fast page performance
- hybrid rendering patterns
- strong SEO support
- flexible routing for marketing pages, service pages, and future content
- scalable deployment workflows
- clean integration with CMS-driven content

### Benefits For This Project
- supports static generation for fast marketing pages
- supports dynamic routes for case studies, blogs, and landing pages
- supports API routes when lightweight backend logic is needed
- works well with Vercel for previews and production deployments

### Recommendation
Use the **App Router** unless there is a strong reason to stay on the older Pages Router.

---

## 2. React

### Why React
React provides a flexible component model that works well for reusable marketing sections and future expansion.

### Benefits For This Project
- reusable section and block architecture
- easy long-term maintenance
- strong ecosystem
- straightforward integration with modern frontend tooling

---

## 3. TypeScript

### Why TypeScript
TypeScript reduces avoidable errors and improves maintainability, especially once content models, forms, and CMS integrations are added.

### Benefits For This Project
- typed content models
- safer API handling
- better editor support
- easier scaling as the site grows

### Recommendation
Use TypeScript across the entire app, including:
- page props
- CMS content shapes
- utility functions
- API routes
- form schemas

---

## 4. Tailwind CSS

### Why Tailwind CSS
Tailwind is a practical fit for a marketing site because it enables rapid implementation, consistent spacing/layout rules, and scalable component styling.

### Benefits For This Project
- fast implementation
- consistent utility-driven styling
- strong fit for componentized UI
- easy maintenance in small-team workflows

### Note
Tailwind should follow the separate design documentation and token system where applicable.

---

## Content Layer

## Recommendation: Headless CMS

A structured CMS is recommended if Chromapages wants easy updates for:

- service pages
- case studies
- FAQs
- testimonials
- blog content
- landing pages
- reusable global content blocks

### Recommended CMS Option
**Sanity** is a strong fit because it offers:
- flexible schemas
- real-time content editing
- strong support for structured content
- good developer experience
- reliable Next.js integration

### Alternative CMS Options
- Contentful
- Strapi
- Directus
- Hygraph

### If CMS Is Deferred
For phase one, the site can launch with local structured content such as:
- Markdown / MDX
- JSON
- TypeScript content objects

This is acceptable if content volume is low and edits are infrequent.

---

## Hosting And Deployment

## Primary Recommendation: Vercel

### Why Vercel
Vercel is the strongest hosting fit for a Next.js marketing website because it provides:
- seamless deployment workflow
- preview deployments for every branch
- simple environment variable management
- CDN-backed delivery
- good performance defaults

### Benefits For This Project
- easier QA through preview URLs
- low-friction deployment flow
- strong support for marketing-site performance

## Alternative: Hostinger

Hostinger is acceptable if the project needs:
- consolidated hosting under an existing account
- lower-cost simple deployment
- static or low-complexity hosting patterns

### Tradeoff
Hostinger is workable, but Vercel is generally the cleaner operational fit for a Next.js-first workflow.

---

## Recommended Libraries

## Core Utilities
- **Zod** — schema validation for forms, API payloads, and content parsing
- **React Hook Form** — form state management
- **clsx** or **classnames** — conditional class handling
- **date-fns** — date formatting when needed for blog/case study content
- **next-seo** or native metadata handling — structured page metadata

## CMS / Data Layer
If using Sanity:
- `next-sanity`
- `sanity`
- `groq`

## Analytics / Tracking
- native GA4 event hooks or helper utilities
- optional lightweight analytics abstraction utility for cleaner tracking calls

## Quality / Tooling
- **ESLint**
- **Prettier**
- optional **Husky** + lint-staged for pre-commit checks

---

## Forms And Lead Capture

## Option A: Managed Form Provider
Use a simple external form backend if speed matters most.

### Best For
- fast MVP launch
- minimal custom backend logic
- low maintenance

## Option B: Next.js API Route Form Handling
Use custom API routes if more control is needed.

### Best For
- custom validation
- CRM/webhook forwarding
- lead routing
- spam protection logic
- future integrations

### Recommendation
Start simple, but use a form architecture that can later support:
- webhook forwarding
- email notifications
- CRM integration
- analytics event consistency

---

## Booking Integration

### Recommended Approach
Use an external booking system for scheduling.

### Why
Scheduling systems are not worth rebuilding inside a marketing site. The website only needs to:
- route qualified leads into booking
- optionally embed a scheduler
- track booking-completion events where possible

---

## SEO And Metadata

### Requirements
The stack should support:
- page-level metadata
- open graph data
- canonical tags
- robots directives
- sitemap generation
- schema markup

### Recommendation
Keep SEO logic centralized and reusable.

Use:
- shared metadata utilities
- shared schema helpers
- clean route-based SEO configuration

---

## Performance Strategy

The stack should support:
- static rendering where possible
- optimized images
- minimal client-side JavaScript where unnecessary
- lazy-loading for non-critical components
- good caching defaults

### Recommendation
Prefer server-rendered or statically generated content for most marketing pages.

---

## Security And Reliability

### Baseline Needs
- secure environment variable handling
- spam protection on forms
- dependency hygiene
- HTTPS in production
- input validation on API routes

### Recommendation
Keep the technical surface area small. For a marketing site, reliability comes more from simplicity than from adding layers of infrastructure.

---

## Recommended Folder Structure

```txt
/app
  /(marketing)
  /api
/components
/content
/lib
  /analytics
  /cms
  /seo
  /validation
/types
/public
/styles
```

---

## Environment Variables
Typical environment variables may include:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
CMS_PROJECT_ID=
CMS_DATASET=
CMS_API_TOKEN=
FORM_WEBHOOK_URL=
BOOKING_URL=
```

---

## Final Recommendation

### Best-Fit Stack For Launch
- Next.js
- React
- TypeScript
- Tailwind CSS
- Sanity (if editable structured content is needed immediately)
- Vercel
- GA4
- React Hook Form + Zod
- simple booking integration

### Philosophy
Use the simplest modern stack that:
- launches fast
- stays maintainable
- supports future content growth
- does not trap the project in unnecessary custom infrastructure
