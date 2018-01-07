import { EDIT_BOARD_MODAL } from '../components/EditBoardModal'
import { EDIT_COLUMN_MODAL } from '../components/EditColumnModal'
import { DELETE_BOARD_MODAL } from '../components/DeleteBoardModal'
import { DELETE_COLUMN_MODAL } from '../components/DeleteColumnModal'

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export function showModal(modalType, modalProps) {
  return { type: SHOW_MODAL, modalType, modalProps }
}

export function showEditBoardModal(modalProps) {
  return showModal(EDIT_BOARD_MODAL, modalProps)
}

export function showEditColumnModal(modalProps) {
  return showModal(EDIT_COLUMN_MODAL, modalProps)
}

export function showDeleteBoardModal(modalProps) {
  return showModal(DELETE_BOARD_MODAL, modalProps)
}

export function showDeleteColumnModal(modalProps) {
  return showModal(DELETE_COLUMN_MODAL, modalProps)
}

export function hideModal() {
  return { type: HIDE_MODAL }
}
