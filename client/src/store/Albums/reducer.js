import {
  FETCH_ALBUMS,
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  PLAY_SONG,
  PLAY_SONG_FAILURE,
  PLAY_SONG_SUCCESS,
  RESET_STATE,
} from "./actionTypes";

const initialState = {
  pending: false,
  albums: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        pending: false,
        albums: {
          ...state.albums,
          ...action.payload.albums,
          items: [
            ...(state.albums?.items || []),
            ...(action.payload?.albums?.tracks?.items || []),
          ],
        },
        error: null,
      };
    case FETCH_ALBUMS_FAILURE:
      return {
        ...state,
        pending: false,
        albums: [],
        error: action.payload.error,
      };
    case PLAY_SONG:
      return {
        ...state,
        pending: true,
      };
    case PLAY_SONG_SUCCESS:
      return {
        ...state,
        pending: false,
        play: action.payload.albums,
        error: null,
      };
    case PLAY_SONG_FAILURE:
      return {
        ...state,
        pending: false,
        play: [],
        error: action.payload.error,
      };
    case RESET_STATE:
      return {
        ...state,
        pending: false,
        albums: [],
      };
    default:
      return {
        ...state,
      };
  }
};
