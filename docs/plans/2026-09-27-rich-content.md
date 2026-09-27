# Baimon (ใบหม่อน) — Rich Content & FAQ Final Plan

Date: 2026-09-27 · Phase 5 of 5 (final-plan)

## Feature

Added educational guides, calculation formulas, scenario tables, and FAQ sections across all calculator pages and the home page. This provides substantial publisher content to comply with Google AdSense quality guidelines and eliminate "Low value content" and "Screens without publisher-content" rejections.

## What was done

- **Split Half (`/split-half`)**:
  - Added "หลักการคำนวณคนละครึ่ง (50/50)" explanation with calculation formula.
  - Added sample calculation comparison table (e.g., ฿100, ฿300 with 10% discount, ฿500).
  - Added FAQ section covering discount order of operation and privacy assurances.
- **Thai Help 60/40 (`/thai-help`)**:
  - Added "หลักการคำนวณไทยช่วยไทย 60/40" explaining the 60% proportional formula and the ฿200/day government cap.
  - Added sample scenario table comparing raw 60% vs. actual government support under and above the cap.
  - Added FAQ section explaining the spend threshold to maximize daily benefits (฿333.34+) and discount handling.
- **Party Split (`/party`)**:
  - Added "หลักการหารเงินและจัดการเศษสตางค์" explaining the Penny Rounding Algorithm and first-person remainder allocation.
  - Added sample group bill table (e.g. ฿100 for 3 people, ฿1,000 for 6 people, ฿2,500 for 4 people).
  - Added FAQ section covering group size limits and tips on Service Charge / VAT inclusion.
- **Home Page (`/`)**:
  - Added "ทำไมต้องเลือกใช้ Baimon (ใบหม่อน)" feature highlights section.
- **Unit Tests**:
  - Updated `src/app/page.test.tsx` (4 tests).
  - Updated `src/app/split-half/page.test.tsx` (6 tests).
  - Updated `src/app/thai-help/page.test.tsx` (6 tests).
  - Updated `src/app/party/page.test.tsx` (6 tests).

## Test Results

- **Vitest**: 18 test files passed (77 tests passed, 0 failed).
- **ESLint**: 0 errors.

## How to Run

```bash
npm run dev     # Start development server at http://localhost:3000
npm run test    # Run all Vitest unit tests
npm run lint    # Run ESLint
```
