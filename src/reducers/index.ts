import { combineReducers } from "redux";
import { sessionReducer } from "./SessionReducer"

export const rootReducer = combineReducers({
  session: sessionReducer,
});