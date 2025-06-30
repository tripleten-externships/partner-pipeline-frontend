import React from "react";
import {
  ChevronDown,
  ChevronUp,
  SquareTerminal,
  BookOpen,
  Settings2,
  Bot,
  Frame,
  PieChart,
  Map,
  MoreHorizontal,
} from "lucide-react";
import ProjectSelector from "../ProjectSelector/ProjectSelector";
import UserMenu from "../UserMenu/UserMenu";
import { SidebarProps } from "@/utils/types";

const Sidebar: React.FC<SidebarProps> = ({
  projectList,
  selectedProjectId,
  isProjectDropdownOpen,
  toggleProjectDropdown,
  projectDropdownRef,
  handleProjectSelect,
  openMenus,
  setOpenMenus,
  isUserMenuOpen,
  toggleUserMenu,
  userMenuRef,
  userEmail,
}) => {
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const isOpen = (menu: string) => openMenus.includes(menu);

  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen flex flex-col justify-between p-4 shadow-lg border-r border-zinc-800">
      <div>
        <div className="mb-6">
          <ProjectSelector
            projectList={projectList}
            selectedProjectId={selectedProjectId}
            isProjectDropdownOpen={isProjectDropdownOpen}
            toggleProjectDropdown={toggleProjectDropdown} //error here
            dropdownRef={projectDropdownRef}
            handleProjectSelect={handleProjectSelect}
          />

        </div>


        {/* Platform Section */}
        <h2 className="text-xs text-zinc-400 mb-3 tracking-wide">Platform</h2>
        <div>
          <button
            className="w-full flex items-center justify-between text-sm font-sm mb-2"
            onClick={() => toggleMenu("overview")}
          >
            <span className="flex items-center gap-2">
              <SquareTerminal size={16} /> Overview
            </span>
            {isOpen("overview") ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isOpen("overview") && (
            <ul className="ml-2 text-sm pl-3 border-l border-zinc-800 space-y-3">
              <li>History</li>
              <li>Starred</li>
              <li>Settings</li>
            </ul>
          )}

          <button
            className="w-full flex items-center justify-between text-sm font-sm mt-4 mb-2"
            onClick={() => toggleMenu("milestones")}
          >
            <span className="flex items-center gap-2">
              <Bot size={16} /> Milestones
            </span>
            {isOpen("milestones") ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isOpen("milestones") && (
            <ul className="ml-2 text-sm pl-3 border-l border-zinc-800 space-y-3">
              <li>Timeline</li>
              <li>Explorer</li>
              <li>Notifications</li>
            </ul>
          )}

          <button
            className="w-full flex items-center justify-between text-sm font-sm mt-4 mb-2"
            onClick={() => toggleMenu("docs")}
          >
            <span className="flex items-center gap-2">
              <BookOpen size={16} /> Documentation
            </span>
            {isOpen("docs") ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isOpen("docs") && (
            <ul className="ml-2 text-sm pl-3 border-l border-zinc-800 space-y-3">
              <li>Introduction</li>
              <li>Get Started</li>
              <li>Tutorials</li>
              <li>Changelog</li>
            </ul>
          )}

          <button
            className="w-full flex items-center justify-between text-sm font-sm mt-4 mb-2"
            onClick={() => toggleMenu("settings")}
          >
            <span className="flex items-center gap-2">
              <Settings2 size={16} /> Settings
            </span>
            {isOpen("settings") ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isOpen("settings") && (
            <ul className="ml-2 text-sm pl-3 border-l border-zinc-800 space-y-3">
              <li>General</li>
              <li>Team</li>
            </ul>
          )}
        </div>

        {/* Important Links */}
        <div className="mt-6 pt-4">
          <h2 className="text-sm font-semibold text-zinc-400 mb-2">Important Links</h2>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li className="flex items-center gap-2">
              <Frame size={14} /> Design System
            </li>
            <li className="flex items-center gap-2">
              <PieChart size={14} /> Legal
            </li>
            <li className="flex items-center gap-2">
              <Map size={14} /> Contact Us
            </li>
            <li className="flex items-center gap-2">
              <MoreHorizontal size={14} /> More
            </li>
          </ul>
        </div>
      </div>

      {/* User Context */}
      <div className="pt-4">
        <UserMenu
          isOpen={isUserMenuOpen} //error here
          toggleMenu={toggleUserMenu}
          menuRef={userMenuRef}
          userEmail={userEmail}
        />
      </div>
    </aside>
  );
};

export default Sidebar;

