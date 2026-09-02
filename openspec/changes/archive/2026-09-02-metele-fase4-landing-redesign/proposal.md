# Proposal: Metele Fase 4 — Landing Redesign

## Intent

Turn the podcast hub into a dark, energetic Metele Nomás destination that clearly connects the podcast identity with its 15 minigames. The current yellow/white comic landing is visually separate from the approved dark/glass reference.

## Scope

### In Scope
- Restyle `Hero`, `GameGrid`, `Footer`, `app/layout.tsx`, and landing styles with black surfaces, colored blurred blobs, dot-grid, signature gradients, glass cards, ticker, and responsive typography.
- Add namespaced landing tokens/utilities in `app/globals.css`; never replace `comic-*` tokens.
- Give landing CTAs and social links glass/gradient styling, using a backward-compatible `ComicButton` variant or conditional class.
- Preserve all 15 cards, copy, assets, routes, and the supplied official social URLs.

### Out of Scope
- GameShell, game routes, in-game ComicButton styles, feedback, scoreboards, data, backend, route structure, new dependencies, and real asset generation.

## Capabilities

### New Capabilities
- `landing-experience`: Dark/glass podcast presentation, game navigation, branded CTAs, and official social destinations.

### Modified Capabilities
- None; minigame behavior and game UI requirements remain unchanged.

## Approach

Add landing-only palette, gradient, glass, blob, dot-grid, light-line, and animation utilities. Refactor the three home sections to consume them while retaining existing images and useful Framer Motion behavior. Add reduced-motion fallbacks, focus states, and responsive contrast. Keep `ComicButton` defaults unchanged. Set the landing root surface to black without altering game-shell styling.

## Affected Areas

| Area | Impact |
|---|---|
| `app/globals.css`, `app/layout.tsx` | Landing tokens and root surface. |
| `components/home/{Hero,GameGrid,Footer}.tsx` | Layout, cards, CTA, ticker, socials. |
| `components/ui/ComicButton.tsx` | Optional landing-only variant. |

## Risks

| Risk | Mitigation |
|---|---|
| Shared styles regress games | Preserve defaults; verify representative game routes. |
| Dark motion UI harms accessibility | Check contrast/focus and honor reduced motion. |
| Work exceeds 400 review lines | Split into independently verifiable slices if forecast high. |

## Rollback

Revert the landing, layout/global-style, and optional button-variant changes. No data, routes, dependencies, or game behavior require migration.

## Success Criteria

- [ ] Approved dark/glass identity works at mobile and desktop widths.
- [ ] All 15 cards and official social links remain correct and usable.
- [ ] Comic tokens and representative game UI remain behaviorally unchanged.
- [ ] Contrast, focus, responsiveness, and reduced-motion behavior are preserved.
- [ ] `npm test`, lint, typecheck, and build pass without new dependencies.

## Proposal question round

These questions are offered to improve product rules, implications, edge cases, and tradeoffs; the user may answer, skip, correct the framing, or request another round. Assumptions: existing copy/assets stay, CTA routes stay, and external socials open in a new tab.

1. Should the hero add a dedicated “JUGAR AHORA” anchor, or are card CTAs sufficient?
2. Is `prefers-reduced-motion` required for every blob, ticker, and parallax animation?
3. Should `final-bg.png` remain the primary footer identity asset if it conflicts with the dark surface?
