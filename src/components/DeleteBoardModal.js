import React from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'

import { USER_BOARDS_QUERY } from './Boards'

class DeleteBoardModal extends React.Component {
  static propTypes = {
    boardId: string.isRequired,
    boardQuery: shape({
      loading: bool.isRequired,
      board: object,
    }).isRequired,
    deleteBoard: func.isRequired,
    hideModal: func.isRequired,
    history: shape({ push: func.isRequired }).isRequired,
  }

  handleDelete = async () => {
    await this.props.deleteBoard(this.props.boardId)
    this.props.hideModal()
    this.props.history.push('/')
  }

  render() {
    const { boardQuery, hideModal } = this.props

    return (
      <Modal isOpen onRequestClose={hideModal}>
        {boardQuery.loading ? (
          <div>Loading</div>
        ) : (
          <React.Fragment>
            <h1>Delete board</h1>
            <p>
              Are you sure you want to delete{' '}
              <strong>{boardQuery.board.name}</strong>? This action cannot be
              undone.
            </p>
            <button onClick={hideModal}>Cancel</button>
            <button onClick={this.handleDelete}>Delete</button>
          </React.Fragment>
        )}
      </Modal>
    )
  }
}

const BOARD_QUERY = gql`
  query Board($id: ID!) {
    board: Board(id: $id) {
      name
    }
  }
`

const DELETE_BOARD_MUTATION = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`

export default compose(
  withRouter,
  graphql(BOARD_QUERY, {
    name: 'boardQuery',
    options: ({ boardId }) => ({ variables: { id: boardId } }),
  }),
  graphql(DELETE_BOARD_MUTATION, {
    props: ({ mutate }) => ({
      deleteBoard: boardId =>
        mutate({
          variables: { id: boardId },
          update: (store, { data: { deleteBoard } }) => {
            const data = store.readQuery({ query: USER_BOARDS_QUERY })

            data.user.boards = data.user.boards.filter(
              board => board.id !== deleteBoard.id,
            )

            store.writeQuery({ query: USER_BOARDS_QUERY, data })
          },
        }),
    }),
  }),
)(DeleteBoardModal)
