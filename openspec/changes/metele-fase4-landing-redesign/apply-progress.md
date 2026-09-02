# Apply Progress: Metele Fase 4 — Landing Redesign

## Status Consumed

- Change: `metele-fase4-landing-redesign`
- Artifact store: `openspec`
- Apply state: `ready`
- Action context: `repo-local`; workspace `/home/raymond/Work/gentle_ai/podcast`; allowed edit root is the repository.
- Workload decision: `size:exception` explicitly accepted by the orchestrator; one PR with three internal commits (Foundation → Hero+GameGrid → Footer).
- Warning: the task forecast still records `Chain strategy: pending`; this apply followed the explicit size exception and did not create commits.

## Completed Tasks and Persistence

All 17 implementation-owned task rows are complete and were changed to `- [x]` in `tasks.md`. Parent-owned lifecycle rows remain byte-for-byte unchecked and deferred.

- Foundation: ticker tests/data, ComicButton tests/variant, landing CSS utilities, dark root body, and foundation verification.
- Hero + GameGrid: dark/glass Hero, shared ticker marquee, 15-card dark GameGrid, reduced-motion hover guard, accessibility labels/focus rings, and slice verification.
- Footer: dark/glass Footer, shared ticker/social links, external social targets, official-site link/copyright, and slice verification.

## Files Changed

| File | Change |
|---|---|
| `data/ticker.tsx` | Added shared phrases, typed social links, and SocialIcon. |
| `data/ticker.test.tsx` | Added RED/GREEN unit coverage for ticker and social contracts. |
| `components/ui/ComicButton.tsx` | Added opt-in `landing` glass variant without changing primary default. |
| `components/ui/ComicButton.test.tsx` | Added default-preservation and landing-class tests. |
| `app/globals.css` | Added prefixed landing utilities, animations, and reduced-motion overrides. Existing comic tokens were not changed. |
| `app/layout.tsx` | Changed root body classes to `bg-comic-black text-white`. |
| `components/home/Hero.tsx` | Replaced comic/parallax sections with dark glass hero, logo ring, CTA, blobs, dot grid, and ticker. |
| `components/home/GameGrid.tsx` | Replaced floating comic presentation with dark glass cards while preserving game data/routes. |
| `components/home/Footer.tsx` | Replaced yellow/comic footer with dark glass ticker, socials, and official link. |
| `openspec/changes/metele-fase4-landing-redesign/tasks.md` | Marked implementation-owned rows complete; parent-owned rows preserved. |

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|---|---|---|---|---|---|---|---|
| Ticker data exports | `data/ticker.test.tsx` | Unit | N/A (new test/module) | Written first; missing module failed | Passed: 2 tests | Unique/non-empty phrases plus four-link shape cases | Clean typed readonly exports and shared component |
| ComicButton landing variant | `components/ui/ComicButton.test.tsx` | Unit | Existing GameShell baseline: 2/2 | Written first; landing-class assertion failed | Passed: 2 tests | Default primary and landing variant use different class paths | Clean variants map addition; default untouched |

## Work Unit Evidence

| Work unit | Focused test command and exact result | Runtime harness and exact result | Rollback boundary |
|---|---|---|---|
| Foundation | `npm test -- --run data/ticker.test.tsx components/ui/ComicButton.test.tsx` — 2 files, 4 tests passed | `npm run build` passed; `curl /` and `curl /games/pelimojis` both returned HTTP 200 | Revert `data/ticker*`, `app/globals.css`, `app/layout.tsx`, `components/ui/ComicButton*` |
| Hero + GameGrid | `npm test` — 20 files, 28 tests passed | Production server harness returned HTTP 200 for `/` and `/games/pelimojis`; static inspection confirms `id="games"`, 15 game entries, and no `comingSoon` true values | Revert `components/home/Hero.tsx`, `components/home/GameGrid.tsx` |
| Footer | `npm test` — 20 files, 28 tests passed | Production server harness returned HTTP 200 for `/`; static inspection confirms four shared social links with `_blank` and `noopener noreferrer` | Revert `components/home/Footer.tsx`, `data/ticker.tsx` |

## Verification Evidence

- `npm test`: passed, 20 test files and 28 tests.
- `npm run build`: passed; all 19 app routes generated, including `/games/pelimojis`.
- `npx tsc --noEmit`: passed with no output.
- `npm run lint`: passed with exit code 0 and 30 pre-existing warnings; no errors.
- Runtime smoke harness: `/` and `/games/pelimojis` returned HTTP 200 from the production server. GameShell continues to declare its yellow route surface.
- Manual browser-only checks (smooth-scroll focus behavior, tab traversal, visual yellow baseline) remain lifecycle verification work for the parent actor.

## Deviations from Design

- The Footer no longer renders `final-bg.png`; the dark-surface design permits removing that light comic asset and keeps the footer focused on the shared ticker/social destination.
- The CTA uses a gradient text span inside the landing button to preserve the glass button background while meeting the pink-to-orange CTA text requirement.

## Remaining Tasks

Parent-owned lifecycle actions remain deferred:

- [ ] Choose chain strategy (stacked-to-main / feature-branch-chain / size-exception) and confirm whether PR 2 splits into 2a/2b before apply. <!-- sdd-owner: parent -->
- [ ] Run bounded review over the chained PRs and re-confirm the pelimojis game route visual baseline unchanged after all slices. <!-- sdd-owner: parent -->

## Workload / PR Boundary

- Mode: `size:exception`, one PR, three internal commits expected by orchestrator.
- Boundary: this apply covers Foundation, Hero + GameGrid, and Footer; no commit or lifecycle review was created.
- Estimated authored change: above the 400-line budget due to the requested three-slice visual rewrite; exception was explicitly accepted.

## Apply Result

17/17 implementation tasks complete. Ready for parent lifecycle and independent SDD verification.
