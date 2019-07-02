import React from 'react';
import './Question.scss';

interface IQuestionProps {
  question: string;
}

const Question: React.FC<IQuestionProps> = ({ question }) => {
  return <h1 className="question">{question}</h1>;
};

export default Question;
