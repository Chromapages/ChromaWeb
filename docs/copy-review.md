# Chromapages public website copy

DRAFTING — final proposed copy · Dax · 2026-10-24

Implement the supported public-copy entries below in the existing page sections. Missing sources affect only dependent content; they do not block the rest of this artifact. This replaces the previous review and approval workflow. This task changed only `docs/copy-review.md`.

**Internal marker:** `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Marked entries are editorial instructions, never public text or CMS field values. Omit dependent content and use the supplied safe copy. No source-dependent term is filled with a guess.

## Sources and boundaries

| ID | Source checked | Status and use |
|---|---|---|
| O | Owner's current instructions | Locked authority: growth-minded service businesses, business/website-quality mismatch, premium quality, and a controlled, launch-safe engagement. Exact standard: **Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving.** |
| B | `F:/CHROMA/company-brain/BUSINESS/chromapages.md` | Read in full. Active canonical brand document, updated 2026-05-24. Supports website builds/redesigns, landing pages, ecommerce, web apps, ongoing support, clear/human voice, mobile performance as a priority, QA, staging preview, launch checks, and Eric Black as founder/operator. Category definitions are not complete commercial terms. Outcome language is positioning, not evidence of achieved results. |
| R | Current marketing routes; `lib/site.ts`; shared sections/cards; footer; root metadata | Existing wording and structure only. Neither fallback wording nor current publication proves commercial approval. |
| F | `components/forms/request-form.tsx`; `lib/validation/request.ts`; `docs/repair-handoff.md` | Source supports inquiry submission, required/optional fields, validated acceptance, inline receipt/reference, and entries retained in the current form on error. Earlier test results in the repair report are not new live-delivery checks. Worker routing/full-message delivery remains unverified. |
| C | `sanity/schemaTypes/`; `lib/sanity/queries.ts`; `lib/sanity/fetch.ts`; `docs/cms-schema-map.md` | Actual registered fields and queries govern mapping. Several models described in the schema-map document are not registered. CMS content is not substantiation. |
| D | Previous `docs/copy-review.md`; `docs/content-strategy.md`; `docs/design-review/README.md` | Read for existing issues, page purposes, and provisional design context. No provisional hierarchy change is adopted. The former blanket approval gate and handoff are replaced by this completed copy artifact. |
| U | [Earlier Umbrella Lock](https://drive.google.com/file/d/1VvA9BIGx7iJHvx4IzXmev5-Qy9cTTxZW/view) | Retrieved/read in the preceding source review. Systems-first umbrella/vertical-led positioning conflicts with O. **Conflict remains flagged.** This copy follows O; neither strategy is merged or rewritten. |
| H | [Core copy deck v2](https://docs.google.com/document/d/1faAjJ_5P14EL6yG1DB0FDaRDnyxpxi6Dl_loURNK5tg/edit), [March PRD](https://docs.google.com/document/d/1h2tOADX9daj7CO6MA8WSyHegV_ZiHHGfO8LqqRfmUVY/edit), [pricing copy v3](https://docs.google.com/document/d/1CQNXD8eo1JvOWr4gh4QUIFxkU55iP_Mr1XiqEcKvBns/edit), [operations/pricing plan](https://docs.google.com/document/d/12WAm3PpCPjMXvwpdFFI1EN9_msSPCyEsHSTTjXJbYaY/edit) | Previously retrieved documents explicitly marked Draft; retrieved core deck ends during pricing. Historical context only. No prices, tiers, turnaround, subscription requirements, project facts, or metrics adopted. |
| X | `F:/CHROMA/apps/Focus/Chromapages Brand Guidelines.md` | Opening brand/version sections inspected. Not the canonical business document B. Its numeric load promise is not measurement evidence and is not used. |

**Unknown:** canonical Team Charter; exact approved Website Rescue Sprint original; complete current commercial terms; project evidence/permissions; testimonials; monitored public email and follow-up procedure. Local Markdown/text under `F:/CHROMA` and connected Drive were searched for Charter/Rescue titles and the exact Website Rescue Sprint phrase. No relevant source was found. This does not prove a document does not exist. No approval request or external message was sent.

**Offer rule:** Website Rescue Sprint remains a distinct unresolved offer. It is not Landing Page Sprint, Launch Build, or a generic redesign. Preserve approved originals verbatim when supplied. No price, timeline, guarantee, deliverable, exclusion, or contract term is synthesized here.

## Page contracts

Each page addresses service-business owners. Broader capabilities remain available without becoming competing homepage messages.

| Page | Awareness / buyer problem | Intended understanding | Available proof / objection | Primary action |
|---|---|---|---|---|
| Home `/` | Problem-aware; business has outgrown its website | Chromapages is relevant to the gap between business quality and online presentation | O/B support positioning; project proof Unknown | Open `/contact` to inquire |
| Services `/services` | Solution-aware; uncertain which help fits | Understand the supported service categories | B supports categories; detailed scope Unknown | Identify a category, then inquire |
| Work `/work` | Evaluating credibility | Distinguish project context, contribution, and documented results | Project evidence/permissions Unknown | Read a supported project, or inquire when none are available |
| Process `/process` | Concerned about scope and launch | Know the documented launch standard and questions to settle before starting | B supports QA/staging/launch checks; detailed procedure Unknown | Inquire with engagement questions |
| Pricing `/pricing` | Considering commitment | Send a useful scope/pricing inquiry without assuming terms | Commercial terms Unknown | Open `/contact` to inquire |
| About `/about` | Checking fit and accountability | Know the studio's focus, standards, and founder/operator | B supports identity/role; no invented credentials | Send an inquiry |
| Contact `/contact` | Ready to inquire; unsure what to submit | A short description of the problem is enough to send a request | F supports form/receipt; human follow-up Unknown | Submit the appropriate request |
| Thank-you `/thank-you` | Post-submission or direct visitor | The form confirms acceptance; visiting this URL does not | F supports inline receipt | Return home, or open the form if needed |

## Shared copy

| Existing slot | Exact copy / value |
|---|---|
| `site.name` | Chromapages |
| `site.tagline` | Digital Design Elevated. |
| `site.description`; footer brand body; root description/Open Graph/Twitter description | Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work. |
| `site.bookingLabel`; desktop/mobile header CTA; shared primary-action defaults | Send an inquiry |
| `site.bookingHref`; shared primary destination | `/contact` |
| Shared `CtaBlock.title` | What needs to change on your website? |
| Shared `CtaBlock.description` | Tell us where your website falls short and what your business needs from it next. |
| Exact operating standard | Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving. |

The standard expresses priorities, not measured results or included support. Preserve the tagline; the homepage H1 establishes buyer relevance.

## 1. Homepage

Keep existing order: `Hero` → `TrustBar` → `ServicesGrid` → `FeaturedWork` → `ProcessSteps` → `CtaBlock`.

| Component / field | Exact public copy |
|---|---|
| `Hero.eyebrow` | Websites for service businesses |
| `Hero.title` | A website that reflects the quality of your business. |
| `Hero.description` | Your business has moved forward. Your website should show it. Chromapages designs and builds websites that explain what you offer and make the next step clear. |
| Hero primary label / href | Send an inquiry / `/contact` |
| Hero secondary without approved proof | View services / `/services` |
| Hero secondary with substantiated proof | View work / `/work` |
| Existing proof caption, only with supported records | Explore the project context and the work behind it. |
| TrustBar label | Our standard |
| TrustBar text, replacing false endorsement/logos | Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving. |
| ServicesGrid eyebrow / H2 | How we can help / Start with what your website needs to do. |
| ServicesGrid body | A new website, a focused landing page, or improvements to an existing site. Start with the problem you want to solve. |
| FeaturedWork eyebrow / H2, when supported | Work / See the work in context. |
| FeaturedWork listing action | View all work / `/work` |
| Featured project action | View project / existing `/work/{slug}` |
| ProcessSteps eyebrow / H2 | Before you begin / Make the important questions clear. |
| Closing CtaBlock | Use the exact shared title, body, Send an inquiry label, and `/contact` destination. |

Use the existing three homepage service-card positions. These are category labels, not new packages. Source B supports the categories; no dedicated SEO or funnel deliverable is inferred.

| `homepageServices[].title` | Exact `.description` | Existing card action |
|---|---|---|
| Website design and builds | New websites and redesigns for businesses whose online presence needs to catch up. | Send an inquiry → `/contact` |
| Landing pages | Focused pages for a campaign, promotion, or launch. | Send an inquiry → `/contact` |
| Updates and improvements | Ongoing website updates, fixes, and improvements after launch. | Send an inquiry → `/contact` |

The third card describes an available service, not support included in a build.

Detailed delivery stages are Unknown. Use the four existing homepage process positions for **preparation questions**, not a four-stage contractual process:

| Existing item `title` | Exact `summary` |
|---|---|
| Purpose | What should visitors understand about your business, and what should they do next? |
| Scope | What needs to change, and what belongs in this engagement? |
| Review | Who will provide content, feedback, and decisions for your business? |
| Launch | What needs to be checked and ready before the website goes live? |

**Empty proof:** omit the hero project stack/caption and FeaturedWork, preserving current empty behavior. No homepage empty-proof announcement is needed. Project-specific content is `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]` until substantiated. Do not substitute static examples, metrics, or client marks.

## 2. Services

Keep `Hero` → `ServicesGrid` → existing four-item fit section → `CtaBlock`.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Services / Find the right help for your website. |
| Hero body | Bring your website in line with the business you have built. Explore website builds, landing pages, web apps, ecommerce, and ongoing improvements. |
| Primary / secondary actions | Send an inquiry → `/contact`; View pricing → `/pricing` |
| ServicesGrid introduction | Use the exact eyebrow, H2, and body from the homepage ServicesGrid. |
| Fit eyebrow / H2 | Who this is for / Your business has moved forward. Your website needs to catch up. |
| Fit body | For service-business owners who want their website to reflect their work and make the next step clear. |
| Fit item 1 | Your website no longer reflects the quality of your business. |
| Fit item 2 | Your services are difficult to understand online. |
| Fit item 3 | Visitors struggle to find the next step. |
| Fit item 4 | You want clarity about the work before you begin. |
| Closing CTA title | Not sure which service fits? |
| Closing CTA body | Tell us what is not working on your website and what you want it to do better. |
| Closing CTA action | Send an inquiry → `/contact` |

Keep the five existing category labels and slugs. B's Launch Build/Redesign, Landing Page Sprint, E-Commerce Build, Web App MVP, and Retainer support these categories. This does not rename those offers, establish package terms, or exclude later approved offers.

| Existing slug | `service.title` / static `label` | Exact `service.summary` |
|---|---|---|
| `marketing-websites` | Marketing Websites | New websites and redesigns that explain your services and give visitors a clear way to get in touch. |
| `landing-pages` | Landing Pages | Focused pages for a campaign, promotion, or launch, built around one main action. |
| `ecommerce` | E-Commerce | Storefronts, product pages, and checkout experiences for businesses selling online. |
| `web-apps` | Web Apps | Portals, dashboards, and tools for a specific business or customer task. |
| `ongoing-support` | Ongoing Support | Website updates, fixes, and improvements after launch. |

Current interior service rows do not render detail links; no nonexistent CTA field is assumed. The page's inquiry action is sufficient. Existing detail routes remain `/services/{slug}`.

### Existing service details

Reuse the category title/summary above in each existing detail hero. Eyebrow: **Services**. Primary: **Send an inquiry** → `/contact`. Secondary: **Back to services** → `/services`.

Main eyebrow: **The service**. H2: **About this service.** Use the matching category summary as the complete supported body for now; it is a category explanation, not a complete scope statement. Map it to `service.description[]` or static `body`.

Existing sidebar inquiry copy: **Have a question about this service?** / **Tell us what needs to change and which service you are considering.** / **Send an inquiry** → `/contact`.

Closing CTA: **Is this the right service for your website?** / **Start with the problem you want to solve.** / **Send an inquiry** → `/contact`.

Complete inclusions/exclusions, price, deadlines, revisions, responsibility allocation, and included support are `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Leave `service.features[]`/`.price` empty unless approved originals exist; omit the dependent deliverables block and generic fallback items. Do not label the short supported body as a full inclusion list.

