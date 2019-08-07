import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/pro-regular-svg-icons';
import * as yup from 'yup';
import ReactTooltip from 'react-tooltip';
import { withApollo } from 'react-apollo';
import { toast } from 'react-toastify';
import { navigate } from '@reach/router';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useAuthForm from '../../hooks/useAuthForm';
import { AUTH_SIGN_UP, AUTH_SIGN_IN } from '../../graphql/auth';
import './Auth.scss';

const SignUpOptions = {
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirm is required')
  }),
  initialValues: {
    email: '',
    password: '',
    passwordConfirm: ''
  }
};

const SignInOptions = {
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup.string().required('Password is required')
  }),
  initialValues: {
    email: '',
    password: ''
  }
};

const Auth: React.FC<any> = ({ client }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onSubmit, onChange, values, errors, reset } = useAuthForm(
    SignInOptions
  );

  const onHandleSubmit = (values: any) => {
    const { email, password } = values;
    setIsLoading(true);
    if (isSignUp) {
      client
        .mutate({
          mutation: AUTH_SIGN_UP,
          variables: {
            ...values
          }
        })
        .then(({ data: { AuthSignUp } }: any) => {
          const { isSuccess, message, token } = AuthSignUp;
          if (isSuccess) {
            localStorage.setItem('x-access-token', token);
            toast.success(message, {
              position: toast.POSITION.TOP_RIGHT
            });
            navigate('/', { replace: true });
          } else {
            setIsLoading(false);
            toast.error(message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        });
    } else {
      client
        .query({
          query: AUTH_SIGN_IN,
          variables: {
            email,
            password
          }
        })
        .then(({ data: { AuthSignIn } }: any) => {
          const { isSuccess, message, token } = AuthSignIn;
          if (isSuccess) {
            localStorage.setItem('x-access-token', token);
            toast.success(message, {
              position: toast.POSITION.TOP_RIGHT
            });
            navigate('/', { replace: true });
          } else {
            setIsLoading(true);
            toast.error(message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        });
    }
  };

  const onToggleAuth = (e: any) => {
    e.preventDefault();
    let options = isSignUp ? SignInOptions : SignUpOptions;
    reset(options);
    setIsSignUp(bool => !bool);
  };

  return (
    <div className="auth-root">
      <Card>
        <form onSubmit={e => onSubmit(e, onHandleSubmit)}>
          <div className="auth-header">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
          <div className="auth-content">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={onChange}
              isValid={errors.email && errors.email.isValid}
              data-tip
              data-for="email"
            />
            {errors.email && errors.email.message ? (
              <ReactTooltip id="email" type="error">
                <span>{errors.email.message}</span>
              </ReactTooltip>
            ) : null}
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={onChange}
              isValid={errors.password && errors.password.isValid}
              data-tip
              data-for="password"
            />
            {errors.password && errors.password.message ? (
              <ReactTooltip id="password" type="error">
                <span>{errors.password.message}</span>
              </ReactTooltip>
            ) : null}
            {isSignUp ? (
              <>
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  value={values.passwordConfirm}
                  onChange={onChange}
                  isValid={
                    errors.passwordConfirm && errors.passwordConfirm.isValid
                  }
                  data-tip
                  data-for="passwordConfirm"
                />
                {errors.passwordConfirm && errors.passwordConfirm.message ? (
                  <ReactTooltip id="passwordConfirm" type="error">
                    <span>{errors.passwordConfirm.message}</span>
                  </ReactTooltip>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="auth-footer">
            <Button type="submit" fluid disabled={isLoading}>
              <span style={{ marginRight: '5px' }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </span>
              <FontAwesomeIcon icon={faSignIn} />
            </Button>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={(e: any) => onToggleAuth(e)} variant="plain">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default withApollo(Auth);
