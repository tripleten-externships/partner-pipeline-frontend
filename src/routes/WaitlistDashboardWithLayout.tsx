import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SidebarProps } from "@/utils/types";
import WaitlistDashboard from "./WaitlistDashboard";

interface WaitlistDashboardWithLayoutProps extends SidebarProps {}

const WaitlistDashboardWithLayout: React.FC<WaitlistDashboardWithLayoutProps> = ({
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
}) => {
  return (
    <DashboardLayout
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
    >
      <WaitlistDashboard />
    </DashboardLayout>
  );
};

export default WaitlistDashboardWithLayout;
