import React, { useContext } from 'react';
import { MasterContext } from '../../context/MasterContext';

import './QuestionCount.scss';

const QuestionCount: React.FC = () => {
  const {
    ExamContext: {
      currentQuestionIndex,
      exam: { questions }
    }
  } = useContext(MasterContext);
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
