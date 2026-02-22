import type { Meta, StoryObj } from "@storybook/react";
import StoreInformationCard from "./StoreInformationCard";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Components/Card/StoreInformationCard",
  component: StoreInformationCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StoreInformationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockStore = {
  id: 1,
  storeName: "Super Mart",
  address: "123 Mart St, Seoul",
  latitude: 37.5,
  longitude: 127.0,
  storeContactNumber: "02-1234-5678",
  description: "Best local mart",
  imageUrl: "https://via.placeholder.com/200",
};

export const Default: Story = {
  args: {
    info: mockStore,
  },
};
