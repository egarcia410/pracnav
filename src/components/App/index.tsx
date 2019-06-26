import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Auth from '../Auth';
import './App.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Auth />
    </ApolloProvider>
  );
};

export default App;
