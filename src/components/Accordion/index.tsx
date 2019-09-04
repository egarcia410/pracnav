import React, { useContext } from 'react';
import AccordionItem from './AccordionItem';
import { MasterContext } from '../../context/MasterContext';
import './Accordion.scss';

const Accordion: React.FC = () => {
  const {
    ExamContext: {
      selectedOptions,
      exam: { questions }
    }
  } = useContext(MasterContext);

  return (
    <div className="accordion">
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
