import React from 'react';
import './ActionBtn.scss';

interface IButton {
  text: string;
  className: string;
  onClick: () => void;
}

const ActionBtn: React.FC<IButton> = ({ text, className, onClick }) => {
  return (
    <div className={`button ${className}`} onClick={onClick}>
      {text}
    </div>
  );
};

export default ActionBtn;
