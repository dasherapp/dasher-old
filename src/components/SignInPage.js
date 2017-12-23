import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GITHUB_CLIENT_ID, GRAPHCOOL_TOKEN_KEY } from '../constants';

class SignInPage extends React.Component {
  state = {
    loading: false,
    error: '',
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    if (query.code) {
      this.signInUser(query.code);
    }
  }

  signInUser = async githubCode => {
    try {
      this.setState({ loading: true });

      const response = await this.props.authenticateUserMutation({
        variables: { githubCode },
      });

      localStorage.setItem(
        GRAPHCOOL_TOKEN_KEY,
        response.data.authenticateUser.token,
      );

      this.props.history.replace('/');
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  goToGithubAuthPage = () => {
    window.location = this.getGithubAuthUrl();
  };

  getGithubAuthUrl = () => {
    const query = queryString.stringify({
      client_id: GITHUB_CLIENT_ID,
    });

    return `https://github.com/login/oauth/authorize?${query}`;
  };

  render() {
    if (localStorage.getItem(GRAPHCOOL_TOKEN_KEY)) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Sign In</h1>
        {this.state.loading && 'Loading'}
        {this.state.error && 'Error'}
        <button onClick={this.goToGithubAuthPage}>Sign in with GitHub</button>
      </div>
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($githubCode: String!) {
    authenticateUser(githubCode: $githubCode) {
      token
    }
  }
`;

export default graphql(AUTHENTICATE_USER_MUTATION, {
  name: 'authenticateUserMutation',
})(SignInPage);
