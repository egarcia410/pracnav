import React, { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import { MasterContext } from '../../context/MasterContext';
import { ADD_ANSWERED_QUESTIONS, ADD_COMPLETED_EXAM_INFO } from '../../graphql';
import Button from './ActionBtn';
import './ActionBtns.scss';

const ActionBtns: React.FC = () => {
  const client = useApolloClient();
  const {
    ExamContext: {
      currentQuestionIndex,
      exam: { questions, module_id, correctOptions },
      nextQuestion,
      prevQuestion,
      answeredQuestions,
      selectedOptions,
      submitExam
    }
  } = useContext(MasterContext);
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const onSubmitExam = () => {
    if (answeredQuestions.length) {
      client.mutate({
        mutation: ADD_ANSWERED_QUESTIONS,
        variables: {
          module_id,
          correctOptions,
          selectedOptions,
          answeredQuestions
        }
      });

      let numCorrect = 0;
      let score = 0;
      questions.forEach((question, index) => {
        if (selectedOptions[index] === question.correct_option_id) {
          numCorrect++;
        }
      });
      score = Math.floor((numCorrect / questions.length) * 100);

      client.mutate({
        mutation: ADD_COMPLETED_EXAM_INFO,
        variables: {
          module_id,
          score
        }
      });
      submitExam({ numCorrect, score });
    }
    navigate('/summary', { replace: true });
  };

  return (
    <div
      className={`actionButtons ${
        isFirstQuestion && answeredQuestions.length !== questions.length
          ? 'actionButtons-centered'
          : ''
      }`}
    >
      {isFirstQuestion && (
        <>
          <Button
            text="Next"
            className="button-next"
            onClick={() => nextQuestion()}
          />
          {answeredQuestions.length === questions.length ? (
            <Button
              text="Submit"
              className="button-submit"
              onClick={() => onSubmitExam()}
            />
          ) : null}
        </>
      )}
      {!isFirstQuestion && !isLastQuestion && (
        <>
          <Button
            text="Previous"
            className="button-prev"
            onClick={() => prevQuestion()}
          />
          {answeredQuestions.length === questions.length ? (
            <Button
              text="Submit"
              className="button-submit"
              onClick={() => onSubmitExam()}
            />
          ) : null}
          <Button
            text="Next"
            className="button-next"
            onClick={() => nextQuestion()}
          />
        </>
      )}
      {isLastQuestion && (
        <>
          <Button
            text="Previous"
            className="button-prev"
            onClick={() => prevQuestion()}
          />
          <Button
            text="Submit"
            className="button-submit"
            onClick={() => onSubmitExam()}
          />
        </>
      )}
    </div>
  );
};

export default ActionBtns;
