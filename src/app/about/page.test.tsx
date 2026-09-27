import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("shows the Thai heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "เกี่ยวกับเรา" })).toBeInTheDocument();
  });

  it("mentions Lomana Loma and Baimon", () => {
    render(<AboutPage />);
    expect(screen.getAllByText("Lomana Loma").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Baimon \(ใบหม่อน\)/).length).toBeGreaterThan(0);
  });

  it("links back to the home page", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: "กลับหน้าหลัก" });
    expect(link).toHaveAttribute("href", "/");
  });
});
