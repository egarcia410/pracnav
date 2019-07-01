module.exports = {
  StatisticsQuery: {
    GetModuleStatistics: async (_, { module_id }, { knex, user_id }) => {
      let avgScore = await knex('exams')
        .where({ user_id: 27, module_id })
        .avg('score');
      let incorrectCount = await knex('answered_questions').where({
        is_correct: false
      });
      let correctCount = await knex('answered_questions').where({
        is_correct: true
      });
      return {
        averageScore: avgScore[0].avg === null ? 0 : avgScore[0].avg,
        correctCount: correctCount.length,
        incorrectCount: incorrectCount.length
      };
    }
  },
  StatisticsMutation: {}
};
