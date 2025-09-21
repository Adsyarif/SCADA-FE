import { combineReducers } from "@reduxjs/toolkit";
import {
  userReducer,
  userApi,
  splashSectionReducer,
  authReducer,
  authApi,
} from ".";
export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  splashSection: splashSectionReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
