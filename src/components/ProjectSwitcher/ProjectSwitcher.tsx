import React from 'react';
import { useEffect, useState } from 'react';
import { ChevronsUpDown, GalleryVerticalEnd, Plus, AudioWaveform, Command } from 'lucide-react';
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger, } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

interface ProjectIconProps {
    color?: string;
    className?: string;
}

interface Project {
    name: string;
    subtitle?: string;
    icon: React.ComponentType<ProjectIconProps>;
}

export default function ProjectSwitcher() {
    //Replace with higher state controlling open Project
    const [openProject, setOpenedProject] = useState<Project>({name: "Project Name", subtitle: "Project Subtitle", icon: GalleryVerticalEnd});

    const [projects, setProjects] = useState<Project[]>([{name: "Project Name", subtitle: "Project Subtitle", icon: GalleryVerticalEnd}]);
    //Use Temporary Projects
    useEffect(() => {setProjects([{name: "Drops Diabetes App", subtitle: "Enterprise", icon: GalleryVerticalEnd}, {name: "Drops Marketing Page", subtitle: "Internal", icon: AudioWaveform}, {name: "Drops Analytics", icon: Command}]);}, []);

    useEffect(() => {setOpenedProject(projects[0])}, [projects])
    

    const handleSwitchProject = (project: Project) => {
        setOpenedProject(project);
    };
    
return (
    <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2 size-full  cursor-pointer"><div className="flex items-center justify-center rounded-lg bg-blue-600 size-8">
                <openProject.icon className="size-5" />
                </div>
                <div className="flex flex-col"><h3>{openProject.name}</h3><p className="text-xs text-neutral-400 text-left">{openProject.subtitle || ""}</p>
                </div>
                <ChevronsUpDown className="ml-auto"/>
                </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="min-w-60">
            <DropdownMenuLabel className='text-xs text-neutral-400'>Projects</DropdownMenuLabel>
            <DropdownMenuGroup>
                {projects.map((project : Project, index : number) => (
                    <DropdownMenuItem key={project.name}
                    onSelect={() => handleSwitchProject(project)}>
                <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
                <project.icon color="#fff"  />
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