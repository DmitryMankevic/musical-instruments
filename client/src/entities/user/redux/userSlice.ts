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
  errorMessage: string;
};

const initialState: UserState = {
  status: "logging",
  user: null,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    upperUserName: (state) => {
      if (state.user) state.user.name = state.user.name.toUpperCase();
    },
  },
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
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
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
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(logoutAsyncThunk.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.errorMessage = action.payload as string;
      })
      .addCase(refreshAsyncThunk.fulfilled, (state, action) => {
        state.status = "logged";
        if (action.payload) state.user = action.payload.user;
        state.errorMessage = "";
      })
      .addCase(refreshAsyncThunk.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { upperUserName } = userSlice.actions;

export default userSlice.reducer;
