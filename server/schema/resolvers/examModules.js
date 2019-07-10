module.exports = {
  ExamModulesQuery: {
    GetExamModules: async (_, __, { knex, user }) => {
      const { department_id } = user;
      return await knex('modules').where({ department_id });
    }
  },
  ExamModulesMutation: {}
};
