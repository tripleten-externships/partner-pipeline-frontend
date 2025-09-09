import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $subtitle: String, $status: String!) {
    createProject(data: {
      name: $name,
      subtitle: $subtitle,
      status: $status
    }) {
      id
      name
      subtitle
      status
    }
  }
`;
