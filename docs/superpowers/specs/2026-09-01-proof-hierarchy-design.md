# Proof hierarchy design

## Goal

Render case-study proof by strength rather than visual convenience: business outcome, client evidence, technical proof, process proof, then craft proof.

## Data model

Each case study receives one or more `proofSignal` records with a type, public-safe statement, public source context, public limitation, and verification status. Only approved signals are queryable publicly. A published-ready case study requires at least one approved signal; the legacy narrative evidence field remains available to editors but no longer drives public hierarchy.

## Selection and rendering

`selectPrimaryProofSignal` sorts approved signals by the fixed hierarchy. Work cards render exactly that signal, including its type label and stated limitation. It never creates an outcome when business evidence is absent.

Full case studies render grouped proof in hierarchy order immediately after the hero. Approved imagery follows this proof section, making craft supporting evidence rather than the default lead. Signals retain their public limitations alongside the statement.

## Verification

Tests cover each priority order, the absence of a business outcome, unpublished signals, and validation rejection when no approved typed signal exists. Type check, lint, and production build pass.
