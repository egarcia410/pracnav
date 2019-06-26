import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation AddUser(
    $email: String!
    $password: String!
    $passwordConfirm: String!
    $isAdmin: Boolean
  ) {
    AddUser(
      user: {
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
        is_admin: $isAdmin
      }
    ) {
      isSuccess
      message
      user_id
      is_admin
    }
  }
`;
