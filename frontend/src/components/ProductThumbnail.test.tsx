import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductThumbnail from "./ProductThumbnail";

describe("ProductThumbnail", () => {
  it("renders the image with correct src and alt text", () => {
    const testSrc = "https://example.com/image.jpg";
    const testAlt = "Test Image";
    render(<ProductThumbnail imageUrl={testSrc} alt={testAlt} />);
    
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", testSrc);
    expect(img).toHaveAttribute("alt", testAlt);
  });

  it("applies additional classNames", () => {
    render(<ProductThumbnail imageUrl="" className="bg-red-500" />);
    const figure = screen.getByRole("figure");
    expect(figure).toHaveClass("bg-red-500");
  });
});
