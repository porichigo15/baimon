# Baimon (ใบหม่อน) — Top Ad Placement Final Plan

Date: 2026-09-27 · Phase 5 of 5 (final-plan)

## Feature

Repositioned `AdBanner` to the top section of the page (below header, above calculator form and tool cards) across `/`, `/split-half`, `/thai-help`, and `/party` following Google AdSense Leaderboard / Top Banner placement best practices.

## What was done

- **`src/app/page.tsx`**:
  - Moved `AdBanner` between the hero section and tool cards container.
  - Removed bottom `AdBanner`.
- **`src/app/split-half/page.tsx`**:
  - Placed `AdBanner` at the top of the main container above the title.
  - Removed bottom `AdBanner`.
- **`src/app/thai-help/page.tsx`**:
  - Placed `AdBanner` at the top of the main container above the title.
  - Removed bottom `AdBanner`.
- **`src/app/party/page.tsx`**:
  - Placed `AdBanner` at the top of the main container above the title.
  - Removed bottom `AdBanner`.

## Test Results

- **Vitest**: 18 test files passed (80 tests passed, 0 failed).
- **ESLint**: 0 errors.
- **Next.js Production Build**: 12/12 static/dynamic routes compiled successfully.

## How to Run

```bash
npm run dev     # Start development server at http://localhost:3000
npm run test    # Run unit tests
npm run lint    # Run ESLint
npm run build   # Production build
```
