import type { Meta, StoryObj } from "@storybook/react";
import PrimaryButton from "./PrimaryButton";

const meta = {
  title: "Components/Button/PrimaryButton",
  component: PrimaryButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    onClick: { action: "clicked" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Primary Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
