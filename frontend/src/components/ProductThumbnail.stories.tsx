import type { Meta, StoryObj } from "@storybook/react";
import ProductThumbnail from "./ProductThumbnail";

const meta = {
  title: "Components/ProductThumbnail",
  component: ProductThumbnail,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    imageUrl: { control: "text" },
    alt: { control: "text" },
  },
} satisfies Meta<typeof ProductThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/400",
    alt: "Sample Product",
  },
};
