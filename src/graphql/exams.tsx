import gql from 'graphql-tag';

export const GENERATE_EXAM = gql`
  query GenerateExam($module_id: Int!) {
    GenerateExam(module_id: $module_id) {
      module_id
      passing_score
      total_questions
      correctOptions
      questions {
        question_id
        question
        correct_option_id
        illustration
        options {
          option_id
          option
        }
      }
    }
  }
`;

export const ADD_COMPLETED_EXAM_INFO = gql`
  mutation AddCompletedExamInfo($module_id: Int!, $score: Int!) {
    AddCompletedExamInfo(module_id: $module_id, score: $score)
  }
`;
