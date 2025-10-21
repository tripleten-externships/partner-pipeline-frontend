// src/AcceptInvitationPage/AcceptInvitationPage.tsx
import React, {useState} from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AcceptInvitationPageProps } from '@/utils/types';
import { InviteFormModal } from "../InviteFormModal/InviteFormModal";

//Roles for the new accounts
type AccessLevel = "admin" | "student";

//Each Account has a name, email, and role as filled in through the form
type Account = {
  name: string;
  email: string;
  role: AccessLevel;
}

const AcceptInvitationPage: React.FC<AcceptInvitationPageProps> = ({
  projectList,
  setSelectedProjectId,
  invitation,
  isLoggedIn,
  userEmail,
  handleAcceptInvite,
}) => {

//Invitation Form Modal Open or closed
  const [openModal, setOpenModal] = useState(false); //Set to true if always open

//Default Account that is premade can be null in the future
  const [AccountsList, setAccountsList] = useState<Account[]>([
    { name: "Joe", email: "Joe@gmail.com", role: "admin" },
  ]);

//Called upon succesful submit of Invitation Form 
   const handleAddAccount = (newAccount: Account) => {
    setAccountsList((prev) => [...prev, newAccount]);
    console.log(AccountsList);
  };

  if (!invitation) {
     return <p className="text-center mt-60">Loading invitation...</p>; 

        
  }

  const project = projectList.find((p) => p.id === invitation.id);
  const icon = project?.fallBackIcon;

 
  

  return (
    
    
    <Card className="max-w-md w-full mx-auto mt-60 p-6">
      <CardHeader className="flex flex-col items-center">
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <CardTitle className="text-center text-2xl font-bold">
          You’ve been invited to join {invitation.projectName}
        </CardTitle>
        <CardDescription className="text-center">
          as a <span className="font-semibold">{invitation.role}</span> by {invitation.inviterName}
          
        </CardDescription>
      </CardHeader>

      {isLoggedIn ? (
        <Button
          className="w-full mt-6"
          onClick={() => {
            setSelectedProjectId(invitation.id);
            handleAcceptInvite();
            setOpenModal(true); //Invitation Modal is opened 
          }}
        >
          Accept as {userEmail}
        </Button>

        

        
      ) : (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>You’re not logged in</AlertTitle>
          <AlertDescription>Please log in to accept this invitation.</AlertDescription>
        </Alert>
      )}

    
    {/* Modal */}
                <InviteFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleAddAccount}
      />
    </Card>

    
  );
};

export default AcceptInvitationPage;

