import React from 'react';
import { Query } from 'react-apollo';

import CardModule from '../../shared/CardModule';
import { GET_EXAM_MODULES } from '../../graphql/examModules';

// import './Overview.scss';

const Overview: React.FC<any> = () => {
  return (
    <>
      <Query query={GET_EXAM_MODULES}>
        {({ loading, error, data: { GetExamModules } }: any) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return GetExamModules.map((examModule: any) => {
            return <CardModule key={examModule.module_id} {...examModule} />;
          });
        }}
      </Query>
    </>
  );
};

export default Overview;
