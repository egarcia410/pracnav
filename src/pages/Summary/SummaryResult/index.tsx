import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBan } from '@fortawesome/pro-regular-svg-icons';
import { IExam } from '../../../models/exam';
import Card from '../../../components/Card';
import './SummaryResult.scss';

interface ISummaryResultProps {
  selectedOptions: number[];
  exam: IExam;
}

const SummaryResult: React.FC<ISummaryResultProps> = ({
  selectedOptions,
  exam
}) => {
  const [numCorrect, setNumCorrect] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [hasPassed, setHasPassed] = useState(true);

  useEffect(() => {
    const { questions, passing_score } = exam;
    let numCorrect = 0;
    let percentage = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correct_option_id) {
        numCorrect++;
      }
    });
    percentage = Math.floor((numCorrect / questions.length) * 100);
    if (percentage < passing_score) {
      setHasPassed(false);
    }
    setNumCorrect(numCorrect);
    setPercentage(percentage);
  }, [selectedOptions, exam]);

  return (
    <div className="summary-result">
      <Card>
        <div className="summary-result__content">
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon className="summary-result__icon" icon={faTrophy} />
            {!hasPassed && (
              <FontAwesomeIcon
                className="summary-result__icon-failed"
                icon={faBan}
              />
            )}
          </span>
          <div className="summary-result__stats">
            <span className="summary-result__stat">
              {numCorrect}/{exam.questions.length}
            </span>
            <span className="summary-result__stat">{percentage}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryResult;
