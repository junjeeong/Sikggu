import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StoreInformation from "./StoreInformation";

describe("StoreInformation", () => {
  it("renders store name and location", () => {
    render(<StoreInformation storeName="Test Store" storeLocation="Test Location" />);
    expect(screen.getByText("Test Store")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });

  it("renders default profile image when no image provided", () => {
    render(<StoreInformation storeName="Test Store" />);
    const img = screen.getByRole("img", { name: /기본 프로필/i });
    expect(img).toHaveAttribute("src", "/images/profile.png");
  });

  it("renders provided profile image", () => {
    const testUrl = "https://example.com/profile.jpg";
    render(<StoreInformation storeName="Test Store" profileImage={testUrl} />);
    const img = screen.getByRole("img", { name: /Test Store 사장님 프로필/i });
    expect(img).toHaveAttribute("src", testUrl);
  });
});
