import { round2 } from "./round";

export const DAILY_LIMIT = 200;

export function splitHalf(total: number): [number, number] {
  const half = round2(total / 2);
  if (half > DAILY_LIMIT) {
    return [DAILY_LIMIT, round2(total - DAILY_LIMIT)];
  }
  
  return [half, round2(total - half)];
}