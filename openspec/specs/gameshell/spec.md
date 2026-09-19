# gameshell Specification

## Purpose

Define the presentation and interaction requirements for the shared game wrapper (`GameShell`), in-game score tracking (`Scoreboard`), and visual feedback overlays (`FeedbackOverlay`). The GameShell establishes the visual identity, lifecycle transitions (start, playing, gameover), and navigation controls across all minigames, adopting a hybrid aesthetic that pairs dark glassmorphism styling (`#1D1D1B`, `bg-comic-black`, `landing-dot-grid`, `bg-[#181816]/95`) with high-energy comic accents.

## Requirements

### Requirement: Start Screen Hybrid Styling

The `GameShell` component MUST present an initial configuration screen using the dark glass hybrid aesthetic, allowing the user to select the player count and initiate gameplay while maintaining accessible action controls.

Touches: `components/game/GameShell.tsx`, `components/ui/ComicButton.tsx`.

#### Scenario: Rendering Start Screen with Hybrid Theme
- GIVEN `GameShell` mounts in the `"start"` state
- WHEN the start screen renders
- THEN it MUST display an outer canvas with background color `#1D1D1B` and the `landing-dot-grid` utility pattern
- AND it MUST render a centered glass card container styled with `bg-[#181816]/95 border-2 border-white/10 backdrop-blur-xl shadow-2xl`
- AND the game title MUST be rendered using the `landing-gradient-text` styling class
- AND the player count selector MUST highlight the currently selected count button using a vibrant gradient (`from-metele-pink to-metele-orange` or pink-to-orange gradient styling with white text)
- AND the unselected player count buttons MUST be rendered with a subtle dark glass appearance (`bg-white/5 border-white/10 text-white/70 hover:bg-white/10`)
- AND the "Volver" button MUST render using `ComicButton` with `variant="landing"` and accessible name `"Volver al inicio"`
- AND the start action button MUST render with role `"button"` and accessible name `"Comenzar el juego"`.

#### Scenario: Selecting Player Count and Starting
- GIVEN `GameShell` is on the start screen with player count 1 selected
- WHEN the user clicks the button with accessible name `"2"`
- AND the user clicks the button with accessible name `"Comenzar el juego"`
- THEN the `onStart` callback MUST be invoked with `2`
- AND `GameShell` MUST transition to the `"playing"` state.

---

### Requirement: Playing Screen and Exit Navigation

The `GameShell` component MUST render the active game area with dark container aesthetics and provide accessible navigation to exit the game session without triggering a full page reload.

Touches: `components/game/GameShell.tsx`, `components/game/Scoreboard.tsx`.

#### Scenario: Rendering Playing Screen
- GIVEN `GameShell` transitions to the `"playing"` state
- WHEN the active game view renders
- THEN the root container MUST use `bg-comic-black text-white` without any `bg-comic-yellow` or light-canvas backgrounds
- AND children content MUST be rendered within the container.

#### Scenario: Exit Navigation During FullScreen Play
- GIVEN `GameShell` is in the `"playing"` state with `fullScreen={true}`
- WHEN the playing viewport renders
- THEN it MUST provide an accessible button or Next.js `Link` pointing to `"/"` allowing the user to exit back to the home view
- AND activating the exit control MUST navigate via client-side routing without causing a full page refresh.

#### Scenario: Feedback Action Button
- GIVEN `GameShell` is in the `"playing"` state and `feedback` is set to `"correct"` or `"incorrect"`
- WHEN the feedback display becomes active
- THEN a `"Siguiente"` action button MUST appear with role `"button"` and accessible name `"Siguiente pregunta"`.

---

### Requirement: Game Over Screen and Styled Leaderboard

The `GameShell` component MUST display a final score summary or leaderboard in the hybrid aesthetic when the game ends, offering navigation back to home or a game restart.

Touches: `components/game/GameShell.tsx`, `components/ui/ComicButton.tsx`.

