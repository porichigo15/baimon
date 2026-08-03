import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./page";

describe("PrivacyPage", () => {
  it("shows the Thai heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { name: "นโยบายความเป็นส่วนตัว" })).toBeInTheDocument();
  });

  it("explains that calculations run in the browser", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/ทำงานภายในเบราว์เซอร์ของคุณเท่านั้น/)).toBeInTheDocument();
  });

  it("mentions the consent cookie", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/baimon_cookie_consent/)).toBeInTheDocument();
  });

  it("links to the Google privacy policy", () => {
    render(<PrivacyPage />);
    const link = screen.getByRole("link", { name: "นโยบายความเป็นส่วนตัวของ Google" });
    expect(link).toHaveAttribute("href", "https://policies.google.com/privacy");
  });

  it("shows the contact email", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/contact@lomanaloma\.com/)).toBeInTheDocument();
  });

  it("links back to the home page", () => {
    render(<PrivacyPage />);
    const link = screen.getByRole("link", { name: "กลับหน้าหลัก" });
    expect(link).toHaveAttribute("href", "/");
  });
});