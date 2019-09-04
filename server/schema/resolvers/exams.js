const { AuthenticationError } = require('apollo-server');

module.exports = {
  ExamsQuery: {
    GenerateExam: async (_, { module_id }, { knex, user }) => {
      if (!user) {
        throw new AuthenticationError('Must be logged in');
      }
      const { user_id } = user;
      let examModule = await knex('modules')
        .where({ module_id })
        .select(['passing_score', 'total_questions', 'module_id'])
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
      let answeredQuestions = await knex('answered_questions')
        .where({
          user_id,
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
              questionIDs: [...acc.questionIDs, curr.question_id],
              correctOptions: [...acc.correctOptions, curr.correct_option_id]
            };
          },
          { questions: [], questionIDs: [], correctOptions: [] }
        );
      const { questions, questionIDs, correctOptions } = qs;
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
      return {
        ...examModule,
        questions: questionsWithOptions,
        correctOptions
      };
    }
  },
  ExamsMutation: {
    AddCompletedExamInfo: async (_, { module_id, score }, { knex, user }) => {
      if (!user) {
        return null;
      }
      const { user_id } = user;
      return await knex('exams')
        .insert({
          user_id,
          module_id,
          score,
          date_submitted: new Date()
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }
};
