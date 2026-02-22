import type { Meta, StoryObj } from "@storybook/react";
import StoreInformation from "./StoreInformation";

const meta = {
  title: "Components/StoreInformation",
  component: StoreInformation,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    storeName: { control: "text" },
    storeLocation: { control: "text" },
    profileImage: { control: "text" },
  },
} satisfies Meta<typeof StoreInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    storeName: "Tasty Bakery",
    storeLocation: "123 Bread Street, Seoul",
  },
};

export const WithImage: Story = {
  args: {
    storeName: "Coffee Shop",
    storeLocation: "Gangnam-gu, Seoul",
    profileImage: "https://via.placeholder.com/50",
  },
};
