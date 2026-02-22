import type { Meta, StoryObj } from "@storybook/react";
import ProductInformationCard from "./ProductInformationCard";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Components/Card/ProductInformationCard",
  component: ProductInformationCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductInformationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    info: mockProduct,
    storeId: 1,
  },
};
