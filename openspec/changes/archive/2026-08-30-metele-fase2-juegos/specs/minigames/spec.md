# Minigames (Fase 2) Specification

## Purpose

Defines nine new pass-and-play minigame routes for the Metele Nomás hub, all
built on the shared `GameShell` + `useGameTurn` contract. Covers the static-data
dataset consumed by each game, the GameShell/useGameTurn wiring, and game-specific
quirks (numeric ratings, static-majority voting, lives + keyboard, image
fallback). Activates nine cards on the home grid currently flagged
`comingSoon: true`.

## Requirements

### Requirement: Shared Shell and Turn Contract

Every new route MUST compose `components/game/GameShell.tsx` and consume the turn
state from `lib/useGameTurn.ts` (local round/round-state owned by the route).

**Touches**: `components/game/GameShell.tsx`, `lib/useGameTurn.ts`,
`components/ui/ComicButton.tsx`, `components/ui/FeedbackOverlay.tsx`,
`components/game/Scoreboard.tsx`.

#### Scenario: Three-screen lifecycle

- GIVEN a route mounts `GameShell`
- WHEN the player picks a player count and presses "¡Comenzar!"
- THEN `GameShell` transitions `start → playing`, calls `useGameTurn.handleStart(count)`, and shows the route's `children` plus the top-right `Scoreboard`
- AND when the route sets `isGameOver: true`, `GameShell` switches to `gameover` and renders `finalScores` sorted by score

#### Scenario: Turn rotation via feedback

- GIVEN a correct or incorrect answer is recorded as `feedback`
- WHEN the route calls `onNext` (the "Siguiente" button)
- THEN `useGameTurn.handleNext(feedback)` rotates to the next player on `incorrect` and keeps the same player on `correct`
- AND if it was the last player's `incorrect`, `handleNext` returns `false` and the route MUST set `isGameOver: true`

### Requirement: Wave 1 — Quien Lo Dijo

`/games/quien-lo-dijo`: show a famous quote and four author options (1 correct +
3 distractors from the same `category` if available, otherwise random). Standard
correct-keeps-turn semantics.

**Touches**: `data/quotes.ts` (`{ id, text, author, category? }`),
`app/games/quien-lo-dijo/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Start and first round

- GIVEN the player chooses 1–6 players and presses start
- WHEN `handleStart` runs
- THEN `useGameTurn` builds the roster, the route picks a random unused quote, and four author options are shown (1 correct + 3 distractors)

#### Scenario: Correct answer

- GIVEN a round is active with no feedback yet
- WHEN the player selects the matching author
- THEN `feedback` becomes `"correct"`, `useGameTurn.incrementScore(1)` is called, and the "Siguiente" button appears

#### Scenario: Incorrect answer and rotation

- GIVEN a round is active
- WHEN the player picks a distractor
- THEN `feedback` becomes `"incorrect"`; on "Siguiente" the turn rotates to the next player, or game ends if it was the last

### Requirement: Wave 1 — Guerra de Críticas

`/games/guerra-criticas`: present two titles (A and B) each with an IMDb and a
Roten Tomatoes score; the player picks which title "wins" overall. The route
MUST compute the winner from the dataset's `imdb` and `rottenTomatoes` numeric
fields and award the point only if the player picks the actual winner.

**Touches**: `data/ratings.ts`
(`{ id, titleA, scoreA: { imdb, rottenTomatoes }, titleB, scoreB: {...}, year? }`),
`app/games/guerra-criticas/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Pair duel and scoring

- GIVEN a pair `(titleA, titleB)` is selected from `data/ratings.ts`
- WHEN both cards' IMDb and Rotten Tomatoes scores are shown
- THEN the route MUST award the point iff the player's pick matches the title with the higher combined (or precomputed) score, otherwise `feedback = "incorrect"`

#### Scenario: Numeric dataset integrity

- GIVEN the data module is loaded
- WHEN the page consumes `ratings`
- THEN every entry MUST carry numeric `imdb` (0–10) and `rottenTomatoes` (0–100) values; non-numeric strings are forbidden

### Requirement: Wave 2 — Noticia o Fake

`/games/noticia-o-fake`: present a headline and two buttons (Real / Fake). Player
earns a point for matching the entry's `isReal` boolean.

