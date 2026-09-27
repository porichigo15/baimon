# Baimon (ใบหม่อน) — Custom Remaining Government Support Limit Final Plan

Date: 2026-09-27 · Phase 5 of 5 (final-plan)

## Feature

Added customizable remaining government subsidy budget (`remainingLimit`) with default value `200` to both:
1. **คนละครึ่ง 50/50** (`/split-half`)
2. **ไทยช่วยไทย 60/40** (`/thai-help`)

## What was done

- **`src/calc/splitHalf.ts`**:
  - Enhanced `splitHalf(total, remaining?)` to accept an optional remaining limit and cap the government subsidy share accordingly while maintaining exact total amounts.
- **`src/calc/splitHalf.test.ts`**:
  - Added unit test coverage for capped 50/50 splits with various remaining limits (200, 80, 0).
- **`src/app/split-half/page.tsx`**:
  - Added input field for "วงเงินสิทธิ์รัฐคงเหลือ (บาท)" with default value `"200"` and fallback to `DAILY_LIMIT` (200).
  - Added result indicator for "สิทธิ์คงเหลือหลังจ่ายบิลนี้".
- **`src/app/thai-help/page.tsx`**:
  - Added input field for "วงเงินสิทธิ์รัฐคงเหลือ (บาท)" with default value `"200"` and fallback to `DAILY_LIMIT` (200).
  - Added result indicator for "สิทธิ์คงเหลือหลังจ่ายบิลนี้".
- **Unit Tests**:
  - Updated `src/app/split-half/page.test.tsx` (7 tests).
  - Updated `src/app/thai-help/page.test.tsx` (7 tests).

## Test Results

- **Vitest**: 18 test files passed (80 tests passed, 0 failed).
- **ESLint**: 0 errors.
- **Next.js Production Build**: Compiled successfully for all 12 routes.

## How to Run

```bash
npm run dev     # Start development server at http://localhost:3000
npm run test    # Run unit tests
npm run lint    # Run ESLint
npm run build   # Run production build
```
