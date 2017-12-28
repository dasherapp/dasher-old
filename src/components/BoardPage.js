import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { showEditBoardModal, showDeleteBoardModal } from '../actions';
import NotFoundPage from './NotFoundPage';
import AccountMenu from './AccountMenu';

const BoardPage = ({ match, data, dispatch }) => {
  if (data.loading) {
    return <div>Loading</div>;
  }

  if (!data.Board) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <AccountMenu />
      <Link to="/">Back</Link>
      <div>
        <h1>{data.Board.name}</h1>
        <button onClick={() => dispatch(showEditBoardModal(data.Board.id))}>
          Edit
        </button>
        <button onClick={() => dispatch(showDeleteBoardModal(data.Board.id))}>
          Delete
        </button>
        <p>id: {data.Board.id}</p>
        <p>createdAt: {data.Board.createdAt}</p>
        <p>updatedAt: {data.Board.updatedAt}</p>
        <p>columns:</p>
        <ul>
          {data.Board &&
            data.Board.columns.map(column => (
              <li key={column.id}>{column.name}</li>
            ))}
        </ul>
        <form>
          <div>
            <label for="column_name">Create a new column: </label>
            <input type="text" id="column_name" name="name" />
          </div>
          <div>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BOARD = gql`
  query Board($id: ID!) {
    Board(id: $id) {
      id
      name
      createdAt
      updatedAt
      columns(orderBy: updatedAt_DESC) {
        id
        name
      }
    }
  }
`;

const CREATE_COLUMN_MUTATION = gql`
  mutation createColumnMutation($name: String!, $boardId: ID!) {
    createColumn(name: $name, boardId: $boardId) {
      id
      name
      board {
        id
      }
    }
  }
`;

export default compose(
  graphql(BOARD, {
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  graphql(CREATE_COLUMN_MUTATION, { name: 'createColumnMutation' }),
  connect(),
)(BoardPage);
