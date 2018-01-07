import React from 'react'
import { bool, element, func, oneOfType, shape, object } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const propTypes = {
  component: oneOfType([element, func]).isRequired,
  userIdQuery: shape({ loading: bool.isRequired, user: object }).isRequired,
}

const PrivateRoute = ({ component: Component, userIdQuery, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (userIdQuery.loading) {
        return <div>Loading</div>
      }

      return userIdQuery.user ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }}
  />
)

PrivateRoute.propTypes = propTypes

const USER_ID_QUERY = gql`
  query User {
    user {
      id
    }
  }
`

export default graphql(USER_ID_QUERY, {
  name: 'userIdQuery',
  options: { fetchPolicy: 'network-only' },
})(PrivateRoute)
