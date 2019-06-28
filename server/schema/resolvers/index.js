const { AuthQuery, AuthMutation } = require('./auth');
const { ExamQuery, ExamMutation } = require('./exam');

module.exports = {
  Query: {
    ...AuthQuery,
    ...ExamQuery
  },
  Mutation: {
    ...AuthMutation,
    ...ExamMutation
  }
};
