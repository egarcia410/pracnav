import React, { useContext } from 'react';
import { ExamContext } from '../../context/ExamContext';

import Option from '../Option';
import './Options.scss';

const Options: React.FC = () => {
  const {
    exam: { questions },
    currentQuestionIndex,
    selectedOptions,
    selectOption
  } = useContext(ExamContext);
  const { options, illustration } = questions[currentQuestionIndex];
  return (
    <div className="options-content">
      <div className="options">
        {options.map((option: any) => {
          const { option_id } = option;
          let isSelected = selectedOptions[currentQuestionIndex] === +option_id;
          return (
            <Option
              key={option_id}
              option={option}
              isSelected={isSelected}
              onSelectOption={selectOption}
            />
          );
        })}
      </div>
      {illustration ? (
        <div className="illustration">
          <img
            width="250px"
            height="300px"
            src={require(`../../assets/ror_illustrations/${illustration}.png`)}
            alt={illustration}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Options;
