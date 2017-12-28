import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { showEditBoardModal, showDeleteBoardModal } from '../actions';
import NotFoundPage from './NotFoundPage';
import AccountMenu from './AccountMenu';

const BoardPage = ({ match, userQuery, boardQuery, dispatch }) => {
  if (userQuery.loading || boardQuery.loading) {
    return <div>Loading</div>;
  }

  if (!boardQuery.Board) {
    return <NotFoundPage />;
  }

  const isOwner =
    userQuery.user && userQuery.user.id === boardQuery.Board.createdBy.id;

  return (
    <div>
      <AccountMenu />
      <Link to="/">Back</Link>
      <div>
        <h1>{boardQuery.Board.name}</h1>
        {isOwner && (
          <div>
            <button
              onClick={() => dispatch(showEditBoardModal(boardQuery.Board.id))}
            >
              Edit
            </button>
            <button
              onClick={() =>
                dispatch(showDeleteBoardModal(boardQuery.Board.id))
              }
            >
              Delete
            </button>
          </div>
        )}
        <p>id: {boardQuery.Board.id}</p>
        <p>createdAt: {boardQuery.Board.createdAt}</p>
        <p>updatedAt: {boardQuery.Board.updatedAt}</p>
        <p>columns:</p>
        <ul>
          {boardQuery.Board &&
            boardQuery.Board.columns.map(column => (
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
      createdBy {
        id
      }
      columns(orderBy: updatedAt_DESC) {
        id
        name
      }
    }
  }
`;

const USER = gql`
  query User {
    user {
      id
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
  graphql(USER, {
    name: 'userQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(BOARD, {
    name: 'boardQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  graphql(CREATE_COLUMN_MUTATION, { name: 'createColumnMutation' }),
  connect(),
)(BoardPage);
