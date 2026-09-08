# Seven-part case-study narrative design

## Goal

Make each public Chromapages case study an editorial account of a real transformation, ordered as Context, Challenge, Strategy, Build, Launch, Evidence, and Next Stage.

## Narrative model

The public route renders these seven chapters in the fixed order below. They are chapters of one story, not interchangeable marketing cards.

1. **Context** establishes the approved project identity, proof classification, Chromapages role, and scope. Existing public project identity and scope remain part of the hero; a new public role statement provides the missing “what Chromapages did” clarity.
2. **Challenge** defines the problem that made the work necessary.
3. **Strategy** explains the intervention and decision logic.
4. **Build** combines the former design and development decisions into one coherent account of the implemented system.
5. **Launch** records approved delivery, QA, release, handoff, or operational readiness facts. It does not imply commercial impact.
6. **Evidence** displays the approved proof signals in their existing hierarchy. Each signal must include a public statement, source, timeframe, measurement context, attribution limitations, and verification status. Projects may show only the categories they can substantiate.
7. **Next Stage** uses an approved public project-specific next-stage statement when available. Otherwise, the section uses the standard “Plan Your Digital Upgrade” contact action without implying further work for that project.

## CMS migration

Add public-safe fields for `publicRole`, `build`, `launch`, and `nextStage`. The existing design and development fields remain editorial source material during migration but cease to be public route chapters once `build` is populated. Existing `attributionLimitations` remains the page-level caveat; each individual proof signal carries its own limits.

Extend each approved proof signal with `timeframe` and `measurementContext`. An evidence signal cannot render publicly unless its statement, source/context, timeframe, measurement context, limitations, type, and approval are present. This preserves technical, process, client, or craft proof when business outcomes do not exist, while preventing unbounded claims.

Published-ready validation requires all seven narrative inputs except optional `nextStage`; the latter has the standard CTA fallback. Context uses public title, identity, classification, role, and scope. No new field permits confidential identity, unsupported outcomes, or generic placeholder copy.

## Rendering and media

The hero retains identity, classification, scope, and role. The seven editorial chapters use the existing page section primitives with calm, alternating surfaces rather than repeated promotional card treatments. Evidence remains proof-first and appears before any evidence-linked project media. Project media keeps its approved purpose and chapter anchor; media belongs beneath the chapter it helps explain.

## Verification

Tests cover the fixed chapter order, role/context visibility, Build merging, evidence metadata requirements, evidence without business-outcome proof, and Next Stage fallback. Existing Work cards continue selecting only the strongest valid proof. Type check, lint, and production build pass.
