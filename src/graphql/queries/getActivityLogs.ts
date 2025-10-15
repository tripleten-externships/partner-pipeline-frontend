import { gql } from "@apollo/client";

export const GET_ACTIVITY_LOGS = gql`
  query ActivityLogs($projectId: ID!) {
    activityLogs(
      where: { project: { id: { equals: $projectId } } }
      orderBy: [{ timestamp: desc }]
      take: 50
    ) {
      id
      oldStatus
      newStatus
      timestamp
      updatedBy { id name }
      milestone { id milestoneName }
    }
  }
`;