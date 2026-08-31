# Exploration: metele-fase2-juegos

## Current State

The project is a Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict + Tailwind CSS 4 pass-and-play minigame hub under the "Metele Nomás" comic brand. There are 6 implemented games and 9 `comingSoon: true` entries in `components/home/GameGrid.tsx`.

### Implemented games (patterns in the wild)

Three "legacy" games still hand-roll turn/score state and carry a `// TODO: Migrar a useGameTurn` comment:

- `app/games/pelimojis/page.tsx` — emoji → movie title, 1 correct + 5 distractors, local `players`/`currentPlayerIndex`/`score` state.
- `app/games/cual-fue-primero/page.tsx` — "which invention is older", left/right duel, local state.
- `app/games/adivina-edad/page.tsx` — "older or younger" celebrity duel, local state.

Three "new" games already use the canonical hook:

- `app/games/pixel-chef/page.tsx` — blurred food image, `useGameTurn`, hint with `-0.5` penalty.
- `app/games/a-cuanto-case/page.tsx` — product price duel, `useGameTurn`.
- `app/games/real-o-ia/page.tsx` — real vs AI image, `useGameTurn`, hint with `-0.5` penalty.

### Shared contract

**`components/game/GameShell.tsx`** is the mandatory wrapper. It owns three screens (`start` → `playing` → `gameover`), the 1–6 player selector, the top-right score (`Scoreboard`), the `FeedbackOverlay`, and the animated "Siguiente" button. Its props are:

- `title`, `instructions`
- `onStart(players: number)`, `onReset()`
- `children` (the actual game screen)
- `score: number` (single current score shown top-right)
- `finalScores?: { name; score }[]` (leaderboard on game over)
- `isGameOver: boolean`
- `feedback: "correct" | "incorrect" | null` (drives overlay + next button)
- `onNext()` (fires when the user presses "Siguiente")
- `disableFeedbackOverlay`, `fullScreen`, `hideScoreboard`

**`lib/useGameTurn.ts`** is the turn engine:

- `handleStart(count)` builds `players` (1..count) with `score: 0`.
- `handleAnswer` is game-specific; correct answers call `incrementScore(1)` (or `-0.5` for hints), incorrect answers set `feedback = "incorrect"`.
- `handleNext(feedback)` returns `true` to continue / `false` when over. Semantics: **correct = keep turn**, **incorrect = rotate to next player**, **incorrect on last player = game over**. It does NOT track question index — each page manages its own round state (`currentX`, `options`, `usedIds`).

### Data pattern

Each game has `data/*.ts` exporting an interface + const array. Observed interfaces:

- `Movie` → `{ id, emojis, title, genre }`
- `Invention` → `{ id, name, emoji, year, image }`
- `Celebrity` → `{ id, name, age, role, image }`
- `Food` → `{ id, name, category, image, pixelLevel, emoji? }`
- `Product` → `{ id, name, price, currency, image, category, emoji? }`
- `RealOrAiItem` → `{ id, image, isAi, hint, description }`

### Image placeholder convention

Image-dependent games use `<img>` with an `onError` handler that hides the image and reveals a sibling emoji fallback (`hidden` → `remove("hidden")`). The three new games currently ship with placeholder images:

- `data/foods.ts` — every item uses `/images/coming-soon-green.png`
- `data/products.ts` — every item uses `/images/coming-soon-blue.png`
- `data/realOrAi.ts` — every item uses `/images/coming-soon-pink.png`

Only `/images/coming-soon-{blue,green,pink}.png` exist as generic covers. Real per-item assets exist only for `inventos/` (PNG) and `celebridades/` (JPG). This proves the launch-with-placeholder pattern is accepted in the codebase.

`components/home/GameGrid.tsx` renders each card from a `games` const array. Coming-soon cards have `href: "#"`, `comingSoon: true`, and a "PRÓXIMAMENTE" lock overlay + disabled "BLOQUEADO 🔒" button. To activate a game, the card entry must set `href: "/games/{id}"` and `comingSoon: false`.

## Affected Areas

- `components/home/GameGrid.tsx` — flip `comingSoon` to `false` and set real `href` for each shipped game; optionally add a real cover image per game (currently reuses `coming-soon-*.png`).
- `app/games/{game-id}/page.tsx` (9 new routes) — the actual game screens.
- `data/*.ts` (9 new modules) — content datasets.
- `components/game/GameShell.tsx` — reusable as-is for most games; may need optional props or a sibling shell for games whose UX does not map to "correct keeps turn / incorrect rotates" (see Risks).
- `lib/useGameTurn.ts` — sufficient for quiz/duel games; may not fit lives-based or voting-based games without extension.
- `public/images/` — new asset folders for face mashups, brand logos, country silhouettes, hangman trap images, and ingredient photos.
- `app/layout.tsx` metadata — description/keywords currently list only the 6 shipped games; should be updated as games go live (low priority).

## Approaches

### 1. Wave-based implementation (recommended)

Group the 9 games by data/asset dependency and ship in 3 waves, one PR per game or per small cluster, respecting the 400-line review budget.

- **Wave A — pure text/data (no new assets):** `quien-lo-dijo`, `guerra-criticas`, `noticia-o-fake`, `polemica-total`.
- **Wave B — real image datasets:** `ingredientes`, `ahorcado-funable`, `face-mashup`.
- **Wave C — SVG/logo/geo assets:** `color-correcto`, `mundo-girado`.

- Pros: asset-blocked games don't stall the pipeline; early quick wins validate the pattern; natural chained-PR slicing.
- Cons: three different asset workstreams; `polemica-total` and `ahorcado-funable` still need UX decisions before their wave.
- Effort: Medium overall, Low per game.

