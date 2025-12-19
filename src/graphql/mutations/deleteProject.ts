import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(where: { id: $id }) {
      id
      name
    }
  }
`;
