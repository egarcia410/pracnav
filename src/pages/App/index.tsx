import React from 'react';
import ApolloClient, { Operation } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from '@reach/router';

import Auth from '../Auth';
import Overview from '../Overview';
import Exam from '../Exam';
import Summary from '../Summary';
import './App.scss';
import { MasterProvider } from '../../context/MasterContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  request: (operation: Operation) => {
    operation.setContext({
      headers: {
        'x-access-token': localStorage.getItem('x-access-token') || ''
      }
    });
  }
});

toast.configure();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MasterProvider>
        <Router>
          <Auth path="/auth" />
          <Overview path="/" />
          <Exam path="/exam" />
          <Summary path="/summary" />
        </Router>
      </MasterProvider>
    </ApolloProvider>
  );
};

export default App;
