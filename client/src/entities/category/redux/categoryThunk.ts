import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategory } from "../model";
import {CategoryApi} from "../api/CategoryApi";
import type { AxiosError } from "axios";
import type { IApiResponseError } from "@/shared/types";


export const getAllCategoriesThunk = createAsyncThunk<ICategory[] | null, void>(
  'categories/getAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.getAll();
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data?.message || 'Не удалось загрузить категории');
    }
  }

);