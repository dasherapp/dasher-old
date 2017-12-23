import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function PrivateRoute({ component: Component, loggedInUserQuery, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (loggedInUserQuery.loading) {
          return <div>Loading</div>;
        }

        if (loggedInUserQuery.error) {
          console.error(loggedInUserQuery.error);
          return <div>Error</div>;
        }

        const isLoggedIn =
          loggedInUserQuery.loggedInUser && loggedInUserQuery.loggedInUser.id;

        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`;

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' },
})(PrivateRoute);
