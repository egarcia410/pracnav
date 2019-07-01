const ExamTypeDef = `
  type Option {
    option_id: ID 
    option: String
  }

  type Question {
    question_id: ID
    question: String
    illustration: String
    correct_option_id: ID
    options: [Option]
  }

  type Exam {
    passing_score: Int
    total_questions: Int
    questions: [Question]
  }
`;

const ExamTypeDefQuery = `
  GenerateExam(module_id: ID!): Exam
`;
const ExamTypeDefMutation = `
`;

module.exports = {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
};
