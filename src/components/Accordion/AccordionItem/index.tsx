import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/pro-regular-svg-icons';
import { IQuestion } from '../../../models/exam';

import './AccordionItem.scss';

interface IAccordionItemProps {
  index: number;
  selectedOption: number;
  question: IQuestion;
}

const AccoridonItem: React.FC<IAccordionItemProps> = ({
  question,
  selectedOption,
  index
}) => {
  const [opened, setOpened] = useState(false);
  const isCorrect = selectedOption === question.correct_option_id;
  return (
    <div
      className={`accordion-item ${opened ? 'accordion-item--opened' : ''}`}
      onClick={() => setOpened(!opened)}
    >
      <div className="accordion-item__line">
        <div className="accordion-item__question">
          <FontAwesomeIcon
            className={`accordion-item__result-icon ${
              isCorrect ? 'correct' : 'incorrect'
            }`}
            icon={isCorrect ? faCheckCircle : faTimesCircle}
          />
          <h4 className="accordion-item__title">
            {index + 1}. {question.question}
          </h4>
        </div>
        <FontAwesomeIcon
          className="accordion-item__icon"
          icon={opened ? faMinusCircle : faPlusCircle}
        />
      </div>
      <div className="accordion-item__inner">
        <div className="accordion-item__content">
          <ul>
            {question.options.map(option => {
              return (
                <li
                  key={option.option_id}
                  className="accordion-item__paragraph"
                >
                  {option.option}
                </li>
              );
            })}
          </ul>
          {}
        </div>
      </div>
    </div>
  );
};

export default AccoridonItem;
