---
name: analyze-requirement
description: Use when a task for the Baimon (ใบหม่อน) money-splitting website starts and its requirements need clarification. Trigger words: analyze, requirement, แบ่งเงิน requirement, clarify, spec, use case. This is phase 1 of the 5-phase workflow (analyze -> create-plan -> implement -> unit-test -> final-plan) defined in AGENTS.md. This skill only collects and captures requirements — it does NOT write code or make file changes.
---

# Analyze Requirement

Phase 1 of the Baimon (ใบหม่อน) money-splitting website workflow. The goal is
to capture crisp, testable requirements before any planning or coding.

## Steps

1. **Restate the request.** Summarize what the user asked for in one short paragraph, in English for machine output.
2. **Ask clarifying questions** using the `question` tool when any of these are ambiguous:
   - Which calculator feature(s): 50/50 (แบ่งเงิน 50/50), 60/40 (แบ่งเงิน 60/40), party/group split (แบ่งเงินให้เพื่อน), or a change to an existing one?
   - Exact behavior: smallest unit (satang vs baht), rounding rule (round, floor, ceil), where the remainder goes.
   - Scope: new page, modify page, shared `src/calc/*.ts` function, or UI/style change.
   - Anything in the request that contradicts AGENTS.md conventions (Thai UI, THB formatting, no external UI libs).
3. **Write the requirements** as a list with acceptance criteria. Keep it short — the details below are the target shape.

## Output

Return to the caller a **requirements summary** in this shape:

```markdown
## Requirements
- Feature: <50/50 | 60/40 | party/group | other>
- Inputs: <list of fields, e.g. จำนวนเงินรวม (baht), แบ่งให้กี่คน>
- Behavior: <exact calculation + rounding/remainder rule>
- Acceptance criteria:
  - <testable statement A>
  - <testable statement B>
- Open questions resolved: <answers obtained>
```

Copy this summary verbatim into your final message so the next phase (create-plan) can pick it up. Do not open files, do not scaffold, do not edit anything. If the user is ambiguous, ask again rather than guess. Do not skip this skill's steps to save time.