**Touches**: `data/headlines.ts` (`{ id, text, isReal, source, image? }`),
`app/games/noticia-o-fake/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Headline reveal and verdict

- GIVEN a headline with optional cover image
- WHEN the player presses "Real" or "Fake"
- THEN the route compares the guess to `isReal`: match → `feedback = "correct"` + `incrementScore(1)`; mismatch → `feedback = "incorrect"`
- AND the headline's `source` MUST be revealed in the feedback overlay regardless of correctness

#### Scenario: Image fallback

- GIVEN a headline whose `image` fails to load
- WHEN the `<img>` `onError` fires
- THEN a sibling emoji fallback MUST become visible (`hidden` class removed), exactly like the existing pattern in `pixel-chef` and `real-o-ia`

### Requirement: Wave 2 — Polemica Total (Static Majority)

`/games/polemica-total`: present an opinion and two buttons (A favor / En
contra). No backend, no live voting — the dataset precomputes the historical
majority per opinion (`majority: "a_favor" | "en_contra"`). Player earns a
point only if their pick matches the dataset's `majority`.

**Touches**: `data/opinions.ts`
(`{ id, text, majority: "a_favor" | "en_contra", emoji? }`),
`app/games/polemica-total/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Match-the-majority scoring

- GIVEN an opinion with `majority: "a_favor"`
- WHEN the player presses "A favor"
- THEN `feedback = "correct"` and `incrementScore(1)`; pressing "En contra" MUST yield `feedback = "incorrect"` even though both picks are legitimate opinions

#### Scenario: Deterministic dataset

- GIVEN the build runs offline with no network
- WHEN the page renders a round
- THEN it MUST NOT call any vote/aggregation API; all "majority" values MUST come from the static `data/opinions.ts` constant
- AND the same `id` MUST always resolve to the same `majority` across reloads

### Requirement: Wave 3 — Face Mashup

`/games/face-mashup`: show an AI-generated hybrid face and four two-celebrity
options (1 correct `celebA + celebB` pair + 3 distractors that share one or
both names). Launch with `/images/coming-soon-*.png` placeholders and emoji
fallback; real hybrid images are a follow-up backfill.

**Touches**: `data/faceMashups.ts`
(`{ id, image, celebA, celebB, distractorPairs: [{ a, b }, ...] }`),
`app/games/face-mashup/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`, `public/images/coming-soon-*.png`.

#### Scenario: Mashup round and distractors

- GIVEN a face mashup is selected
- WHEN the four options render
- THEN exactly one option matches `celebA + celebB`; the other three MUST reuse at least one of the two names so the round is non-trivial

#### Scenario: Placeholder launch

- GIVEN no real hybrid assets are available at launch
- WHEN the route renders the mashup image
- THEN it MUST point at `/images/coming-soon-*.png` and the `onError` handler MUST reveal an emoji fallback; this constraint is lifted only after a follow-up data-only PR adds real assets

### Requirement: Wave 3 — Ahorcado Funable (Lives & Keyboard)

`/games/ahorcado-funable`: show a "trap" image and a custom on-screen keyboard.
The dataset exposes a `word` and a `trapWord`; the correct answer is `word`
(the misleading "obvious" one is `trapWord`). Lives start at 3; each wrong
keyboard press decrements lives; a correct press reveals letters. Game ends
when lives reach 0 OR the word is fully revealed.

**Touches**: `data/hangman.ts` (`{ id, word, trapWord, image, hint }`),
`app/games/ahorcado-funable/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Wrong-key lives decrement

- GIVEN a round with `lives = 3`
- WHEN the player presses a key that is not in `word`
- THEN `lives` decrements by 1; when `lives` reaches 0 the route MUST set `isGameOver: true` independent of `useGameTurn.handleNext`

#### Scenario: Correct key reveals letters

- GIVEN a round is active
- WHEN the player presses a key that matches a letter in `word`
- THEN that letter MUST be revealed in its position(s) in the on-screen word and `lives` MUST NOT change

#### Scenario: GameShell feedback isolation

- GIVEN `GameShell`'s default `FeedbackOverlay` and "Siguiente" button assume a quiz answer
- WHEN `ahorcado-funable` mounts the shell
- THEN it MUST pass `disableFeedbackOverlay` and own its own keyboard + lives UI; `useGameTurn.handleNext` MUST NOT be the sole driver of game-over state

### Requirement: Wave 3 — Ingredientes

`/games/ingredientes`: show a photo of raw ingredients and four dish options
whose `mainIngredient` matches (1 correct + 3 sibling dishes). Launch with
placeholder covers; real photos are a follow-up.

**Touches**: `data/dishes.ts` (`{ id, name, image, mainIngredient, options }`),
`app/games/ingredientes/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`, `public/images/coming-soon-*.png`.

#### Scenario: Sibling distractors

- GIVEN a dish with `mainIngredient: "carne de res"`
- WHEN four options render
- THEN all four options MUST share the same `mainIngredient`; the correct one is the exact `name`, the other three are different dishes with the same main ingredient

#### Scenario: Placeholder launch and emoji fallback

- GIVEN no real ingredient photos at launch
- WHEN the image fails to load
- THEN the route MUST fall back to the dish's emoji (per item `emoji?` field) using the same `hidden` → remove pattern as `pixel-chef`

### Requirement: Wave 4 — Color Correcto

`/games/color-correcto`: show a grayscale brand logo (inline SVG with `filter:
grayscale(1)`) and four hex swatches; one matches the brand's exact `correctHex`.

**Touches**: `data/brandColors.ts`
(`{ id, brand, logoPath, correctHex, palette: string[] }`),
`app/games/color-correcto/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Grayscale logo and swatch pick

