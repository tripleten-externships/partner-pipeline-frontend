import React from "react";
import ProjectSwitcher from "./ProjectSwitcher";
import type {Meta, StoryObj } from "@storybook/react-vite"
import { SquareStack, AudioWaveform, BarChart4 } from "lucide-react";
import { Project, ProjectSwitcherProps } from "@/utils/types";
import { ThemeProvider } from "../theme-provider";

const sampleProjects: Project[] = [{
      id: "1Ab4",
      name: "Drops Diabetes App",
      imgUrl: "",
      fallBackIcon: <SquareStack size={16} />,
      subtitle: "Manage diabetes treatment app",
      status: "Active",
    },
    {
      id: "2tGh",
      name: "Drops Marketing Page",
      imgUrl: "",
      fallBackIcon: <AudioWaveform size={16} />,
      subtitle: "Drops Marketing Page App",
      status: "Completed",
    },
    {
      id: "7hId",
      name: "Drops Analytics",
      imgUrl: "",
      fallBackIcon: <BarChart4 size={16} />,
      status: "Paused",
    }]

const meta: Meta<typeof ProjectSwitcher> = {
    title: "Components/ProjectSwitcher",
    component: ProjectSwitcher,
    decorators: [
        (Story) => (
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        ),
      ],
};

export default meta;
type Story = StoryObj<typeof ProjectSwitcher>;



const DefaultStory = (args: ProjectSwitcherProps) => {
const [selectedProjectId, setSelectedProjectId] = React.useState(sampleProjects[0].id);

        return (
            <div className="w-64">
        <ProjectSwitcher
         projectList={args.projectList}
         selectedProjectId={selectedProjectId}
         handleProjectSelect={(id) => {
            setSelectedProjectId(id);
         }}
        />
        </div>)
}

export const Default: Story = {
    args: {
        projectList: sampleProjects,
    },
    render: (args) => <DefaultStory {...args} />
}