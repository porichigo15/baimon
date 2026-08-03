import { describe, expect, it } from "vitest";
import { splitParty } from "./splitParty";

describe("splitParty", () => {
  it("splits an amount evenly among N people", () => {
    expect(splitParty(100, 4)).toEqual([25, 25, 25, 25]);
  });

  it("assigns the satang remainder to the first person", () => {
    expect(splitParty(1000, 3)).toEqual([333.34, 333.33, 333.33]);
    expect(splitParty(100.01, 3)).toEqual([33.35, 33.33, 33.33]);
  });

  it("preserves the total exactly", () => {
    const shares = splitParty(100.01, 3);
    expect(shares.reduce((sum, share) => sum + share, 0)).toBeCloseTo(100.01, 10);
  });

  it("handles a single person", () => {
    expect(splitParty(500, 1)).toEqual([500]);
  });

  it("splits amounts below one baht among many people", () => {
    expect(splitParty(1, 4)).toEqual([0.25, 0.25, 0.25, 0.25]);
  });

  it("returns an empty list for zero people", () => {
    expect(splitParty(1000, 0)).toEqual([]);
  });

  it("returns zero shares for a zero total", () => {
    expect(splitParty(0, 3)).toEqual([0, 0, 0]);
  });
});