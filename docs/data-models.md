# Data Models

## Purpose
This document defines the content schemas and data structures needed for the Chromapages marketing website.

The focus is on **content models**, not large application database design. This is a marketing site, so the primary data layer should support:
- structured page content
- reusable service and case study entries
- testimonials and FAQs
- optional lead capture storage if needed

If a CMS is used, these models should be implemented as CMS schemas. If local content is used, the same shapes should be mirrored in TypeScript types or JSON/MDX frontmatter.

---

## Modeling Principles

### 1. Keep Content Structured
Do not bury important page data inside giant rich text blobs if it needs to be reused elsewhere.

### 2. Reuse Shared Content
Testimonials, FAQs, service summaries, and CTAs should be reusable where practical.

### 3. Support Growth
The model should support:
- launch pages
- future service pages
- case studies
- future blog content
- future landing pages
- future industry pages

### 4. Separate Global Content From Page Content
Site settings, nav/footer items, and default SEO should not live inside individual page entries.

---

## Recommended Content Types

### Global Types
- Site Settings
- Navigation
- Footer
- SEO Defaults
- CTA Block

### Core Content Types
- Page
- Service
- Case Study
- FAQ Item
- Testimonial

### Future Content Types
- Blog Post
- Industry Page
- Landing Page
- Resource / Lead Magnet

### Optional Operational Types
- Lead Submission
- Form Configuration

---

# 1. Site Settings

## Purpose
Stores global site-wide settings.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `siteName` | string | Yes | Example: Chromapages |
| `siteUrl` | string | Yes | Canonical base URL |
| `tagline` | string | No | Brand tagline |
| `defaultTitle` | string | Yes | SEO fallback |
| `defaultDescription` | string | Yes | SEO fallback |
| `defaultOgImage` | image/url | No | Default social image |
| `contactEmail` | string | No | Public contact email |
| `bookingUrl` | string | No | External scheduler link |
| `phone` | string | No | Optional |
| `socialLinks` | array | No | Social profiles |

### Example Shape
```json
{
  "siteName": "Chromapages",
  "siteUrl": "https://chromapages.com",
  "tagline": "Digital Design Elevated.",
  "defaultTitle": "Chromapages",
  "defaultDescription": "Modern websites and web apps that help businesses get more customers.",
  "bookingUrl": "https://example.com/book"
}
```

---

# 2. Navigation

## Purpose
Defines header navigation items.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `label` | string | Yes | Nav text |
| `href` | string | Yes | Relative or absolute link |
| `order` | number | Yes | Sort order |
| `isPrimaryCta` | boolean | No | Marks CTA item |

### Example Shape
```json
[
  { "label": "Services", "href": "/services", "order": 1 },
  { "label": "Work", "href": "/work", "order": 2 },
  { "label": "Process", "href": "/process", "order": 3 },
  { "label": "Pricing", "href": "/pricing", "order": 4 },
  { "label": "About", "href": "/about", "order": 5 },
  { "label": "Contact", "href": "/contact", "order": 6 },
  { "label": "Book A Call", "href": "/contact", "order": 7, "isPrimaryCta": true }
]
```

---

# 3. Footer

## Purpose
Stores footer groups and legal/support links.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `sections` | array | Yes | Footer link groups |
| `legalLinks` | array | No | Privacy, terms, etc. |
| `contactBlurb` | string | No | Short footer summary |

---

# 4. Page

## Purpose
Represents general-purpose site pages such as Home, About, Process, Pricing, Contact, and future landing pages if not modeled separately.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | Internal/content title |
| `slug` | string | Yes | URL slug |
| `pageType` | string | Yes | Example: `home`, `about`, `pricing` |
| `seoTitle` | string | No | Optional override |
| `seoDescription` | string | No | Optional override |
| `hero` | object | No | Structured hero content |
| `sections` | array | No | Modular page sections |
| `published` | boolean | Yes | Publish state |
| `updatedAt` | datetime | No | Audit field |

### Example Shape
```json
{
  "title": "About",
  "slug": "about",
  "pageType": "about",
  "seoTitle": "About Chromapages",
  "seoDescription": "Learn what Chromapages does and who it helps.",
  "published": true
}
```

---

# 5. Service

## Purpose
Defines a service detail page and its reusable summary data.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | Service name |
| `slug` | string | Yes | URL slug |
| `summary` | string | Yes | Short summary |
| `promise` | string | No | One-line promise |
| `audienceFit` | array[string] | No | Who it is for |
| `outcomes` | array[string] | No | Benefits/outcomes |
| `includedItems` | array[string] | No | Scope summary |
| `faqRefs` | references | No | Related FAQs |
| `featuredCaseStudyRefs` | references | No | Related proof |
| `seoTitle` | string | No | SEO override |
| `seoDescription` | string | No | SEO override |
| `published` | boolean | Yes | Publish state |

### Example Shape
```json
{
  "title": "Landing Pages",
  "slug": "landing-pages",
  "summary": "High-conversion pages for campaigns, offers, and growth.",
  "promise": "Launch pages that turn traffic into action.",
  "outcomes": [
    "Support paid campaigns",
    "Improve conversion clarity",
    "Ship faster without rebuilding the whole site"
  ],
  "published": true
}
```

---

# 6. Case Study

