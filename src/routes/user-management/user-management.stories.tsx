import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserManagement from './user-management';
import { ThemeProvider } from '@/components/theme-provider';

const meta: Meta<typeof UserManagement> = {
  title: 'Pages/UserManagement',
  component: UserManagement,
    decorators: [
     (Story) => <ThemeProvider><Story /></ThemeProvider>,
   ],
};
export default meta;

type Story = StoryObj<typeof UserManagement>;

export const Default: Story = {
  render: () => <UserManagement />,
};