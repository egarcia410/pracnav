import React from 'react';
import './QuestionCount.scss';

interface IQuestionCountProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionCount: React.FC<IQuestionCountProps> = ({
  currentQuestionIndex,
  totalQuestions
}) => {
  return (
    <div className="question-count">
      <span className="question-current">
        Question {currentQuestionIndex + 1}
      </span>
      <span>/{totalQuestions}</span>
    </div>
  );
};

export default QuestionCount;
