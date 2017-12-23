import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GRAPHCOOL_TOKEN_KEY } from '../constants';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(GRAPHCOOL_TOKEN_KEY) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default PrivateRoute;
