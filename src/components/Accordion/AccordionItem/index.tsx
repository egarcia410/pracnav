import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faTimesCircle,
  faMinus
} from '@fortawesome/pro-regular-svg-icons';
import { IQuestion } from '../../../models/exam';

import './AccordionItem.scss';

interface IAccordionItemProps {
  index: number;
  selectedOption: number;
  question: IQuestion;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({
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
          <ul className="accordion-options">
            {question.options.map(option => {
              let isCorrectOption =
                option.option_id === question.correct_option_id;
              let isUserSelectedOption = selectedOption === option.option_id;
              let isUserSelectedOptionCorrect: null | boolean = null;
              if (isUserSelectedOption) {
                isUserSelectedOptionCorrect =
                  selectedOption === question.correct_option_id;
              }
              const icon =
                isUserSelectedOptionCorrect !== null
                  ? isUserSelectedOptionCorrect
                    ? faCheckCircle
                    : faTimesCircle
                  : isCorrectOption
                  ? faCheckCircle
                  : faMinus;

              const optionResult =
                icon === faCheckCircle
                  ? 'correct'
                  : icon === faTimesCircle
                  ? 'incorrect'
                  : '';

              return (
                <li key={option.option_id} className="accordion-option">
                  <FontAwesomeIcon
                    className={`accordion-option__result ${optionResult}`}
                    icon={icon}
                  />
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

export default AccordionItem;
