# HintLadder — Guided DSA Problem-Solving Workspace

**HintLadder** is an interactive Data Structures & Algorithms (DSA) learning workspace designed around **progressive reasoning rather than spoiler code dumps**. Instead of handing over full solutions immediately, HintLadder helps students get unstuck through a 3-rung progressive hint ladder, an instant JavaScript complexity estimator, an interactive dry-run stepper, and a concept verification gate.

---

## Core Features

1. **"Will It TLE?" Complexity Estimator (Pure JS):** Estimates operation counts against input constraints ($N = 10^2$ to $10^6$) to warn whether an approach will hit Time Limit Exceeded before requesting hints.
2. **3-Rung Progressive Hint Ladder:**
   - **Rung 1:** Conceptual intuition & why the current approach fails.
   - **Rung 2:** Target pattern & data structure (`-15` Independence Points).
   - **Rung 3:** Advanced edge cases & dry-run guidance (`-25` Independence Points).
3. **Interactive Dry-Run Stepper:** Step-by-step visual walkthrough (`Previous` / `Next`) showing how pointers and state evolve across a sample input.
4. **Logic Gate Verification (`Screen 2`):** A 1-question concept check required to verify understanding before logging a problem as solved.
5. **Spaced-Repetition Revision Queue (`Screen 3`):** Tracks solved problems, calculates an **Independence Score (out of 100)**, supports search/filtering/sorting, and exports progress to JSON.
6. **Arctic Indigo Dual Theme:** Built-in Light Mode and Dark Mode with persistent `localStorage` state.

---

## Project Criteria Alignment

- **Uniqueness:** Replaces passive code-copying with structured, step-by-step problem-solving friction and an Independence Score metric.
- **Purposeful Use of AI:** Deterministic tasks (TLE operation math, hint locking, score deductions, filtering, and `localStorage` persistence) run in pure JavaScript, reserving AI integration strictly for generating structured problem hints and verification checks from user attempts.
- **Practicality & Future Scope:** Ready for daily DSA practice alongside platforms like LeetCode and Codeforces, with a modular architecture ready to scale into a full React + AI API application and browser extension.

---

## Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/hint-ladder.git