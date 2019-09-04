const {
  AuthTypeDef,
  AuthTypeDefQuery,
  AuthTypeDefMutation
} = require('./auth');

const {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
} = require('./exams');

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

const {
  AnsweredQuestionsTypeDef,
  AnsweredQuestionsTypeDefQuery,
  AnsweredQuestionsTypeDefMutation
} = require('./answeredQuestions');

const TypeDefs = [
  AuthTypeDef,
  ExamTypeDef,
  StatisticsTypeDef,
  ExamModulesTypeDef,
  AnsweredQuestionsTypeDef
];
const Query = `
	type Query {
		${AuthTypeDefQuery}
		${ExamTypeDefQuery}
		${StatisticsTypeDefQuery}
		${ExamModulesTypeDefQuery}
		${AnsweredQuestionsTypeDefQuery}
	}
`;
const Mutation = `
	type Mutation {
		${AuthTypeDefMutation}
		${ExamTypeDefMutation}
		${StatisticsTypeDefMutation}
		${ExamModulesTypeDefMutation}
		${AnsweredQuestionsTypeDefMutation}
	}
`;

module.exports = [...TypeDefs, Query, Mutation];
