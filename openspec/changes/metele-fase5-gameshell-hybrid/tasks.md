## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~212 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single-pr |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Tasks

- [ ] Refactor `components/game/GameShell.tsx` to implement dark hybrid styling (`#1D1D1B`, `landing-dot-grid`, dark glass cards) and add the persistent persistent client-side exit link (`<Link href="/">`) in the top-left corner during `playing` state. <!-- sdd-owner: implementation -->
- [ ] Update `components/game/Scoreboard.tsx` to utilize dark glass styling (`bg-[#181816]/90`, `border-white/20`) and vibrant metele typography. <!-- sdd-owner: implementation -->
- [ ] Refactor `components/ui/FeedbackOverlay.tsx` to use a refined dark glass card (`bg-[#181816]/95`) while maintaining correct/incorrect background flash triggers. <!-- sdd-owner: implementation -->
- [ ] Modify `app/games/pelimojis/page.tsx` to remove legacy yellow backgrounds, update the turn overlay to the dark hybrid aesthetic, and adjust layout to prevent collision with the new exit link. <!-- sdd-owner: implementation -->
- [ ] Update `components/game/GameShell.test.tsx` to include verification for the persistent exit navigation and hybrid design attributes while maintaining 100% pass rate. <!-- sdd-owner: implementation -->
- [ ] Perform comprehensive verification: `npm test` (28 tests), `npm run build` (19 routes), `npx tsc --noEmit`, and `npm run lint`. <!-- sdd-owner: implementation -->

## Parent Tasks (Review)

- [ ] Perform bounded review of the UI styling transition and navigation flow implementation. <!-- sdd-owner: parent -->
- [ ] Verify accessibility compliance for new dark glass controls (`"Volver al inicio"`, `"Comenzar el juego"`). <!-- sdd-owner: parent -->
