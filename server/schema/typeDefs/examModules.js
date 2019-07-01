const ExamModulesTypeDef = `
    type ExamModules {
        module_id: ID
        module_short: String
        passing_score: Int
        department_id: ID
        total_questions: Int
        module_full: String
    }
`;

const ExamModulesTypeDefQuery = `
  GetExamModules: [ExamModules]
`;
const ExamModulesTypeDefMutation = `
`;

module.exports = {
  ExamModulesTypeDef,
  ExamModulesTypeDefQuery,
  ExamModulesTypeDefMutation
};
