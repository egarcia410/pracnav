import React from 'react';
import './Card.scss';

interface ICardProps {
  children: React.ReactElement | React.ReactChild[];
}

const Card: React.FC<ICardProps> = ({ children }) => {
  return <div className="card-root">{children}</div>;
};

export default Card;
