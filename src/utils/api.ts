import { gql, useQuery } from '@apollo/client';

function processServerRequest(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
//helpful function pair for shorthand on requests to check for errors

const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
//making an assumption for headers

const useProjectIDs = () => {
   return useQuery(gql`query Query {
    projects {
      id
    }
  }`,
{fetchPolicy: "network-only"});
}

const useProjects = () => {
  return useQuery(gql`query Query {
    projects {
      id,
      name,
      project,
      isActive
    }
  }`,
{fetchPolicy: "network-only"});
};

const useUserData = (email: string) => {
  return useQuery(gql`query Query($where: UserWhereUniqueInput!) {
  user(where: $where) {
    email
    name
  }
  }`,
  {variables : {where:{email:email}}}
  );
}

const useMilestones = (projectId:string) => {
  return useQuery(gql`query Query($where: MilestoneWhereInput!) {
  milestones(where: $where) {
    milestoneName
    status
  }
  }`,
  {variables : {where:{project:{id:{equals:projectId}}}}}
  );
}

const useActivityLogs = () => {
  return useQuery(gql`query Query($orderBy: [ActivityLogOrderByInput!]!) {
  activityLogs(orderBy: $orderBy) {
    id
    timestamp
    milestone {
      milestoneName
    }
    oldStatus
    newStatus
    updatedBy {
      name
    }
  }
  }`,
  {variables : {orderBy:[{timestamp: "desc"}]}});
}

export { processServerRequest, baseUrl, headers, useProjects, useProjectIDs, useUserData, useMilestones, useActivityLogs };
