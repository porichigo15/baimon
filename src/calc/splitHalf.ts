import { round2 } from "./round";

export function splitHalf(total: number): [number, number] {
  const half = round2(total / 2);
  return [half, round2(total - half)];
}