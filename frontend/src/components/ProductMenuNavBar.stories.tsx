import type { Meta, StoryObj } from "@storybook/react";
import ProductMenuNavBar from "./ProductMenuNavBar";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/ProductMenuNavBar",
  component: ProductMenuNavBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedCategory: {
      control: "select",
      options: ["ALL", "VEGETABLE", "FRUIT", "MEAT_EGG", "SEAFOOD", "GRAIN", "MEAL_KIT", "DAIRY_CHEESE", "PROCESSED", "FROZEN_REFRIGERATED"],
    },
  },
  args: {
    onSelectCategory: fn(),
  },
} satisfies Meta<typeof ProductMenuNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCategory: "ALL",
  },
};
