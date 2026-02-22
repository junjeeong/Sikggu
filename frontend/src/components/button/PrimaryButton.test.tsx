import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PrimaryButton from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("renders correctly with children", () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("handles onClick events", () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Click me</PrimaryButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional classNames", () => {
    render(<PrimaryButton className="bg-red-500">Custom Class</PrimaryButton>);
    const button = screen.getByRole("button", { name: /custom class/i });
    expect(button).toHaveClass("bg-red-500");
  });

  it("renders as disabled when disabled prop is passed", () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
