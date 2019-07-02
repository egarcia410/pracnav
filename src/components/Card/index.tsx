import React from 'react';
import './Card.scss';

interface ICardProps {
  children: React.ReactElement | React.ReactChild[];
  onClick?: () => void;
  style?: React.CSSProperties;
}

type Card = (x: ICardProps) => React.ReactElement;

const Card: React.FC<ICardProps> = ({ children, onClick, style }) => {
  return (
    <div className="card-root" onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Card;
