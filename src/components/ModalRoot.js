import React from 'react'
import { connect } from 'react-redux'
import EditBoardModal, { EDIT_BOARD_MODAL } from './EditBoardModal'
import EditColumnModal, { EDIT_COLUMN_MODAL } from './EditColumnModal'
import DeleteBoardModal, { DELETE_BOARD_MODAL } from './DeleteBoardModal'
import DeleteColumnModal, { DELETE_COLUMN_MODAL } from './DeleteColumnModal'

const MODAL_COMPONENTS = {
  [EDIT_BOARD_MODAL]: EditBoardModal,
  [EDIT_COLUMN_MODAL]: EditColumnModal,
  [DELETE_BOARD_MODAL]: DeleteBoardModal,
  [DELETE_COLUMN_MODAL]: DeleteColumnModal,
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null
  }

  return React.createElement(MODAL_COMPONENTS[modalType], modalProps)
}

export default connect(state => state.modal)(ModalRoot)
