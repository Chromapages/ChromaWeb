# Redirects

## Purpose
This document maps old URLs to new URLs when replacing an existing site or changing slug structures.

If there is no previous site or no URL changes, this doc can remain minimal. If there is a redesign or migration, this doc becomes important for SEO and link preservation.

---

## 1. Redirect Rules

### Use Cases
Add redirects when:
- replacing an old site
- changing slug structure
- renaming service pages
- removing a published page
- consolidating duplicate pages

### Principles
- keep users and search engines on valid paths
- preserve relevant SEO value
- avoid chains when possible
- point old URLs to the closest relevant new URL

---

## 2. Redirect Types

### 301 Redirect
Use for permanent URL changes.

### 302 Redirect
Use only for temporary situations.

### Recommendation
For site migrations and renamed pages, default to **301**.

---

## 3. Redirect Mapping Table

| Old URL | New URL | Type | Status | Notes |
|---|---|---|---|---|
| `/old-home` | `/` | 301 | Placeholder | Replace if needed |
| `/services/web-design` | `/services/marketing-websites` | 301 | Placeholder | Example only |
| `/portfolio` | `/work` | 301 | Placeholder | Example only |
| `/contact-us` | `/contact` | 301 | Placeholder | Example only |

---

## 4. Known Redirect Candidates

Use this section once the old site structure is reviewed.

| Candidate URL | Reason | Action Needed |
|---|---|---|
| TBD | Existing live URL review not completed | Audit old site |
| TBD | Existing live URL review not completed | Audit old site |

---

## 5. Redirect Review Process

When changing a live URL:
1. add old/new mapping here
2. implement redirect in app/platform config
3. update internal links
4. verify canonical URL on destination
5. check for chains or loops

---

## 6. Validation Checklist

- [ ] old URL resolves to correct new page
- [ ] redirect type is correct
- [ ] no loops
- [ ] no redirect chains where avoidable
- [ ] destination page is relevant
- [ ] internal links updated
- [ ] sitemap reflects only new URLs

---

## 7. Recommendation

Before launch, audit any existing live URLs and complete this document properly. Do not guess. Bad redirect work creates avoidable SEO and user-experience problems.
