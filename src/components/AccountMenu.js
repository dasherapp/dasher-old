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
    const { loggedInUserQuery } = this.props;

    if (loggedInUserQuery.loading) {
      return <div>Loading</div>;
    }

    if (loggedInUserQuery.error) {
      console.error(loggedInUserQuery.error.stack);
      return <div>Error</div>;
    }

    const isLoggedIn =
      loggedInUserQuery.loggedInUser && loggedInUserQuery.loggedInUser.id;

    if (isLoggedIn) {
      const { name, username, avatarUrl } = loggedInUserQuery.loggedInUser;
      return (
        <div>
          <img src={avatarUrl} width="32" alt={username} />
          <p>{name}</p>
          <p>{username}</p>
          <button onClick={this.logOutUser}>Log out</button>
        </div>
      );
    }

    return <Link to="/login">Log in</Link>;
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
      username
      avatarUrl
    }
  }
`;

export default compose(
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  withRouter,
)(AccountMenu);
