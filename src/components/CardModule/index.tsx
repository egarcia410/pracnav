import React, { useContext } from 'react';
import { withApollo, Query } from 'react-apollo';
import { navigate } from '@reach/router';

import Card from '../Card';
import PieChart from '../PieChart';
import { GET_STATISTICS } from '../../graphql/statistics';
import { GENERATE_EXAM } from '../../graphql/exam';
import { ExamContext } from '../../context/ExamContext';

import './CardModule.scss';

const CardModule: React.FC<any> = ({ client, ...rest }) => {
  const examContext = useContext(ExamContext);
  const { module_id, module_full, total_questions } = rest;
  const generateExam = (module_id: number) => {
    client
      .query({
        query: GENERATE_EXAM,
        variables: {
          module_id
        }
      })
      .then(({ data: { GenerateExam } }: any) => {
        client.writeData({ data: { exam: GenerateExam } });
        examContext.updateExam(GenerateExam);
        navigate('/exam');
      });
  };
  return (
    <div className="module-wrapper">
      <Card
        onClick={() => generateExam(module_id)}
        style={{ cursor: 'pointer' }}
      >
        <Query query={GET_STATISTICS} variables={{ module_id }}>
          {({ loading, error, data: { GetModuleStatistics } }: any) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const {
              averageScore,
              correctCount,
              incorrectCount
            } = GetModuleStatistics;
            return (
              <>
                <div className="module-header">
                  <div>{module_full}</div>
                  <div>Avg. Score: {averageScore}%</div>
                </div>
                <div style={{ height: '200px', width: '100%' }}>
                  <PieChart
                    totalQuestions={total_questions}
                    correctCount={correctCount}
                    incorrectCount={incorrectCount}
                  />
                </div>
              </>
            );
          }}
        </Query>
      </Card>
    </div>
  );
};

export default withApollo(CardModule);
