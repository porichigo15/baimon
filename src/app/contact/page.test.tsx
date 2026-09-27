import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("shows the Thai heading", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { name: "ติดต่อเรา" })).toBeInTheDocument();
  });

  it("shows the contact email link", () => {
    render(<ContactPage />);
    const emailLink = screen.getByRole("link", { name: "contact@lomanaloma.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:contact@lomanaloma.com");
  });

  it("links back to the home page", () => {
    render(<ContactPage />);
    const link = screen.getByRole("link", { name: "กลับหน้าหลัก" });
    expect(link).toHaveAttribute("href", "/");
  });
});
