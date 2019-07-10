module.exports = {
  StatisticsQuery: {
    GetModuleStatistics: async (_, { module_id }, { knex, user }) => {
      const { user_id } = user;
      // TODO: Gather exam results
      let avgScore = await knex('exams')
        .where({ user_id, module_id })
        .avg('score');
      let incorrectCount = await knex('answered_questions')
        .count('is_correct')
        .where({
          is_correct: false
        });
      let correctCount = await knex('answered_questions')
        .count('is_correct')
        .where({
          is_correct: true
        });
      let totalQuestions = await knex('questions')
        .count('question')
        .where({ module_id });
      return {
        averageScore: avgScore[0].avg === null ? 0 : avgScore[0].avg,
        correctCount: correctCount[0].count,
        incorrectCount: incorrectCount[0].count,
        totalQuestions: totalQuestions[0].count
      };
    }
  },
  StatisticsMutation: {}
};
