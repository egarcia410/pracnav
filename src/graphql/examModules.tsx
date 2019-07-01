import gql from 'graphql-tag';

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
