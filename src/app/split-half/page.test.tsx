import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SplitHalfPage from "./page";

describe("SplitHalfPage", () => {
  it("shows the Thai heading", () => {
    render(<SplitHalfPage />);
    expect(screen.getByRole("heading", { name: "คำนวณคนละครึ่ง" })).toBeInTheDocument();
  });

  it("splits an entered amount in half", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1000");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿500.00")).toHaveLength(2);
    expect(screen.getByText("รวม ฿1,000.00")).toBeInTheDocument();
  });

  it("handles odd satang amounts", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1.01");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText(/฿0.50|฿0.51/)).toHaveLength(2);
  });
});