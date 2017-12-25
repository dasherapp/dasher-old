import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AccountMenu from './AccountMenu';

const BoardPage = ({ match, data }) => (
  <div>
    <Link to="/">Back</Link>
    <AccountMenu />
    {data.loading ? (
      <div>Loading</div>
    ) : (
      <div>
        <h1>{data.Board.name}</h1>
        <p>id: {data.Board.id}</p>
        <p>createdAt: {data.Board.createdAt}</p>
        <p>updatedAt: {data.Board.updatedAt}</p>
      </div>
    )}
  </div>
);

const BOARD = gql`
  query Board($id: ID!) {
    Board(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export default graphql(BOARD, {
  options: ({ match }) => ({ variables: { id: match.params.id } }),
})(BoardPage);
