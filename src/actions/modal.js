import { DELETE_BOARD_MODAL } from '../components/DeleteBoardModal';
import { EDIT_BOARD_MODAL } from '../components/EditBoardModal';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showModal(modalType, modalProps) {
  return { type: SHOW_MODAL, modalType, modalProps };
}

export function showEditBoardModal(boardId) {
  return showModal(EDIT_BOARD_MODAL, { boardId });
}

export function showDeleteBoardModal(boardId) {
  return showModal(DELETE_BOARD_MODAL, { boardId });
}

export function hideModal() {
  return { type: HIDE_MODAL };
}
