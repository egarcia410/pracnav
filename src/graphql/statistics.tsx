import gql from 'graphql-tag';

export const GET_STATISTICS = gql`
  query GetModuleStatistics($module_id: Int!) {
    GetModuleStatistics(module_id: $module_id) {
      averageScore
      correctCount
      incorrectCount
      totalQuestions
    }
  }
`;
