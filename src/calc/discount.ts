import { round2 } from "./round";

export type DiscountType = "percent" | "baht";

export function applyDiscount(
  total: number,
  type: DiscountType,
  discount: number
): number {
  if (!Number.isFinite(total) || discount <= 0) return total;
  const reduced = type === "percent" ? total * (1 - discount / 100) : total - discount;
  return Math.max(0, round2(reduced));
}