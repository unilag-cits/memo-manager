import {
  MEMO_ERROR,
  MEMO_FAILURE,
  MEMO_PENDING,
  MEMO_LOADING,
  MEMO_LOADED,
  MEMO_UPDATE,
  MEMO_UPDATE_ERROR,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./userAction";
import { returnErrors } from "./errorActions";

// get memo from database
export const loadMemo = () => (dispatch, getState) => {
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

// add new memo
export const memo = (formData) => (dispatch, getState) => {
  // dispatch({ type: MEMO_FAILURE });
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

// update
export const memoUpdate = (updateMemo) => (dispatch, getState) => {
  console.log(updateMemo);
  axios
    .post(
      `${process.env.REACT_APP_API}/api/newMemo/memoUpdate`,
      updateMemo,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: MEMO_UPDATE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "MEMO_UPDATE_ERROR"
        )
      );
      dispatch({
        type: MEMO_UPDATE_ERROR,
      });
    });
};
