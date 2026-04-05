# Sitemap

## Purpose
This document defines the full page hierarchy, proposed URL structure, and strategic priority for the Chromapages marketing website.

The goal is to make the website scalable from day one while keeping the initial launch focused on the pages that matter most for conversion, credibility, and future growth.

---

## Sitemap Overview

### Primary Navigation Pages
These pages are the main public-facing pages of the site.

| Page | URL | Priority | Notes |
|---|---|---:|---|
| Home | `/` | High | Primary conversion and brand narrative page |
| Services | `/services` | High | Top-level services overview |
| Work / Case Studies | `/work` | High | Proof and portfolio hub |
| Process | `/process` | High | Explains how Chromapages works |
| Pricing | `/pricing` | High | Frames investment and fit |
| About | `/about` | Medium | Brand credibility and founder/studio story |
| Contact | `/contact` | High | Lead capture and direct inquiry page |

---

## Core Conversion and Utility Pages

| Page | URL | Priority | Notes |
|---|---|---:|---|
| Thank You | `/thank-you` | High | Post-form submission or post-booking destination |
| Privacy Policy | `/privacy-policy` | High | Required legal/support page |
| Terms | `/terms` | Low | Optional for launch, recommended later |
| FAQ | `/faq` | Medium | Can exist as standalone page or remain sectional at first |

---

## Service Detail Pages
These pages help expand SEO coverage, improve relevance for visitors, and support future campaign traffic.

| Page | URL | Priority | Notes |
|---|---|---:|---|
| Services Overview | `/services` | High | Parent service hub |
| Marketing Websites | `/services/marketing-websites` | High | Core offer page |
| Landing Pages | `/services/landing-pages` | High | Important for ads and quick-win offers |
| E-Commerce | `/services/ecommerce` | Medium | Important if actively sold |
| Web Apps / MVPs | `/services/web-apps` | Medium | Important for product-facing leads |
| Ongoing Support | `/services/ongoing-support` | Medium | Supports retainer positioning |

---

## Work / Case Study Pages
These pages showcase proof and can support both trust-building and future SEO.

| Page | URL Pattern | Priority | Notes |
|---|---|---:|---|
| Work Overview | `/work` | High | Case study hub |
| Individual Case Study | `/work/[slug]` | Medium | One page per selected project |

### Example Case Study URLs
- `/work/chromapages-project-name`
- `/work/client-name-redesign`
- `/work/industry-landing-page-build`

Slug structure should stay short, readable, and project-specific.

---

## Future Growth Pages
These are not required for phase one but should be accounted for in the site architecture.

### Vertical / Industry Pages
| Page Type | URL Pattern | Priority | Notes |
|---|---|---:|---|
| Industry Overview | `/industries` | Low | Optional hub later |
| Individual Industry Page | `/industries/[slug]` | Medium | Useful for niche positioning and SEO |

### Landing Pages / Campaign Pages
| Page Type | URL Pattern | Priority | Notes |
|---|---|---:|---|
| Offer Landing Page | `/lp/[slug]` | Medium | Paid traffic, lead magnets, or specific campaigns |
| Audit Offer Page | `/offers/[slug]` | Medium | Productized offer or entry-point service |
| Lead Magnet Page | `/resources/[slug]` | Low | Useful for email capture later |

### Content / SEO Pages
| Page Type | URL Pattern | Priority | Notes |
|---|---|---:|---|
| Blog Hub | `/blog` | Low | Future SEO growth |
| Blog Article | `/blog/[slug]` | Low | Not required for launch |
| Resource Hub | `/resources` | Low | Optional later |

---

## Page Hierarchy

```txt
/
├── /services
│   ├── /services/marketing-websites
│   ├── /services/landing-pages
│   ├── /services/ecommerce
│   ├── /services/web-apps
│   └── /services/ongoing-support
├── /work
│   └── /work/[slug]
├── /process
├── /pricing
├── /about
├── /contact
├── /thank-you
├── /privacy-policy
├── /terms
├── /faq
├── /industries
│   └── /industries/[slug]
├── /offers/[slug]
├── /lp/[slug]
├── /resources
│   └── /resources/[slug]
└── /blog
    └── /blog/[slug]
```

---

## Launch Priority Summary

### High Priority
These should be built in the initial launch phase.

- `/`
- `/services`
- `/work`
- `/process`
- `/pricing`
- `/contact`
- `/thank-you`
- `/privacy-policy`
- `/services/marketing-websites`
- `/services/landing-pages`

### Medium Priority
These should be built soon after launch or included if capacity allows.

- `/about`
- `/faq`
- `/services/ecommerce`
- `/services/web-apps`
- `/services/ongoing-support`
- `/work/[slug]`
- `/offers/[slug]`
- `/lp/[slug]`

### Low Priority
These are future-growth pages.

- `/terms`
- `/industries`
- `/industries/[slug]`
- `/resources`
- `/resources/[slug]`
- `/blog`
- `/blog/[slug]`

---

## URL Structure Rules

### General Rules
- use short, readable slugs
- avoid unnecessary nesting
- keep naming consistent
- avoid dated URLs unless content is explicitly time-based
- prefer descriptive service and content slugs over vague labels

### Examples
Good:
- `/services/landing-pages`
- `/work/hvac-lead-gen-site`
- `/offers/website-audit`

Avoid:
- `/page1`
- `/services/service-a`
- `/our-work-project-2026-final`

---

## Navigation Logic

### Header Navigation
Recommended primary header links:
- Services
- Work
- Process
- Pricing
- About
- Contact

Primary CTA:
- Book A Call

### Footer Navigation
Footer can carry broader coverage:
- core pages
- service links
- legal pages
- contact info
- social links if applicable

---

## Architecture Notes
- The site should be structured to support expansion without requiring a re-architecture later.
- Service detail pages and case study pages should use reusable content models.
- Landing pages should live outside the main navigation when campaign-specific.
- Content hubs like blog, resources, and industries should be supported structurally even if not launched immediately.

## Recommendation
For launch, keep the architecture lean but future-proof. Do not overbuild every future section up front. Build the routes and content model logic in a way that allows the site to grow cleanly over time.
