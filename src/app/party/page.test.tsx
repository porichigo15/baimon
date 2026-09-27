import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PartyPage from "./page";

describe("PartyPage", () => {
  it("shows the Thai heading", () => {
    render(<PartyPage />);
    expect(screen.getByRole("heading", { name: "หารกัน" })).toBeInTheDocument();
  });

  it("splits an amount among people with remainder on the first row", async () => {
    const user = userEvent.setup();
    render(<PartyPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1000");
    await user.type(screen.getByLabelText("แบ่งให้กี่คน"), "3");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getByText("฿333.34")).toBeInTheDocument();
    expect(screen.getAllByText("฿333.33")).toHaveLength(2);
    expect(screen.getByText("รวม ฿1,000.00")).toBeInTheDocument();
    expect(screen.getByText(/ได้เศษ/)).toBeInTheDocument();
  });

  it("applies a baht discount before splitting", async () => {
    const user = userEvent.setup();
    render(<PartyPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1000");
    await user.type(screen.getByLabelText("แบ่งให้กี่คน"), "4");
    await user.selectOptions(screen.getByLabelText("ประเภทส่วนลด"), "baht");
    await user.type(screen.getByLabelText("ส่วนลด"), "200");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿200.00")).toHaveLength(4);
    expect(screen.getByText("ยอดหลังหักส่วนลด")).toBeInTheDocument();
  });

  it("applies a percent discount before splitting", async () => {
    const user = userEvent.setup();
    render(<PartyPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "1000");
    await user.type(screen.getByLabelText("แบ่งให้กี่คน"), "4");
    await user.type(screen.getByLabelText("ส่วนลด"), "10");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿225.00")).toHaveLength(4);
  });

  it("handles a single person", async () => {
    const user = userEvent.setup();
    render(<PartyPage />);

    await user.type(screen.getByLabelText("จำนวนเงินรวม (บาท)"), "500");
    await user.type(screen.getByLabelText("แบ่งให้กี่คน"), "1");
    await user.click(screen.getByRole("button", { name: "คำนวณ" }));

    expect(screen.getAllByText("฿500.00").length).toBeGreaterThan(0);
    expect(screen.getByText("รวม ฿500.00")).toBeInTheDocument();
  });

  it("renders the educational guide and FAQ section", () => {
    render(<PartyPage />);
    expect(screen.getByRole("heading", { name: "หลักการหารเงินและจัดการเศษสตางค์" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "คำถามที่พบบ่อย (FAQ)" })).toBeInTheDocument();
  });
});