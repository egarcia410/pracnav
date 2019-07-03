import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { ExamContext } from '../../context/ExamContext';
import Button from './ActionBtn';
import './ActionBtns.scss';

const ActionBtns: React.FC = () => {
  const {
    currentQuestionIndex,
    exam: { questions },
    nextQuestion,
    prevQuestion,
    answeredQuestions
  } = useContext(ExamContext);
  let isFirstQuestion = currentQuestionIndex === 0;
  let isLastQuestion = currentQuestionIndex === questions.length - 1;

  const onSubmitExam = () => {
    let hasAnsweredAll = answeredQuestions.every(optionId => {
      return optionId !== undefined;
    });
    if (hasAnsweredAll) {
      console.log('navigate to summary page');
    } else {
      console.log('Modal - Unanswered questions, continue?');
    }
  };
  return (
    <div
      className={`actionButtons ${
        isFirstQuestion ? 'actionButtons-centered' : ''
      }`}
    >
      {isFirstQuestion && (
        <Button
          text="Next"
          className="button-next"
          onClick={() => nextQuestion()}
        />
      )}
      {!isFirstQuestion && !isLastQuestion && (
        <>
          <Button
            text="Previous"
            className="button-prev"
            onClick={() => prevQuestion()}
          />
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
            onClick={onSubmitExam}
          />
        </>
      )}
    </div>
  );
};

export default ActionBtns;