## Purpose
Stores project proof content for the Work hub and individual case study pages.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | Project title |
| `slug` | string | Yes | URL slug |
| `clientName` | string | No | Optional public client name |
| `industry` | string | No | Industry/category |
| `serviceTypes` | array[string] | No | Related service tags |
| `summary` | string | Yes | Short overview |
| `problem` | rich text/string | No | Problem statement |
| `approach` | rich text/string | No | Strategic approach |
| `build` | rich text/string | No | Execution summary |
| `results` | rich text/string | No | Outcomes |
| `featuredImage` | image/url | No | Card/hero image |
| `resultMetrics` | array[object] | No | Quant or qual results |
| `testimonialRef` | reference | No | Optional linked testimonial |
| `published` | boolean | Yes | Publish state |

### Example Shape
```json
{
  "title": "HVAC Lead Generation Website",
  "slug": "hvac-lead-generation-website",
  "industry": "Home Services",
  "summary": "A conversion-focused website built to drive more qualified local leads.",
  "serviceTypes": ["Marketing Website", "Landing Pages"],
  "published": true
}
```

---

# 7. FAQ Item

## Purpose
Reusable FAQ entries for pages, services, and pricing sections.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `question` | string | Yes | FAQ question |
| `answer` | rich text/string | Yes | FAQ answer |
| `category` | string | No | Example: `pricing`, `services`, `process` |
| `published` | boolean | Yes | Publish state |

### Example Shape
```json
{
  "question": "How long does a typical project take?",
  "answer": "Timelines vary by scope, but most marketing site builds fall into a defined production window.",
  "category": "process",
  "published": true
}
```

---

# 8. Testimonial

## Purpose
Reusable trust content that can appear across multiple pages.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `name` | string | Yes | Person name |
| `role` | string | No | Job title |
| `company` | string | No | Company name |
| `quote` | text | Yes | Testimonial content |
| `relatedService` | reference | No | Optional service link |
| `published` | boolean | Yes | Publish state |

---

# 9. CTA Block

## Purpose
Reusable CTA content for final CTA sections or in-page conversion blocks.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | CTA headline |
| `body` | string | No | Support text |
| `primaryLabel` | string | Yes | Button label |
| `primaryHref` | string | Yes | Button destination |
| `secondaryLabel` | string | No | Optional |
| `secondaryHref` | string | No | Optional |

---

# 10. Landing Page

## Purpose
Stores future campaign-specific or offer-specific landing pages.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | Page title |
| `slug` | string | Yes | URL slug under `/lp/` or `/offers/` |
| `offerName` | string | No | Offer or campaign name |
| `audience` | string | No | Target segment |
| `hero` | object | No | Structured hero content |
| `sections` | array | No | Modular sections |
| `seoTitle` | string | No | SEO override |
| `seoDescription` | string | No | SEO override |
| `published` | boolean | Yes | Publish state |

---

# 11. Blog Post (Future)

## Purpose
Supports future SEO content.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `title` | string | Yes | Article title |
| `slug` | string | Yes | URL slug |
| `excerpt` | string | No | Summary |
| `body` | rich text/markdown | Yes | Main content |
| `author` | string | No | Author name |
| `publishedAt` | datetime | No | Publish date |
| `seoTitle` | string | No | SEO override |
| `seoDescription` | string | No | SEO override |
| `published` | boolean | Yes | Publish state |

---

# 12. Lead Submission (Optional)

## Purpose
Stores inbound lead data if the project chooses to persist submissions internally instead of only forwarding them externally.

## Fields
| Field | Type | Required | Notes |
|---|---|---:|---|
| `name` | string | Yes | Lead name |
| `email` | string | Yes | Lead email |
| `company` | string | No | Company |
| `website` | string | No | Existing site |
| `projectType` | string | Yes | Requested service |
| `budgetRange` | string | No | Qualification data |
| `timeline` | string | No | Qualification data |
| `message` | text | Yes | Inquiry details |
| `source` | string | No | Attribution source |
| `createdAt` | datetime | Yes | Submission timestamp |
| `status` | string | No | Optional lead status |

### Example SQL Table
```sql
CREATE TABLE lead_submissions (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  website TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## Shared Objects

### Hero Object
Reusable content shape for hero sections.

| Field | Type | Required |
|---|---|---:|
| `headline` | string | Yes |
| `subheadline` | string | No |
| `primaryCtaLabel` | string | No |
| `primaryCtaHref` | string | No |
| `secondaryCtaLabel` | string | No |
| `secondaryCtaHref` | string | No |

### Metric Object
Reusable result item for case studies.

| Field | Type | Required |
|---|---|---:|
| `label` | string | Yes |
| `value` | string | Yes |
| `context` | string | No |

### Link Object
Reusable link structure.

| Field | Type | Required |
|---|---|---:|
| `label` | string | Yes |
| `href` | string | Yes |

---

## TypeScript Interface Examples

```ts
export interface Service {
  title: string
  slug: string
  summary: string
  promise?: string
  audienceFit?: string[]
  outcomes?: string[]
  includedItems?: string[]
  seoTitle?: string
  seoDescription?: string
  published: boolean
}
```

```ts
export interface CaseStudy {
  title: string
  slug: string
  clientName?: string
  industry?: string
  serviceTypes?: string[]
  summary: string
  problem?: string
  approach?: string
  build?: string
  results?: string
  published: boolean
}
```

---

## Final Recommendation

For launch, the minimum useful models are:

- Site Settings
- Navigation
- Footer
- Page
- Service
- Case Study
- FAQ Item
- Testimonial
- CTA Block

Only add Lead Submission storage if there is a clear operational need. For most early-stage marketing sites, content modeling matters far more than building a database.
