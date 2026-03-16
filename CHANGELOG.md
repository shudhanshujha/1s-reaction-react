# Changelog

## [2026-03-15]
### Initial Implementation of "1 Second Reaction"
- Created project structure with `components`, `hooks`, `pages`, and `styles`.
- Implemented `useLocalStorage` for state persistence.
- Implemented `useGameLogic` for core game mechanics (bar movement, difficulty scaling).
- Created `GameBar`, `PerfectZone`, `ScoreBoard`, `Shop`, `StartScreen`, and `GameOverScreen` components.
- Added skin system with Neon, Fire, Electric, and Gold styles.
- Added coin system and simulated rewarded ads.
- Set up `GamePage` as the main controller.
- Updated `App.tsx` and styles for a mobile-first experience.

### [2026-03-15] - Update
- Adjusted `INITIAL_SPEED` from 2 to 1 for a slower start.
- Adjusted `SPEED_INCREMENT` from 0.5 to 0.2 for a more gradual difficulty curve.

