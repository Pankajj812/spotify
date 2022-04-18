import {
  FETCH_ALBUMS,
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  PLAY_SONG,
  PLAY_SONG_FAILURE,
  PLAY_SONG_SUCCESS,
  RESET_STATE
} from "./actionTypes";

export const fetchAlbums = (payload) => ({
  type: FETCH_ALBUMS,
  payload,
});

export const fetchAlbumsSuccess = (payload) => ({
  type: FETCH_ALBUMS_SUCCESS,
  payload,
});

export const fetchAlbumsFailure = (payload) => ({
  type: FETCH_ALBUMS_FAILURE,
  payload,
});

export const resetState = (payload) => ({
  type: RESET_STATE,
  payload,
});


//Play Pause Song

export const playPauseSong = (payload) => ({
  type: PLAY_SONG,
  payload,
});

export const playPauseSongSuccess = (payload) => ({
  type: PLAY_SONG_SUCCESS,
  payload,
});

export const playPauseSongFailure = (payload) => ({
  type: PLAY_SONG_FAILURE,
  payload,
});
