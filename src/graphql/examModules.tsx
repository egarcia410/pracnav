import gql from 'graphql-tag';

export interface IExamModule {
  department_id: number;
  module_full: string;
  module_id: number;
  module_short: string;
  passing_score: number;
  total_questions: number;
}

export const GET_EXAM_MODULES = gql`
  query GetExamModules {
    GetExamModules {
      module_id
      module_short
      module_full
      passing_score
      total_questions
      department_id
    }
  }
`;
