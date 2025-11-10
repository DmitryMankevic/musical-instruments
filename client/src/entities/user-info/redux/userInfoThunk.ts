import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserInfoApi } from "../api/UserInfoApi";
import type { IUserInfo, IRawUserInfo } from "../model";

export const getUserInfoByUserIdThunk = createAsyncThunk<IUserInfo | null>(
  "userInfo/getUserInfoByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserInfoApi.getUserInfoByUserId();
      return response.data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createUserInfoThunk = createAsyncThunk<
  IUserInfo | null,
  IRawUserInfo
>("userInfo/createUserInfo", async (userInfo, { rejectWithValue }) => {
  try {
    const response = await UserInfoApi.createUserInfo(userInfo);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});

export const updateUserInfoThunk = createAsyncThunk<
  IUserInfo | null,
  IRawUserInfo
>("userInfo/updateUserInfo", async (userInfo, { rejectWithValue }) => {
  try {
    const response = await UserInfoApi.updateUserInfo(userInfo);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});

export const deleteUserInfoThunk = createAsyncThunk<void>(
  "userInfo/deleteUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      await UserInfoApi.deleteUserInfo();
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
