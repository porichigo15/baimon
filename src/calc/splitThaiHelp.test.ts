import { describe, expect, it } from "vitest";
import { splitThaiHelp, THAI_HELP_DAILY_CAP } from "./splitThaiHelp";

describe("splitThaiHelp", () => {
  it("gives 60/40 within the daily cap", () => {
    expect(splitThaiHelp(100, THAI_HELP_DAILY_CAP)).toEqual({
      govShare: 60,
      userShare: 40,
      newRemaining: 140,
    });
  });

  it("caps the government share at the 200-baht daily support", () => {
    expect(splitThaiHelp(500, THAI_HELP_DAILY_CAP)).toEqual({
      govShare: 200,
      userShare: 300,
      newRemaining: 0,
    });
  });

  it("caps the government share at the remaining daily budget", () => {
    expect(splitThaiHelp(300, 100)).toEqual({
      govShare: 100,
      userShare: 200,
      newRemaining: 0,
    });
  });

  it("gives nothing when the daily budget is exhausted", () => {
    expect(splitThaiHelp(1000, 0)).toEqual({
      govShare: 0,
      userShare: 1000,
      newRemaining: 0,
    });
  });

  it("handles a zero total", () => {
    expect(splitThaiHelp(0, 250)).toEqual({
      govShare: 0,
      userShare: 0,
      newRemaining: 250,
    });
  });

  it("always keeps userShare + govShare equal to the total", () => {
    const { govShare, userShare } = splitThaiHelp(1234.56, 200);
    expect(govShare + userShare).toBeCloseTo(1234.56, 10);
  });
});