## 3. Work

Keep `Hero` → project-list introduction/cards or empty status → `CtaBlock`.

### Safe version without substantiated project records

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Work / Looking for examples of our work? |
| Hero body | Explore our services or tell us about the website you want to improve. |
| Primary / secondary actions | Send an inquiry → `/contact`; View services → `/services` |
| Project-list eyebrow / H2 | Work / Case studies |
| Empty `role=status` message | Case studies are not available here right now. |
| Closing CTA title | What needs to change on your website? |
| Closing CTA body | Tell us about your business and what you want your website to do better. |
| Closing CTA action | Send an inquiry → `/contact` |

Omit the optional project-list description in this empty state so the status is not repeated. Use the same safe state when approved content is absent or unavailable. It promises neither a publication date nor a private portfolio.

### Populated version, only with per-record evidence

| Slot | Exact public copy |
|---|---|
| Hero H1 | See the work behind the website. |
| Hero body | Explore the project context, the work completed, and the decisions behind it. |
| Project-list eyebrow / H2 | Projects / Context, decisions, and work completed. |
| Project-list body | Read what the project needed, what Chromapages contributed, and any documented results. |
| Card action | View project → existing `/work/{slug}` |

Keep the same hero actions and closing CTA. No new anchor or route is needed.

**Project-specific content:** title, client name, narrative, results, media rights, and classification are Unknown: `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. No completed case study is fabricated.

Exact reusable detail copy: main eyebrow **The work**; H2 **Project context and decisions.** Narrative headings, only with supported content: **Context**, **The problem**, **The work**, **What changed**. Supported results only: eyebrow **Evidence**, H2 **Documented results**. Hero actions: **Send an inquiry** → `/contact`; **View all work** → `/work`. Closing CTA: **What needs to change on your website?** / **Tell us what your business needs from its website.** / **Send an inquiry** → `/contact`.

Use actual `caseStudy.title`, `.client`, `.excerpt`, `.content[]`, `.results[]`, `.mainImage`, `.tags[]`, `.slug`, and `.proofStatus`. An approval flag is a publication control, not underlying evidence. Results need source, measurement period, relevant comparison, attribution limits, and permission. Omit them when unavailable.

For an approved internal concept, begin its excerpt **Internal concept. Not commissioned client work.** Its visible classification is **Internal concept**; leave client empty and make no client/business outcome claims. Verified commissioned work may use **Client project**. Classification must be visible on cards and detail pages, not hidden in unused panel props. The schema has no dedicated project-kind or image-alt field. No placeholder logos or testimonials are supplied.

## 4. Process

Keep `Hero` → `ProcessSteps` → `CtaBlock`. B supports launch-quality standards, not the exact four-versus-seven-stage procedure in current wording. The list below is explicitly preparation questions, not a new delivery sequence.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Process / A considered website. A considered launch. |
| Hero body | Launch readiness is part of our standard, with quality assurance, a staging preview, and launch checks. Start by getting clear about the website's purpose and the work it needs. |
| Primary / secondary actions | Send an inquiry → `/contact`; View pricing → `/pricing` |
| ProcessSteps eyebrow / H2 | Before you begin / Make the important questions clear. |
| Closing CTA title | What do you need to know before starting? |
| Closing CTA body | Include your questions about scope, reviews, or launch in your inquiry. |
| Closing CTA action | Send an inquiry → `/contact` |

Use the existing seven-item data shape for these seven questions:

| `processStep.title` / static title | Exact `summary` |
|---|---|
| Purpose | What should your website help visitors understand or do? |
| Scope | Which pages, features, or problems need attention? |
| Content | What copy, images, and other materials are ready to use? |
| Feedback | Who will provide feedback and make decisions for your business? |
| Review | How will the work be reviewed before it goes live? |
| Launch | What needs to be ready for the website to go live? |
| After launch | What updates or support will you need after launch? |

Exact delivery sequence, review rounds, client deadlines, approval authority, change policy, and support entitlements are `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. No contractual detail is inferred from drafts or fallback arrays. The standard is not a risk-free or outage-free launch guarantee.

