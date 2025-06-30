// src/AcceptInvitationPage/AcceptInvitationPage.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Project } from '@/utils/types';

export interface Invitation {
  id: number;
  projectName: string;
  inviterName: string;
  role: string;
  projectLogo: string;
  projectIcon: React.ReactNode;
}

interface AcceptInvitationPageProps {
  projectList: Project[];
  setSelectedProjectId: (id: number) => void;
  invitation: Invitation | null;
  isLoggedIn: boolean;
  userEmail: string;
  handleAcceptInvite: () => void;
}

const AcceptInvitationPage: React.FC<AcceptInvitationPageProps> = ({
  projectList,
  setSelectedProjectId,
  invitation,
  isLoggedIn,
  userEmail,
  handleAcceptInvite,
}) => {
  if (!invitation) {
    return <p className="text-center mt-60">Loading invitation...</p>;
  }

  const project = projectList.find((p) => p.id === invitation.id);
  const icon = project?.icon;

  return (
    <Card className="max-w-md w-full mx-auto mt-60 p-6">
      <CardHeader className="flex flex-col items-center">
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        {/* <Avatar className="mb-4 h-16 w-16">
          <AvatarImage src={invitation.projectLogo} />
          <AvatarFallback>{invitation.projectName[0]}</AvatarFallback>
        </Avatar> */}
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
    </Card>
  );
};

export default AcceptInvitationPage;

