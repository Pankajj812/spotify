import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "./actionTypes";

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});
