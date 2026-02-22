import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StoreInformationCard from "./StoreInformationCard";
import { BrowserRouter } from "react-router-dom";

const mockStore = {
  id: 1,
  storeName: "Super Mart",
  address: "123 Mart St, Seoul",
  latitude: 37.5,
  longitude: 127.0,
  storeContactNumber: "02-1234-5678",
  description: "Best local mart",
  imageUrl: "https://via.placeholder.com/200",
};

describe("StoreInformationCard", () => {
  it("renders store details", () => {
    render(
      <BrowserRouter>
        <StoreInformationCard info={mockStore} />
      </BrowserRouter>
    );

    expect(screen.getByText("Super Mart")).toBeInTheDocument();
    expect(screen.getByText("123 Mart St, Seoul")).toBeInTheDocument();
    expect(screen.getByText("02-1234-5678")).toBeInTheDocument();
  });
});
