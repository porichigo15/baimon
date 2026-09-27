import { round2 } from "./round";

export const DAILY_LIMIT = 200;

export function splitHalf(total: number, remaining?: number): [number, number] {
  const half = round2(total / 2);
  if (remaining !== undefined) {
    const validRemaining = Math.max(0, remaining);
    const govShare = round2(Math.min(half, validRemaining));
    return [govShare, round2(total - govShare)];
  }
  return [half, round2(total - half)];
}