## 5. Pricing

Keep `Hero` → `PricingSnapshot` → `FAQAccordion` → `CtaBlock`. This complete safe version invites a pricing inquiry without claiming prices are custom, fixed, subscription-based, or unpublished by policy.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Pricing / Start with the scope of your website. |
| Hero body | Tell us what needs to change and include any questions about scope or pricing in your inquiry. |
| Primary / secondary actions | Send an inquiry → `/contact`; View services → `/services` |
| PricingSnapshot eyebrow / H2 | Your project / What does your website need next? |
| PricingSnapshot body | A new website, a redesign, or ongoing updates involve different work. Tell us what you have and what you want to change. |
| FAQ eyebrow / H2 | Before you inquire / A few useful starting points. |
| FAQ description | Start with your website and the problem you want to solve. |
| Closing CTA title | Have a question about scope or pricing? |
| Closing CTA body | Share your website address, what needs to change, and any budget or deadline you are working with. |
| Closing CTA action | Send an inquiry → `/contact` |

Exact replacement `pricingFaq`:

| `question` | Exact `answer` |
|---|---|
| What should I include in a pricing inquiry? | Tell us what you need to change, share your website address if you have one, and include any budget or deadline you are working with. |
| Do I need to choose a service before contacting you? | You can send an inquiry without choosing a service. Describe the problem you want to solve. |
| How do I send a pricing question? | Use the inquiry form on the contact page. You can select Question if you do not have a project brief to submit. |

