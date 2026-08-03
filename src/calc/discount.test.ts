import { describe, expect, it } from "vitest";
import { applyDiscount } from "./discount";

describe("applyDiscount", () => {
  it("applies a percent discount", () => {
    expect(applyDiscount(1000, "percent", 10)).toBe(900);
    expect(applyDiscount(500, "percent", 25)).toBe(375);
  });

  it("applies a fixed baht discount", () => {
    expect(applyDiscount(1000, "baht", 200)).toBe(800);
    expect(applyDiscount(1234.56, "baht", 34.56)).toBe(1200);
  });

  it("keeps the total unchanged when no discount is given", () => {
    expect(applyDiscount(1000, "percent", 0)).toBe(1000);
    expect(applyDiscount(1000, "baht", 0)).toBe(1000);
  });

  it("never returns a negative total", () => {
    expect(applyDiscount(100, "baht", 200)).toBe(0);
    expect(applyDiscount(100, "percent", 150)).toBe(0);
  });

  it("rounds to 2 decimal places", () => {
    expect(applyDiscount(33.33, "percent", 10)).toBe(30);
    expect(applyDiscount(0.05, "baht", 0.03)).toBe(0.02);
  });
});