const AuthTypeDef = `
	type AuthNotification {
		isSuccess: Boolean!
		message: String!
		is_admin: Boolean
		department_id: Int
		user_id: Int
		email: String
		token: String
	}

	input SignUpInput {
		email: String!
		password: String!
		passwordConfirm: String!
		is_admin: Boolean
	}
`;
const AuthTypeDefQuery = `
	AuthSignIn(email: String!, password: String!): AuthNotification
`;
const AuthTypeDefMutation = `
	AuthSignUp(user: SignUpInput): AuthNotification
`;

module.exports = {
  AuthTypeDef,
  AuthTypeDefQuery,
  AuthTypeDefMutation
};
