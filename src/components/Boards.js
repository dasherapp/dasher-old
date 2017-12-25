import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Boards = ({ data }) => (
  <div>
    <h1>Boards</h1>
    <ul>
      {data.loading ? (
        <div>Loading</div>
      ) : (
        data.user &&
        data.user.boards.map(board => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>{board.name}</Link>
          </li>
        ))
      )}
    </ul>
  </div>
);

const USER_BOARDS = gql`
  query UserBoards {
    user {
      id
      boards(orderBy: updatedAt_DESC) {
        id
        name
      }
    }
  }
`;

export default graphql(USER_BOARDS)(Boards);
