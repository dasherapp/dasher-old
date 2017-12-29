import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
  showEditBoardModal,
  showDeleteBoardModal,
  showEditColumnModal,
} from '../actions';
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
              onClick={() =>
                dispatch(showEditBoardModal({ boardId: boardQuery.Board.id }))
              }
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
        <ul>
          {boardQuery.Board.columns.map(column => (
            <li key={column.id}>
              {column.name}
              <button
                onClick={() =>
                  dispatch(showEditColumnModal({ columnId: column.id }))
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            dispatch(showEditColumnModal({ boardId: boardQuery.Board.id }))
          }
        >
          Add column
        </button>
      </div>
    </div>
  );
};

export const BOARD = gql`
  query Board($id: ID!) {
    Board(id: $id) {
      id
      name
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

export default compose(
  graphql(USER, {
    name: 'userQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(BOARD, {
    name: 'boardQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  connect(),
)(BoardPage);
