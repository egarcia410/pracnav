import React from 'react';
import { IQuestion } from '../../models/exam';
import AccordionItem from './AccordionItem';
import './Accordion.scss';

interface IAccordionProps {
  selectedOptions: number[];
  questions: IQuestion[];
}

const Accordion: React.FC<IAccordionProps> = ({
  selectedOptions,
  questions
}) => {
  return (
    <div>
      <ul className="accordion-list" style={{ margin: '20px auto' }}>
        {questions.map((question, index) => {
          return (
            <li className="accordion-list__item" key={index}>
              <AccordionItem
                question={question}
                selectedOption={selectedOptions[index]}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;