**Offer cards:** `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Existing Launch Website, Landing Page Sprint, and Ongoing Support cards are not approved by their presence in fallback data. Omit unverified cards, amounts, inclusion lists, priority support, and turnaround language. Keep the supported section introduction. An empty offers array currently restores static cards; it is not a safe suppression method.

**Website Rescue Sprint:** exact approved original is Unknown. `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Keep this dependency; do not substitute Landing Page Sprint, infer terms from “Sprint,” or claim the offer was withdrawn. Preserve the original approved terms verbatim when supplied. Nothing here supersedes them.

Terms-dependent FAQs about payment, cancellation, scope changes, inclusions, or support stay omitted. The three complete answers above replace the implementation-focused FAQ.

## 6. About

Keep `Hero` → two existing articles → `Differentiators` → `CtaBlock`.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | About Chromapages / Your business deserves to be understood online. |
| Hero body | Chromapages is a digital design and development studio for service businesses whose websites no longer reflect the quality of their work. |
| Primary / secondary actions | Send an inquiry → `/contact`; View services → `/services` |
| First article eyebrow / H2 | Our point of view / Help people understand the business. |
| First article body | Your website should explain what you offer, help visitors judge whether it fits their needs, and make the next step clear. Design, performance, and launch readiness all matter to that experience. |
| Second article eyebrow / H2 | Behind the studio / Founded and operated by Eric Black. |
| Second article body | Eric Black is the founder and operator of Chromapages. The studio combines design and development with attention to the message, the visitor's next step, and launch readiness. |
| Differentiators eyebrow / H2 | Our standard / What we want every website to do. |
| Differentiators description | Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving. |
| Closing CTA title | Tell us where your website falls short. |
| Closing CTA body | Start with what your business needs visitors to understand. |
| Closing CTA action | Send an inquiry → `/contact` |

