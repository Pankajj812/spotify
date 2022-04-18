import { createSelector } from "reselect";

export const tokenSelector = createSelector(
    (state) => state.tokens.token,
    (token) => token
  );