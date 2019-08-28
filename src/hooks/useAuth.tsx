import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { IS_AUTHENTICATED } from '../graphql/auth';

const useAuth = () => {
  const { loading, error, data } = useQuery(IS_AUTHENTICATED);

  return { loading, error, data };
};

export default useAuth;
