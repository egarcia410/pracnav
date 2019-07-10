import React, { useContext } from 'react';
import { ExamContext } from '../../context/ExamContext';

import Option from '../Option';

const Options: React.FC = () => {
  const {
    exam: { questions },
    currentQuestionIndex,
    selectedOptions,
    selectOption
  } = useContext(ExamContext);
  const { options } = questions[currentQuestionIndex];
  return (
    <div>
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
  );
};

export default Options;
