import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "./actionTypes";

const initialState = {
  pending: false,
  token: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.tokens,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        token: {},
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