Use the existing differentiator cards for these five principles:

| Item `title` | Exact `summary` |
|---|---|
| Look Premium | Represent the quality of the business. |
| Convert Clearly | Make the offer and the next step clear. |
| Load Fast | Treat loading speed as part of the experience. |
| Launch Clean | Treat quality checks and launch readiness as part of the work. |
| Keep Improving | Consider what the website needs as the business changes. |

B supports Eric's identity/role, not tenure, awards, team size, credentials, or a promise that he personally performs every task. No biography or client volume is invented.

## 7. Contact

Keep `Hero` → inquiry section with `RequestForm` and two supporting panels. Use the existing form anchor instead of linking back to the page's own intro.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Contact / A short message is enough to start. |
| Hero body | Tell us what your business does, where your website falls short, and what you want visitors to do. Send your inquiry using the form below. |
| Primary / secondary actions | Go to inquiry form → `/contact#request-form`; View services → `/services` |
| Form introduction eyebrow / H2 | Send an inquiry / Tell us what needs to change. |
| Form introduction body | Share your current website address, if you have one. A few sentences about the problem will help. |
| First panel eyebrow / H2 | After you send / Look for your confirmation. |
| First panel body | After a successful submission, this form shows a confirmation and a reference number. |
| First panel button | Go to inquiry form → `/contact#request-form` |
| Second panel eyebrow / H2 | What to include / A few useful details. |
| Second panel item 1 | What your business does |
| Second panel item 2 | What is not working on your website |
| Second panel item 3 | Any deadline or budget context you want to share |

