import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NoStoreItemMessage from "./NoStoreItemMessage";

describe("NoStoreItemMessage", () => {
  it("renders default message", () => {
    render(<NoStoreItemMessage />);
    expect(screen.getByText("등록된 상품이 없습니다.")).toBeInTheDocument();
  });

  it("renders custom message and subMessage", () => {
    render(
      <NoStoreItemMessage
        message="Custom Message"
        subMessage="Custom SubMessage"
      />
    );
    expect(screen.getByText("Custom Message")).toBeInTheDocument();
    expect(screen.getByText("Custom SubMessage")).toBeInTheDocument();
  });

  it("renders icon by default", () => {
    render(<NoStoreItemMessage icon="🚀" />);
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  it("renders image when imageSrc is provided", () => {
    render(<NoStoreItemMessage imageSrc="test.png" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.png");
  });
});
