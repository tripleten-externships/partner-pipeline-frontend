import React, {useState} from 'react';
import { DashProps } from "@/utils/types"; //Give all the props their specfied types to implement Sidebar correctly
import Sidebar from './Sidebar/Sidebar';
import { InviteFormModal} from "../components/InviteFormModal/InviteFormModal";
import {sendUserInvitation} from "@/utils/api"

const SendInvitePage: React.FC<DashProps> 
= ({
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
  type AccessLevel = "admin" | "student";
  type Account = {
  name: string;
  email: string;
  role: AccessLevel;
}
  const [openModal] = useState(true);

  const handleAddAccount = (newAccount: Account) => {
    console.log(newAccount);

    if (!selectedProjectId) return; // exit if no project is selected

    const TEST_PROJECT_ID = "test-project-id-123";

    sendUserInvitation(TEST_PROJECT_ID, { //replace TEST_PROJECT_ID with selectedProjectId for production
      toName: newAccount.name, 
      toEmail: newAccount.email,
      roleToGrant: newAccount.role
    }); 
  };

  return(
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
         <InviteFormModal
            open={openModal}
            onCreate={handleAddAccount}
        />
      </div>

);

};

export default SendInvitePage;