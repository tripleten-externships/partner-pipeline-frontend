import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarProps } from "@/utils/types";

interface DashboardLayoutProps extends SidebarProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  // Sidebar props - spread into Sidebar component
  projectList,
  selectedProjectId,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
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
  loadingProjects,
  projectError,
  // Layout-specific prop
  children,
}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        projectList={projectList}
        selectedProjectId={selectedProjectId}
        isAddProjectSheetOpen={isAddProjectSheetOpen}
        setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
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
        loadingProjects={loadingProjects}
        projectError={projectError}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto bg-zinc-950">{children}</main>
    </div>
  );
};

export default DashboardLayout;
