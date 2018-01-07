import React from 'react'
import { bool, func, object, shape } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { showEditBoardModal, showDeleteBoardModal } from '../actions'

const propTypes = {
  dispatch: func.isRequired,
  userBoardsQuery: shape({
    loading: bool.isRequired,
    user: object,
  }).isRequired,
}

const Boards = ({ userBoardsQuery, dispatch }) => (
  <div>
    <h1>Boards</h1>
    <button
      onClick={() =>
        dispatch(showEditBoardModal({ ownerId: userBoardsQuery.user.id }))
      }
    >
      New board
    </button>
    <ul>
      {userBoardsQuery.loading ? (
        <div>Loading</div>
      ) : (
        userBoardsQuery.user &&
        userBoardsQuery.user.boards.map(board => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>
              {board.name} ({board.repository})
            </Link>
            <button
              onClick={() =>
                dispatch(showEditBoardModal({ boardId: board.id }))
              }
            >
              Edit
            </button>
            <button
              onClick={() =>
                dispatch(showDeleteBoardModal({ boardId: board.id }))
              }
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  </div>
)

Boards.propTypes = propTypes

export const USER_BOARDS_QUERY = gql`
  query UserBoards {
    user {
      id
      boards(orderBy: updatedAt_DESC) {
        id
        name
        repository
      }
    }
  }
`

export default compose(
  graphql(USER_BOARDS_QUERY, { name: 'userBoardsQuery' }),
  connect(),
)(Boards)
