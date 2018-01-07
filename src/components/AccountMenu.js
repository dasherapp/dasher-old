import React from 'react'
import { bool, func, object, shape } from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import { GRAPHCOOL_TOKEN, GITHUB_TOKEN } from '../constants'

class AccountMenu extends React.Component {
  static propTypes = {
    history: shape({ push: func.isRequired }).isRequired,
    userQuery: shape({
      loading: bool.isRequired,
      user: object,
    }).isRequired,
  }

  logOutUser = () => {
    localStorage.removeItem(GRAPHCOOL_TOKEN)
    localStorage.removeItem(GITHUB_TOKEN)
    this.props.history.push('/login')
  }

  render() {
    const { userQuery } = this.props

    if (userQuery.loading) {
      return <div>Loading</div>
    }

    if (userQuery.user) {
      const { name, username, avatarUrl } = userQuery.user
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
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: { fetchPolicy: 'network-only' },
  }),
)(AccountMenu)
