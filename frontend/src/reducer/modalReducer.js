import { SHOW_MODAL, HIDE_MODAL } from '../action/types'

const initialState = {
  autoModal: false,
  memoData: [],
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        memoData: action.payload,
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

