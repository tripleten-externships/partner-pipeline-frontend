import React from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import { SidebarProps } from "@/utils/types";
import Timeline from "@/components/Timeline/Timeline";

import BreadcrumbHeader from "@/components/BreadcrumbHeader/BreadcrumbHeader";

interface TimelinePageProps extends SidebarProps {
  selectedProjectId: string;
}

const TimelinePage: React.FC<TimelinePageProps> = ({
  selectedProjectId,
  projectList,
  loadingProjects,
  projectError,
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
  toggleMenu,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
}) => {
  return (
    <div className="flex h-screen">
      {/* This will become Dashboard Layout component */}
      <Sidebar
        projectList={projectList}
        loadingProjects={loadingProjects}
        projectError={projectError}
        selectedProjectId={selectedProjectId}
        isProjectDropdownOpen={isProjectDropdownOpen}
        toggleProjectDropdown={toggleProjectDropdown}
        projectDropdownRef={projectDropdownRef}
        handleProjectSelect={handleProjectSelect}
        openMenus={openMenus}
        setOpenMenus={setOpenMenus}
        isUserMenuOpen={isUserMenuOpen}
        toggleUserMenu={toggleUserMenu}
        userMenuRef={userMenuRef}
        userEmail={userEmail}
        toggleMenu={toggleMenu}
        isAddProjectSheetOpen={isAddProjectSheetOpen}
        setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
      />

      <section className="flex-1 p-6 overflow-y-auto bg-zinc-950">
        <BreadcrumbHeader section="Milestones" page="Timeline" />
        {/* No projects / errors / loading states */}

        <Timeline />
      </section>
    </div>
  );
};

export default TimelinePage;
