import React from 'react';
import { ChevronsUpDown, Plus, FolderClosed } from 'lucide-react';
import { ProjectSwitcherProps } from "@/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
// import { useProjects } from '@/utils/api';
// import { BarChart4 } from 'lucide-react';

const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({
  projectList,
  selectedProjectId,
  handleProjectSelect,
  setIsAddProjectSheetOpen,
  loading
}) => {
  const selectedProject = projectList.find((p) => p.id === selectedProjectId);

  const renderIcon = selectedProject?.fallBackIcon || <FolderClosed size={16} />;
  const renderName = selectedProject?.name || "No project selected";
  const renderSubtitle = selectedProject?.subtitle || "";

  if (loading) {
    return (
      <Button variant="ghost" className="w-full justify-start text-left animate-pulse"> 
        Loading projects...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 size-full truncate cursor-pointer">
          <div className="flex items-center justify-center rounded-lg bg-blue-600 size-8">
            {renderIcon}
          </div>
          <div className="flex flex-col truncate text-left max-w-full">
            <h3>{renderName}</h3>
            <p className="text-xs text-neutral-400 truncate">{renderSubtitle}</p>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" className="min-w-60">
        <DropdownMenuLabel className='text-xs text-neutral-400'>Projects</DropdownMenuLabel>

        <DropdownMenuGroup>
          {projectList.length > 0 ? (
            projectList.map((project, index) => (
              <DropdownMenuItem
                key={project.id}
                onSelect={() => handleProjectSelect(project.id)}
              >
                <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
                  {project.fallBackIcon}
                </div>
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-xs text-neutral-400 px-3 py-2 italic">
              Projects you create or accept will appear here.
            </div>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setIsAddProjectSheetOpen(true)}>
          <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
            <Plus color="#fff" />
          </div>
          <p className='text-neutral-400'>Add Project</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSwitcher;
