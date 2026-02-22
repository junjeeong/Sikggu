import type { Meta, StoryObj } from "@storybook/react";
import NoStoreItemMessage from "./NoStoreItemMessage";

const meta = {
  title: "Components/NoStoreItemMessage",
  component: NoStoreItemMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    subMessage: { control: "text" },
    icon: { control: "text" },
    imageSrc: { control: "text" },
  },
} satisfies Meta<typeof NoStoreItemMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "No products available",
  },
};

export const WithSubMessage: Story = {
  args: {
    message: "Empty List",
    subMessage: "Try changing the filter",
    icon: "📂",
  },
};

export const WithImage: Story = {
  args: {
    message: "Nothing here",
    imageSrc: "https://via.placeholder.com/64",
  },
};
