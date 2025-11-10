import { createSlice } from "@reduxjs/toolkit";
import type { IUserInfo } from "../model";
import {
  createUserInfoThunk,
  getUserInfoByUserIdThunk,
  updateUserInfoThunk,
  deleteUserInfoThunk,
} from "./userInfoThunk";

interface UserInfoState {
  currentUserInfo: IUserInfo | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: UserInfoState = {
  currentUserInfo: null,
  loading: false,
  errorMessage: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    clearUserInfo(state) {
      state.currentUserInfo = null;
      state.errorMessage = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoByUserIdThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getUserInfoByUserIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserInfo = action.payload ?? null;
      })
      .addCase(getUserInfoByUserIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) ?? "Ошибка загрузки данных";
      })

      .addCase(createUserInfoThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(createUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserInfo = action.payload ?? null;
      })
      .addCase(createUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) ?? "Ошибка создания данных";
      })

      .addCase(updateUserInfoThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserInfo = action.payload ?? null;
      })
      .addCase(updateUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) ?? "Ошибка обновления данных";
      })

      .addCase(deleteUserInfoThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(deleteUserInfoThunk.fulfilled, (state) => {
        state.loading = false;
        state.currentUserInfo = null;
      })

      .addCase(deleteUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) ?? "Ошибка удаления данных";
      });
  },
});

export const { clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
