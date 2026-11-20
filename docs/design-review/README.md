# SPECIFYING — Homepage and contact design proposal

Updated 2026-10-24 · Marcus Voss · **Design proposal complete within the available sources; visual verification unavailable.**

The proposal keeps the existing routes and inquiry journey. It gives the homepage a clear service-business message, uses the five operating standards as principles rather than customer evidence, and makes the contact form the contact page's primary task. One coherent direction is appropriate for this bounded reconciliation; no new architecture or service category is proposed.

## Files and inspection

- [Homepage](home-study.html): desktop/mobile composition, honest empty-work state and numbered design notes.
- [Contact](contact-study.html): desktop/mobile composition, native request-type choices, editable preview fields and separate state plates.
- [Shared stylesheet](study.css): the approved visual values and responsive rules used by both studies.
- Local Latin font copies in `fonts/` make the English studies independent of installed fonts and the generated build directory. They reuse the existing next/font output: Montserrat from `.next/static/media/e8f2fbee2754df70-s.p.0fzkl03jw-sdz.woff2` and Inter from `.next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2`, identified in the generated CSS. No font package, remote request or application font change was added.

Only `docs/design-review/` was edited. Existing uncommitted application work was read and preserved. No application code, offer, CMS record or strategy source was changed. No request is sent by these studies. Route links such as `/contact` represent the current application's destinations; the review links at the top open the companion HTML studies.

This document replaces the earlier approval/handoff package. It records design decisions directly and makes no request for Sloane approval.

## Source authority and Unknowns

