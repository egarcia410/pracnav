import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBan } from '@fortawesome/pro-regular-svg-icons';

import { MasterContext } from '../../../context/MasterContext';
import Card from '../../../components/Card';
import './SummaryResult.scss';

const SummaryResult: React.FC = () => {
  const {
    ExamContext: {
      score,
      numCorrect,
      exam: { questions, passing_score }
    }
  } = useContext(MasterContext);

  return (
    <div className="summary-result">
      <Card>
        <div className="summary-result__content">
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon className="summary-result__icon" icon={faTrophy} />
            {score < passing_score && (
              <FontAwesomeIcon
                className="summary-result__icon-failed"
                icon={faBan}
              />
            )}
          </span>
          <div className="summary-result__stats">
            <span className="summary-result__stat">
              {numCorrect}/{questions.length}
            </span>
            <span className="summary-result__stat">{score}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryResult;
