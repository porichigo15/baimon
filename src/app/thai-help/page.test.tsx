import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThaiHelpPage from "./page";

describe("ThaiHelpPage", () => {
  it("shows the Thai heading and the daily cap info", () => {
    render(<ThaiHelpPage />);
    expect(screen.getByRole("heading", { name: "คำนวณไทยช่วยไทย 60/40" })).toBeInTheDocument();
    expect(screen.getByText(/รัฐสนับสนุนสูงสุด/)).toBeInTheDocument();
    expect(screen.getByText(/฿200\.00/)).toBeInTheDocument();
  });

  it("computes 60/40 capped at 200 baht per day", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getByText("฿200.00")).toBeInTheDocument();
    expect(screen.getByText("฿300.00")).toBeInTheDocument();
  });

  it("applies a percent discount before computing support", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.type(screen.getByLabelText("ส่วนลด"), "10");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getByText("ยอดหลังหักส่วนลด")).toBeInTheDocument();
    expect(screen.getByText("฿450.00")).toBeInTheDocument();
    expect(screen.getByText("฿250.00")).toBeInTheDocument();
  });

  it("applies the 200-baht cap on the discounted total", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "500");
    await user.type(screen.getByLabelText("ส่วนลด"), "90");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getByText("฿30.00")).toBeInTheDocument();
    expect(screen.getByText("฿20.00")).toBeInTheDocument();
  });

  it("gives full support for a small amount", async () => {
    const user = userEvent.setup();
    render(<ThaiHelpPage />);

    await user.type(screen.getByLabelText("ยอดเงินที่จ่าย (บาท)"), "100");
    await user.click(screen.getByRole("button", { name: "คำนวณและบันทึกสิทธิ์" }));

    expect(screen.getByText("฿60.00")).toBeInTheDocument();
    expect(screen.getByText("฿40.00")).toBeInTheDocument();
  });
});