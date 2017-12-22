import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjbhufyy601sx0170z4w9rxw8',
  }),
  cache: new InMemoryCache(),
});

function Apollo(props) {
  return <ApolloProvider client={client} {...props} />;
}

export default Apollo;
