import React from 'react';
import queryString from 'query-string';

// TODO: move GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
const GITHUB_CLIENT_ID = '799bd70f09884c025750';

class SignInPage extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    if (query.code) {
      console.log(query.code);
    }
  }

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
    return (
      <div>
        <h1>Sign In</h1>
        <button onClick={this.goToGithubAuthPage}>Sign in with GitHub</button>
      </div>
    );
  }
}

export default SignInPage;
