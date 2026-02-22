import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductInformationCard from "./ProductInformationCard";
import { BrowserRouter } from "react-router-dom";

const mockProduct = {
  id: 1,
  store: "My Store",
  name: "Delicious Apple",
  ProductCategory: "FRUIT" as const,
  imageUrl: "https://via.placeholder.com/200",
  description: "Crunchy apple",
  originalPrice: 2000,
  salePrice: 1500,
  quantity: 10,
  saleDeadline: "18:00",
  createdAt: "2023-01-01",
  status: "AVAILABLE" as const,
};

describe("ProductInformationCard", () => {
  it("renders product details", () => {
    render(
      <BrowserRouter>
        <ProductInformationCard info={mockProduct} storeId={1} />
      </BrowserRouter>
    );

    expect(screen.getByText("Delicious Apple")).toBeInTheDocument();
    expect(screen.getByText("1,500원")).toBeInTheDocument();
    expect(screen.getByText("My Store")).toBeInTheDocument();
  });
});
