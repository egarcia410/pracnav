import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';

import { ExamContext } from '../../context/ExamContext';
import ProgressBar from '../../components/ProgressBar';
import QuestionCount from '../../components/QuestionCount';
import Question from '../../components/Question';
import Options from '../../components/Options';
import ActionBtns from '../../components/ActionBtns';

import './Exam.scss';

const Exam: React.FC<any> = () => {
  const { hasExam } = useContext(ExamContext);

  useEffect(() => {
    if (!hasExam) {
      navigate('/');
    }
  }, [hasExam]);

  return (
    <>
      {hasExam ? (
        <div className="exam-container">
          <ProgressBar />
          <QuestionCount />
          <Question />
          <Options />
          <ActionBtns />
        </div>
      ) : null}
    </>
  );
};

export default Exam;
