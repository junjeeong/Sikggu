import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BottomNavigation from "./BottomNavigation";

describe("BottomNavigation", () => {
  it("renders navigation items", () => {
    render(<BottomNavigation />);
    expect(screen.getByText("홈")).toBeInTheDocument();
    expect(screen.getByText("주변 상품")).toBeInTheDocument();
  });

  it("updates state on click (mock functionality)", () => {
    render(<BottomNavigation />);
    const shopButton = screen.getByText("주변 상품").closest("button");
    fireEvent.click(shopButton!);
    expect(shopButton).toHaveClass("text-sikggu-primary");
  });
});
