import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';

import { MasterContext } from '../../context/MasterContext';
import ProgressBar from '../../components/ProgressBar';
import ExamTracker from '../../components/ExamTracker';
import Question from '../../components/Question';
import Options from '../../components/Options';
import ActionBtns from '../../components/ActionBtns';

import './Exam.scss';

const Exam: React.FC<any> = () => {
  const {
    ExamContext: { exam }
  } = useContext(MasterContext);

  useEffect(() => {
    if (!exam) {
      navigate('/');
    }
  }, [exam]);

  return (
    <>
      {exam && (
        <div className="exam-container">
          <ProgressBar />
          <ExamTracker />
          <Question />
          <Options />
          <ActionBtns />
        </div>
      )}
    </>
  );
};

export default Exam;
