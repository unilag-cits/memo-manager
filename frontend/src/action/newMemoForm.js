import {
  MEMO_ERROR,
  MEMO_FAILURE,
  MEMO_PENDING,
  MEMO_LOADING,
  MEMO_LOADED,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./userAction";
import { returnErrors } from "./errorActions";

export const loadMemo = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: MEMO_LOADING });

  axios
    .get(`${process.env.REACT_APP_API}/api/newMemo/memo`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: MEMO_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: MEMO_ERROR,
      });
    });
};

export const memo = (formData) => (dispatch, getState) => {
  dispatch({ type: MEMO_FAILURE });
  // const body = JSON.stringify(newMemo);
  axios
    .post(
      `${process.env.REACT_APP_API}/api/newMemo/memo`,
      formData,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: MEMO_PENDING,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "MEMO_ERROR")
      );
      dispatch({
        type: MEMO_ERROR,
      });
    });
};
