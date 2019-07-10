import gql from 'graphql-tag';

export const ADD_ANSWERED_QUESTIONS = gql`
  mutation AddAnsweredQuestions(
    $module_id: Int!
    $correctOptions: [Int]!
    $selectedOptions: [Int]!
    $answeredQuestions: [Int]!
  ) {
    AddAnsweredQuestions(
      input: {
        module_id: $module_id
        correctOptions: $correctOptions
        selectedOptions: $selectedOptions
        answeredQuestions: $answeredQuestions
      }
    )
  }
`;
