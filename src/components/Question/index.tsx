import React, { useContext } from 'react';
import { MasterContext } from '../../context/MasterContext';

import './Question.scss';

const Question: React.FC = () => {
  const {
    ExamContext: {
      currentQuestionIndex,
      exam: { questions }
    }
  } = useContext(MasterContext);
  return (
    <h1 className="question">{questions[currentQuestionIndex].question}</h1>
  );
};

export default Question;
