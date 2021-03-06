import gql from 'graphql-tag';

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    IsAuthenticated {
      user_id
      is_admin
      department_id
      isLoggedIn
    }
  }
`;

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
      email
      is_admin
      token
      department_id
    }
  }
`;

export const AUTH_SIGN_IN = gql`
  query AuthSignIn($email: String!, $password: String!) {
    AuthSignIn(email: $email, password: $password) {
      isSuccess
      message
      user_id
      email
      is_admin
      token
      department_id
    }
  }
`;
