import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { AUTH_BASE_URL } from "../../api/constants";
import { loginFailure, loginSuccess } from "./actions";
import { LOGIN } from "./actionTypes";

const doLogin = () => axios.get(`${AUTH_BASE_URL}/login`);
const authenticate = (code) =>
  axios.get(`${AUTH_BASE_URL}/callback?code=${code}`);

function* login({ payload }) {
  try {
    let response = null;
    if (payload?.code) {
      console.log("calling code");
      response = yield call(authenticate, payload?.code);
    } else {
      console.log("calling login");
      response = yield call(doLogin);
    }
    yield put(
      loginSuccess({
        tokens: response.data,
      })
    );
  } catch (e) {
    yield put(
      loginFailure({
        error: e.message,
      })
    );
  }
}

function* tokenSaga() {
  yield all([takeLatest(LOGIN, login)]);
}

export default tokenSaga;
