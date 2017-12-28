import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import { hideModal } from '../actions';

export const EDIT_BOARD_MODAL = 'EDIT_BOARD_MODAL';

class EditBoardModal extends React.Component {
  state = { name: '' };

  componentDidMount() {
    if (!this.props.data.loading) {
      this.initializeFormState(this.props.data.Board);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.loading && !this.props.data.loading) {
      this.initializeFormState(this.props.data.Board);
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
    event.preventDefault();
    await this.props.updateBoard(this.props.boardId, this.state.name);
    this.handleClose();
  };

  render() {
    const { data } = this.props;
    return (
      <Modal isOpen={true} onRequestClose={this.handleClose}>
        {data.loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <h1>Edit board</h1>
            <form id="edit-board" onSubmit={this.handleSubmit}>
              <label>
                Name
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  required
                />
              </label>
            </form>
            <button onClick={this.handleClose}>Cancel</button>
            <button type="submit" form="edit-board">
              Save
            </button>
          </div>
        )}
      </Modal>
    );
  }
}

const BOARD = gql`
  query Board($id: ID!) {
    Board(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: ID!, $name: String!) {
    updateBoard(id: $id, name: $name) {
      id
      name
    }
  }
`;

export default compose(
  graphql(BOARD, {
    options: ({ boardId }) => ({ variables: { id: boardId } }),
  }),
  graphql(UPDATE_BOARD, {
    props: ({ mutate }) => ({
      updateBoard: (boardId, name) =>
        mutate({ variables: { id: boardId, name } }),
    }),
  }),
  connect(),
)(EditBoardModal);
