import React, {useState} from 'react';
import { InviteFormModal} from "../components/InviteFormModal/InviteFormModal";
// import {sendUserInvitation} from "@/utils/api"


function Invite() {

//Roles for the new accounts
type AccessLevel = "admin" | "student";

//Each Account has a name, email, and role as filled in through the form
type Account = {
  name: string;
  email: string;
  role: AccessLevel;
}

//Invitation Form Modal Open or closed
const [openModal, setOpenModal] = useState(true); //Set to true if always open

//Default list of Accounts that is premade can be null (empty) in the future
const [AccountsList] = useState<Account[]>([
    { name: "Joe", email: "Joe@gmail.com", role: "admin" },
  ]);


  //Called upon succesful submit of Invitation Form (what happens after pressing submit)
   const handleAddAccount = (newAccount: Account) => {
    // setAccountsList((prev) => [...prev, newAccount]); //add account to list
    // sendUserInvitation("10", newAccount);
    console.log(newAccount);
    console.log(AccountsList);
  };

  return (
    <>
    {/* Modal */}
        <InviteFormModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onCreate={handleAddAccount}
        />
    </>
  );
}

export default Invite;
