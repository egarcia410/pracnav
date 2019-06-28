const { AuthenticationError } = require('apollo-server');

module.exports = {
  ExamQuery: {
    GenerateExam: async (_, { module_id }, { knex, user_id }) => {
      console.log(user_id, 'USER ID');
      // if (!user_id) {
      //   throw new AuthenticationError('Must be logged in');
      // }
      let module = await knex('modules')
        .where({ module_id })
        .select(['passing_score', 'total_questions'])
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
      console.log(module, 'MODULE');
      let answeredQuestions = await knex('answered_questions')
        .where({
          user_id: 27,
          module_id
        })
        .select('question_id')
        .map(answ => {
          return answ.question_id;
        });
      console.log(answeredQuestions, 'ANSWERED');
      let questions = await knex('questions')
        .where({ module_id })
        .whereNotIn('question_id', answeredQuestions)
        .limit(5)
        .reduce(
          (acc, curr) => {
            return {
              ...acc,
              questions: {
                ...acc.questions,
                [curr.question_id]: curr.question
              },
              questionIDs: [...acc.questionIDs, curr.question_id],
              correctOptionIDs: [
                ...acc.correctOptionIDs,
                curr.correct_option_id
              ]
            };
          },
          { questions: {}, questionIDs: [], correctOptionIDs: [] }
        );
      console.log(questions, 'QUESTIONS');
      return { question: 1 };
    }
  },
  ExamMutation: {}
};
