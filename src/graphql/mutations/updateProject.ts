import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String!, $subtitle: String, $status: String!) {
    updateProject(
      where: { id: $id }
      data: {
        name: $name
        subtitle: $subtitle
        status: $status
      }
    ) {
      id
      name
      subtitle
      status
    }
  }
`;
