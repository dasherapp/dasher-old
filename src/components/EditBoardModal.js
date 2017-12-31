import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'

import { hideModal } from '../actions'
import { USER_BOARDS_QUERY } from './Boards'

export const EDIT_BOARD_MODAL = 'EDIT_BOARD_MODAL'

class EditBoardModal extends React.Component {
  state = { name: '' }

  componentDidMount() {
    const { boardId, data } = this.props

    if (boardId && !data.loading) {
      this.initializeFormState(data.board)
    }
  }

  componentDidUpdate(prevProps) {
    const { boardId, data } = this.props

    if (boardId && prevProps.data.loading && !data.loading) {
      this.initializeFormState(data.board)
    }
  }

  initializeFormState = ({ name }) => this.setState({ name })

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleClose = () => {
    this.props.dispatch(hideModal())
  }

  handleSubmit = async event => {
    const { boardId, ownerId, history, updateBoard, createBoard } = this.props
    const { name } = this.state

    event.preventDefault()

    if (boardId) {
      await updateBoard(boardId, name)
    } else {
      const { data } = await createBoard(ownerId, name)
      history.push(`/board/${data.createBoard.id}`)
    }

    this.handleClose()
  }

  render() {
    const { boardId } = this.props
    const { name } = this.state

    return (
      <Modal isOpen onRequestClose={this.handleClose}>
        <h1>{boardId ? 'Edit board' : 'New board'}</h1>
        <form id="edit-board" onSubmit={this.handleSubmit}>
          <label>
            Name
            <input value={name} onChange={this.handleNameChange} required />
          </label>
        </form>
        <button onClick={this.handleClose}>Cancel</button>
        <button type="submit" form="edit-board">
          {boardId ? 'Save' : 'Create'}
        </button>
      </Modal>
    )
  }
}

const BOARD_QUERY = gql`
  query Board($id: ID!) {
    board: Board(id: $id) {
      id
      name
    }
  }
`

const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoard($id: ID!, $name: String!) {
    updateBoard(id: $id, name: $name) {
      id
      name
    }
  }
`

const CREATE_BOARD_MUATION = gql`
  mutation CreateBoard($ownerId: ID!, $name: String!) {
    createBoard(ownerId: $ownerId, name: $name) {
      id
      name
    }
  }
`

export default compose(
  withRouter,
  graphql(BOARD_QUERY, {
    options: ({ boardId }) => ({ variables: { id: boardId } }),
    skip: ({ boardId }) => !boardId,
  }),
  graphql(UPDATE_BOARD_MUTATION, {
    name: 'updateBoardMutation',
    props: ({ updateBoardMutation }) => ({
      updateBoard: (boardId, name) =>
        updateBoardMutation({ variables: { id: boardId, name } }),
    }),
  }),
  graphql(CREATE_BOARD_MUATION, {
    name: 'createBoardMutation',
    props: ({ createBoardMutation }) => ({
      createBoard: (ownerId, name) =>
        createBoardMutation({
          variables: { ownerId, name },
          update: (store, { data: { createBoard } }) => {
            const data = store.readQuery({ query: USER_BOARDS_QUERY })
            data.user.boards.unshift(createBoard)
            store.writeQuery({ query: USER_BOARDS_QUERY, data })
          },
        }),
    }),
  }),
  connect(),
)(EditBoardModal)
