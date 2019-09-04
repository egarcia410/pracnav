import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-regular-svg-icons';

import useInterval from '../../hooks/useInterval';

const ElapsedTime: React.FC = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useInterval(() => {
    setTime(prevTime => {
      let seconds = time.seconds + 1;
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      return { ...prevTime, hours, minutes, seconds };
    });
  }, 1000);

  return (
    <div>
      <FontAwesomeIcon
        icon={faClock}
        style={{ height: '1.5rem', width: '1.5rem' }}
      />
      <span>
        {` 0${time.hours}`}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {Math.floor((time.seconds % 3600) % 60) < 10
          ? `0${time.seconds % 60}`
          : time.seconds % 60}
      </span>
    </div>
  );
};

export default ElapsedTime;
