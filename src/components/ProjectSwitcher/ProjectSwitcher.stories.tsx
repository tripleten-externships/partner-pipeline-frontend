import React, { useState } from "react";
import ProjectSwitcher from "./ProjectSwitcher";
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SquareStack, AudioWaveform, BarChart4 } from "lucide-react";
import { Project, ProjectSwitcherProps } from "@/utils/types";
import { ThemeProvider } from "../theme-provider";

const sampleProjects: Project[] = [{
  id: "1Ab4",
  name: "Drops Diabetes App",
  imgUrl: "",
  fallBackIcon: <SquareStack size={16} />,
  project: "",
  isActive: false
},
{
  id: "2tGh",
  name: "Drops Marketing Page",
  imgUrl: "",
  fallBackIcon: <AudioWaveform size={16} />,
  project: "",
  isActive: false
},
 
{
  id: "7hId",
  name: "Drops Analytics",
  imgUrl: "",
  fallBackIcon: <BarChart4 size={16} />,
  project: "",
  isActive: false
},]

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
  const [isAddProjectSheetOpen, setIsAddProjectSheetOpen] = useState(false);

  return (
    <div className="w-64">
      <ProjectSwitcher
        projectList={args.projectList}
        selectedProjectId={selectedProjectId}
        handleProjectSelect={(id) => {
          setSelectedProjectId(id);
        }}
        isProjectDropdownOpen={false}
        toggleProjectDropdown={() => { }}
        dropdownRef={React.createRef<HTMLDivElement>()}
        isAddProjectSheetOpen={isAddProjectSheetOpen}
        setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
      />
    </div>)
}

export const Default: Story = {
  args: {
    projectList: sampleProjects,
  },
  render: (args) => <DefaultStory {...args} />
}