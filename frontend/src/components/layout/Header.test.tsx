import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  it("renders logo", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const logo = screen.getByAltText("식구");
    expect(logo).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Checking for presence of buttons by role or icon containment
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
