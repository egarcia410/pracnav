const ExamTypeDef = `
  type Question {
      question: Int
  }
`;
const ExamTypeDefQuery = `
  GenerateExam(module_id: Int!): Question
`;
const ExamTypeDefMutation = `
`;

module.exports = {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
};
