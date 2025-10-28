import React, {useState} from 'react';
import { DashProps } from "@/utils/types";
import Sidebar from './Sidebar/Sidebar';
import { InviteFormModal} from "../components/InviteFormModal/InviteFormModal";
import {sendUserInvitation} from "@/utils/api"


// function SendInvitePage( projectList) {

// //Roles for the new accounts
// type AccessLevel = "admin" | "student";

//Each Account has a name, email, and role as filled in through the form
// type Account = {
//   name: string;
//   email: string;
//   role: AccessLevel;
// }



// //Invitation Form Modal Open or closed
// const [openModal, setOpenModal] = useState(true); //Set to true if always open

// //Default list of Accounts that is premade can be null (empty) in the future
// // const [AccountsList] = useState<Account[]>([
// //     { name: "Joe", email: "Joe@gmail.com", role: "admin" },
// //   ]);


  //Called upon succesful submit of Invitation Form (what happens after pressing submit)
  //  const handleAddAccount = (newAccount: Account) => {
  //   console.log(newAccount);
  //   sendUserInvitation("10", {name: newAccount.name, email: newAccount.email, roleToGrant: newAccount.role});
  // };

//   return (
//     <>
//         <Sidebar
//       projectList={projectList}
//       loadingProjects={loadingProjects}
//       projectError={projectError}
//       selectedProjectId={selectedProjectId}
//       isProjectDropdownOpen={isProjectDropdownOpen}
//       toggleProjectDropdown={toggleProjectDropdown}
//       projectDropdownRef={projectDropdownRef}
//       handleProjectSelect={handleProjectSelect}
//       openMenus={openMenus}
//       setOpenMenus={setOpenMenus}
//       isUserMenuOpen={isUserMenuOpen}
//       toggleUserMenu={toggleUserMenu}
//       userMenuRef={userMenuRef}
//       userEmail={userEmail}
//       toggleMenu={toggleMenu}
//       isAddProjectSheetOpen={isAddProjectSheetOpen}
//       setIsAddProjectSheetOpen={setIsAddProjectSheetOpen}
//     />
//     {/* Modal */}
//         <InviteFormModal
//             open={openModal}
//             onClose={() => setOpenModal(false)}
//             onCreate={handleAddAccount}
//         />
//     </>
//   );
// }

// export default SendInvitePage;

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
  const [openModal, setOpenModal] = useState(true);
     const handleAddAccount = (newAccount: Account) => {
    console.log(newAccount);
    sendUserInvitation("10", {name: newAccount.name, email: newAccount.email, roleToGrant: newAccount.role});
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
            onClose={() => setOpenModal(false)}
            onCreate={handleAddAccount}
        />
      </div>

      //     {/* Modal */}
//         <InviteFormModal
//             open={openModal}
//             onClose={() => setOpenModal(false)}
//             onCreate={handleAddAccount}
//         />
//     </>
);

};

export default SendInvitePage;