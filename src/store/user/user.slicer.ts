import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUserProps, IUser } from "./user.type";

const INITIAL_STATE: IUser = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUserProps>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