### 2. One game per PR, uniform GameShell pattern

Implement all 9 sequentially as independent routes, each mirroring `pixel-chef` exactly.

- Pros: simplest, most reviewable, matches the existing `config.yaml` "one task per minigame" guidance.
- Cons: 9 PRs with no dependency ordering; image/SVG-heavy games may block early velocity.
- Effort: Medium-High total.

### 3. Shared game-type primitives refactor

Extract reusable `QuizRound` and `Duel` components plus a shared `useRound` hook before building the 9 games.

- Pros: less duplicated code long-term.
- Cons: premature abstraction across 9 mechanically different games; risk to the 6 already-shipped routes; larger first PR that blows the 400-line budget.
- Effort: High.

### Recommendation

Adopt **Approach 1 (wave-based)** while keeping **one task per game** internally. Use `GameShell` + `useGameTurn` verbatim for quiz/duel games. For the two non-conforming games, prefer small dedicated game screens over mutating the shared shell:

- `polemica-total` — deterministic "majority" data (see Risks) and a custom two-button screen; can still use `GameShell` for start/gameover.
- `ahorcado-funable` — custom keyboard + lives screen; `GameShell` can host it with `disableFeedbackOverlay` and local game-over control.

Ship image-dependent games with placeholder assets + emoji fallback first (existing precedent), then swap real assets in a follow-up data-only PR.

## Game Catalog

| # | id | Type | Data requirement | Asset requirement | Estimated complexity |
|---|----|------|------------------|-------------------|----------------------|
| 1 | `quien-lo-dijo` | (a) text/data | `data/quotes.ts`: `{ id, text, author, category? }` + author distractors | none (emoji avatar optional) | Low |
| 2 | `face-mashup` | (b) real image dataset | `data/faceMashups.ts`: `{ id, image, celebA, celebB, distractorPairs }` | AI-generated hybrid/face-swap images | High |
| 3 | `color-correcto` | (c) SVG/logo assets | `data/brandColors.ts`: `{ id, brand, logoPath, correctHex, palette: string[] }` | decolored logo SVGs + exact brand hex | Medium |
| 4 | `mundo-girado` | (c) SVG/geo assets | `data/countries.ts`: `{ id, name, svgPath, rotation, distractorNames }` | country silhouette SVG paths, rotated via CSS/SVG transform | Medium-High |
| 5 | `guerra-criticas` | (a) text/data (numeric) | `data/ratings.ts`: `{ id, title, imdb, rottenTomatoes, year? }` | none (poster emoji optional) | Low |
| 6 | `noticia-o-fake` | (a) text/data | `data/headlines.ts`: `{ id, text, isReal, source, image? }` | optional "La Voz" cover images | Low |
| 7 | `polemica-total` | (a) text/data + (d) special logic | `data/opinions.ts`: `{ id, text, majority: "a_favor" \| "en_contra" }` | none | Medium-High |
| 8 | `ahorcado-funable` | (b) image dataset + (d) special logic | `data/hangman.ts`: `{ id, word, trapWord, image, hint }` | trap image per word | Medium-High |
| 9 | `ingredientes` | (b) real image dataset | `data/dishes.ts`: `{ id, name, image, mainIngredient, options }` | raw-ingredient photo per dish | Medium |

### Classification summary

- **(a) Text/data pure:** `quien-lo-dijo`, `guerra-criticas`, `noticia-o-fake` (plus `polemica-total` data layer, though its scoring is special).
- **(b) Needs real image dataset:** `face-mashup`, `ahorcado-funable`, `ingredientes`.
- **(c) Needs SVG/logo assets:** `color-correcto`, `mundo-girado`.
- **(d) Special logic:** `polemica-total` (majority voting) and `ahorcado-funable` (lives/keyboard) deviate from the `useGameTurn` correct-keeps-turn model.

## Risks

- **No test runner** — only `npm run build` and `tsc --noEmit` verify work; no unit coverage for scoring/turn edge cases.
- **`useGameTurn` semantics mismatch** — it assumes "correct keeps turn, incorrect rotates, last-player incorrect ends game". `ahorcado-funable` (lives) and `polemica-total` (majority vs minority scoring) do not fit; forcing them in risks broken turn flow.
- **`polemica-total` "majority" has no backend** — the repo is static/static-data only. Options: precomputed survey results in `data/opinions.ts` (deterministic, offline) vs. a real backend (out of scope, new dependency/infra). Needs explicit product decision before implementation.
- **Asset production is external work** — `face-mashup` hybrid faces and `ingredientes` photos must be generated/sourced outside the repo; no image tooling exists in the project. Launching with placeholders + emoji fallback mitigates this.
- **Brand logo/color accuracy** (`color-correcto`) — trademark and color-fidelity risk; recommend inline SVG with exact hex constants and grayscale via CSS `filter` rather than raster images.
- **Country silhouette sourcing** (`mundo-girado`) — no new npm dependency is allowed without explicit request, so geo paths must be inline SVG path data or hand-authored public assets.
- **400-line review budget** — 9 games cannot be a single PR. Chained/stacked PRs per wave are required; a full phase-2 implementation will likely exceed the default budget several times over.
- **GameGrid activation is easy to forget** — each game needs both the new route AND the card flip (`comingSoon: false` + `href`), otherwise the game is unreachable from home.

## Ready for Proposal

Yes — with two open questions for the orchestrator/user to resolve during `sdd-propose`:
1. How should `polemica-total` determine "majority" (static precomputed data vs. real backend)?
2. Is it acceptable to ship image-dependent games (`face-mashup`, `ingredientes`, `ahorcado-funable`) with placeholder assets + emoji fallback first, then backfill real images?
