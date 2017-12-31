import { EDIT_BOARD_MODAL } from '../components/EditBoardModal'
import { EDIT_COLUMN_MODAL } from '../components/EditColumnModal'
import { DELETE_BOARD_MODAL } from '../components/DeleteBoardModal'

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export function showModal(modalType, modalProps) {
  return { type: SHOW_MODAL, modalType, modalProps }
}

export function showEditBoardModal({ boardId, ownerId }) {
  return showModal(EDIT_BOARD_MODAL, { boardId, ownerId })
}

export function showEditColumnModal({ columnId, boardId }) {
  return showModal(EDIT_COLUMN_MODAL, { columnId, boardId })
}

export function showDeleteBoardModal(boardId) {
  return showModal(DELETE_BOARD_MODAL, { boardId })
}

export function hideModal() {
  return { type: HIDE_MODAL }
}
