import { all, fork } from "redux-saga/effects";

import albumsSaga from "./Albums/saga";
import tokenSaga from "./Auth/saga";

export function* rootSaga() {
  yield all([fork(albumsSaga)]);
  yield all([fork(tokenSaga)]);
}