The first panel replaces the email panel. B lists `chromapages@gmail.com`; current site copy uses `hello@chromapages.com`. Approved public address and monitoring are Unknown: `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Neither address is selected here. No human-follow-up or response-time promise is made.

### Exact form labels and states

| Existing field / state | Exact public copy |
|---|---|
| Request tabs, in current order | Project inquiry / Client support / Question |
| `name` / `email` labels | Your name (required) / Email address (required) |
| `company` label | Business name (optional) |
| `projectType` label | Project type (optional) |
| `budgetRange` label, only with sourced choices | Estimated budget (optional) |
| Prospect message label | What needs to change? (required) |
| Prospect placeholder | Tell us about your business, your current website, and what you would like it to do better. |
| Client message label | Support request (required) |
| Client placeholder | Describe the issue or update and include the page address, if relevant. Do not include passwords or payment details. |
| Question message label / placeholder | Your question (required) / What would you like to know? |
| Prospect / client / question submit | Send inquiry / Send support request / Send question |
| Pending submit | Sending… |
| Validated acceptance heading | Your request was received. |
| Validated acceptance body | Reference: {issueIdentifier} |
| Receipt reset | Send another request |
| Unconfirmed receipt / generic service or network error | We couldn’t confirm receipt. Your entries are still in this form. Please try again later. |

Use only the actual returned `issueIdentifier`, after the existing acceptance schema validates the response. A receipt confirms acceptance, not human review, complete downstream processing, or a reserved call. Error text describes current-form entries, not durable storage.

Retain exact validation messages: **Please enter your name.** / **Please enter a valid email address.** / **Please describe your request in at least 10 characters.** Preserve validation, disabled sending state, retained values, visible labels, error association, and status announcements. Keep placeholders as examples, not label replacements. The honeypot is not a public field.

Existing project-type choices correspond to B's categories; keep enum values and Not Sure Yet. Budget amounts are not verified qualification terms: `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`. Omit the optional budget selector until its choices are sourced. Visitors can still include budget context in their message. No new ranges or options are invented. Client support does not promise urgency, priority, or entitlement.

## 8. Thank-you

The active accepted-request receipt remains inline in `RequestForm`, using §7. Visiting `/thank-you` directly does not prove submission. Keep the existing route structure without adding a redirect.

| Slot | Exact public copy |
|---|---|
| Hero eyebrow / H1 | Your inquiry / Looking for your inquiry confirmation? |
| Hero body | Successful submissions show a confirmation and a reference number in the contact form. If you still need to send an inquiry, open the form below. |
| Primary / secondary actions | Return home → `/`; Open inquiry form → `/contact` |
| Existing CtaBlock title | Still need to send an inquiry? |
| Existing CtaBlock body | Use the contact form to tell us about your business and what needs to change on your website. |
| Existing CtaBlock action | Open inquiry form → `/contact` |

No route-level receipt, email confirmation, or response window is asserted. Keep existing noindex behavior.

## Metadata

Exact code-managed title/description copy. Retain existing canonical URLs and noindex behavior. Root metadata already appends the brand; do not append it twice. No location keywords or unverified performance claims.

| Route | `metadata.title` | `metadata.description` |
|---|---|---|
| `/` | Websites for service businesses | Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work. |
| `/services` | Website services | Explore Chromapages website builds, landing pages, ecommerce, web apps, and ongoing improvements. Send an inquiry about what needs to change. |
| `/work`, without proof | Work | Case studies are not available here right now. Explore Chromapages services or send an inquiry about your website. |
| `/work`, substantiated populated version | Website projects | Explore project context, the work completed, and the decisions behind Chromapages projects. |
| `/process` | Website project process | Learn about Chromapages launch standards and the questions to clarify about your website before work begins. |
| `/pricing` | Website pricing inquiries | Send Chromapages your questions about website scope and pricing. Share what needs to change and any budget or deadline context. |
| `/about` | About Chromapages | Meet Chromapages, a digital design and development studio founded and operated by Eric Black. |
| `/contact` | Contact | Tell Chromapages about your business, your website, and what you want to improve. Send an inquiry using the contact form. |
| `/thank-you` | Inquiry confirmation information | Find out where the contact form displays an inquiry confirmation, or open the form to send a request. |

Service-detail metadata uses the supported title/summary in §2. Case-study metadata uses only a substantiated title/excerpt, with concept classification where relevant. No invented result is used in metadata.

## Brief claim register

| Claim | Evidence | Status / treatment |
|---|---|---|
| Service-business audience and website/business mismatch | O; B Target Market/ICP | Supported positioning; final wording supplied |
| Exact five-part standard | O | Owner-locked; preserved verbatim |
| Website builds/redesigns, landing pages, ecommerce, apps, support | B Services | Supported categories; not complete offer contracts |
| Messaging/action clarity, mobile performance, QA/staging/launch checks | O; B Product Standards/pillars | Supported priorities; no numeric speed, measured uplift, scope-independent inclusion, or risk-free launch claim |
| Eric Black, founder/operator | B Key Contacts | Supported identity/role; no added biography or personal-delivery guarantee |
| Inquiry form, validated receipt/reference, retained form entries on error | F; current source/schema | Source-checked behavior; production delivery and human follow-up unverified |
| Website Rescue Sprint and complete commercial terms | Unknown | `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`; no substitute terms |
| Detailed delivery sequence, revisions, deadlines, change/support commitments | Unknown; existing detail is code/draft only | `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`; preparation questions supplied instead |
| Projects, client names, permissions, testimonials, logos, outcomes | Unknown | `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`; safe empty states supplied |
| Public email/follow-up, response time, budget choices, location/social URLs | Unknown or conflicting B/R | `[OWNER SOURCE REQUIRED — DO NOT PUBLISH]`; no unsupported address, amounts, location, promise, or fake social destination |
| Umbrella Lock positioning | U versus O | Conflict flagged; neither strategy rewritten |

## CTA map

| Surface | Exact label | Destination / action | Visitor expectation |
|---|---|---|---|
| Header desktop/mobile; page inquiry CTAs; detail inquiries | Send an inquiry | `/contact` | Open the inquiry form |
| Home without proof; Work/About/Contact secondary | View services | `/services` | Read supported service categories |
| Home with substantiated proof | View work | `/work` | Browse supported records |
| FeaturedWork listing; case-study secondary | View all work | `/work` | Read available project context |
| Home/Work project card | View project | Existing `/work/{slug}` | Read a supported, visibly classified project |
| Services/Process secondary | View pricing | `/pricing` | Read pricing-inquiry guidance, not an assumed price list |
| Pricing secondary | View services | `/services` | Explore relevant categories |
| Service-detail secondary | Back to services | `/services` | Return to the category overview |
| Contact hero/first panel | Go to inquiry form | `/contact#request-form` | Reach the existing form |
| Prospect/client/question submit | Send inquiry / Send support request / Send question | Existing `POST /api/intake` | Submit the selected request; receive acceptance or an error |
| Accepted receipt reset | Send another request | Existing form reset | Begin a new request, not an automatic retry |
| Thank-you primary | Return home | `/` | Leave the information page |
| Thank-you secondary/closing CTA | Open inquiry form | `/contact` | Open the form; no receipt asserted by visiting the route |

