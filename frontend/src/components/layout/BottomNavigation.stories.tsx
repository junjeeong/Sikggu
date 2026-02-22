import type { Meta, StoryObj } from "@storybook/react";
import BottomNavigation from "./BottomNavigation";

const meta = {
  title: "Components/Layout/BottomNavigation",
  component: BottomNavigation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
