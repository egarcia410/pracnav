const StatisticsTypeDef = `
    type Statistic {
        averageScore: Int
        correctCount: Int
        incorrectCount: Int
    }
`;

const StatisticsTypeDefQuery = `
  GetModuleStatistics(module_id: ID!): Statistic
`;
const StatisticsTypeDefMutation = `
`;

module.exports = {
  StatisticsTypeDef,
  StatisticsTypeDefQuery,
  StatisticsTypeDefMutation
};
