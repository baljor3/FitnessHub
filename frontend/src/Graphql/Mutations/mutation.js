import { gql } from "@apollo/client";

// Define mutation
export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email) {
    customuser {
      username
    }
  }
}
`;

