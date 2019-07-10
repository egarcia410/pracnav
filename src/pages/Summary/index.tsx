import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { ExamContext } from '../../context/ExamContext';
import Accordion from '../../components/Accordion';
import Card from '../../components/Card';

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
