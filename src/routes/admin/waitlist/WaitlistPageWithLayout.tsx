import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import WaitlistPage from "./index";
import { SidebarProps } from "@/utils/types";

interface WaitlistPageWithLayoutProps extends SidebarProps {}

const WaitlistPageWithLayout: React.FC<WaitlistPageWithLayoutProps> = ({
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
      <WaitlistPage />
    </DashboardLayout>
  );
};

export default WaitlistPageWithLayout;
