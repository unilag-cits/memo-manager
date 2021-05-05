import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const showModal = (data) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: data,
  })
}

export const hideModal = () => (dispatch) => {
  dispatch({
    type: HIDE_MODAL
  })
}

