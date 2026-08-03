import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("ads.txt route", () => {
  it("returns a text/plain ads.txt body with the pub- id and reseller tag", async () => {
    const response = await GET();
    expect(response.headers.get("Content-Type")).toContain("text/plain");
    const body = await response.text();
    expect(body).toMatch(/^google\.com, pub-[\dX]{16}, DIRECT, f08c47fec0942fa0\n$/);
    expect(body).not.toContain("ca-");
  });
});
