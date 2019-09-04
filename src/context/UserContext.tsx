import { useReducer } from 'react';
import { navigate } from '@reach/router';

interface IUser {
  user_id: number;
  is_admin: number;
  department_id: number;
  isLoggedIn: boolean;
}

interface IUserState {
  user_id: null | number;
  is_admin: null | number;
  department_id: null | number;
  isLoggedIn: boolean;
  getUser: () => IUser;
  updateUser: (user: IUser) => void;
  signOut: () => void;
}

const initialUserState: IUserState = {
  user_id: null,
  is_admin: null,
  department_id: null,
  isLoggedIn: false
} as any;

const userReducer = (state: IUserState, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...action.user
      };
    case 'SIGN_OUT':
      localStorage.removeItem('x-access-token');
      navigate('/auth', { replace: true });
      return initialUserState;
    default:
      return state;
  }
};

const UserValues = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const getUser = () => {
    return state;
  };
  const updateUser = (user: any) => {
    dispatch({
      type: 'UPDATE_USER',
      user
    });
  };
  const signOut = () => {
    dispatch({
      type: 'SIGN_OUT'
    });
  };
  return {
    ...state,
    getUser,
    updateUser,
    signOut
  };
};

export { UserValues, initialUserState };
