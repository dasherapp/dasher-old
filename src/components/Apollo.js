import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHCOOL_TOKEN_KEY } from '../constants';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjbhufyy601sx0170z4w9rxw8',
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GRAPHCOOL_TOKEN_KEY);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: middlewareAuthLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Apollo = props => <ApolloProvider client={client} {...props} />;

export default Apollo;
