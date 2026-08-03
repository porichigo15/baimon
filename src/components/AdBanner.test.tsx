import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdBanner } from "./AdBanner";
import { CONSENT_COOKIE, writeConsent } from "../lib/consent";

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
  window.adsbygoogle = undefined;
});

describe("AdBanner", () => {
  it("shows a placeholder without pushing ads when consent is missing", () => {
    render(<AdBanner />);
    expect(screen.getByText(/โฆษณา/)).toBeInTheDocument();
    expect(window.adsbygoogle).toBeUndefined();
  });

  it("pushes the ad unit after consent is accepted", () => {
    writeConsent("accepted");
    render(<AdBanner />);
    expect(window.adsbygoogle).toEqual([{}]);
  });

  it("does not push ads when consent is declined", () => {
    writeConsent("declined");
    render(<AdBanner />);
    expect(screen.getByText(/โฆษณา/)).toBeInTheDocument();
    expect(window.adsbygoogle).toBeUndefined();
  });

  it("renders in page flow without fixed positioning on any screen", () => {
    render(<AdBanner />);
    const wrapper = screen.getByText(/โฆษณา/).closest("section");
    expect(wrapper).toHaveClass("mx-auto", "mb-12", "mt-6", "max-w-150");
    expect(wrapper).not.toHaveClass("fixed");
    expect(wrapper).not.toHaveClass(/xl:fixed|xl:left-4|xl:top-24|xl:w-40/);
  });
});