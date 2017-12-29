import React from 'react';
import { connect } from 'react-redux';
import EditBoardModal, { EDIT_BOARD_MODAL } from './EditBoardModal';
import DeleteBoardModal, { DELETE_BOARD_MODAL } from './DeleteBoardModal';
import EditColumnModal, { EDIT_COLUMN_MODAL } from './EditColumnModal';

const MODAL_COMPONENTS = {
  [EDIT_BOARD_MODAL]: EditBoardModal,
  [DELETE_BOARD_MODAL]: DeleteBoardModal,
  [EDIT_COLUMN_MODAL]: EditColumnModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  return React.createElement(MODAL_COMPONENTS[modalType], modalProps);
};

export default connect(state => state.modal)(ModalRoot);
