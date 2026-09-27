import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("shows the hero heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /คำนวณแบ่งเงิน/ })).toBeInTheDocument();
  });

  it("renders the three tool cards as images with Thai alt text", () => {
    render(<HomePage />);

    const splitHalf = screen.getByAltText("คำนวณคนละครึ่ง");
    expect(splitHalf).toHaveAttribute("src", "/images/split-half.png");

    const thaiHelp = screen.getByAltText("คำนวณไทยช่วยไทย 60/40");
    expect(thaiHelp).toHaveAttribute("src", "/images/thai-help.png");

    const party = screen.getByAltText("หารกัน");
    expect(party).toHaveAttribute("src", "/images/party.png");
  });

  it("links each card image to its calculator page", () => {
    render(<HomePage />);
    expect(screen.getByAltText("คำนวณคนละครึ่ง").closest("a")).toHaveAttribute("href", "/split-half");
    expect(screen.getByAltText("คำนวณไทยช่วยไทย 60/40").closest("a")).toHaveAttribute("href", "/thai-help");
    expect(screen.getByAltText("หารกัน").closest("a")).toHaveAttribute("href", "/party");
  });

  it("renders the feature highlights section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /ทำไมต้องเลือกใช้/ })).toBeInTheDocument();
    expect(screen.getByText("คำนวณแม่นยำ ไร้ข้อโต้แย้ง")).toBeInTheDocument();
  });
});