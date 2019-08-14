import React from 'react';
import QuestionCount from '../QuestionCount';
import ElapsedTime from '../ElapsedTime';

import './ExamTracker.scss';

const ExamTracker: React.FC = () => {
  return (
    <div className="exam-tracker">
      <QuestionCount />
      <ElapsedTime />
    </div>
  );
};

export default ExamTracker;
