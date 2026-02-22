import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Components/Layout/Header",
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
