import type { Meta, StoryObj } from "@storybook/react";
import AuthPageLayout from "./AuthPageLayout";

const meta = {
  title: "Components/Layout/AuthPageLayout",
  component: AuthPageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    role: { control: "radio", options: ["자취생", "사장님"] },
    signInOrSignup: { control: "radio", options: ["로그인", "회원가입"] },
  },
} satisfies Meta<typeof AuthPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="p-4 border border-dashed border-gray-300 rounded">Content goes here</div>,
    role: "자취생",
    signInOrSignup: "로그인",
  },
};
