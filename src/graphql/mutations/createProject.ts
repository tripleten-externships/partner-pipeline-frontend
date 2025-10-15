import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $project: String!, $isActive: Boolean) {
    createProject(
      data: {
        name: $name
        project: $project
        isActive: $isActive
      }
    ) {
      id
      name
      project
      isActive
    }
  }
`;