import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function BoardsPage({ data }) {
  if (data.loading) {
    return <div>Loading</div>;
  }

  if (data.error) {
    console.error(data.error.stack);
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Boards</h1>
      <ul>
        {data.allBoards.map(board => <li key={board.id}>{board.name}</li>)}
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

export default graphql(ALL_BOARDS_QUERY)(BoardsPage);
