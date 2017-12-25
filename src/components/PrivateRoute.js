import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PrivateRoute = ({ component: Component, data, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (data.loading) {
        return <div>Loading</div>;
      }

      return data.loggedInUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;

export default graphql(LOGGED_IN_USER, {
  options: { fetchPolicy: 'network-only' },
})(PrivateRoute);
