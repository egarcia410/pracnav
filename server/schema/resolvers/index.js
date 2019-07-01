const { AuthQuery, AuthMutation } = require('./auth');
const { ExamQuery, ExamMutation } = require('./exam');
const { StatisticsQuery, StatisticsMutation } = require('./statistics');
const { ExamModulesQuery, ExamModulesMutation } = require('./examModules');

module.exports = {
  Query: {
    ...AuthQuery,
    ...ExamQuery,
    ...StatisticsQuery,
    ...ExamModulesQuery
  },
  Mutation: {
    ...AuthMutation,
    ...ExamMutation,
    ...StatisticsMutation,
    ...ExamModulesMutation
  }
};
