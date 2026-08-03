# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project

- **App name**: Baimon (ใบหม่อน)
- **What it is**: A Thai-language money splitting website. Users can divide and calculate money for a party, split a bill evenly (50/50), or split by proportion (60/40).
- **Language**: All user-facing UI text is in **Thai (th)**. Machine-facing output (code, comments, commit messages) is English.
- **Currency**: Format amounts with `Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })`.

## Features

- **50/50 split** (แบ่งเงิน 50/50): split an amount into two equal shares (`each = total / 2`).
- **60/40 split** (แบ่งเงิน 60/40): `shareA = total * 0.6`, `shareB = total * 0.4`.
- **Party / group split** (แบ่งเงินให้เพื่อน): split a total among N people evenly; the remainder (cents) is assigned to the first row so the party total is preserved exactly.

## Stack & commands

- Next.js (App Router), TypeScript, Tailwind CSS.
- Pure calculation functions live in `src/calc/*.ts` and must stay framework-free (no React, no DOM) so they can be unit tested in isolation.
- Unit tests: Vitest + React Testing Library.

```bash
npx create-next-app@latest baimon --typescript --tailwind --app --eslint --src-dir --no-import-alias
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run lint       # lint
npm run test       # run unit tests (vitest)
```

If the project is not yet scaffolded, run the `create-next-app` command above in a temp folder and move the files, or scaffold in place as instructed by the implement skill.

## Workflow — every task runs 5 phases

Every feature or change follows these phases, each backed by an opencode skill in `.opencode/skills/`:

1. **analyze-requirement** — clarify and capture requirements + acceptance criteria.
2. **create-plan** — produce an ordered task list; write a working plan to `docs/plans/`.
3. **implement** — write the code.
4. **unit-test** — add/run Vitest + RTL tests.
5. **final-plan** — ALWAYS write the final plan to `docs/plans/<yyyy-mm-dd>-<feature>.md` summarizing what was done, test results, and how to run.

Do not skip phases; if a phase is overridden by the user, still produce the final plan `.md`.

## Conventions

- Prefer Server Components by default. Use `"use client"` only in interactive calculator components.
- Keep calculator input/state local to each page or component.
- Thai UI labels. e.g. จำนวนเงินรวม (total), แบ่งให้กี่คน (number of people), แต่ละคนจ่าย (each person pays).
- Currency inputs: `type="number"`, step `0.01`, min `0`.
- No external UI component libraries — Tailwind utility classes only.
- No comments unless they explain non-obvious domain logic.
- Run `npm run lint` and `npm run test` before finishing work.