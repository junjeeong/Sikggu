import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GoogleIcon from "./GoogleIcon";
import KakaoIcon from "./KakaoIcon";

describe("Social Icons", () => {
  it("renders GoogleIcon and handles click", () => {
    const handleClick = vi.fn();
    render(<GoogleIcon onClick={handleClick} />);
    const button = screen.getByLabelText("Google Login");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders KakaoIcon and handles click", () => {
    const handleClick = vi.fn();
    render(<KakaoIcon onClick={handleClick} />);
    const button = screen.getByLabelText("Kakao Login");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
