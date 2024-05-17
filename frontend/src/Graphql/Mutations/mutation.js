import { gql } from "@apollo/client";

// Define mutation
export const CREATE_USER = gql`
  mutation createUser($username: String, $password: String, $email: String) {
    customuser(username: $username, password: $password, email: $email){
        username
    }
  }
`;

