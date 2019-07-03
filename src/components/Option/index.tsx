import React from 'react';

import './Option.scss';

interface IOption {
  option: any;
  isSelected: boolean;
  onSelectOption: (optionId: number) => void;
}

const Option: React.FC<IOption> = ({
  option: { option_id, option },
  isSelected,
  onSelectOption
}) => {
  return (
    <div
      onClick={() => {
        onSelectOption(+option_id);
      }}
      className={`option ${isSelected ? 'option-selected' : ''}`}
    >
      {option}
    </div>
  );
};

export default Option;
