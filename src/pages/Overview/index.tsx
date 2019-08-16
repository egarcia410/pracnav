import React from 'react';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faCogs } from '@fortawesome/pro-regular-svg-icons';
import { navigate } from '@reach/router';

import CardModule from '../../components/CardModule';
import { GET_EXAM_MODULES } from '../../graphql/examModules';
import Header from '../../components/Header';

const left = <FontAwesomeIcon icon={faShip} />;
const right = <FontAwesomeIcon icon={faCogs} />;

const Overview: React.FC<any> = () => {
  return (
    <>
      <Header left={left} right={right} />
      <Query query={GET_EXAM_MODULES}>
        {({ loading, error, data }: any) => {
          if (loading) return 'Loading...';
          if (error) {
            if (error.message.includes('UNAUTHENTICATED')) {
              navigate('/auth', { replace: true });
              return null;
            }
          }
          const { GetExamModules } = data;
          return GetExamModules.map((examModule: any) => {
            return <CardModule key={examModule.module_id} {...examModule} />;
          });
        }}
      </Query>
    </>
  );
};

export default Overview;
