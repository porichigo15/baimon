---
name: create-plan
description: Use when requirements for the baimon (ใบหม่อน) money-splitting website have been analyzed or need to be turned into an actionable task list. Trigger words include plan, แผน, implement plan, task list, steps. This is phase 2 of the 5-phase workflow (analyze -> create-plan -> implement -> unit-test -> final-plan). It produces the working plan and writes it to docs/plans/ but does NOT write application code.
---

# Create Plan

Phase 2 of the baimon (ใบหม่อน) workflow. Turn accepted requirements from
analyze-requirement into an ordered, verifiable task list and persist it.

## Steps

1. **Consume the requirements.** Read the requirements summary from the previous phase. If none exists, run the analyze-requirement steps first.
2. **Map each feature to concrete files.**
   - Pure math → `src/calc/<feature>.ts` (framework-free, exported pure functions).
   - Calculator page → `src/app/<feature>/page.tsx` (client component holding local state).
   - Home landing page → `src/app/page.tsx` with navigation cards.
   - Tests → `src/calc/<feature>.test.ts` and co-located component tests.
3. **Order the tasks** so each depends only on already-done work (calculations before UI, UI before tests).
4. **Note validation rules**: inputs are `type="number"`, step `0.01`, min `0`; currency is THB formatted with `Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })`.
5. **Write the plan** to `docs/plans/<yyyy-mm-dd>-<feature>.md` (e.g. `docs/plans/2026-08-03-5050-split.md`) containing:
   - Feature name (Thai + English).
   - Requirements recap + acceptance criteria.
   - Ordered task list with file paths and responsibilities.
   - Verification steps (`npm run lint`, `npm run test`, manual check at http://localhost:3000).

## Output format

Your final message must contain the ordered task list in markdown, referencing the
written plan file path. Keep it short and actionable — implementation executes it as-is.
Do not write application code in this phase. Preserve acceptance criteria from the
analyze phase exactly.