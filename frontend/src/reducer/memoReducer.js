import {
  MEMO_SUCCESS,
  MEMO_FAILURE,
  MEMO_PENDING,
  MEMO_LOADING,
  MEMO_LOADED,
} from "../action/types";

const initialState = {
  success: null,
  failure: null,
  pending: null,
  memo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEMO_LOADING:
      return {
        ...state,
      };
    case MEMO_LOADED:
      return {
        ...state,
        memo: action.payload,
      };
    case MEMO_SUCCESS:
      return {
        ...state,
        success: true,
        failure: false,
        pending: false,
        memo: action.payload,
      };
    case MEMO_FAILURE:
      return {
        ...state,
        failure: true,
        success: false,
        pending: false,
        memo: null,
      };
    case MEMO_PENDING:
      return {
        ...state,
        pending: true,
        success: false,
        pending: false,
        memo: action.payload,
      };
    default:
      return state;
  }
}
