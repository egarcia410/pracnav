const { AuthenticationError } = require('apollo-server');

module.exports = {
  ExamQuery: {
    GenerateExam: async (_, { module_id }, { knex, user_id }) => {
      // if (!user_id) {
      //   throw new AuthenticationError('Must be logged in');
      // }
      let examModule = await knex('modules')
        .where({ module_id })
        .select(['passing_score', 'total_questions'])
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
      let answeredQuestions = await knex('answered_questions')
        .where({
          user_id: 27,
          module_id
        })
        .select('question_id')
        .map(answ => {
          return answ.question_id;
        });
      let qs = await knex('questions')
        .where({ module_id })
        .whereNotIn('question_id', answeredQuestions)
        .limit(5)
        .reduce(
          (acc, curr) => {
            return {
              ...acc,
              questions: [...acc.questions, { ...curr }],
              questionIDs: [...acc.questionIDs, curr.question_id]
            };
          },
          { questions: [], questionIDs: [] }
        );
      const { questions, questionIDs } = qs;
      let optns = await knex('options')
        .whereIn('question_id', questionIDs)
        .reduce((acc, curr) => {
          let accOptions = acc[curr.question_id] ? acc[curr.question_id] : [];
          return {
            ...acc,
            [curr.question_id]: [...accOptions, curr]
          };
        }, {});
      let questionsWithOptions = questions.map(question => {
        let options = optns[question.question_id];
        return { ...question, options };
      });
      return { ...examModule, questions: questionsWithOptions };
    }
  },
  ExamMutation: {}
};
