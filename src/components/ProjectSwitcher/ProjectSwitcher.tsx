import React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { ProjectSwitcherProps } from "@/utils/types";
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger, } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({projectList, selectedProjectId, handleProjectSelect}) => {

    const selectedProject = projectList.find((p) => p.id === selectedProjectId)!;
    
return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2 size-full truncate cursor-pointer"><div className="flex items-center justify-center rounded-lg bg-blue-600 size-8">
                {selectedProject.icon}
                </div>
                <div className="flex flex-col truncate text-left max-w-full"><h3>{selectedProject.name}</h3><p className="text-xs text-neutral-400 truncate">{selectedProject.description || ""}</p>
                </div>
                <ChevronsUpDown className="ml-auto"/>
                </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="min-w-60">
            <DropdownMenuLabel className='text-xs text-neutral-400'>Projects</DropdownMenuLabel>
            <DropdownMenuGroup>
                {projectList.map((project, index : number) => (
                    <DropdownMenuItem key={project.id}
                    onSelect={() => handleProjectSelect(project.id)}>
                <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
                {project.icon}
                </div>
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
            </DropdownMenuItem>
                ))}
            
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <>
                <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
                <Plus color="#fff" />
                </div>
                <p className='text-neutral-400'>Add Project </p>
                </>
                 
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}

export default ProjectSwitcher;