import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductMenuNavBar from "./ProductMenuNavBar";

describe("ProductMenuNavBar", () => {
  it("renders all categories", () => {
    render(<ProductMenuNavBar selectedCategory="ALL" onSelectCategory={() => {}} />);
    // Checking a few labels
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("채소")).toBeInTheDocument();
  });

  it("calls onSelectCategory when a category is clicked", () => {
    const handleSelect = vi.fn();
    render(<ProductMenuNavBar selectedCategory="ALL" onSelectCategory={handleSelect} />);
    
    const vegetableButton = screen.getByText("채소");
    fireEvent.click(vegetableButton);
    
    expect(handleSelect).toHaveBeenCalledWith("VEGETABLE");
  });

  it("highlights the selected category", () => {
    render(<ProductMenuNavBar selectedCategory="VEGETABLE" onSelectCategory={() => {}} />);
    const vegetableText = screen.getByText("채소");
    expect(vegetableText).toHaveClass("text-gray-900"); // Selected class
  });
});
