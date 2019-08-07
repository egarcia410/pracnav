import React, { useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faCogs } from '@fortawesome/pro-regular-svg-icons';

import Header from '../../components/Header';
import Auth from '../Auth';
import Overview from '../Overview';
import Exam from '../Exam';
import Summary from '../Summary';
import { ExamProvider } from '../../context/ExamContext';
import './App.scss';
import { AUTH_SIGN_IN } from '../../graphql/auth';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  headers: {
    'x-access-token': localStorage.getItem('x-access-token') || ''
  }
});

toast.configure();

const left = <FontAwesomeIcon icon={faShip} />;
const right = <FontAwesomeIcon icon={faCogs} />;

const App: React.FC = () => {
  useEffect(() => {
    const authenticateUser = async () => {
      await client
        .query({
          query: AUTH_SIGN_IN,
          variables: {
            email: '',
            password: ''
          }
        })
        .then(({ data: { AuthSignIn } }: any) => {
          const { isSuccess } = AuthSignIn;
          if (isSuccess) {
            navigate('/', { replace: true });
          } else {
            navigate('/auth', { replace: true });
          }
        });
    };
    authenticateUser();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ExamProvider>
        <Header left={left} right={right} />
        <Router>
          <Overview path="/" />
          <Auth path="/auth" />
          <Exam path="/exam" />
          <Summary path="/summary" />
        </Router>
      </ExamProvider>
    </ApolloProvider>
  );
};

export default App;
