import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieConsent } from "./CookieConsent";
import { CONSENT_COOKIE } from "../lib/consent";

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
});

describe("CookieConsent", () => {
  it("shows the banner when no consent cookie exists", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("stores acceptance in a browser cookie and hides the banner", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: "ยอมรับทั้งหมด" }));
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=accepted`);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("stores a decline choice in a browser cookie and hides the banner", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: "ปฏิเสธ" }));
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=declined`);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("stays hidden when a consent cookie already exists", () => {
    document.cookie = `${CONSENT_COOKIE}=accepted; Path=/`;
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});