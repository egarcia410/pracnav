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
  const { exam } = useContext(ExamContext);

  useEffect(() => {
    if (!exam) {
      navigate('/');
    }
  }, [exam]);

  return (
    <>
      {exam ? (
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
