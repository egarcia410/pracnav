import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import CardModule from '../../components/CardModule';
import { GET_EXAM_MODULES, IExamModule } from '../../graphql/examModules';
import Header from '../../components/Header';

const Overview: React.FC<any> = () => {
  const { loading, data } = useQuery(GET_EXAM_MODULES);
  const { GetExamModules } = data;

  useEffect(() => {
    if (!loading && !GetExamModules) {
      navigate('/auth', { replace: true });
    }
  }, [loading, data]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {GetExamModules && (
        <>
          <Header />
          {GetExamModules.map((examModule: IExamModule) => {
            const { module_id } = examModule;
            return <CardModule key={module_id} {...examModule} />;
          })}
        </>
      )}
    </>
  );
};

export default Overview;
