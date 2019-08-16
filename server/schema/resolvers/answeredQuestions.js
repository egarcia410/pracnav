module.exports = {
  AnsweredQuestionsQuery: {},
  AnsweredQuestionsMutation: {
    AddAnsweredQuestions: async (_, { input }, { knex, user }) => {
      if (!user) {
        throw new AuthenticationError('Must be logged in');
      }
      const { user_id } = user;
      const {
        module_id,
        correctOptions,
        selectedOptions,
        answeredQuestions
      } = input;
      const date_answered = new Date().toDateString();
      return Promise.all(
        answeredQuestions.map(async (question_id, index) => {
          if (question_id) {
            const is_correct = selectedOptions[index] === correctOptions[index];
            return await knex('answered_questions').insert({
              is_correct,
              date_answered,
              module_id,
              question_id,
              user_id
            });
          }
        })
      )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }
};
