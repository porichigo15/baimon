import { describe, expect, it } from "vitest";
import { splitHalf } from "./splitHalf";

describe("splitHalf", () => {
  it("splits an even amount equally", () => {
    expect(splitHalf(1000)).toEqual([500, 500]);
  });

  it("splits an odd amount equally", () => {
    expect(splitHalf(1001)).toEqual([500.5, 500.5]);
  });

  it("keeps the satang remainder in the second share so the sum is exact", () => {
    expect(splitHalf(1.01)).toEqual([0.51, 0.5]);
  });

  it("handles zero", () => {
    expect(splitHalf(0)).toEqual([0, 0]);
  });

  it("preserves the total", () => {
    const [a, b] = splitHalf(1234.56);
    expect(a + b).toBeCloseTo(1234.56, 10);
  });
});