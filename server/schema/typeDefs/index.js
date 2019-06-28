const {
  AuthTypeDef,
  AuthTypeDefQuery,
  AuthTypeDefMutation
} = require('./auth');

const {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
} = require('./exam');

const TypeDefs = [AuthTypeDef, ExamTypeDef];
const Query = `
	type Query {
		${AuthTypeDefQuery}
		${ExamTypeDefQuery}
	}
`;
const Mutation = `
	type Mutation {
		${AuthTypeDefMutation}
		${ExamTypeDefMutation}
	}
`;

module.exports = [...TypeDefs, Query, Mutation];
