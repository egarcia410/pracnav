import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-regular-svg-icons';

// import './ElapsedTime.scss';

const ElapsedTime: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setTimer(prevTimer => {
        return timer + prevTimer;
      });
    }, 1000);
  });

  return (
    <div>
      <FontAwesomeIcon
        icon={faClock}
        style={{ height: '1.5rem', width: '1.5rem' }}
      />
      <span>{timer}</span>
    </div>
  );
};

export default ElapsedTime;
