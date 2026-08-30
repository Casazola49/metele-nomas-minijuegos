# Apply Progress — metele-fase2-juegos

## Status

- **Phase:** apply, Wave 1 only
- **Structured status consumed:** `schemaName: gentle-ai.sdd-status`, `changeName: metele-fase2-juegos`, `artifactStore: openspec`, `applyState: ready`, `nextRecommended: apply`
- **Action context:** `repo-local`; workspace `/home/raymond/Work/gentle_ai/podcast`; allowed edit root is the workspace; warnings: none
- **Delivery boundary:** stacked-to-main PR 1 / Wave 1 (`quien-lo-dijo` and `guerra-criticas`); the forecast is high for the full change, so later waves remain separate
- **Mode:** Standard (strict TDD disabled; project has no test runner)

## Completed Tasks

- [x] Created `data/quotes.ts` with the `Quote` interface and 14 Bolivia/international quotes across humor, culture pop, science, inspiration, and culture categories. Persisted checkbox in `tasks.md`.
- [x] Created `app/games/quien-lo-dijo/page.tsx` with `GameShell`, `useGameTurn`, unused quote selection, and four author options prioritizing the same category. Persisted checkbox in `tasks.md`.
- [x] Created `data/ratings.ts` with numeric `RatingScores` and 10 movie duels. Persisted checkbox in `tasks.md`.
- [x] Created `app/games/guerra-criticas/page.tsx` with A/B selection, normalized IMDb/Rotten Tomatoes averages, scoring, and rating reveal. Persisted checkbox in `tasks.md`.
- [x] Activated the two Wave 1 `GameGrid` cards with live hrefs and `comingSoon: false`. Persisted checkbox in `tasks.md`.
- [x] Ran the shared Wave 1 verification command set. Persisted checkbox in `tasks.md`.

## Files Changed

| File | Action | Description |
|---|---|---|
| `data/quotes.ts` | Created | Static quote dataset and type. |
| `data/ratings.ts` | Created | Static numeric movie-rating duel dataset and types. |
| `app/games/quien-lo-dijo/page.tsx` | Created | Four-option quote-author quiz using the shared turn contract. |
| `app/games/guerra-criticas/page.tsx` | Created | Movie-rating A/B duel with normalized winner calculation. |
| `components/home/GameGrid.tsx` | Modified | Activated the two Wave 1 cards. |
| `openspec/changes/metele-fase2-juegos/tasks.md` | Modified | Checked only the six Wave 1 implementation tasks. |
| `openspec/changes/metele-fase2-juegos/apply-progress.md` | Created | Cumulative Wave 1 apply evidence. |

## Verification Evidence

| Evidence | Result |
|---|---|
| Focused test command and exact result | `npm run build` — passed; Next.js compiled and generated 12 static routes, including both new routes. |
| Type check | `npx tsc --noEmit` — passed with no output. |
| Runtime harness command/scenario and exact result | `npm run build` static route harness — passed for `/games/quien-lo-dijo` and `/games/guerra-criticas`; interactive browser harness is parent verification scope. |
| Lint | `npm run lint` — passed with 0 errors and 25 pre-existing warnings in unrelated files/shared components. |
| Rollback boundary | Revert Wave 1 changes in `components/home/GameGrid.tsx`, delete the two new route files and two new data files, and restore the six Wave 1 task checkboxes. |

## Deviations from Design

None — implementation follows the shared `GameShell` and `useGameTurn` pattern, keeps static data local, and uses no new dependencies. The rating reveal is intentionally limited to after selection, matching the requirement to show both ratings on reveal.

## Remaining Tasks

Wave 2, Wave 3, Wave 4, and parent lifecycle rows remain unchecked and were not modified:

- [ ] Create `data/headlines.ts`: `Headline` (`id, text, isReal, source, image?, emoji?`) + ≥16. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/noticia-o-fake/page.tsx`: Real/Fake vs `isReal`; reveal `source` in feedback; `onError` emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Create `data/opinions.ts`: `Opinion` (`id, text, majority: "a_favor"|"en_contra", emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/polemica-total/page.tsx`: A favor/En contra vs static `majority`; no API calls. <!-- sdd-owner: implementation -->
- [ ] Flip `noticia-o-fake` + `polemica-total` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 2: shared test command passes. <!-- sdd-owner: implementation -->
- [ ] Create `data/faces.ts`: `FaceMashup` (`id, image, celebA, celebB, distractorPairs, emoji?`) + ≥10; distractors share ≥1 name. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/face-mashup/page.tsx`: 4 celeb-pair options; placeholder image + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Create `data/hangman.ts`: `HangmanEntry` (`id, word, trapWord, image, hint, emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ahorcado-funable/page.tsx`: keyboard + 3 lives; `disableFeedbackOverlay`; `isGameOver` at 0 lives. <!-- sdd-owner: implementation -->
- [ ] Create `data/ingredients.ts`: `Dish` (`id, name, image, mainIngredient, options, emoji?`) + ≥12; options share mainIngredient. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ingredientes/page.tsx`: ingredient photo → 4 dishes; placeholder + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Flip `face-mashup` + `ahorcado-funable` + `ingredientes` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 3: shared test command passes. <!-- sdd-owner: implementation -->
- [ ] Create `data/brand-colors.ts`: `BrandColor` (`id, brand, logoPath, correctHex, palette[4], emoji?`); palette holds correctHex once. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/color-correcto/page.tsx`: grayscale inline logo (`grayscale(1)`) + 4 hex swatches. <!-- sdd-owner: implementation -->
- [ ] Create `data/countries.ts`: `Country` (`id, name, svgPath, rotation, distractorNames[3], emoji?`); inline path, no geo API. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/mundo-girado/page.tsx`: inline SVG rotated `rotation` deg + 4 country names. <!-- sdd-owner: implementation -->
- [ ] Flip `color-correcto` + `mundo-girado` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 4: shared test command passes. <!-- sdd-owner: implementation -->
- [ ] Start or reuse bounded review for PR 1. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 2. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 3. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 4. <!-- sdd-owner: parent -->

## Next

Wave 1 implementation is complete. Return to the parent lifecycle for independent verification and any review orchestration; do not start review actors from apply.
