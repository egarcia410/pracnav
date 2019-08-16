const { AuthenticationError } = require('apollo-server');

module.exports = {
  ExamModulesQuery: {
    GetExamModules: async (_, __, { knex, user }) => {
      if (!user) {
        throw new AuthenticationError('UNAUTHENTICATED');
      }
      const { department_id } = user;
      return await knex('modules').where({ department_id });
    }
  },
  ExamModulesMutation: {}
};
