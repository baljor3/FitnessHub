import { gql } from "@apollo/client";

// Define mutation
export const CREATE_USER = gql`
  mutation CustomUserMutation($username: String! $password: String! $email: String!) {
    customUserMutation(username: $username password: $password email: $email){
        username
        password
        email
    }
  }
`;

