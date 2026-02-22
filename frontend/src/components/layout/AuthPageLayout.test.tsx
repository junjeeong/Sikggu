import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AuthPageLayout from "./AuthPageLayout";

describe("AuthPageLayout", () => {
  it("renders children", () => {
    render(
      <AuthPageLayout>
        <div>Test Content</div>
      </AuthPageLayout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders header with role and action", () => {
    render(
      <AuthPageLayout role="사장님" signInOrSignup="회원가입">
        <form />
      </AuthPageLayout>
    );
    expect(screen.getByText(/사장님/)).toBeInTheDocument();
    expect(screen.getByText(/회원가입/)).toBeInTheDocument();
  });
});
