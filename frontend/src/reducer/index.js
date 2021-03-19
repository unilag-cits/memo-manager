import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import loading from "./loading";
import memo from "./memoReducer";
import modal from "./modalReducer";

export default combineReducers({
  auth: userReducer,
  error: errorReducer,
  loading,
  memo,
  modal,
});
