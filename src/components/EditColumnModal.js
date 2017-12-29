import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import { hideModal } from '../actions';
import { BOARD } from './BoardPage';

export const EDIT_COLUMN_MODAL = 'EDIT_COLUMN_MODAL';

class EditColumnModal extends React.Component {
  state = { name: '' };

  componentDidMount() {
    const { columnId, data } = this.props;

    if (columnId && !data.loading) {
      this.initializeFormState(data.Column);
    }
  }

  componentDidUpdate(prevProps) {
    const { columnId, data } = this.props;

    if (columnId && prevProps.data.loading && !data.loading) {
      this.initializeFormState(data.Column);
    }
  }

  initializeFormState = ({ name }) => this.setState({ name });

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleClose = () => {
    this.props.dispatch(hideModal());
  };

  handleSubmit = async event => {
    const { columnId, boardId, updateColumn, createColumn } = this.props;
    const { name } = this.state;

    event.preventDefault();

    if (columnId) {
      await updateColumn(columnId, name);
    } else {
      await createColumn(boardId, name);
    }

    this.handleClose();
  };

  render() {
    const { columnId } = this.props;
    const { name } = this.state;

    return (
      <Modal isOpen={true} onRequestClose={this.handleClose}>
        <div>
          <h1>{columnId ? 'Edit column' : 'Add column'}</h1>
          <form id="edit-column" onSubmit={this.handleSubmit}>
            <label>
              Name
              <input value={name} onChange={this.handleNameChange} required />
            </label>
          </form>
          <button onClick={this.handleClose}>Cancel</button>
          <button type="submit" form="edit-column">
            {columnId ? 'Save' : 'Create'}
          </button>
        </div>
      </Modal>
    );
  }
}

const COLUMN = gql`
  query Column($id: ID!) {
    Column(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_COLUMN = gql`
  mutation UpdateColumn($id: ID!, $name: String!) {
    updateColumn(id: $id, name: $name) {
      id
      name
    }
  }
`;

const CREATE_COLUMN = gql`
  mutation CreateColumn($boardId: ID!, $name: String!) {
    createColumn(boardId: $boardId, name: $name) {
      id
      name
    }
  }
`;

export default compose(
  graphql(COLUMN, {
    options: ({ columnId }) => ({ variables: { id: columnId } }),
    skip: ({ columnId }) => !columnId,
  }),
  graphql(UPDATE_COLUMN, {
    name: 'updatColumnMutation',
    props: ({ updateColumnMutation }) => ({
      updateColumn: (columnId, name) =>
        updateColumnMutation({ variables: { id: columnId, name } }),
    }),
  }),
  graphql(CREATE_COLUMN, {
    name: 'createColumnMutation',
    props: ({ createColumnMutation }) => ({
      createColumn: (boardId, name) =>
        createColumnMutation({
          variables: { boardId, name },
          update: (store, { data: { createColumn } }) => {
            const data = store.readQuery({
              query: BOARD,
              variables: { id: boardId },
            });
            data.Board.columns.push(createColumn);
            store.writeQuery({
              query: BOARD,
              variables: { id: boardId },
              data,
            });
          },
        }),
    }),
  }),
  connect(),
)(EditColumnModal);
