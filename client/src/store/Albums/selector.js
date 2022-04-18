import { createSelector } from "reselect";

export const albumsSelector = createSelector(
    (state) => state.albums.albums,
    (albums) => albums
  );

  export const playSelector = createSelector(
    (state) => state.play.play,
    (play) => play
  );