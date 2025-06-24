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
}

interface Project {
    name: string;
    icon: React.ComponentType<ProjectIconProps>;
}

export default function ProjectSwitcher() {
    const [projects, setProjects] = useState<Project[]>([]);
    //Use Temporary Projects
    useEffect(() => {setProjects([{name: "Drops Diabetes App", icon: GalleryVerticalEnd}, {name: "Drops Marketing Page", icon: AudioWaveform}, {name: "Drops Analytics", icon: Command}]);}, []);
    
return (
    <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2 size-max cursor-pointer"><div className="flex items-center justify-center rounded-lg bg-blue-600 size-8">
                <GalleryVerticalEnd className="size-5" />
                </div>
                <div className="flex flex-col"><h3>Drops.care</h3><p className="text-xs text-zinc-400 text-left">Enterprise</p>
                </div>
                <ChevronsUpDown className="ml-20"/>
                </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
            <DropdownMenuLabel className='text-xs text-neutral-400'>Projects</DropdownMenuLabel>
            <DropdownMenuGroup>
                {projects.map((project : Project, index : number) => (
                    <DropdownMenuItem key={project.name}>
                <div className="flex items-center justify-center rounded size-6 border border-neutral-700">
                <project.icon color="#fff"  />
                </div>
                {project.name}
                <DropdownMenuShortcut >⌘{index + 1}</DropdownMenuShortcut>
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