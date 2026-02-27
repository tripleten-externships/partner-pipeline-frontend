import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import UserManagementPage from "./user-management";
import { ThemeProvider } from "@/components/theme-provider";

const meta: Meta<typeof UserManagementPage> = {
  title: "Pages/UserManagementPage",
  component: UserManagementPage,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof UserManagementPage>;

export const Default: Story = {
  render: () => <UserManagementPage />,
};
