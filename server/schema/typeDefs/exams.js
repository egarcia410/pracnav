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
  AddCompletedExamInfo(module_id: Int!, score: Int!): Boolean
`;

module.exports = {
  ExamTypeDef,
  ExamTypeDefQuery,
  ExamTypeDefMutation
};
