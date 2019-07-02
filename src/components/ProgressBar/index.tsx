import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';

interface IProgressBarProps {
  questions: [any];
  answeredIDs: [number];
  currentQuestionID: number;
  jumpToQuestion: (question_id: number) => void;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  questions,
  answeredIDs,
  currentQuestionID,
  jumpToQuestion
}) => {
  return (
    <div className="progressBar">
      {questions.map((question, index) => {
        const { question_id } = question;
        let isAnswered = answeredIDs[index] !== undefined;
        let isFirstQuestion = index === 0;
        let isLastQuestion = index === questions.length - 1;
        let isCurrentQuestion = currentQuestionID === question_id;
        return (
          <div
            key={question_id}
            onClick={() => jumpToQuestion(index)}
            className={`progress 
            ${isAnswered ? 'progress-answered' : ''}
            ${isFirstQuestion ? 'progress-first' : ''}
            ${isLastQuestion ? 'progress-last' : ''}
            ${isCurrentQuestion ? 'progress-current' : ''}
            `}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
