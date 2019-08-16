import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from '@reach/router';

import Auth from '../Auth';
import Overview from '../Overview';
import Exam from '../Exam';
import Summary from '../Summary';
import './App.scss';
import { ExamProvider } from '../../context/ExamContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  headers: {
    'x-access-token': localStorage.getItem('x-access-token') || ''
  }
});

toast.configure();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ExamProvider>
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
