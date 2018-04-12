import React from 'react'
import { bool, shape, object } from 'prop-types'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ModalContainer from '../containers/ModalContainer'
import NotFoundPage from './NotFoundPage'
import AccountMenu from './AccountMenu'
import EditBoardModal from './EditBoardModal'
import EditColumnModal from './EditColumnModal'
import DeleteBoardModal from './DeleteBoardModal'
import DeleteColumnModal from './DeleteColumnModal'

const propTypes = {
  userIdQuery: shape({
    loading: bool.isRequired,
    user: object,
  }).isRequired,
  boardQuery: shape({
    loading: bool.isRequired,
    board: object,
  }).isRequired,
}

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
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <div>
          <AccountMenu />
          <Link to="/">Back</Link>
          <div>
            <h1>{board.name}</h1>
            <p>{board.repository}</p>
            {isOwner && (
              <React.Fragment>
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
              </React.Fragment>
            )}
            <ul>
              {board.columns.map(column => (
                <li key={column.id}>
                  {column.index} {column.name} ({column.query})
                  <button
                    onClick={() =>
                      modal.showModal(EditColumnModal, { columnId: column.id })
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      modal.showModal(DeleteColumnModal, {
                        boardId: board.id,
                        columnId: column.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                modal.showModal(EditColumnModal, {
                  boardId: board.id,
                  index: board.columns.length,
                })
              }
            >
              Add column
            </button>
          </div>
        </div>
      )}
    </Subscribe>
  )
}

BoardPage.propTypes = propTypes

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
      repository
      owner {
        id
      }
      columns(orderBy: index_ASC) {
        id
        name
        index
        query
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
)(BoardPage)
