const ExamTypeDef = `
  type Option {
    option_id: Int 
    option: String
  }

  type Question {
    question_id: Int
    question: String
    illustration: String
    correct_option_id: Int
    options: [Option]
  }

  type Exam {
    module_id: Int
    passing_score: Int
    total_questions: Int
    questions: [Question]
    correctOptions: [Int]
  }
`;

const ExamTypeDefQuery = `
  GenerateExam(module_id: Int!): Exam
`;
const ExamTypeDefMutation = `
`;

module.exports = {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
};
