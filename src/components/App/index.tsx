import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faCogs } from '@fortawesome/pro-regular-svg-icons';

import Auth from '../Auth';
import CardModule from '../CardModule';
import Header from '../../shared/Header';
import './App.scss';

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
  return (
    <ApolloProvider client={client}>
      {/* <Header left={left} right={right} />
      <CardModule /> */}
      <Auth />
    </ApolloProvider>
  );
};

export default App;
