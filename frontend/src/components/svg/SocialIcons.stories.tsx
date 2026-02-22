import type { Meta, StoryObj } from "@storybook/react";
import GoogleIcon from "./GoogleIcon";
import KakaoIcon from "./KakaoIcon";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Svg/SocialIcons",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Google: StoryObj<typeof GoogleIcon> = {
  render: (args) => <GoogleIcon {...args} />,
  args: { onClick: fn() },
};

export const Kakao: StoryObj<typeof KakaoIcon> = {
  render: (args) => <KakaoIcon {...args} />,
  args: { onClick: fn() },
};
