import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Link } from 'react-router-dom';
import { GRAPHCOOL_TOKEN_KEY } from '../constants';

class AccountMenu extends React.Component {
  logOutUser = () => {
    localStorage.removeItem(GRAPHCOOL_TOKEN_KEY);
    this.props.history.push('/login');
  };

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <div>Loading</div>;
    }

    if (data.loggedInUser) {
      const { name, username, avatarUrl } = data.loggedInUser;
      return (
        <details>
          <summary>
            <img src={avatarUrl} width="32" alt={username} />
          </summary>

          <p>{name}</p>
          <p>{username}</p>
          <button onClick={this.logOutUser}>Log out</button>
        </details>
      );
    }

    return <Link to="/login">Log in</Link>;
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      name
      username
      avatarUrl
    }
  }
`;

export default compose(
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only' } }),
  withRouter,
)(AccountMenu);
