---
name: unit-test
description: Use when adding or running unit tests for the Baimon (ใบหม่อน) money-splitting website. Trigger words: test, unit test, vitest, testing library, ทดสอบ. This is phase 4 of the 5-phase workflow (analyze -> create-plan -> implement -> unit-test -> final-plan). Covers pure calc functions with Vitest and component render tests with React Testing Library.
---

# Unit Test

Phase 4 of the Baimon (ใบหม่อน) workflow. Prove the implemented behavior with
Vitest + React Testing Library against the acceptance criteria from the plan.

## Stack

- **Vitest** for the runner.
- **React Testing Library** (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event) for rendering calculator components.
- Config lives in `vitest.config.ts` (or `vitest` section of `next.config`). Script: `npm run test`.

## Steps

1. **Copy acceptance criteria** from `docs/plans/<yyyy-mm-dd>-<feature>.md`. Every criterion needs a test.
2. **Unit test every `src/calc/*.ts` function.** One `*.test.ts` per module, co-located. Cover:
   - 50/50: both halves equal, half of `total`; handle `0`.
   - 60/40: shares are `0.6` and `0.4` of total, sum preserved; rounding stays within 2 decimal places (satang).
   - party/group: N people split evenly, first person carries the satang remainder, the per-person shares sum exactly to total; handle N=1 and N>total cases sensibly.
   - Edge cases: `0`, negative values rejected/validated at UI layer, very small (<1 satang) totals.
3. **Render tests for each calculator page/component.** Use RTL to:
   - Render with Thai labels visible (e.g. แบ่งเงิน 50/50).
   - Type input values and assert the result text shows the correct THB amount (`Intl.NumberFormat('th-TH', ...)`).
4. **Run everything:** `npm run test`. All tests must pass. Then run `npm run lint`.
5. **Report** the pass/fail counts and any skips in your final message.

## Rules

- Do not modify production code just to make tests pass if the behavior is wrong — fix production behavior and re-test.
- No snapshot tests for locale-formatted currency unless strictly needed (locale formatting can vary); prefer explicit values or regex assertions.