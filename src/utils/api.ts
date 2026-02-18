import { gql, useQuery } from "@apollo/client";

function processServerRequest(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const useProjectIDs = () => {
  return useQuery(
    gql`
      query Query {
        projects {
          id
        }
      }
    `,
    { fetchPolicy: "network-only" }
  );
};

const useProjects = () => {
  return useQuery(
    gql`
      query Query {
        projects {
          id
          name
          project
          isActive
        }
      }
    `,
    { fetchPolicy: "network-only" }
  );
};

export const useProjectInvitations = (projectId?: string) => {
  const skip = !projectId || typeof projectId !== "string";
  return useQuery(
    gql`
      query ProjectInvitations($projectId: ID!) {
        projectInvitations(where: { project: { id: { equals: $projectId } } }) {
          id
          email
          user {
            id
            email
            name
          }
          invitationTokens {
            id
            tokenHash
            roleToGrant
            expiresAt
            revoked
          }
        }
      }
    `,
    { variables: { projectId: projectId as string }, skip, fetchPolicy: "cache-and-network" }
  );
};

const useWaitlistEntries = () => {
  return useQuery(
    gql`
      query WaitListStudents {
        waitListStudents(orderBy: [{ createdAt: desc }]) {
          id
          name
          email
          status
          inviteSentAt
          createdAt
          notes
          program
          completedOn
          contactedBy {
            id
            name
          }
          lastContactedOn
          hasVoucher
        }
      }
    `,
    { fetchPolicy: "cache-and-network" }
  );
};

const useStudents = () => {
  return useQuery(
    gql`
      query Students {
        users(where: { role: { equals: "Student" } }, orderBy: [{ createdAt: desc }]) {
          id
          name
          email
          role
          status
          reminder_count
          isActive
          lastLoginDate
          createdAt
        }
      }
    `,
    { fetchPolicy: "cache-and-network" }
  );
};
const useUserData = (email: string) => {
  return useQuery(
    gql`
      query Query($where: UserWhereUniqueInput!) {
        user(where: $where) {
          email
          name
        }
      }
    `,
    { variables: { where: { email: email } } }
  );
};

const useMilestones = (projectId: string | undefined) => {
  const shouldSkip = !projectId || typeof projectId !== "string";

  return useQuery(
    gql`
      query Milestones($projectId: ID!) {
        milestones(
          where: { project: { id: { equals: $projectId } } }
          orderBy: [{ updatedAt: desc }]
        ) {
          id
          milestoneName
          status
          updatedAt
          updatedBy {
            id
            name
          }
        }
      }
    `,
    {
      variables: { projectId: projectId as string },
      skip: shouldSkip,
      fetchPolicy: "cache-and-network",
    }
  );
};

const useActivityLogs = (projectId?: string) => {
  const shouldSkip = !projectId || typeof projectId !== "string";

  return useQuery(
    gql`
      query ActivityLogs($projectId: ID!) {
        activityLogs(
          where: { project: { id: { equals: $projectId } } }
          orderBy: [{ timestamp: desc }]
          take: 50
        ) {
          id
          timestamp
          milestone {
            id
            milestoneName
          }
          oldStatus
          newStatus
          updatedBy {
            id
            name
          }
        }
      }
    `,
    {
      variables: { projectId: projectId as string },
      skip: shouldSkip,
      fetchPolicy: "cache-and-network",
    }
  );
};

interface UpdateMilestoneData {
  milestoneName?: string;
  status?: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  results: {
    created: number;
    updated: number;
    errors: string[];
  };
}

async function importStudentsFromCsv(file: File): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("file", file);

  const apiBaseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

  const response = await fetch(`${apiBaseUrl}/api/waitlist/import`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to import students" }));
    throw new Error(error.message || "Failed to import students");
  }

  return response.json();
}

async function updateMilestone(projectId: string, milestoneId: string, data: UpdateMilestoneData) {
  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/milestones/${milestoneId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return processServerRequest(response);
  } catch (error) {
    console.error("Error updating milestone:", error);
    throw error;
  }
}

const useMe = () => {
  return useQuery(
    gql`
      query Me {
        authenticatedItem {
          __typename
          ... on User {
            id
            email
            name
            role
          }
        }
      }
    `,
    { fetchPolicy: "network-only" }
  );
};

async function sendUserInvitation(
  projectId: string,
  data: { name: string; email: string; roleToGrant: string }
) {
  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/invitations`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return processServerRequest(response);
  } catch (error) {
    console.error("Error sending project invitation:", error);
    throw error;
  }
}

export {
  processServerRequest,
  baseUrl,
  headers,
  useProjects,
  useProjectIDs,
  useUserData,
  useMilestones,
  useActivityLogs,
  updateMilestone,
  useMe,
  importStudentsFromCsv,
  useWaitlistEntries, // Added this
  useStudents, // Added this
  sendUserInvitation,
};
