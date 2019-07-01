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

const {
  StatisticsTypeDef,
  StatisticsTypeDefQuery,
  StatisticsTypeDefMutation
} = require('./statistics');

const {
  ExamModulesTypeDef,
  ExamModulesTypeDefQuery,
  ExamModulesTypeDefMutation
} = require('./examModules');

const TypeDefs = [
  AuthTypeDef,
  ExamTypeDef,
  StatisticsTypeDef,
  ExamModulesTypeDef
];
const Query = `
	type Query {
		${AuthTypeDefQuery}
		${ExamTypeDefQuery}
		${StatisticsTypeDefQuery}
		${ExamModulesTypeDefQuery}
	}
`;
const Mutation = `
	type Mutation {
		${AuthTypeDefMutation}
		${ExamTypeDefMutation}
		${StatisticsTypeDefMutation}
		${ExamModulesTypeDefMutation}
	}
`;

module.exports = [...TypeDefs, Query, Mutation];
