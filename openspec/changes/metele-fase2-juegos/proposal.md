# Proposal: Metele Fase 2 — Juegos

## Intent

Expand the Metele Nomás hub from six playable games to all nine currently marked `comingSoon`, giving players a consistent pass-and-play experience while preserving the existing static, dependency-free architecture.

## Scope

### In Scope
- Add one `data/*.ts` dataset and one client route `app/games/<id>/page.tsx` for each: `quien-lo-dijo`, `face-mashup`, `color-correcto`, `mundo-girado`, `guerra-criticas`, `noticia-o-fake`, `polemica-total`, `ahorcado-funable`, and `ingredientes`.
- Compose every route with `GameShell` and `useGameTurn`; keep game-specific round state local.
- Activate every card in `components/home/GameGrid.tsx` with `comingSoon: false` and its `/games/<id>` href.
- Deliver in four review waves, with each game an independently verifiable PR/slice under the 400-line budget: (1) `quien-lo-dijo`, `guerra-criticas`; (2) `noticia-o-fake`, `polemica-total`; (3) `face-mashup`, `ahorcado-funable`, `ingredientes`; (4) `color-correcto`, `mundo-girado`.

### Out of Scope
- Real image production: image-dependent games launch with `/images/coming-soon-*.png` placeholders and emoji fallbacks; real faces, photos, logos, and silhouettes are future backfill.
- Backend, live voting, persistence, analytics, deployment, or new npm dependencies.

## Capabilities

### New Capabilities
- `fase2-minigames`: Nine playable static-data minigame routes and their home-page activation.

### Modified Capabilities
- None; no existing OpenSpec capability requirements are present.

## Approach

Follow the established data-module, `GameShell`, `useGameTurn`, feedback, and image-error fallback patterns. Use precomputed `majority` percentages and `A favor`/`En contra` answers in `data/opinions.ts`; matching the majority earns the point, with no backend or live vote. Keep `ahorcado-funable` keyboard/lives and `polemica-total` majority reveal as local screens hosted by `GameShell`, avoiding broad changes to shared APIs. Update metadata only if required by the shipped routes.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `data/*.ts` | New | Nine typed content datasets. |
| `app/games/*/page.tsx` | New | Nine client game screens. |
| `components/home/GameGrid.tsx` | Modified | Enable nine routes. |
| `public/images/` | Reused | Existing placeholder covers and emoji fallbacks. |

## Risks

- Special turn/lives behavior may conflict with canonical semantics; isolate adaptations locally and verify build, typecheck, and lint.
- Placeholder imagery may reduce polish; track real-asset backfill separately.
- Nine routes can overload review; retain the four-wave, sub-400-line slices.

## Rollback Plan

Revert individual wave PRs, restoring each card to `comingSoon: true`/`href: "#"` and removing its route/data module. No data migration, backend rollback, or dependency cleanup is required.

## Success Criteria

- [ ] All nine cards navigate to playable routes and no longer show locked state.
- [ ] Each game supports start, scoring/feedback, turn progression, and game-over through the agreed shell contract.
- [ ] `polemica-total` uses only static precomputed majority percentages.
- [ ] `npm run build`, `npx tsc --noEmit`, and `npm run lint` pass without installing dependencies.
