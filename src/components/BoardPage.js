import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import {
  showEditBoardModal,
  showEditColumnModal,
  showDeleteBoardModal,
} from '../actions'
import NotFoundPage from './NotFoundPage'
import AccountMenu from './AccountMenu'

const BoardPage = ({ userIdQuery, boardQuery, dispatch }) => {
  if (userIdQuery.loading || boardQuery.loading) {
    return <div>Loading</div>
  }

  if (!boardQuery.board) {
    return <NotFoundPage />
  }

  const { user } = userIdQuery
  const { board } = boardQuery
  const isOwner = user && user.id === board.owner.id

  return (
    <div>
      <AccountMenu />
      <Link to="/">Back</Link>
      <div>
        <h1>{board.name}</h1>
        {isOwner && (
          <div>
            <button
              onClick={() =>
                dispatch(showEditBoardModal({ boardId: board.id }))
              }
            >
              Edit
            </button>
            <button onClick={() => dispatch(showDeleteBoardModal(board.id))}>
              Delete
            </button>
          </div>
        )}
        <ul>
          {board.columns.map(column => (
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
          onClick={() => dispatch(showEditColumnModal({ boardId: board.id }))}
        >
          Add column
        </button>
      </div>
    </div>
  )
}

const USER_ID_QUERY = gql`
  query UserId {
    user {
      id
    }
  }
`

export const BOARD_QUERY = gql`
  query Board($id: ID!) {
    board: Board(id: $id) {
      id
      name
      owner {
        id
      }
      columns(orderBy: updatedAt_DESC) {
        id
        name
      }
    }
  }
`

export default compose(
  graphql(USER_ID_QUERY, {
    name: 'userIdQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(BOARD_QUERY, {
    name: 'boardQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  connect(),
)(BoardPage)
