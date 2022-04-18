import { combineReducers } from "redux";

import albumReducer from "./Albums/reducer";
import tokenReducer from "./Auth/reducer";

const rootReducer = combineReducers({
  albums: albumReducer,
  tokens: tokenReducer,
  // play
});

export default rootReducer;
