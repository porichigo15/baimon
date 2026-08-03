import { describe, expect, it } from "vitest";
import { round2 } from "./round";

describe("round2", () => {
  it("rounds to 2 decimal places", () => {
    expect(round2(1.005)).toBe(1.01);
    expect(round2(1.004)).toBe(1.0);
    expect(round2(2.5)).toBe(2.5);
    expect(round2(0)).toBe(0);
  });
});