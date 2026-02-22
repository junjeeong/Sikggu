import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductDescription from "./ProductDescription";

const mockProduct = {
  id: 1,
  store: "My Store",
  name: "Fresh Strawberries",
  ProductCategory: "FRUIT" as const,
  imageUrl: "https://via.placeholder.com/400",
  description: "Sweet and fresh strawberries picked today.",
  originalPrice: 10000,
  salePrice: 7000,
  quantity: 5,
  saleDeadline: "2023-12-31T18:00:00",
  createdAt: "2023-12-30T10:00:00",
  status: "AVAILABLE" as const,
};

describe("ProductDescription", () => {
  it("renders product information correctly", () => {
    render(<ProductDescription info={mockProduct} />);
    
    expect(screen.getByText("Fresh Strawberries")).toBeInTheDocument();
    expect(screen.getByText("7,000원")).toBeInTheDocument();
    expect(screen.getByText("Sweet and fresh strawberries picked today.")).toBeInTheDocument();
    expect(screen.getByText("과일")).toBeInTheDocument(); // Category label
  });

  it("calculates and displays discount rate", () => {
    render(<ProductDescription info={mockProduct} />);
    // 30% discount
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("calls onReserve when button is clicked", () => {
    const handleReserve = vi.fn();
    render(<ProductDescription info={mockProduct} onReserve={handleReserve} />);
    
    const button = screen.getByRole("button", { name: /예약하기/i });
    fireEvent.click(button);
    
    expect(handleReserve).toHaveBeenCalled();
  });
});
