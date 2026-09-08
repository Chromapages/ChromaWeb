# Public content boundary

## Goal

Keep editorial diagnostics in Studio/development and ensure public routes present only visitor-safe states.

## Tasks

- [x] Create a status-free shared public fallback. → Verified: it accepts no CMS result or setup props.
- [x] Migrate list and singleton empty states; use `notFound` for incomplete dynamic records. → Verified: public markup contains no placeholder or publishing workflow text.
- [x] Remove public CMS vendor references and replace metadata fallbacks. → Verified by a public source scan.
- [x] Add boundary tests and run the full verification suite. → Verified: 19 tests, type check, lint, and production build pass.
