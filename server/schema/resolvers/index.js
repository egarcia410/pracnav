const { AuthQuery, AuthMutation } = require('./auth');
const { ExamsQuery, ExamsMutation } = require('./exams');
const { StatisticsQuery, StatisticsMutation } = require('./statistics');
const { ExamModulesQuery, ExamModulesMutation } = require('./examModules');
const {
  AnsweredQuestionsQuery,
  AnsweredQuestionsMutation
} = require('./answeredQuestions');

module.exports = {
  Query: {
    ...AuthQuery,
    ...ExamsQuery,
    ...StatisticsQuery,
    ...ExamModulesQuery,
    ...AnsweredQuestionsQuery
  },
  Mutation: {
    ...AuthMutation,
    ...ExamsMutation,
    ...StatisticsMutation,
    ...ExamModulesMutation,
    ...AnsweredQuestionsMutation
  }
};
