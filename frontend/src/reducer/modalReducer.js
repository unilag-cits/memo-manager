import { SHOW_MODAL, HIDE_MODAL } from '../action/types'

const initialState = {
  autoModal: false,
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        autoModal: true,
      }
    case HIDE_MODAL:
      return {
        ...state,
        autoModal: false
      }
    default:
      return state;
  }
}

export default modal