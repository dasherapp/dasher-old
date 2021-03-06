import React from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import { Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import queryString from 'query-string'

import { GITHUB_CLIENT_ID, GRAPHCOOL_TOKEN, GITHUB_TOKEN } from '../constants'

class LoginPage extends React.Component {
  static propTypes = {
    userIdQuery: shape({
      loading: bool.isRequired,
      user: object,
    }).isRequired,
    authenticateUser: func.isRequired,
    history: shape({ replace: func.isRequired }).isRequired,
    location: shape({ search: string.isRequired }).isRequired,
  }

  state = { loading: false, error: '' }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search)

    if (query.code) {
      this.logInUser(query.code)
    }
  }

  logInUser = async githubCode => {
    try {
      this.setState({ loading: true })

      const { data } = await this.props.authenticateUser(githubCode)

      localStorage.setItem(
        GRAPHCOOL_TOKEN,
        data.authenticateUser.graphcoolToken,
      )
      localStorage.setItem(GITHUB_TOKEN, data.authenticateUser.githubToken)

      this.props.history.replace('/')
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  goToGithubAuthPage = () => {
    window.location = this.getGithubAuthUrl()
  }

  getGithubAuthUrl = () => {
    // get current URL without query string
    // reference: https://stackoverflow.com/a/5817566
    const { protocol, host, pathname } = window.location
    const callbackUrl = protocol + '//' + host + pathname

    const query = queryString.stringify({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo',
      redirect_uri: callbackUrl,
    })

    return `https://github.com/login/oauth/authorize?${query}`
  }

  render() {
    const { userIdQuery } = this.props
    const { loading, error } = this.state

    if (userIdQuery.loading) {
      return <div>Loading</div>
    }

    return userIdQuery.user ? (
      <Redirect to="/" />
    ) : (
      <div>
        <h1>Log In</h1>

        {loading && <p>Loading</p>}
        {error && <p>Error</p>}

        <button
          className="login-button"
          onClick={this.goToGithubAuthPage}
          disabled={loading}
        >
          Log in with GitHub
        </button>
      </div>
    )
  }
}

const USER_ID_QUERY = gql`
  query UserId {
    user {
      id
    }
  }
`

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUser($githubCode: String!) {
    authenticateUser(githubCode: $githubCode) {
      graphcoolToken
      githubToken
    }
  }
`

export default compose(
  graphql(USER_ID_QUERY, {
    name: 'userIdQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(AUTHENTICATE_USER_MUTATION, {
    props: ({ mutate }) => ({
      authenticateUser: githubCode => mutate({ variables: { githubCode } }),
    }),
  }),
)(LoginPage)
