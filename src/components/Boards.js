import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Boards = ({ data }) => (
  <div>
    <h1>Boards</h1>
    <ul>
      {data.loading ? (
        <div>Loading</div>
      ) : (
        data.allBoards.map(board => <li key={board.id}>{board.name}</li>)
      )}
    </ul>
  </div>
);

const ALL_BOARDS = gql`
  query AllBoards {
    allBoards(orderBy: updatedAt_DESC) {
      id
      name
    }
  }
`;

export default graphql(ALL_BOARDS)(Boards);
