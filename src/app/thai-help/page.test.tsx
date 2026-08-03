import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThaiHelpPage from "./page";

afterEach(() => {
  localStorage.clear();
});

describe("ThaiHelpPage", () => {
  it("shows the Thai heading and the daily cap", () => {
    render(<ThaiHelpPage />);
    expect(screen.getByRole("heading", { name: "คำนวณไทยช่วยไทย 60/40" })).toBeInTheDocument();
    expect(screen.getByText("เหลือวงเงินสนับสนุนวันนี้:")).toBeInTheDocument();
    expect(screen.getByText("฿200.00")).toBeInTheDocument();
  });

  it("computes 60/40 and records the daily leftover", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getByText("฿200.00")).toBeInTheDocument();
    expect(screen.getByText("฿300.00")).toBeInTheDocument();
    expect(screen.getAllByText("฿0.00").length).toBeGreaterThan(0);
  });

  it("gives no support once the daily budget runs out", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    await user.clear(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"));
    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "100");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getAllByText("฿100.00").length).toBeGreaterThan(0);
    expect(screen.getAllByText("฿0.00").length).toBeGreaterThan(0);
  });

  it("resets the daily budget", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));
    await user.click(screen.getByRole("button", { name: "รีเซ็ตสิทธิ์วันนี้" }));

    expect(screen.getByText("เหลือวงเงินสนับสนุนวันนี้:")).toBeInTheDocument();
    expect(screen.getByText("฿200.00")).toBeInTheDocument();
  });
});