---
name: implement
description: Use when writing or editing code for the baimon (ใบหม่อน) money-splitting website, including scaffolding the Next.js project. Trigger words: implement, code, build, เขียนโค้ด, scaffold, create pages. This is phase 3 of the 5-phase workflow (analyze -> create-plan -> implement -> unit-test -> final-plan). Read the plan from docs/plans/ before writing code.
---

# Implement

Phase 3 of the baimon (ใบหม่อน) workflow. Write the actual code per the plan
created in create-plan and the conventions in AGENTS.md.

## Steps

1. **Read the plan.** Load `docs/plans/<date>-<feature>.md`. If it is missing or stale, first run create-plan.
2. **Scaffold if needed.** If the repo is empty (no `package.json`), scaffold the Next.js app in a temp folder and move files in:
   `npx create-next-app@latest baimon --typescript --tailwind --app --eslint --src-dir --no-import-alias`
   Then set up Vitest + React Testing Library and add scripts `test` to `package.json`. Confirm Node/npm exist first with `node --version`.
3. **Implement pure calculations first.** Each feature gets a framework-free module in `src/calc/`:
   - 50/50: `share = total / 2` for both rows.
   - 60/40: `shareA = round2(total * 0.6)`, `shareB = round2(total * 0.4)`.
   - party/group: divide evenly among N; assign the satang remainder to the first row so the sum equals the total exactly.
   Export only pure functions taking numbers, returning numbers — no React, no DOM, no `Intl` inside.
4. **Implement UI second.** Client calculator pages (`"use client"`) hold their own input state via `useState`. Use Server Components for everything non-interactive (home page, layout).
5. **Follow conventions** from AGENTS.md:
   - All user-facing labels in Thai: จำนวนเงินรวม (total), แบ่งให้กี่คน (people count), แต่ละคนจ่าย (each pays).
   - Currency inputs `type="number"`, step `0.01`, min `0`.
   - Format results with `Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })`.
   - Tailwind utility classes only; no external UI libraries; no comments except on non-obvious domain logic.
6. **Verify** with `npm run build` and `npm run lint`; fix any errors before finishing.

## Rules

- Do not skip the unit-test phase afterward — tests are a separate phase, but write code so it is testable (pure calc functions, props-driven components).
- Do not commit, do not publish. Just make the plan work.
- Report back which files were created/changed and confirm `npm run build` passed.