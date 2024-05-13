import { gql, useMutation } from '@apollo/client';

// Define mutation
export const CREATE_USER = gql`
  
  mutation customUserMutation($username: String! $password: String! $email: String!) {
    customUserMutation(username: $username password: $password email: $email){
        username
        password
        email
    }
  }
`;

