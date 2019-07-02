import React from 'react';
import { navigate } from '@reach/router';

import Button from './ActionBtn';
import './ActionBtns.scss';

interface IActionButtons {
  // hasAnsweredAll: boolean;
  // isFirstQuestion: boolean;
  // isLastQuestion: boolean;
  nextQuestion: () => void;
  prevQuestion: () => void;
  // submitExam: () => {};
}

const ActionBtns: React.FC<IActionButtons> = ({
  nextQuestion,
  prevQuestion
}) => {
  function onSubmitExam() {
    console.log('SUBMIT EXAM');
    // navigate(`/summary`);
    // TODO: Confirm submission
    // TODO: Verify all questions answered
    // TODO: Submit exam data
    // submitExam();
  }

  let isFirstQuestion = false;
  let isLastQuestion = true;
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
