import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SplitHalfPage from "./page";

describe("SplitHalfPage", () => {
  it("shows the Thai heading", () => {
    render(<SplitHalfPage />);
    expect(screen.getByRole("heading", { name: "คำนวณคนละครึ่ง" })).toBeInTheDocument();
  });

  it("splits an entered amount within the default 200 baht limit", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "100");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿50.00").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("฿150.00")).toBeInTheDocument();
  });

  it("caps support at custom remaining limit", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "300");
    const remainingInput = screen.getByLabelText("วงเงินสิทธิ์รัฐคงเหลือ (บาท)");
    await user.clear(remainingInput);
    await user.type(remainingInput, "80");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getByText("฿80.00")).toBeInTheDocument();
    expect(screen.getByText("฿220.00")).toBeInTheDocument();
  });

  it("applies a percent discount before splitting", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "200");
    await user.type(screen.getByLabelText("ส่วนลด"), "10");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿90.00")).toHaveLength(2);
    expect(screen.getByText("ยอดหลังหักส่วนลด")).toBeInTheDocument();
    expect(screen.getByText("฿180.00")).toBeInTheDocument();
  });

  it("applies a baht discount before splitting", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "200");
    await user.selectOptions(screen.getByLabelText("ประเภทส่วนลด"), "baht");
    await user.type(screen.getByLabelText("ส่วนลด"), "40");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿80.00")).toHaveLength(2);
  });

  it("handles odd satang amounts", async () => {
    const user = userEvent.setup();
    render(<SplitHalfPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1.01");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText(/฿0.50|฿0.51/)).toHaveLength(2);
  });

  it("renders the educational guide and FAQ section", () => {
    render(<SplitHalfPage />);
    expect(screen.getByRole("heading", { name: "หลักการคำนวณคนละครึ่ง (50/50)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "คำถามที่พบบ่อย (FAQ)" })).toBeInTheDocument();
  });
});