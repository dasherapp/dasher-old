import React from 'react';
import { connect } from 'react-redux';
import EditBoardModal, { EDIT_BOARD_MODAL } from './EditBoardModal';
import DeleteBoardModal, { DELETE_BOARD_MODAL } from './DeleteBoardModal';

const MODAL_COMPONENTS = {
  [EDIT_BOARD_MODAL]: EditBoardModal,
  [DELETE_BOARD_MODAL]: DeleteBoardModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  return React.createElement(MODAL_COMPONENTS[modalType], modalProps);
};

export default connect(state => state.modal)(ModalRoot);
