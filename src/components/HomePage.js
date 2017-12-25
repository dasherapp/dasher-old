import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AccountMenu from './AccountMenu';

function HomePage({ data }) {
  if (data.loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <AccountMenu />
      <h1>Boards</h1>
      <ul>
        {data.allBoards.map(board => <li key={board.id}>{board.name}</li>)}
      </ul>
    </div>
  );
}

const ALL_BOARDS = gql`
  query AllBoards {
    allBoards(orderBy: updatedAt_DESC) {
      id
      name
    }
  }
`;

export default graphql(ALL_BOARDS)(HomePage);