## Component and Sanity field mapping

No new schema or component is required by the copy. This identifies actual storage/rendering paths, not a handoff or approval workflow.

| Content | Existing path / fields | Rendering limitation |
|---|---|---|
| Home H1/body/primary action | Current `Hero.title`, `.description`, `.primaryAction`; schema equivalents `siteSettings.hero.headline`, `.subheadline`, `.ctaText`, `.ctaLink` | Home uses defaults, not `getHomePageData`; CMS-only changes will not update it. No CMS eyebrow/secondary CTA field. |
| Shared description/CTA | `lib/site.ts` site fields; hardcoded footer/root metadata; existing `siteSettings.description` | Global outputs are not wired to that CMS field. Header uses site CTA fields; page/default overrides also exist. |
| Home service cards | `homepageServices[].title`, `.description` in `glass-service-card.tsx` | Three existing positions; editorial categories, not package terms. |
| Interior services/details | `service.title`, `.summary`, `.description[]`, `.features[]`, `.price`, `.fit`, `.framing`, `.ctaText`, `.ctaLink`, `.slug`; static `label`, `summary`, `body`, `includes` | Keep approved terms identical in CMS/static branches. Empty features must not revive invented default deliverables. Short supported descriptions are not complete scope. |
| Pricing | Existing section strings and `pricingFaq`; queried service title/summary/fit/features/framing/CTA fields | No pricing-offer type. Query/cards do not expose price. Empty offers restore static cards; suppress unsupported cards explicitly. |
| Preparation questions | ProcessSteps text; `processStep.title`, `.summary`, `.orderRank`; static arrays | Home uses four local items; Process uses seven CMS/static items. Preserve corresponding counts. Seven items already use a four-column grid; no new contractual stages are asserted. |
| Project proof | `caseStudy.title`, `.client`, `.excerpt`, `.content[]`, `.results[]`, `.tags[]`, `.mainImage`, `.slug`, `.proofStatus` | Preserve approval/content predicate, empty handling, conditional results. No project-kind/alt field. Home takes queried first three records, not siteSettings references. |
| About standards | Differentiators intro; `lib/site.ts` differentiator title/summary array | Five principles replace unsupported claims within existing cards. |
| Other page headings, CTA blocks, FAQ, form states, metadata | Existing route/component strings and props | No registered page/faqItem/ctaBlock/testimonial/formConfig model. Do not map these to nonexistent CMS fields. |