#### Scenario: Rendering Final Leaderboard
- GIVEN `GameShell` has `isGameOver={true}` and a `finalScores` array of multiple players
- WHEN the game over screen renders
- THEN the canvas MUST use `#1D1D1B` with `landing-dot-grid` and a centered dark glass card (`bg-[#181816]/95 border-2 border-white/10 backdrop-blur-xl shadow-2xl`)
- AND the title `"¡Juego Terminado!"` MUST be rendered with landing gradient text
- AND the leaderboard entries MUST display ranked visual badges (such as gold/`metele-yellow` badge for `#1`, and metele theme accents for subsequent places)
- AND the exit button MUST render as `"Salir"` with `ComicButton` `variant="landing"` and link to `"/"`
- AND the restart button MUST render with role `"button"` and accessible name `"Jugar de nuevo"`.

#### Scenario: Resetting the Game from Game Over
- GIVEN `GameShell` is showing the game over screen
- WHEN the user clicks the button with accessible name `"Jugar de nuevo"`
- THEN the `onReset` callback MUST be called
- AND `GameShell` MUST return to the `"start"` state.

---

### Requirement: Hybrid Scoreboard Component

The `Scoreboard` component MUST present the current player's score and optional high score using dark glass styling with vibrant accent typography.

Touches: `components/game/Scoreboard.tsx`.

#### Scenario: Rendering Dark Glass Scoreboard
- GIVEN `Scoreboard` is rendered with `score={10}` and `highScore={25}`
- WHEN the component mounts
- THEN the score pill MUST apply dark glass styling (`bg-[#181816]/90 border-2 border-white/20 shadow-comic backdrop-blur-md text-white`)
- AND the score number MUST be rendered with a vibrant metele accent color (such as `text-metele-yellow` or `text-metele-pink`)
- AND the high score badge MUST use dark glass styling consistent with the active score pill.

---

### Requirement: FeedbackOverlay Visual Continuity

The `FeedbackOverlay` component MUST preserve the high-contrast full-screen flash for answer outcomes while styling the modal card with refined borders and clean drop shadows.

Touches: `components/ui/FeedbackOverlay.tsx`.

#### Scenario: Correct Answer Overlay
- GIVEN `FeedbackOverlay` receives `type="correct"`
- WHEN the overlay renders
- THEN the backdrop MUST flash with high-energy translucent green (`bg-green-500/80`)
- AND the inner dialog card MUST display `"¡Correcto!"` and `"Ding! Ding! Ding!"` with clear typography and high contrast.

#### Scenario: Incorrect Answer Overlay
- GIVEN `FeedbackOverlay` receives `type="incorrect"`
- WHEN the overlay renders
- THEN the backdrop MUST flash with high-energy translucent red (`bg-red-500/80`)
- AND the inner dialog card MUST display `"¡Incorrecto!"` and `"Bocinazo!"` with clear typography and high contrast.

---

### Requirement: Game Container Harmony and Test Preservation

All minigame views (including `pelimojis` and the other 14 game routes) MUST harmonize with the dark GameShell theme without background color clashing, and all existing automated tests MUST remain passing.

Touches: `app/games/pelimojis/page.tsx`, `components/game/GameShell.test.tsx`.

#### Scenario: Pelimojis Dark Harmony
- GIVEN the `PelimojisGame` route is mounted
- WHEN the game renders in any state (`start`, turn change overlay, playing movie view)
- THEN no element SHALL apply hardcoded legacy `bg-comic-yellow` backgrounds
- AND the turn transition overlay MUST harmonize with the dark canvas without clashing yellow blocks.

#### Scenario: Existing Test Suite Integrity
- GIVEN the full test suite runs with Vitest (`npm test`)
- WHEN all component tests in `components/game/GameShell.test.tsx` and related game suites execute
- THEN all tests MUST pass with zero failures
- AND all required accessible roles (`"Comenzar el juego"`, `"Siguiente pregunta"`, `"¡Juego Terminado!"`, `"Jugar de nuevo"`) MUST remain fully queryable.
