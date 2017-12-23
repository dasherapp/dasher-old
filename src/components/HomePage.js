import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AccountMenu from './AccountMenu';

function HomePage({ allBoardsQuery }) {
  if (allBoardsQuery.loading) {
    return <div>Loading</div>;
  }

  if (allBoardsQuery.error) {
    console.error(allBoardsQuery.error.stack);
    return <div>Error</div>;
  }

  return (
    <div>
      <AccountMenu />
      <h1>Boards</h1>
      <ul>
        {allBoardsQuery.allBoards.map(board => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
}

const ALL_BOARDS_QUERY = gql`
  query AllBoardsQuery {
    allBoards(orderBy: updatedAt_DESC) {
      id
      name
    }
  }
`;

export default graphql(ALL_BOARDS_QUERY, { name: 'allBoardsQuery' })(HomePage);
