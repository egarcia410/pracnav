import React, { useContext, useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { ExamContext } from '../../context/ExamContext';
import Button from './ActionBtn';
import './ActionBtns.scss';

const ActionBtns: React.FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    currentQuestionIndex,
    exam: { questions },
    nextQuestion,
    prevQuestion
  } = useContext(ExamContext);
  let isFirstQuestion = currentQuestionIndex === 0;
  let isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (hasSubmitted) {
      navigate('/summary');
    }
  }, [hasSubmitted]);

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
            onClick={() => setHasSubmitted(true)}
          />
        </>
      )}
    </div>
  );
};

export default ActionBtns;
