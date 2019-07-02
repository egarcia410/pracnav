import React from 'react';
import Option from '../Option';

interface IOptions {
  options: any[];
  onSelectOption: (option_id: number) => void;
  selectedOptions: number[];
}

const Options: React.FC<IOptions> = ({
  options,
  onSelectOption,
  selectedOptions
}) => {
  return (
    <div>
      {options.map((option: any) => {
        const { option_id } = option;
        let isSelected = selectedOptions.includes(+option_id);
        return (
          <Option
            key={option_id}
            option={option}
            isSelected={isSelected}
            onSelectOption={onSelectOption}
          />
        );
      })}
    </div>
  );
};

export default Options;
