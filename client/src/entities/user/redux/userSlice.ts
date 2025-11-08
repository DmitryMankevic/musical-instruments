import { createSlice } from "@reduxjs/toolkit";
import type { IUserDB } from "../model";
import {
  loginAsyncThunk,
  logoutAsyncThunk,
  refreshAsyncThunk,
  signupAsyncThunk,
} from "./userThunk";

export type UserState = {
  status: "logging" | "logged" | "guest";
  user: IUserDB | null;
  isAdmin: boolean;
  errorMessage: string;
};

const initialState: UserState = {
  status: "logging",
  user: null,
  isAdmin: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsyncThunk.pending, (state) => {
        state.status = "logging";
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(signupAsyncThunk.fulfilled, (state, action) => {       
        state.status = "logged";
        if (action.payload) state.user = action.payload.user;
        state.errorMessage = "";
      })
      .addCase(signupAsyncThunk.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.errorMessage = action.payload as string;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {        //внесёна проверка статуса isAdmin при входе
        if (action.payload && action.payload.user) {
          state.isAdmin = action.payload.user.isAdmin;
          state.user = action.payload.user;
          console.log(action.payload.user.isAdmin);
        }
        state.status = "logged";
        if (action.payload) state.user = action.payload.user;
        state.errorMessage = "";
      })
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.errorMessage = action.payload as string;
      })
      .addCase(loginAsyncThunk.pending, (state) => {
        state.status = "logging";
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(logoutAsyncThunk.fulfilled, (state) => {
        state.status = "guest";
        state.isAdmin = false;
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(logoutAsyncThunk.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.errorMessage = action.payload as string;
      })
      .addCase(refreshAsyncThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAdmin = action.payload.isAdmin ?? false;
          state.status = "logged";
        }
      })
      .addCase(refreshAsyncThunk.rejected, (state) => {
        state.status = "guest";
        state.user = null;
        state.isAdmin = false;
      });
  },
});

// export const { upperUserName } = userSlice.actions;

export default userSlice.reducer;
