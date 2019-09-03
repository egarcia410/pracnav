import React, { createContext } from 'react';
import { ExamValues, initialExamState } from './ExamContext';
import { UserValues, initialUserState } from './UserContext';

const initialMasterState = {
  ExamContext: { ...initialExamState },
  UserContext: { ...initialUserState }
};

const MasterContext = createContext(initialMasterState);

const MasterProvider = (props: any) => {
  return (
    <MasterContext.Provider
      value={{
        ExamContext: { ...ExamValues() },
        UserContext: { ...UserValues() }
      }}
      {...props}
    />
  );
};

export { MasterContext, MasterProvider };
