module.exports = {
  ExamModulesQuery: {
    GetExamModules: async (_, __, { knex, user }) => {
      if (!user) {
        return null;
      }
      const { department_id } = user;
      return await knex('modules').where({ department_id });
    }
  },
  ExamModulesMutation: {}
};
