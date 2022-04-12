import { combineReducers } from "redux";
import { generalReducer } from "./general-reducer";

const rootReducer = combineReducers({
  generalReducer: generalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
