import type { Meta, StoryObj } from "@storybook/react";
import ProductDescription from "./ProductDescription";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/ProductDescription",
  component: ProductDescription,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onReserve: fn(),
  },
} satisfies Meta<typeof ProductDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    info: mockProduct,
  },
};
