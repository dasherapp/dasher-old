import React from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'

import { BOARD_QUERY } from './BoardPage'

class DeleteColumnModal extends React.Component {
  static propTypes = {
    boardId: string.isRequired,
    columnId: string.isRequired,
    columnQuery: shape({
      loading: bool.isRequired,
      column: object,
    }).isRequired,
    deleteColumn: func.isRequired,
    hideModal: func.isRequired,
  }

  handleDelete = async () => {
    await this.props.deleteColumn(this.props.columnId)
    this.props.hideModal()
  }

  render() {
    const { columnQuery, hideModal } = this.props

    return (
      <Modal isOpen onRequestClose={hideModal}>
        {columnQuery.loading ? (
          <div>Loading</div>
        ) : (
          <React.Fragment>
            <h1>Delete column</h1>
            <p>
              Are you sure you want to delete{' '}
              <strong>{columnQuery.column.name}</strong>? This action cannot be
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

const COLUMN_QUERY = gql`
  query Column($id: ID!) {
    column: Column(id: $id) {
      id
      name
    }
  }
`

const DELETE_COLUMN_MUTATION = gql`
  mutation DeleteColumn($id: ID!) {
    deleteColumn(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(COLUMN_QUERY, {
    name: 'columnQuery',
    options: ({ columnId }) => ({ variables: { id: columnId } }),
  }),
  graphql(DELETE_COLUMN_MUTATION, {
    name: 'deleteColumnMutation',
    props: ({ deleteColumnMutation, ownProps }) => ({
      deleteColumn: columnId =>
        deleteColumnMutation({
          variables: { id: columnId },
          update: (store, { data: { deleteColumn } }) => {
            const data = store.readQuery({
              query: BOARD_QUERY,
              variables: { id: ownProps.boardId },
            })

            data.board.columns = data.board.columns.filter(
              column => column.id !== deleteColumn.id,
            )

            store.writeQuery({
              query: BOARD_QUERY,
              variables: { id: ownProps.boardId },
              data,
            })
          },
        }),
    }),
  }),
)(DeleteColumnModal)
