# HINTLADDER — MASTER UI DESIGN SPECIFICATION & PROJECT CONTEXT

## 1. Project Identity
- **Project Name:** HintLadder
- **Category:** Interactive DSA learning, guided problem-solving, algorithm complexity analysis, code dry runs, logic verification quizzes, and spaced-repetition revision tracking.
- **Visual Direction:** Arctic Indigo (Coordinated Light Mode & Dark Mode).
- **Core Philosophy:** A calm, high-readability developer learning tool that guides reasoning through progressive friction rather than revealing full solution code. Never revert to the deprecated Obsidian & Gold palette or introduce neon/cyberpunk styling.

## 2. Definitive Color System: Arctic Indigo

### 2.1 Light Mode Tokens
| Purpose | Color Name | HEX |
| :--- | :--- | :--- |
| Main application background | Arctic Mist | `#F6F8FC` |
| Primary cards and surfaces | Pure White | `#FFFFFF` |
| Primary accent and buttons | Arctic Indigo | `#3347B5` |
| Secondary accent / success / progress | Teal | `#16A6A0` |
| Main text | Deep Slate | `#172033` |

### 2.2 Dark Mode Tokens
| Purpose | Color Name | HEX |
| :--- | :--- | :--- |
| Main application background | Midnight Arctic | `#0B1120` |
| Primary cards and surfaces | Deep Navy Slate | `#151F32` |
| Primary accent and buttons | Electric Indigo Blue | `#5794FF` |
| Secondary accent / success / progress | Cool Teal | `#52D6C7` |
| Main text | Ice White | `#E7EDF8` |

### 2.3 Shared Accent & Semantic Rules
- **Indigo/Blue:** Primary buttons, active navigation, focus rings, selected controls, active hint ladder states.
- **Teal:** Secondary functional accent reserved for correct quiz answers, completed steps, and positive progress states.
- **Accessibility:** Never rely on color alone for status; always pair color with icons, badges, or clear text labels.

## 3. Global Light/Dark Mode Requirements
- Must be accessible via a global toggle in the top navigation bar.
- Switching themes updates all screens and components immediately without resetting current problem inputs, unlocked hints, dry-run step, quiz state, or revision history.
- Theme preference persists independently in `localStorage` under `hintladder-theme`.

## 4. Core Application Screens & Preserved Functionality
1. **Screen A — Workspace (`#screen-workspace`):**
   - Quick problem presets (`substring`, `subarray`, `knapsack`).
   - Pure-JS "Will It TLE?" complexity estimator (`#inputSize`, `#complexity`).
   - Problem title, statement, and "What have you tried so far?" inputs.
   - Independence Score tracker (`100` start, `-15` for Rung 2, `-25` for Rung 3).
   - 3-Rung progressive hint ladder with sequential unlocking.
   - Interactive 4-step code dry-run stepper (`Prev` / `Next` controls).
2. **Screen B — Logic Gate (`#screen-logic`):**
   - 1-question multiple-choice concept verification gate before logging a problem as solved.
   - Immediate answer feedback and retry flow.
3. **Screen C — Revision Queue (`#screen-revision`):**
   - Summary metrics (Problems logged, Average independence, Needs revision, Current focus).
   - Search input, status filter (`all`, `due`, `mastered`), and sorting (`scoreAsc`, `scoreDesc`, `title`).
   - Reopening a problem into the Workspace (`Review →`) and JSON export (`hintladder-progress.json`).
   - Persistence in `localStorage` under `hintladder-records`.

## 5. Development & Collaboration Rules
- Inspect existing files and state management before making changes.
- Preserve all working interactions and persistence unless explicitly asked to modify them.
- Make focused, incremental changes rather than rewriting the entire codebase.
- Clearly distinguish frontend demo functionality from live AI/backend integrations.