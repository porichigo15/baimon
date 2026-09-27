import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("shows the Thai heading", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { name: "ข้อกำหนดและเงื่อนไขการใช้งาน" })).toBeInTheDocument();
  });

  it("renders terms of service sections", () => {
    render(<TermsPage />);
    expect(screen.getByText("1. การยอมรับข้อกำหนด")).toBeInTheDocument();
    expect(screen.getByText("3. ข้อจำกัดความรับผิดชอบ (Disclaimer)")).toBeInTheDocument();
  });

  it("links back to the home page", () => {
    render(<TermsPage />);
    const link = screen.getByRole("link", { name: "กลับหน้าหลัก" });
    expect(link).toHaveAttribute("href", "/");
  });
});
