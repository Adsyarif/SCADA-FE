import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from ".";
import { userApi } from "./api";

export const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
});