- GIVEN a brand entry with `correctHex: "#E50914"` and a 4-color `palette` that includes that hex
- WHEN the four swatches render
- THEN the logo MUST be displayed grayscale; the player picks a swatch and the route awards the point iff the picked swatch equals `correctHex`

#### Scenario: Palette integrity

- GIVEN the dataset is loaded
- WHEN the route builds its options
- THEN `palette` MUST contain exactly one instance of `correctHex` and three visually similar but distinct hex values; palettes without `correctHex` are forbidden

### Requirement: Wave 4 — Mundo Girado

`/games/mundo-girado`: show a country silhouette SVG (inline `<svg>` with hand-
authored `<path>` data — no new npm dependency) rotated by `rotation` degrees
and four country-name options (1 correct + 3 distractors from the same region if
available).

**Touches**: `data/countries.ts`
(`{ id, name, svgPath, rotation, distractorNames: string[] }`),
`app/games/mundo-girado/page.tsx`, `components/game/GameShell.tsx`,
`lib/useGameTurn.ts`.

#### Scenario: Rotated silhouette pick

- GIVEN a country entry with `rotation: 180`
- WHEN the SVG renders
- THEN it MUST apply a CSS/SVG `transform: rotate(180deg)`; the player picks from four names and earns the point only on the matching `name`

#### Scenario: No-new-dependency constraint

- GIVEN the project forbids new npm dependencies without an explicit request
- WHEN the route loads country geometry
- THEN it MUST inline the SVG `<path>` data directly in `data/countries.ts` or under `public/`; runtime fetching from a third-party geo API is forbidden

### Requirement: Home Grid Activation

`components/home/GameGrid.tsx` MUST expose each shipped game with
`comingSoon: false` and `href: "/games/{id}"` (no `#`, no lock overlay).

**Touches**: `components/home/GameGrid.tsx`.

#### Scenario: Card flip per shipped game

- GIVEN a game has a live route in this change
- WHEN the home grid renders
- THEN that game's entry MUST set `comingSoon: false` and `href: "/games/{id}"`
- AND it MUST NOT show the "PRÓXIMAMENTE" lock overlay or the "BLOQUEADO 🔒" disabled button

#### Scenario: Build verification

- GIVEN the change has been applied
- WHEN `npm run build`, `npx tsc --noEmit`, and `npm run lint` are run
- THEN all three MUST pass without installing any new dependency

### Requirement: Image Placeholder & Emoji Fallback

Every image-dependent new route MUST ship with `/images/coming-soon-*.png`
placeholders and MUST use the existing `<img>` `onError` → emoji fallback
pattern (hide the image, remove the `hidden` class from a sibling element).

**Touches**: each route's image element, `public/images/coming-soon-{green,blue,pink}.png`,
the route's data module `emoji?` field.

#### Scenario: Fallback on missing asset

- GIVEN a route renders an `<img src="..." />` whose src is a not-yet-produced asset
- WHEN the browser fires `onError`
- THEN the image MUST be hidden (`style.display = "none"` or equivalent) and the sibling emoji container MUST become visible

#### Scenario: No backend or new dependency

- GIVEN the change's scope forbids a backend and new npm dependencies
- WHEN the implementation lands
- THEN no route MUST add network calls, persistence, or new packages; placeholder assets and emoji fallbacks are the only mitigation for missing imagery