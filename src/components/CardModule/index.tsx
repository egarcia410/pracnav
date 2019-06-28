import React from 'react';

import Card from '../../shared/Card';
import PieChart from '../../shared/PieChart';
import './CardModule.scss';

const CardModule: React.FC = () => {
  const generateExam = (moduleNumber: number) => {
    console.log(`generate module ${moduleNumber}`);
  };

  return (
    <div className="module-wrapper">
      <Card onClick={() => generateExam(1)} style={{ cursor: 'pointer' }}>
        <div className="module-header">
          <div>Rules Of The Road</div>
          <div>Avg. Score: 75%</div>
        </div>
        <div style={{ height: '200px', width: '100%' }}>
          <PieChart />
        </div>
      </Card>
    </div>
  );
};

export default CardModule;
