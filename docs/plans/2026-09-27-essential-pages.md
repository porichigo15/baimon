# Baimon (ใบหม่อน) — Essential Pages Final Plan

Date: 2026-09-27 · Phase 5 of 5 (final-plan)

## Feature

Added essential company, policy, and contact pages to comply with Google AdSense quality and transparency guidelines, eliminating screens without publisher content and dead links:
1. **About Us** (`/about`): Comprehensive company and app introduction for Baimon (ใบหม่อน) and Lomana Loma, mission statement, and core calculation values.
2. **Contact Us** (`/contact`): Official contact channels, email (`contact@lomanaloma.com`), response hours, and issue reporting details.
3. **Terms of Service** (`/terms`): Terms and conditions of website and calculator usage, disclaimers, intellectual property, and update policies.
4. **Footer Navigation**: Updated `src/app/layout.tsx` to link to `/about`, `/terms`, `/privacy`, and `/contact` with clean responsive layout.

## What was done

- **Created Pages**:
  - `src/app/about/page.tsx` — Server component with structured sections on background, mission, key features, and development team.
  - `src/app/contact/page.tsx` — Server component with direct mail link, support hours, and error reporting guide.
  - `src/app/terms/page.tsx` — Server component with 5 legal and operational terms sections.
- **Updated Navigation**:
  - `src/app/layout.tsx` — Updated footer links from `#` placeholders to `<Link>` components pointing to `/about`, `/terms`, `/privacy`, and `/contact`.
- **Created Unit Tests**:
  - `src/app/about/page.test.tsx` (3 tests)
  - `src/app/contact/page.test.tsx` (3 tests)
  - `src/app/terms/page.test.tsx` (3 tests)
- **Bugfixes & Maintenance**:
  - Fixed import paths in `page.tsx`, `split-half/page.tsx`, `thai-help/page.tsx`, and `party/page.tsx` for test compatibility.
  - Exported `THAI_HELP_DAILY_CAP` in `src/calc/splitThaiHelp.ts`.

## Test Results

- **Vitest**: 18 test files passed (73 tests passed, 0 failed).
- **ESLint**: 0 errors.

## How to Run

```bash
npm run dev     # Start development server at http://localhost:3000
npm run test    # Run all Vitest unit tests
npm run lint    # Run ESLint
```
