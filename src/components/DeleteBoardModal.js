import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { hideModal } from '../actions';

export const DELETE_BOARD_MODAL = 'DELETE_BOARD_MODAL';

const DeleteBoardModal = ({ dispatch }) => (
  <Modal isOpen={true} onRequestClose={() => dispatch(hideModal())}>
    <h1>Delete Board</h1>
    <button onClick={() => dispatch(hideModal())}>Close</button>
  </Modal>
);

export default connect()(DeleteBoardModal);
