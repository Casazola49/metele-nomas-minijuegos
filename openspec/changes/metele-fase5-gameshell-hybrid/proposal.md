# Proposal: metele-fase5-gameshell-hybrid

## Intent

Harmonize the in-game UI with the new dark/glass aesthetic introduced in the landing page (Phase 4), adopting a "Hybrid" style. The goal is to eliminate the glaring comic backgrounds (like `bg-comic-yellow`) and replace them with dark themes (`#1D1D1B`, `bg-comic-black`) and dark glass cards (`bg-[#181816]/95`), while retaining the playful "metele" accents, feedback impact, and comic-style buttons that define the game's personality.

## Scope

### In Scope
- **GameShell.tsx**: Redesign `start`, `playing`, and `gameover` screens with dark backgrounds, dark glassmorphism cards, gradient texts, and landing-style buttons. Ensure accessible, no-reload exit navigation during gameplay.
- **Scoreboard.tsx**: Update to a dark glass card with vibrant metele accents for scores.
- **FeedbackOverlay.tsx**: Keep the high-energy green/red visual impact but stylize the inner card for a cleaner finish.
- **app/games/pelimojis/page.tsx**: Remove hardcoded `bg-comic-yellow` classes from the main container and turn overlay to match the new dark GameShell.
- **GameShell.test.tsx**: Ensure 100% test pass rate by preserving all existing `aria-label`s, roles, and behaviors.

### Out of Scope
- Generating or integrating real image assets (continue using placeholders/emojis).
- Altering any game logic, rules, datasets, or the `useGameTurn` hook.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

*(This is a pure UI/styling refactor; no functional requirements or capabilities are changing.)*

## Approach

We will apply Tailwind utility classes corresponding to the new dark/glass design language (`#1D1D1B` background, `landing-dot-grid`, `bg-[#181816]/95`, `backdrop-blur-xl`, `border-white/10`) to the GameShell containers and cards. We will replace legacy `bg-comic-yellow` and `bg-comic-red` backgrounds with `bg-comic-black text-white` or dark variants while ensuring button variants (`variant="landing"`) and vibrant text gradients are used for primary calls to action. The test suite will be run frequently to guarantee no accessibility or structural regressions occur.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/game/GameShell.tsx` | Modified | Updated styles for `start`, `playing`, and `gameover` states. |
| `components/game/Scoreboard.tsx` | Modified | Applied dark glass styling and vibrant text accents. |
| `components/ui/FeedbackOverlay.tsx` | Modified | Cleaned up inner card styling while maintaining color impact. |
| `app/games/pelimojis/page.tsx` | Modified | Removed hardcoded background colors to inherit the dark theme. |
| `components/game/GameShell.test.tsx` | Modified | Adjusted only if necessary to accommodate style changes, though roles/aria remain untouched. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Accessibility regressions (contrast/focus) | Low | Retain existing `aria-labels` and roles. Verify text contrast on dark backgrounds. |
| Test failures due to structural changes | Medium | Avoid changing the DOM tree unnecessarily; focus on class changes. Verify with `GameShell.test.tsx`. |
| Broken navigation in `playing` state | Low | Use Next.js `<Link>` or standard button routing for the exit action to avoid full page reloads. |

## Rollback Plan

Revert the specific Git commit containing these styling changes. The previous commit will contain the fully functional, legacy yellow/comic GameShell.

## Dependencies

- Tailwind CSS configuration must already support the custom colors/plugins used in Phase 4 (e.g., `landing-dot-grid`, `landing-gradient-text`).

## Success Criteria

- [ ] All 15 games render the new dark/glass GameShell consistently.
- [ ] No `bg-comic-yellow` backgrounds are visible in standard gameplay or the `pelimojis` specific screens.
- [ ] Exit button works without a full page reload.
- [ ] `GameShell.test.tsx` and the broader test suite pass at 100%.