| Source | Use and limit |
|---|---|
| Current owner instruction | Growth-minded service businesses; mismatch between business quality and website quality; premium quality through a controlled, launch-safe engagement. Governs this proposal. |
| [Precision Chroma core visual identity v1.0](https://docs.google.com/document/d/1xB-TDi8rH7eyBK3S-utl7N7U51kzGaOGErgbUULvRMg/edit) | Readable locked core source accessed through Drive; §§3–8, 10–11, 13–17 cited below. |
| Shared Team Charter | **Unknown.** No relevant accessible source located in the repository or targeted connected Drive search. Prior owner said it was not yet made. Work continues without inventing charter rules. |
| Exact Website Rescue Sprint terms | **Unknown.** No exact approved source located. No scope, price, duration, deliverable, substitute offer or contractual commitment appears in the studies. |
| [Earlier Umbrella Lock](https://drive.google.com/file/d/1VvA9BIGx7iJHvx4IzXmev5-Qy9cTTxZW/view) | Read; systems-first parent studio and vertical-routing language conflicts with the current service-business direction. Conflict remains recorded; neither source is modified or blended into a new architecture. |
| [Current copy review](../copy-review.md), §§4–5, 7, 9–10 | Source of the proposed headline, body, need statements, empty-work message and functional wording. Explicitly a review package, **not final publication approval**. No prior performance claims are carried into the new studies. |
| [Current repair status](../repair-handoff.md) and current application source | Implementation observations only. Its reported tests/HTTP results are not this design pass's verification. |
| Photography, proof evidence/rights and full Aperture specification | **Unknown.** Core identity §18 leaves these separate systems outside its scope. No new system is declared locked. |
| Contact operations | Monitored email, follow-up procedure and publishable response expectation remain **Unknown**. The existing address is retained as a source value; no SLA, promised email reply or guaranteed call is added. |

The exact operating standard is preserved: **Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving.** These are the operating principles from the owner, not claims of measured performance.

CTA wording remains a later copy decision. The proposal uses the copy review's **“Send an inquiry” → /contact** for navigation and **“Send inquiry”** for the prospect form action. Both describe an inquiry. Neither books a call; no scheduler is designed.

## Current evidence — re-read on 2026-10-24

**Code observation** describes source. **Inference** describes a likely consequence. **Rendered observation** requires an actual browser capture. There are **no rendered observations** in this pass.

| Current code observation | Design consequence / purpose |
|---|---|
| Home now supplies CMS cases to Hero and FeaturedWork; list/detail share the approved/populated-record predicate (`app/(marketing)/page.tsx:16–23`, `lib/sanity/queries.ts:41–55`) | Earlier static-work fallback finding is repaired in source. Preserve this shared data path; no invented project cards. A publication flag does not independently establish rights or client authenticity. |
| FeaturedWork omits itself when empty and renders each action persistently (`featured-work.tsx:11,54–57`) | Earlier hover-only-link finding is repaired. Keep visible actions in the populated design and specify empty proof deliberately. |
| RequestForm catches failures, validates acceptance before receipt/reset and retains entries on failure (`request-form.tsx:70–115`) | Earlier transport/false-success gap has source repairs. Keep them; finish the presentation, associations, pending policy and focus behavior. |
| Receipt has role=status; errors role=alert; tabs have focus-visible styling (`request-form.tsx:136,154,172,203,329`) | Recognize existing work. Remaining issues: all tabs are tabIndex0, only Enter/Space handling, field-error associations and receipt focus. |
| Hero uses GSAP no-preference media matching and cleanup; ScrollReveal has reduced-motion/focus visibility classes (`hero.tsx:38–70`, `scroll-reveal.tsx:45–46`) | Earlier blanket “ignores reduced motion” finding is superseded. Infinite normal-motion float, delayed entrances and no-JS hidden reveals remain in source. This proposal uses static content. |
| Desktop nav begins at lg while menu/trigger hide at md (`header.tsx:45,66,79`, `mobile-menu.tsx:77`) | Inferred navigation gap at standard 768–1023 widths. The proposal uses one switch at 1024. Not a rendered observation. |
| Button overwrites caller onClick; closed menu remains mounted without inert/removal or focus return (`button.tsx:95,104,111`, `mobile-menu.tsx:28–80`) | Existing modal behavior needs lifecycle completion if retained. The studies choose a simpler native in-flow disclosure. |
| Theme ink is #0F172A; body defaults to Indigo; glass, 24/12px radii and missing old semantic classes remain (`globals.css:3–62`) | Apply core Ink, semantic surfaces and 8/12/16 radii in this isolated proposal. Missing classes imply styling risk, not a measured rendered defect. |
| Source loads next/font variables while theme names literal families. Current generated CSS actually declares Montserrat and Inter | **Do not repeat an established font-fallback defect:** source naming alone does not prove failure. Verify actual rendered fonts when capture is available. Studies use copied existing Latin font files. |
| TrustBar still contains Logo1–6 under “Trusted by industry leaders” (`trust-bar.tsx:5–31`) | Unsupported public proof remains. The design replaces it with the actual operating standard and an honest work state. |
| Contact still has a large Hero with “Book A Call” self-link; panel props are not consumed (`contact/page.tsx:17–40`, `hero.tsx:10–32`, `lib/site.ts:70–71`) | Compact intro and form-first hierarchy; preparation guidance is actual visible content. Removing action props alone would expose Hero defaults. |
| Pricing fallback now uses existing pricingOffers, including empty CMS; services/offer names still differ across sources | Earlier fallback shape defect is repaired. Commercial approval is still Unknown; no offer cards or amounts are imported into this proposal. |

The live form is `RequestForm` → `/api/intake` with inline receipt. The unused `ContactForm` → `/api/contact` → `/thank-you` is a different journey. This proposal preserves the active endpoint and receipt pattern; it does not merge endpoints or redesign admin.

## Page contracts and section hierarchy

| Page | Visitor and intended understanding | Primary action |
|---|---|---|
| Homepage / | Growth-minded service-business decision-maker: “My website should reflect the quality of my business; the studio values a clear, controlled engagement.” Evidence is shown only when real and authorized. | “Send an inquiry” → `/contact`. Work/services/process are supporting evaluation paths. |
| Contact /contact | Prospect ready to explain a need; existing support/question visitors also retain a route. “I can send a useful request without a finished brief; the interface will distinguish accepted from unconfirmed receipt.” | Submit the chosen request type through the existing intake contract. Email is a fallback, not a second filled CTA. |

Homepage reading order:
1. Solid header and useful navigation.
2. Audience eyebrow; proposed mismatch headline/body; one teal inquiry action and a lower-priority Work link.
3. The five standards in one static Page Stack at desktop, flattened below the copy on smaller screens.
4. Work: this study shows the **empty/unavailable** state. Populated variant rules below.
5. Service needs in editorial rows, using copy-review §9's actual need statements; one route to existing services. No unapproved service roster or package terms.
6. Controlled-engagement questions about scope, changes and after-launch responsibilities. These are questions to ask, not promised answers, contractual stages or included support.
7. One Ink final inquiry anchor; footer with About, email and Privacy routes.

Contact reading order:
1. Compact audience-neutral contact heading and task explanation.
2. Form: native request-type radio group, name, email, optional business name, required message.
3. Preparation guidance and existing email alternative.
4. Separate internal state plates and notes.

Long follow-up claims are not used as reassurance: the operational source is Unknown. Contact uses “what to include,” not an invented reply schedule. Detailed project type/budget controls are **omitted in this proposal while their approved choices are Unknown**, not replaced with fake disabled fields. The existing schema allows optional empty values. Their conditional design is specified below if real choices become available; no existing application field was removed.

## Layout specifications

| Element | Desktop ≥1024 | Tablet 640–1023 | Narrow mobile <640 |
|---|---|---|---|
| Main grid, core §5 | 12 cols; 48px outer margins/24 gutter; at ≥1440 use80/32; max1280 content | 8 cols;32 margins/24 gutter | 4 cols;20 margins/16 gutter |
| Hero | 5-col copy +7-col standards; large section128 vertical; use display-lg for the longer source headline | Copy then standards; major96 vertical | Copy, full-width action, Work link, then flat standards; major72 vertical. No fixed viewport-height hero |
| Hero typography | Montserrat900, heading-1 clamp(2.5rem,4.25vw,4rem), .98 line-height, −.040em tracking; one Indigo phrase | Same responsive token | Same token's40px floor; natural wrap, no forced desktop line breaks or nowrap |
| Body | Inter400,16px/1.6; intro18–20px/1.55; max68ch | Natural column width | 16px body and inputs, never scaled-down desktop text |
| Header | Wordmark, four existing nav destinations, one inquiry action | Wordmark + native Menu disclosure | Same;44px minimum target, wrapping menu entries, no hover dependency |
| Work populated | Image8 cols +context4; media16 radius; metadata/title/context then persistent project link | Image then context/link | Same order; approved mobile crop, no swipe carousel or fixed text height |
| Work empty | Quiet editorial row with honest message and inquiry link; no empty image/metrics/logo frame | Full width | Full width, text wraps; link visible at rest |
| Needs and engagement questions | Border-separated rows with controlled measure; no repeated cards | Full-width rows | Full-width rows, no collapsed essential content |
| Contact | Form8-col zone capped640, first in DOM and on left; advice4 cols on right | Form then advice; form max640, aligned left | Single column, no nested page cards. Form panel24 padding,24 field gaps; advice follows |
| Contact fields | Name/email may share row; other fields full width | Two fields only when each retains usable width | Every field full width; labels/helpers before/after controls; textarea6 rows |
| Footer/final anchor | Ink only here; no mechanical theme alternation | Natural wrapping | Left aligned, full-width inquiry button, stacked links |

A long homepage headline deliberately uses the **existing heading-1 token**, not a new size or an oversized display-xl forced into five columns. This addresses the longer actual copy. Reflow and line breaks remain unverified.

## Core tokens and component reuse

| Rule | Locked citation / application |
|---|---|
| Color | Core §§3,13,15: canvas#EFEFED, paper#FFFFFF, Ink#0F1115, elevated#171A21, Indigo#2C3892, Teal#23698C, pressed Teal#1F5F80; muted#5F636C/#B4B7BD, line#D9DADC/#353943. Indigo=authority; Teal=interaction. |
| Dark accents | Core §13: bright Indigo#6673E8 / Teal#51B4D9 primarily on Ink. No dark Indigo body text on Ink. |
| Functional color | Core §3.6: success#027A48, warning#B54708, error#B42318 for actual states only; always pair with meaningful text. |
| Typography | Core §4: Montserrat headings900/800/700/600 by role; Inter body400, navigation500–600/buttons600. h1 uses core heading-1 with900 on home and800 on contact; h2 heading-2; body16/1.6. |
| Spacing | Core §6:4,8,12,16,24,32,48,64,80,96,128,160; eyebrow→heading12, heading→body24, body→actions32, button group12. §6.2 explicitly permits mobile sections56/72 and tablet72/96; no new global tokens for these contextual values. |
| Radius/surface | Core §7: control8, ordinary panel12, feature16. White/line on canvas; no default shadow. No glass, gradient, glow, rotated card or floating-card effects. |
| Button | Core §8:48 standard/56 large;20/24 horizontal padding; sentence-case Inter600. Teal/white primary, transparent Ink-border secondary, Indigo tertiary on light. |
| Page Stack | Core §11: one on desktop hero, three layers maximum, +6/+12 upper-right,16 radius; front real standards text. Mobile/tablet flatten to text. No Chroma Edge on the same hero. |
| Edge/media | Core §§10,14: one optional dual-line open corner on a populated featured-work frame; no invented image to demonstrate it. |
| Forms | Core §14.5: white fields,8 radius, persistent visible labels, Ink entered text, readable helpers and Teal focus. |
| Focus | Core §§8,13–14: Indigo Bright button focus, Teal field focus, bright Teal on Ink. Proposed2px ring +2px offset is an accessibility detail, not a new brand token. Contrast/clipping still need rendered checking. |

Reuse existing Header, Button, Hero content roles, FeaturedWork/ProjectCard, ServicesGrid/ServiceRow, CtaBlock, Footer, SectionHeading and RequestForm boundaries. The HTML/CSS is an isolated design representation, not a second production component library. Keep the repaired Sanity eligibility path, response validation, field validation and honeypot. Existing short `/process` preview and longer full process cannot be silently reconciled into a contractual sequence.

The proposed navigation uses a **native in-flow disclosure** below1024: Enter/Space opens/closes, Tab follows links, closed content leaves traversal; it does not trap focus or need modal semantics. On desktop the disclosure is hidden and inline navigation appears. No sticky panel covers content. If the existing application modal is retained instead, it must implement focus entry/trap/return, Escape, background inertness, scroll-lock cleanup and proper dialog labeling; a native disclosure must not receive those modal behaviors. Shared Button must preserve caller handlers alongside analytics.

## Form specification and state plates

The study is not a submitting app. Its radio choices can change the visible message label/helper through CSS; main action is an explicitly non-submitting preview button. Static plates illustrate each distinct state. No synthetic ticket, client, message submission or server result is asserted.

| State | Design and required behavior |
|---|---|
| Ready / empty | Project inquiry selected; native fieldset/legend and radios with actual `prospect/client/question` values. Required name/email/message and optional business name have persistent labels. No validation error on initial load. One teal action. |
| Request-type change | Native arrow/Tab/Space radio behavior, visible selected and focus states. Preserve common entries; change the message label/helper and action wording. Project/budget fields remain prospect-only if later restored with approved choices. No bespoke ARIA tabs required. |
| Optional commercial fields | Only real approved existing options; optional blank initial selection; never advertise qualification ranges as prices. Unknown choices stay omitted. No invented Rescue Sprint option. Schema names/enum values remain unchanged. |
| Validation | Current schema: trimmed name≥2, valid email, company≤120, trimmed message≥10. On submit, error summary with links; focus summary, then first linked invalid control on activation. Field has aria-invalid=true and aria-describedby including error+helper IDs. Retain input. Revalidate failed fields on edit; remove stale error when corrected. |
| Loading | Capture submitted values once; freeze fields and request-type controls; one pending request. Label “Sending…”, visible status, aria-busy. Busy submit stays focusable with aria-disabled=true and guarded activation; do not let a second click submit. Use neutral disabled surface and readable text, not opacity alone. |
| Accepted | Only after `intakeResponseSchema` validates literal success:true and nonempty issueIdentifier. Replace form with “Your request was received.” Focus receipt heading (tabindex−1), politely announce once, show only the actual reference returned. No “shortly,” SLA or promised meeting/follow-up. |
| Send another | Explicit reset of the completed form to prospect; focus the first request choice. This is not an automatic retry. Preserve inline receipt pattern; do not navigate to directly accessible /thank-you to infer acceptance. |
| Invalid submission / HTTP error | Persistent summary/alert near action, linked field errors where applicable. Retain/unfreeze values. Use buyer-facing language; no “dispatch queue,” Worker URLs or secret/raw upstream text. Existing server validation remains. |
| Offline / timeout / malformed success | “We couldn’t confirm receipt. Your entries are still in this form. Please try again later.” No false certainty about whether a remote request was accepted; no automatic retry. Provide deliberate retry and existing email alternative. Clear entries only after validated acceptance or explicit visitor reset. |
| Success without expected reference | Current acceptance schema requires reference. Treat absent/malformed reference as unconfirmed receipt; do not render undefined or fabricate one. |
| Keyboard / focus | DOM matches visual reading order: form then advice at every width. Label click focuses its field. Visible focus on all radios/controls/links. No hidden Tab stops; validation/receipt focus targets remain visible. Native select can replace radio group later only with the same value/label/state rules. |
| No JavaScript | Marketing text, route links and native menu remain accessible. Enhanced production intake needs an explicit email fallback; native request submission is not claimed. Studies contain no submission script. |

Hover: pressed Teal over160ms, no lift/scale, essential links always visible. Active: same pressed token plus inset boundary; core does not give a separate active hex, so no new token is invented. Touch: no hover-exclusive content, ≥44px action targets,48px fields, full-width narrow primary. Empty, pending, error and receipt copy wraps without fixed-height clipping.

Main-field validation and the state plates are **specifications**, not observations that the application or the study has executed these transitions.

## Proof and imagery states

- **Empty/unavailable (shown):** copy-review §7's neutral “Case studies are not available here right now. Tell us about the website you want to improve.” plus a visible inquiry link. No guessed outage reason, coming-soon date or private-portfolio promise.
- **Populated:** only real source records satisfying the current shared predicate, with verified rights and accurate project classification. Desktop8/4 media/context; mobile image→classification/title→context→link. A concept is labeled “Internal concept. Not commissioned client work.” on both card and detail. Do not infer client work from the approval flag.
- **Results missing:** omit outcome/metric region, retaining supported context/work. No generic “better conversion,” performance score or percentage.
- **Image absent/failed:** keep verified text/action; omit image surface and close the gap. No invented dashboard, placeholder photograph, fake skeleton or browser screenshot.
- **Rights:** actual screenshot/photo source, permission, approved public name/narrative, accurate alt text and desktop/mobile crop remain Unknown. Natural-color treatment is a provisional recommendation; it is not a newly locked photography system.

No testimonials, prices, proof results, hero avatars or logos have been manufactured to fill missing evidence.

## Motion

The proposal is static-first. Nothing starts opacity-zero; no continuous float, parallax, scroll hijack or stagger delays comprehension. Hover color changes are160ms per core §8; reduced-motion removes transitions entirely and preserves final layout and interaction.

The owner-stated Aperture constraints are preserved as requirements, not an invented implementation: desktop1.4s, mobile0.8s, first-visit only, returning-visitor and reduced-motion bypass. Exact artwork, breakpoint, persistence semantics and full timing source are **Unknown**. The studies do not add an aperture or loader. Any later motion must keep content visible and controls usable throughout.

## Visual-verdict record — no verdict

Attempted in this pass:
1. `cua.getState()` returned **no apps and no browsers**.
2. Explicit in-app browser selection returned **“Browser is not available: iab.”**

Consequently no current app/study screenshot could be captured. No approved reference image is accessible either. The `visual-verdict` skill was read; its screenshot/reference inputs are missing. **No verdict, score, threshold pass or rendered-quality claim is made.** Before any future visual edit iteration, capture the current studies and compare against the locked/reference target using that gate.

The user limits edits to `docs/design-review/`; no `.omx/` state was written. This section is the failure record, not a fabricated skill verdict. Earlier failed-browser attempts and another workstream's HTTP/test evidence are not substituted for current rendered inspection.

## Design QA checklist

- [ ] Capture 1440px, 390px and 320px; confirm actual fonts, line breaks, controlled measure and no horizontal overflow.
- [ ] At 640px, 768px, 1023px and 1024px, exactly one navigation surface; narrow menu never obscures content.
- [ ] Persistent case links, honest empty work, correct actual /contact destination; no scheduler promise.
- [ ] Keyboard order follows visual order; radio selection, validation links and receipt focus work; check assistive technology.
- [ ] Ready/loading/accepted/HTTP/offline/malformed-response states preserve the submitted data policy; no uncertain success.
- [ ] 200% text zoom and reflow remain usable; fixed-height text clipping and hidden actions absent.
- [ ] Reduced-motion and no-JS content/fallback behavior are checked separately.
- [ ] Public claims/rights, approved offer choices, final CTA wording and contact operations have real sources.
- [ ] Actual screenshot/reference comparison precedes any visual-verdict claim.

Unresolved source dependencies: Charter; exact Rescue Sprint and approved service/offer choices; final copy/CTA wording; project evidence/rights/classification; contact operations; full photography/proof/Aperture systems; Umbrella Lock reconciliation. None blocks completing the independent design proposal, and none is silently resolved here.
