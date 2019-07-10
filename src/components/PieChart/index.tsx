import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface IPieChartProps {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
}

const PieChart: React.FC<IPieChartProps> = ({
  totalQuestions,
  correctCount,
  incorrectCount
}) => {
  const data = [
    {
      id: 'incorrect',
      label: 'incorrect',
      value: incorrectCount
    },
    {
      id: 'unanswered',
      label: 'unanswered',
      value: totalQuestions - (correctCount + incorrectCount)
    },
    {
      id: 'correct',
      label: 'correct',
      value: correctCount
    }
  ];
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
