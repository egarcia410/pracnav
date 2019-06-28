import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'incorrect',
    label: 'incorrect',
    value: 300
  },
  {
    id: 'unanswered',
    label: 'unanswered',
    value: 1000
  },
  {
    id: 'correct',
    label: 'correct',
    value: 300
  }
];

const PieChart: React.FC = () => {
  return (
    <ResponsivePie
      data={data}
      colors={{ scheme: 'category10' }}
      innerRadius={0.6}
      padAngle={0.5}
      cornerRadius={5}
      enableRadialLabels={false}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'correct'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'unanswered'
          },
          id: 'lines'
        }
      ]}
    />
  );
};

export default PieChart;
