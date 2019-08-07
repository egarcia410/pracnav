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
