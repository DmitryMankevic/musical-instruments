import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../api/UserApi";
import type { IUserLoginData, IUserSignUpData, IUserToken } from "../model";
import type { AxiosError } from "axios";
import type { IApiResponseError } from "@/shared/types";
import { setAccessToken } from "@/shared/lib/axiosInstance";

export const signupAsyncThunk = createAsyncThunk<
  IUserToken | null,
  IUserSignUpData
>("users/signup", async (user: IUserSignUpData, { rejectWithValue }) => {
  try {
    const response = await UserApi.signup(user);
    if (response.data) setAccessToken(response.data.accessToken);
    return response.data; // action.payload
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    alert(err.response?.data.message);
    return rejectWithValue(err.response?.data.message); // action.payload
  }
});

export const loginAsyncThunk = createAsyncThunk<
  IUserToken | null,
  IUserLoginData
>("users/login", async (user: IUserLoginData, { rejectWithValue }) => {
  try {
    const response = await UserApi.login(user);
    if (response.data) setAccessToken(response.data.accessToken);
    return response.data; // action.payload
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    alert(err.response?.data.message);
    return rejectWithValue(err.response?.data.message); // action.payload
  }
});

export const logoutAsyncThunk = createAsyncThunk<void, void>(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await UserApi.logout();
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      alert(err.response?.data.message);
      return rejectWithValue(err.response?.data.message); // action.payload
    }
  }
);

export const refreshAsyncThunk = createAsyncThunk(
  "users/refreshTokens",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.refreshTokens();
      if (response.data?.accessToken) setAccessToken(response.data.accessToken);
      return response.data?.user; 
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
