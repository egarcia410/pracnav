const AnsweredQuestionsTypeDef = `
	input AnsweredQuestionsInput {
        module_id: Int!
        correctOptions: [Int]!
        selectedOptions: [Int]!
        answeredQuestions: [Int]!
	}
`;
const AnsweredQuestionsTypeDefQuery = `
`;
const AnsweredQuestionsTypeDefMutation = `
	AddAnsweredQuestions(input: AnsweredQuestionsInput): Boolean
`;

module.exports = {
  AnsweredQuestionsTypeDef,
  AnsweredQuestionsTypeDefQuery,
  AnsweredQuestionsTypeDefMutation
};
