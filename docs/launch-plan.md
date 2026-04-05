# Launch Plan

## Purpose
This document defines the practical launch sequence for the Chromapages marketing website.

`deployment.md` covers infrastructure. This document covers execution.

---

## 1. Launch Objective

Launch the site cleanly with:
- working pages
- working conversion flows
- working analytics
- correct domain behavior
- minimal downtime or confusion
- a clear rollback option

---

## 2. Roles

| Role | Responsibility |
|---|---|
| Owner | final approval, content sign-off, launch go/no-go |
| Builder / Dev | deploy, technical validation, fixes |
| Content Owner | final copy and metadata validation |
| QA Owner | final checklist completion |

For a solo build, one person may hold all roles, but the responsibilities still need to be covered.

---

## 3. Pre-Launch Checklist

### Content
- [ ] homepage copy approved
- [ ] core pages approved
- [ ] work summaries approved
- [ ] service content approved
- [ ] contact form copy approved
- [ ] legal page(s) present

### Technical
- [ ] production environment variables set
- [ ] domain connected
- [ ] canonical host decision made
- [ ] forms point to live services
- [ ] analytics IDs set
- [ ] scheduler link set
- [ ] CMS production data configured if applicable

### QA
- [ ] QA checklist completed
- [ ] primary CTA paths tested
- [ ] contact form tested
- [ ] thank-you flow tested
- [ ] mobile pass completed
- [ ] metadata validated

---

## 4. Launch Sequence

### Step 1: Final Preview Review
- verify the final preview build
- confirm content, links, and conversion paths
- confirm no blockers remain

### Step 2: Production Deployment
- merge approved code/content to production branch
- trigger production deployment
- confirm deployment success

### Step 3: Domain Validation
- verify production domain resolves correctly
- verify www/apex redirect behavior
- verify HTTPS and canonical host behavior

### Step 4: Conversion Path Validation
- test Book A Call CTA
- test Contact page
- test contact form success
- test thank-you page
- test booking link

### Step 5: Analytics Validation
- confirm page view tracking
- confirm CTA event tracking
- confirm form tracking
- confirm conversion events register

### Step 6: Post-Launch Smoke Test
- load key pages on production
- verify nav/footer
- verify metadata/social share tags
- verify no obvious errors

---

## 5. Day-Of Launch Checklist

- [ ] production deploy completed
- [ ] homepage loads
- [ ] Services page loads
- [ ] Work page loads
- [ ] Contact page loads
- [ ] Book A Call CTA works
- [ ] Contact form works
- [ ] Thank-you page works
- [ ] analytics receiving data
- [ ] no major console/runtime errors
- [ ] legal page accessible

---

## 6. Post-Launch Monitoring

### First 24 Hours
- monitor form submissions
- monitor booking clicks
- monitor traffic behavior
- watch for broken links or asset issues
- check if users report issues

### First 7 Days
- review top entry pages
- review CTA click behavior
- validate conversion tracking accuracy
- note any confusing content areas
- collect first round of optimization ideas

---

## 7. Rollback Plan

If a launch issue is severe:
1. identify impact
2. decide if hotfix or rollback is faster
3. revert to last known good deployment if needed
4. confirm site functionality restored
5. document issue in changelog or internal notes

### Rollback Triggers
- broken homepage
- broken contact form
- broken nav
- analytics or domain issues that affect core business outcomes
- severe mobile failure

---

## 8. Immediate Post-Launch Tasks

- submit or verify sitemap if applicable
- confirm GA4 conversions
- confirm GTM publish state
- spot-check key pages from live search/social previews
- add launch entry to CHANGELOG
- log follow-up improvements

---

## 9. Launch Decision Rule

Do not delay launch over polish items that do not affect:
- credibility
- conversion
- accuracy
- usability

Do delay launch for:
- broken forms
- broken navigation
- missing critical content
- domain/canonical mistakes
- major mobile issues

---

## 10. Recommendation

Treat launch like a controlled release, not a dramatic event. The site does not need to be perfect. It does need to be trustworthy, functional, and measurable on day one.
