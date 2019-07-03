import React, { useContext } from 'react';
import { ExamContext } from '../../context/ExamContext';

import './Question.scss';

const Question: React.FC = () => {
  const {
    currentQuestionIndex,
    exam: { questions }
  } = useContext(ExamContext);
  return (
    <h1 className="question">{questions[currentQuestionIndex].question}</h1>
  );
};

export default Question;
