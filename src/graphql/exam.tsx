import gql from 'graphql-tag';

export const GENERATE_EXAM = gql`
  query GenerateExam($module_id: Int!) {
    GenerateExam(module_id: $module_id) {
      passing_score
      total_questions
      questions {
        question_id
        question
        correct_option_id
        options {
          option_id
          option
        }
      }
    }
  }
`;

export const GET_EXAM = gql`
  {
    exam @client {
      passing_score
      total_questions
      questions {
        question_id
        question
        correct_option_id
        options {
          option_id
          option
        }
      }
    }
  }
`;
