import type { Meta, StoryObj } from '@storybook/react-vite';
import ActivityLog from './ActivityLog';

const meta = {
  title: 'Components/ActivityLog',
  component: ActivityLog,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Activity Log component displays a timeline of milestone status changes with improved timestamp formatting following UI best practices. Features progressive time display (Just now, x minutes ago, Yesterday at..., etc.) with timezone support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    projectId: {
      control: 'text',
      description: 'The project ID to fetch activity logs for',
    },
  },
  args: {
    projectId: 'sample-project-id',
  },
} satisfies Meta<typeof ActivityLog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - shows the component with live API call
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default activity log component. This connects to the backend API and shows real data with improved timestamp formatting.',
      },
    },
  },
};

// Documentation story
export const Features: Story = {
  parameters: {
    docs: {
      description: {
        story: `**Key Features:**
        
- **Progressive Time Display**: Shows "Just now", "2 minutes ago", "Yesterday at 2:30PM PST", etc.
- **Timezone Support**: Automatically detects user timezone with PST/PDT fallback
- **API Integration**: Fetches data from GET /api/projects/:projectId/activity-log
- **Error Handling**: Shows loading, empty, and error states
- **Responsive Design**: Hover effects and mobile-friendly layout
- **Accessibility**: Proper semantic HTML with time elements`,
      },
    },
  },
};
