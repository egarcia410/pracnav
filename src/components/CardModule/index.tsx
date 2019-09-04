import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import Card from '../Card';
import PieChart from '../PieChart';
import { GET_STATISTICS } from '../../graphql/statistics';
import { GENERATE_EXAM } from '../../graphql/exams';
import { MasterContext } from '../../context/MasterContext';

import './CardModule.scss';

const CardModule: React.FC<any> = ({ module_id, module_full }) => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_STATISTICS, {
    variables: { module_id }
  });
  const { GetModuleStatistics } = data;
  const {
    ExamContext: { updateExam }
  } = useContext(MasterContext);
  const generateExam = (module_id: number) => {
    client
      .query({
        query: GENERATE_EXAM,
        variables: {
          module_id
        }
      })
      .then(({ data: { GenerateExam } }: any) => {
        updateExam(GenerateExam);
        navigate('/exam');
      });
  };
  return (
    <div className="module-wrapper">
      <Card
        onClick={() => generateExam(module_id)}
        style={{ cursor: 'pointer' }}
      >
        <>
          {loading && 'Loading...'}
          {error && `Error! ${error.message}`}
          {GetModuleStatistics && (
            <>
              <div className="module-header">
                <div>{module_full}</div>
                <div>Avg. Score: {GetModuleStatistics.averageScore || 0}%</div>
              </div>
              <div style={{ height: '200px', width: '100%' }}>
                <PieChart {...GetModuleStatistics} />
              </div>
            </>
          )}
        </>
      </Card>
    </div>
  );
};

export default CardModule;
