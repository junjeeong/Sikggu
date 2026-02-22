import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeaderAndBottomNavLayout from "./HeaderAndBottomNavLayout";
import { BrowserRouter } from "react-router-dom";

describe("HeaderAndBottomNavLayout", () => {
  it("renders header, footer and children", () => {
    render(
      <BrowserRouter>
        <HeaderAndBottomNavLayout>
          <div>Page Content</div>
        </HeaderAndBottomNavLayout>
      </BrowserRouter>
    );
    expect(screen.getByText("Page Content")).toBeInTheDocument();
    // Header check
    expect(screen.getByAltText("식구")).toBeInTheDocument();
    // Footer check
    expect(screen.getByText("홈")).toBeInTheDocument();
  });
});
