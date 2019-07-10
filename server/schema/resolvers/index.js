const { AuthQuery, AuthMutation } = require('./auth');
const { ExamQuery, ExamMutation } = require('./exam');
const { StatisticsQuery, StatisticsMutation } = require('./statistics');
const { ExamModulesQuery, ExamModulesMutation } = require('./examModules');
const {
  AnsweredQuestionsQuery,
  AnsweredQuestionsMutation
} = require('./answeredQuestions');

module.exports = {
  Query: {
    ...AuthQuery,
    ...ExamQuery,
    ...StatisticsQuery,
    ...ExamModulesQuery,
    ...AnsweredQuestionsQuery
  },
  Mutation: {
    ...AuthMutation,
    ...ExamMutation,
    ...StatisticsMutation,
    ...ExamModulesMutation,
    ...AnsweredQuestionsMutation
  }
};
