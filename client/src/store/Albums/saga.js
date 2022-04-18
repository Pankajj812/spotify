import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
  playPauseSongFailure,
  playPauseSongSuccess,
} from "./actions";
import { FETCH_ALBUMS, PLAY_SONG } from "./actionTypes";
import axiosConfig from "../../api/axiosConfig";

import queryString from "query-string";

const getAlbums = (payload) =>
  axiosConfig.get(`/search?${payload}`);

const playSong = (payload) => axiosConfig.put("/me/player/play");

function* fetchAlbums({ payload }) {
  try {
    console.log("Payload", payload);
    const stringifiedPayload = queryString.stringify(payload);
    console.log("Stringified Palaod", stringifiedPayload);
    const response = yield call(getAlbums, stringifiedPayload);
    yield put(
      fetchAlbumsSuccess({
        albums: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAlbumsFailure({
        error: e.message,
      })
    );
  }
}

function* playSongs({ payload }) {
  try {
    console.log("Payload", payload);
    const response = yield call(playSong, payload);
    yield put(
      playPauseSongSuccess({
        play: response.data,
      })
    );
  } catch (e) {
    yield put(
      playPauseSongFailure({
        error: e.message,
      })
    );
  }
}

function* albumsSaga() {
  yield all([
    takeLatest(FETCH_ALBUMS, fetchAlbums),
    takeLatest(PLAY_SONG, playSongs),
  ]);
}

export default albumsSaga;
