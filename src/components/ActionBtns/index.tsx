import React, { useContext, useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { navigate } from '@reach/router';
import { ExamContext } from '../../context/ExamContext';
import { ADD_ANSWERED_QUESTIONS } from '../../graphql/answeredQuestions';
import Button from './ActionBtn';
import './ActionBtns.scss';

const ActionBtns: React.FC<any> = ({ client }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    currentQuestionIndex,
    exam: { questions, module_id, correctOptions },
    nextQuestion,
    prevQuestion,
    answeredQuestions,
    selectedOptions
  } = useContext(ExamContext);
  let isFirstQuestion = currentQuestionIndex === 0;
  let isLastQuestion = currentQuestionIndex === questions.length - 1;
  useEffect(() => {
    if (hasSubmitted) {
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
      }
      navigate('/summary', { replace: true });
    }
  }, [hasSubmitted]);

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
              onClick={() => setHasSubmitted(true)}
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
              onClick={() => setHasSubmitted(true)}
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
            onClick={() => setHasSubmitted(true)}
          />
        </>
      )}
    </div>
  );
};

export default withApollo(ActionBtns);
