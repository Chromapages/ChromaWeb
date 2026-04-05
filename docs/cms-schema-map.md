# CMS Schema Map

## Purpose
This document translates the high-level data models into practical CMS implementation guidance. It defines exact document names, suggested field names, field types, validation rules, and reference relationships.

This is the builder-facing blueprint for implementing the content model inside a CMS such as Sanity.

---

## 1. Recommended CMS Collections / Document Types

### Global Documents
- `siteSettings`
- `navigation`
- `footer`
- `seoDefaults`

### Content Documents
- `page`
- `service`
- `caseStudy`
- `faqItem`
- `testimonial`
- `ctaBlock`

### Future Documents
- `landingPage`
- `industryPage`
- `blogPost`
- `resource`

### Optional Operational Documents
- `formConfig`

---

## 2. `siteSettings`

### Purpose
Global site configuration.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `siteName` | string | Yes | required |
| `siteUrl` | url | Yes | required |
| `tagline` | string | No | max length recommended |
| `defaultTitle` | string | Yes | required |
| `defaultDescription` | text | Yes | required |
| `defaultOgImage` | image | No | optional |
| `contactEmail` | string/email | No | email format |
| `bookingUrl` | url | No | valid URL |
| `phone` | string | No | optional |
| `socialLinks` | array of objects | No | optional |

---

## 3. `navigation`

### Purpose
Header navigation configuration.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `items` | array | Yes | minimum 1 |
| `items[].label` | string | Yes | required |
| `items[].href` | string | Yes | required |
| `items[].order` | number | Yes | required |
| `items[].isPrimaryCta` | boolean | No | default false |

---

## 4. `footer`

### Purpose
Footer groups and legal/support links.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `sections` | array | Yes | optional but recommended |
| `sections[].title` | string | Yes | required |
| `sections[].links` | array | Yes | minimum 1 |
| `sections[].links[].label` | string | Yes | required |
| `sections[].links[].href` | string | Yes | required |
| `legalLinks` | array | No | optional |
| `contactBlurb` | text | No | optional |

---

## 5. `page`

### Purpose
General static pages such as Home, About, Process, Pricing, Contact.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | Yes | required |
| `slug` | slug | Yes | unique |
| `pageType` | string | Yes | enum recommended |
| `seoTitle` | string | No | optional |
| `seoDescription` | text | No | optional |
| `hero` | object | No | structured |
| `sections` | array | No | modular blocks |
| `published` | boolean | Yes | default false |

### Recommended `pageType` Values
- `home`
- `about`
- `process`
- `pricing`
- `contact`
- `thank-you`
- `privacy-policy`
- `faq`

---

## 6. `service`

### Purpose
Service detail pages and reusable service entries.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | Yes | required |
| `slug` | slug | Yes | unique |
| `summary` | text | Yes | required |
| `promise` | string | No | optional |
| `audienceFit` | array of strings | No | optional |
| `outcomes` | array of strings | No | optional |
| `includedItems` | array of strings | No | optional |
| `faqRefs` | array of references | No | reference `faqItem` |
| `featuredCaseStudyRefs` | array of references | No | reference `caseStudy` |
| `seoTitle` | string | No | optional |
| `seoDescription` | text | No | optional |
| `published` | boolean | Yes | default false |

### Slug Base
`/services/[slug]`

---

## 7. `caseStudy`

### Purpose
Project proof entries.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | Yes | required |
| `slug` | slug | Yes | unique |
| `clientName` | string | No | optional |
| `industry` | string | No | optional |
| `serviceTypes` | array of strings | No | optional |
| `summary` | text | Yes | required |
| `problem` | rich text | No | optional |
| `approach` | rich text | No | optional |
| `build` | rich text | No | optional |
| `results` | rich text | No | optional |
| `featuredImage` | image | No | optional |
| `resultMetrics` | array of objects | No | optional |
| `testimonialRef` | reference | No | reference `testimonial` |
| `published` | boolean | Yes | default false |

### Slug Base
`/work/[slug]`

---

## 8. `faqItem`

### Purpose
Reusable FAQ entries.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `question` | string | Yes | required |
| `answer` | rich text | Yes | required |
| `category` | string | No | optional |
| `published` | boolean | Yes | default false |

### Suggested Categories
- `services`
- `pricing`
- `process`
- `contact`
- `general`

---

## 9. `testimonial`

### Purpose
Reusable testimonial content.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `name` | string | Yes | required |
| `role` | string | No | optional |
| `company` | string | No | optional |
| `quote` | text | Yes | required |
| `relatedService` | reference | No | reference `service` |
| `published` | boolean | Yes | default false |

---

## 10. `ctaBlock`

### Purpose
Reusable CTA section entries.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | Yes | required |
| `body` | text | No | optional |
| `primaryLabel` | string | Yes | required |
| `primaryHref` | string | Yes | required |
| `secondaryLabel` | string | No | optional |
| `secondaryHref` | string | No | optional |

---

## 11. `landingPage` (Future)

### Purpose
Campaign-specific or offer-specific pages.

### Suggested Fields
| Field Name | Type | Required | Validation |
|---|---|---:|---|
| `title` | string | Yes | required |
| `slug` | slug | Yes | unique |
| `offerName` | string | No | optional |
| `audience` | string | No | optional |
| `hero` | object | No | structured |
| `sections` | array | No | modular |
| `seoTitle` | string | No | optional |
| `seoDescription` | text | No | optional |
| `published` | boolean | Yes | default false |

---

## 12. Shared Object Types

### `heroObject`
| Field Name | Type | Required |
|---|---|---:|
| `headline` | string | Yes |
| `subheadline` | text | No |
| `primaryCtaLabel` | string | No |
| `primaryCtaHref` | string | No |
| `secondaryCtaLabel` | string | No |
| `secondaryCtaHref` | string | No |

### `metricObject`
| Field Name | Type | Required |
|---|---|---:|
| `label` | string | Yes |
| `value` | string | Yes |
| `context` | string | No |

### `linkObject`
| Field Name | Type | Required |
|---|---|---:|
| `label` | string | Yes |
| `href` | string | Yes |

---

## 13. Validation Rules

### Recommended Global Rules
- all slugs unique within document type
- publish toggle required
- SEO title/description optional but recommended
- required fields enforced strongly on core content
- references should only point to published content in production queries where applicable

### Required Slug Logic
- generate from title
- allow manual override
- prevent invalid characters
- use kebab-case

---

## 14. Preview Configuration Notes

For CMS studio previews, configure:
- title = main title field
- subtitle = slug or category
- media = featured image if available

Examples:
- Service preview: title + slug
- Case study preview: title + industry
- FAQ preview: question + category

---

## 15. Recommendation

For launch, implement only:
- siteSettings
- navigation
- footer
- page
- service
- caseStudy
- faqItem
- testimonial
- ctaBlock

Do not over-model the CMS before real content volume requires it.
