import React, { useRef, useState } from "react";
import { SquareStack, AudioWaveform, BarChart4, ChevronsUpDown, Plus, Check } from "lucide-react";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

type Project = {
  id: number;
  name: string;
  icon: React.ReactNode;
  shortcut: string;
};

const projectList: Project[] = [
  {
    id: 1,
    name: "Drops Diabetes App",
    icon: <SquareStack size={16} />,
    shortcut: "⌘1",
  },
  {
    id: 2,
    name: "Drops Marketing Page",
    icon: <AudioWaveform size={16} />,
    shortcut: "⌘2",
  },
  {
    id: 3,
    name: "Drops Analytics",
    icon: <BarChart4 size={16} />,
    shortcut: "⌘3",
  },
];

const ProjectSelector: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  const selectedProject = projectList.find((p) => p.id === selectedId)!;

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/*Project Selector */}
      <button
        onClick={toggleDropdown}
        className="group relative w-full text-left rounded-md overflow-hidden"
      >
        {/* Hover background glow layer */}
        <div className="absolute inset-[-4px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md z-0" />

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 p-2 rounded-md text-white m-2 mr-0 ml-1">
              {selectedProject.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{selectedProject.name}</p>
              <p className="text-xs text-zinc-400">Enterprise</p>
            </div>
          </div>
          <ChevronsUpDown size={16} className="text-zinc-400" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-full top-0 ml-3 w-72 z-50 bg-black border border-zinc-700 rounded-md shadow-lg p-2">
          <p className="text-xs text-zinc-400 px-2 pb-2">Projects</p>
          {projectList.map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className={classNames(
                "w-full flex items-center justify-between px-2 py-2 rounded-md text-sm hover:bg-zinc-800 transition",
                {
                  "bg-zinc-800": project.id === selectedId,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={classNames("p-1 rounded-md border", {
                    "bg-blue-500 text-white border-blue-500": project.id === selectedId,
                    "text-zinc-400 border-zinc-700": project.id !== selectedId,
                  })}
                >
                  {project.icon}
                </span>
                <span className="text-white">{project.name}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                {project.id === selectedId && <Check size={14} />}
                <span>{project.shortcut}</span>
              </div>
            </button>
          ))}

          <div className="mt-2 pt-2 border-t border-zinc-700">
            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-zinc-700 transition text-white">
              <Plus size={14} /> Add project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
