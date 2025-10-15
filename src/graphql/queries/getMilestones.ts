import { gql } from "@apollo/client";

export const GET_MILESTONES = gql`
  query Milestones($projectId: ID!) {
    milestones(
      where: { project: { id: { equals: $projectId } } }
      orderBy: [{ updatedAt: desc }]
    ) {
      id
      milestoneName
      status        # "not_started" | "in_progress" | "completed" | "blocked"
      assignee
      updatedAt
      updatedBy { id name }
    }
  }
`;