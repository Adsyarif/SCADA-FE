import { combineReducers } from "@reduxjs/toolkit";
import { userReducer, userApi, splashSectionReducer } from ".";
export const rootReducer = combineReducers({
  user: userReducer,
  splashSection: splashSectionReducer,
  [userApi.reducerPath]: userApi.reducer,
});
