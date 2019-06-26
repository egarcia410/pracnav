import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from '../Auth';
import './App.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});

toast.configure();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Auth />
    </ApolloProvider>
  );
};

export default App;