`Hero` renders two actions but not its declared panels/highlights. `CtaBlock` does not render its declared secondary action. Essential copy must remain in visible fields. Do not rely on inactive props for terms or proof classification. Exact approved terms must stay visible rather than being truncated to fit a card.

Current footer location and placeholder social links lack a verified public source; omit them until sourced. No false endorsements or fabricated outcomes may reappear through CMS-empty/error/static fallbacks.

## Unresolved dependencies and checks

- **Unknown:** Team Charter, exact Website Rescue Sprint original, complete commercial terms, project evidence/permissions, detailed delivery commitments, public mailbox/follow-up, qualification budget ranges. Only marked dependent sections remain unpublished; supported copy above is complete.
- **Legal review:** privacy policy and any necessary form privacy/consent notice require the policy owner's review against actual routing and retention. No legal-policy wording or assurance is supplied or changed.
- **Checked:** canonical brand source, previous copy review, repair report, current page/shared wording, form/receipt source behavior, actual CMS fields/queries, CTA destinations, and local/connected missing-source searches. Concurrent metadata edits were inspected; they do not change the copy fields above and were left untouched. Unsupported claims are removed or isolated.
- **Not checked:** rendered layout, live CMS records, production Worker delivery, mailbox monitoring, or measured performance. No tests, build, lint, typecheck, live inquiry, or CMS publication was performed. This task changed no app code, strategy document, or other file; other working-tree edits were left untouched.
