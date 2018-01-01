import React from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import { hideModal } from '../actions'

export const DELETE_COLUMN_MODAL = 'DELETE_COLUMN_MODAL'

class DeleteColumnModal extends React.Component {
  handleClose = () => this.props.dispatch(hideModal())

  handleDelete = async () => {
    await this.props.deleteColumn(this.props.columnId)
    this.handleClose()
  }

  render() {
    const { data } = this.props

    return (
      <Modal isOpen onRequestClose={this.handleClose}>
        {data.loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <h1>Delete Column</h1>
            <p>
              Are you sure you want to delete this column? This action cannot be
              undone.
            </p>
            <button onClick={this.handleClose}>Cancel</button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
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
    options: ({ columnId }) => ({ variables: { id: columnId } }),
    skip: ({ columnId }) => !columnId,
  }),
  graphql(DELETE_COLUMN_MUTATION, {
    name: 'deleteColumnMutation',
    props: ({ deleteColumnMutation }) => ({
      deleteColumn: columnId =>
        deleteColumnMutation({ variables: { id: columnId } }),
    }),
  }),
  connect(),
)(DeleteColumnModal)
