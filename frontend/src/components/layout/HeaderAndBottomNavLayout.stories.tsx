import type { Meta, StoryObj } from "@storybook/react";
import HeaderAndBottomNavLayout from "./HeaderAndBottomNavLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Components/Layout/HeaderAndBottomNavLayout",
  component: HeaderAndBottomNavLayout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderAndBottomNavLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 space-y-4">
        <div className="h-40 bg-gray-100 rounded dark:bg-gray-800" />
        <div className="h-40 bg-gray-100 rounded dark:bg-gray-800" />
        <div className="h-40 bg-gray-100 rounded dark:bg-gray-800" />
        <div className="h-40 bg-gray-100 rounded dark:bg-gray-800" />
      </div>
    ),
  },
};
