import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { ExamContext } from '../../context/ExamContext';
import Accordion from '../../components/Accordion';
import SummaryResult from './SummaryResult';
import './Summary.scss';

interface ISummaryProps {
  path: string;
}

const Summary: React.FC<ISummaryProps> = () => {
  const { selectedOptions, exam } = useContext(ExamContext);

  useEffect(() => {
    if (!exam) {
      navigate('/');
    }
  }, [exam]);

  return (
    <>
      {exam ? (
        <div className="summary">
          <SummaryResult selectedOptions={selectedOptions} exam={exam} />
          <Accordion
            selectedOptions={selectedOptions}
            questions={exam.questions}
          />
        </div>
      ) : null}
    </>
  );
};

export default Summary;
