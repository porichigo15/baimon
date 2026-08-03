---
name: final-plan
description: Use when work on the baimon (ใบหม่อน) money-splitting website is finishing and a wrap-up summary is due. Trigger words: final, สรุป, wrap up, done, finish, summary. This is phase 5 of the 5-phase workflow (analyze -> create-plan -> implement -> unit-test -> final-plan). ALWAYS writes or updates a final plan markdown file in docs/plans/ regardless of whether earlier phases ran. Never skip this file.
---

# Final Plan

Phase 5 of the baimon (ใบหม่อน) workflow. Every task — even overridden or
partially-run tasks — must end with a final plan `.md` written to
`docs/plans/`. This is a hard requirement from AGENTS.md: do not skip it.

## Steps

1. **Collect facts.** Gather from the session: the requirements, what was implemented (files created/modified), test results (which tests passed/failed/skipped), and the commands proven to work.
2. **Determine the filename.** `docs/plans/<yyyy-mm-dd>-<feature>.md` using today's date and a short feature slug (e.g. `2026-08-03-5050-split.md`). The `docs/plans/` directory is created automatically.
3. **Write the final plan** containing:
   - **Feature**: name in Thai + English (e.g. แบ่งเงิน 50/50 — Split 50/50).
   - **Requirements recap**: one paragraph + acceptance criteria as-written.
   - **What was done**: file paths with one-line responsibilities (`src/calc/...`, pages, tests).
   - **Test results**: exact counts, e.g. `npx vitest run` → 12 passed, 0 failed; note `npm run lint` status.
   - **Verification steps**: `npm run build`, `npm run lint`, `npm run test`, and manual check at http://localhost:3000 for each calculator.
   - **How to run**: `npm run dev` → open http://localhost:3000.
   - **Follow-ups** (optional): anything explicitly deferred.
4. **Update status if phases were skipped.** Note clearly in the plan if analyze/create-plan/implement/unit-test were overridden by the user — the final plan still gets written.

## Output

Print the final plan content in your chat message as well so the user sees it without opening the file. Keep it concise but complete. End by pointing to the saved `docs/plans/<date>-<feature>.md` path.