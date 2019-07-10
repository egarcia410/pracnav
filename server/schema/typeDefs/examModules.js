const ExamModulesTypeDef = `
    type ExamModules {
        module_id: Int
        module_short: String
        passing_score: Int
        department_id: Int
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
