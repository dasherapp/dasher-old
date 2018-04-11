import React from 'react'
import { bool, object, shape } from 'prop-types'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ModalContainer from '../containers/ModalContainer'
import EditBoardModal from './EditBoardModal'
import DeleteBoardModal from './DeleteBoardModal'

const propTypes = {
  userBoardsQuery: shape({
    loading: bool.isRequired,
    user: object,
  }).isRequired,
}

const Boards = ({ userBoardsQuery, dispatch }) => (
  <Subscribe to={[ModalContainer]}>
    {modal => (
      <div>
        <h1>Boards</h1>
        <button
          onClick={() =>
            modal.showModal(EditBoardModal, {
              ownerId: userBoardsQuery.user.id,
            })
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
                    modal.showModal(EditBoardModal, { boardId: board.id })
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    modal.showModal(DeleteBoardModal, { boardId: board.id })
                  }
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    )}
  </Subscribe>
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

export default compose(graphql(USER_BOARDS_QUERY, { name: 'userBoardsQuery' }))(
  Boards,
)
