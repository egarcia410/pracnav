import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { MasterContext } from '../../context/MasterContext';
import Accordion from '../../components/Accordion';
import SummaryResult from './SummaryResult';
import './Summary.scss';

interface ISummaryProps {
  path: string;
}

const Summary: React.FC<ISummaryProps> = () => {
  const {
    ExamContext: { hasSubmitted }
  } = useContext(MasterContext);

  useEffect(() => {
    if (!hasSubmitted) navigate('/');
  }, [hasSubmitted]);

  return (
    <>
      {hasSubmitted && (
        <div className="summary">
          <SummaryResult />
          <Accordion />
        </div>
      )}
    </>
  );
};

export default Summary;
