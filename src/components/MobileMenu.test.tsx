import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "./MobileMenu";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileMenu", () => {
  it("is closed by default", () => {
    render(<MobileMenu />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "เมนู" })).toBeInTheDocument();
  });

  it("opens the drawer with all Thai menu links", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "เมนู" }));

    const dialog = screen.getByRole("dialog", { name: "เมนูหลัก" });
    expect(dialog).toBeInTheDocument();
    for (const label of [
      "หน้าแรก",
      "คนละครึ่ง",
      "ไทยช่วยไทย",
      "หารกัน",
      "นโยบายความเป็นส่วนตัว",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("closes the drawer when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "เมนู" }));
    const link = screen.getByRole("link", { name: "หารกัน" });
    expect(link).toHaveAttribute("href", "/party");

    await user.click(link);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the drawer when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "เมนู" }));
    const backdrop = screen.getAllByRole("button", { name: "ปิดเมนู" })[0];
    await user.click(backdrop);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the drawer on the Escape key", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "เมนู" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});