import React, { useContext } from 'react';
import { MasterContext } from '../../context/MasterContext';

import './ProgressBar.scss';

const ProgressBar: React.FC = () => {
  const {
    ExamContext: {
      exam: { questions },
      selectedOptions,
      currentQuestionIndex,
      navigateToQuestion
    }
  } = useContext(MasterContext);
  return (
    <div className="progressBar">
      {questions.map((question, index) => {
        const { question_id } = question;
        let isAnswered = selectedOptions[index] !== undefined;
        let isFirstQuestion = index === 0;
        let isLastQuestion = index === questions.length - 1;
        let isCurrentQuestion = currentQuestionIndex === index;
        return (
          <div
            key={question_id}
            onClick={() => navigateToQuestion(index)}
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
