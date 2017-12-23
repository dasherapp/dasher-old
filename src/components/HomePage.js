import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

function HomePage({ loggedInUserQuery, allBoardsQuery }) {
  if (loggedInUserQuery.loading) {
    return <div>Loading</div>;
  }

  if (loggedInUserQuery.error) {
    console.error(loggedInUserQuery.error.stack);
    return <div>Error</div>;
  }

  if (allBoardsQuery.loading) {
    return <div>Loading</div>;
  }

  if (allBoardsQuery.error) {
    console.error(allBoardsQuery.error.stack);
    return <div>Error</div>;
  }

  return (
    <div>
      <img
        src={loggedInUserQuery.loggedInUser.avatarUrl}
        width="32"
        alt={loggedInUserQuery.loggedInUser.username}
      />
      <p>{loggedInUserQuery.loggedInUser.name}</p>
      <p>{loggedInUserQuery.loggedInUser.username}</p>
      <h1>Boards</h1>
      <ul>
        {allBoardsQuery.allBoards.map(board => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
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

const ALL_BOARDS_QUERY = gql`
  query AllBoardsQuery {
    allBoards(orderBy: updatedAt_DESC) {
      id
      name
    }
  }
`;

export default compose(
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(ALL_BOARDS_QUERY, { name: 'allBoardsQuery' }),
)(HomePage);
