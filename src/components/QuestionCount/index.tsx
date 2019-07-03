import React, { useContext } from 'react';
import { ExamContext } from '../../context/ExamContext';

import './QuestionCount.scss';

const QuestionCount: React.FC = () => {
  const {
    currentQuestionIndex,
    exam: { questions }
  } = useContext(ExamContext);
  return (
    <div className="question-count">
      <span className="question-current">
        Question {currentQuestionIndex + 1}
      </span>
      <span>/{questions.length}</span>
    </div>
  );
};

export default QuestionCount;
