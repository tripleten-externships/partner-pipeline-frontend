import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String, $project: String, $isActive: Boolean) {
    updateProject(
      where: { id: $id }
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
      lastUpdate
    }
  }
`;