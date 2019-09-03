import React, { useState, useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import CardModule from '../../components/CardModule';
import { GET_EXAM_MODULES, IExamModule } from '../../graphql/examModules';
import Header from '../../components/Header';
import { IS_AUTHENTICATED } from '../../graphql/auth';
import { MasterContext } from '../../context/MasterContext';

const Overview: React.FC<any> = () => {
  const {
    UserContext: { getUser, updateUser }
  } = useContext(MasterContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [examModules, setExamModules] = useState<null | any[]>(null);
  const { refetch: refetechExam } = useQuery(GET_EXAM_MODULES, {
    skip: true
  });
  const { refetch: refetechUser } = useQuery(IS_AUTHENTICATED, {
    skip: true
  });

  useEffect(() => {
    const getUserState = async () => {
      const { isLoggedIn } = getUser();
      if (isLoggedIn) {
        await refetechExam().then(({ data: { GetExamModules } }) => {
          setIsLoading(false);
          setExamModules(GetExamModules);
        });
      } else {
        await refetechUser().then(async ({ data: { IsAuthenticated } }) => {
          if (IsAuthenticated && !hasFetched) {
            updateUser({ ...IsAuthenticated });
            setHasFetched(true);
            await refetechExam().then(({ data: { GetExamModules } }) => {
              setIsLoading(false);
              setExamModules(GetExamModules);
            });
          } else {
            navigate('/auth', { replace: true });
          }
        });
      }
    };
    getUserState();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {examModules && (
        <>
          <Header />
          {examModules.map((examModule: IExamModule) => {
            const { module_id } = examModule;
            return <CardModule key={module_id} {...examModule} />;
          })}
        </>
      )}
    </>
  );
};

export default Overview;
