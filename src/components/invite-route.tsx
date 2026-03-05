import React, { useState } from "react";
import { DashProps } from "@/utils/types"; //Give all the props their specfied types to implement Sidebar correctly
import Sidebar from "./Sidebar/Sidebar";
import { InviteFormModal } from "../components/InviteFormModal/InviteFormModal";
//import { sendUserInvitation } from "@/utils/api";

const SendInvitePage: React.FC<DashProps> = ({
  projectList,
  selectedProjectId,
  openMenus,
  setOpenMenus,
  isProjectDropdownOpen,
  toggleProjectDropdown,
  projectDropdownRef,
  isAddProjectSheetOpen,
  setIsAddProjectSheetOpen,
  handleProjectSelect,
  isUserMenuOpen,
  toggleUserMenu,
  toggleMenu,
  userMenuRef,
  userEmail,
  loadingProjects,
  projectError,
}) => {
  const [openModal] = useState(true);

  return (
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
      <InviteFormModal open={openModal} onClose={() => {}} projectId={selectedProjectId} />
    </div>
  );
};

export default SendInvitePage;
