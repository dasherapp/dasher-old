import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const PrivateRoute = ({ component: Component, data, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (data.loading) {
        return <div>Loading</div>
      }

      return data.user ? <Component {...props} /> : <Redirect to="/login" />
    }}
  />
)

const USER = gql`
  query User {
    user {
      id
    }
  }
`

export default graphql(USER, {
  options: { fetchPolicy: 'network-only' },
})(PrivateRoute)
