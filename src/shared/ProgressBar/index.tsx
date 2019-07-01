import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';

interface IProgressBarProps {
  questions: [any];
  answeredIDs: [number];
  currentQuestionID: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  questions,
  answeredIDs,
  currentQuestionID
}) => {
  return (
    <div className="progressBar">
      {/* {questionIDs.map((questionId, index) => {
                let isAnswered = answeredQuestions[index] !== undefined;
                let isFirstQuestion = index === 0;
                let isLastQuestion = index === questionIDs.length - 1;
                let isCurrentQuestion = index === currentQuestionIndex;
                return (
                    <div
                        key={questionId}
                        onClick={() => jumpToQuestion(questionId)}
                        className={`progress 
            ${isAnswered ? 'progress-answered' : ''}
            ${isFirstQuestion ? 'progress-first' : ''}
            ${isLastQuestion ? 'progress-last' : ''}
            ${isCurrentQuestion ? 'progress-current' : ''}
            `}
                    />
                );
            })} */}
    </div>
  );
};

export default ProgressBar;
