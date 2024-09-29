import { gql } from "@apollo/client";

// # name can be given anything after query
// authUser is important because its name same in backend
export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;
