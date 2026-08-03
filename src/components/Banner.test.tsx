import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders the banner image with the configured path", () => {
    render(<Banner imagePath="/images/split-half.png" />);
    const img = screen.getByAltText("แบนเนอร์");
    expect(img).toHaveAttribute("src", "/images/split-half.png");
  });

  it("shows the Thai placeholder when the image fails to load", () => {
    render(<Banner imagePath="/images/missing.png" />);
    fireEvent.error(screen.getByAltText("แบนเนอร์"));
    expect(screen.getByText(/เพิ่มไฟล์ images\/missing\.png ในโฟลเดอร์ public/)).toBeInTheDocument();
  });
});