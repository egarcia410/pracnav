import gql from 'graphql-tag';

export const AUTH_SIGN_UP = gql`
  mutation AuthSignUp(
    $email: String!
    $password: String!
    $passwordConfirm: String!
    $isAdmin: Boolean
  ) {
    AuthSignUp(
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
