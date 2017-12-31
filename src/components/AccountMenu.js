import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import { GRAPHCOOL_TOKEN } from '../constants'

class AccountMenu extends React.Component {
  logOutUser = () => {
    localStorage.removeItem(GRAPHCOOL_TOKEN)
    this.props.history.push('/login')
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <div>Loading</div>
    }

    if (data.user) {
      const { name, username, avatarUrl } = data.user
      return (
        <details>
          <summary>
            <img src={avatarUrl} width="32" alt={username} />
          </summary>

          <p>{name}</p>
          <p>{username}</p>
          <button onClick={this.logOutUser}>Log out</button>
        </details>
      )
    }

    return null
  }
}

const USER_QUERY = gql`
  query User {
    user {
      id
      name
      username
      avatarUrl
    }
  }
`

export default compose(
  withRouter,
  graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } }),
)(AccountMenu)
