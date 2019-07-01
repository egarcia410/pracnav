module.exports = {
  ExamModulesQuery: {
    GetExamModules: async (_, __, { knex, department_id }) => {
      // TODO: Replace with logged in user's department id
      return await knex('modules').where({ department_id: 1 });
    }
  },
  ExamModulesMutation: {}
};
