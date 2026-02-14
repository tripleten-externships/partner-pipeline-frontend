// src/components/Layout/DashboardLayout.tsx
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import BreadcrumbHeader from "../BreadcrumbHeader/BreadcrumbHeader";
import { SidebarProps } from "@/utils/types";

interface DashboardLayoutProps
  extends Omit<SidebarProps, "openMenus" | "setOpenMenus" | "toggleMenu"> {
  children: React.ReactNode;
  breadcrumbSection?: string;
  breadcrumbPage?: string;
  openMenus: string[];
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  toggleMenu: (menu: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  breadcrumbSection = "Overview",
  breadcrumbPage = "History",
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
  toggleMenu,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
  loadingProjects,
  projectError,
}) => (
  <div className="flex h-screen">
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
    <main className="flex-1 p-6 overflow-y-auto bg-zinc-950">
      <BreadcrumbHeader section={breadcrumbSection} page={breadcrumbPage} />
      {children}
    </main>
  </div>
);

export default DashboardLayout;
