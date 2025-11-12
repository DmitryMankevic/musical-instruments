// adminUsersThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { AdminUsersApi } from "../api/AdminUserApi";
import type { IUser } from "../model";
import type { IApiResponseError } from "@/shared/types";

export const getAllUsersThunk = createAsyncThunk<
  IUser[],                    // ← payload успешного fulfilled
  void,                       // ← аргументы thunk'а
  { rejectValue: string }     // ← тип для rejectWithValue
>("adminUsers/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await AdminUsersApi.getAllUsers(); // Promise<IApiResponse<IUser[]>>
    return res.data ?? [];                          // ← всегда массив
  } catch (e) {
    const err = e as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message ?? "Ошибка загрузки пользователей");
  }
});

export const deleteUserThunk = createAsyncThunk<
  number,                    // ← вернём id удалённого юзера
  number,                    // ← принимаем id
  { rejectValue: string }
>("adminUsers/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await AdminUsersApi.deleteUser(id);
    return id;
  } catch (e) {
    const err = e as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message ?? "Не удалось удалить пользователя");
  }
});
