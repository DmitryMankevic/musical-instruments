import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategory, IRawCategory, IUpdateCategoryPayload } from "../model";
import { CategoryApi } from "../api/CategoryApi";
import type { AxiosError } from "axios";
import type { IApiResponseError } from "@/shared/types";


export const getAllCategoriesThunk = createAsyncThunk<ICategory[] | null, void>(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.getAll();
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(
        err.response?.data?.message || "Не удалось загрузить категории"
      );
    }
  }
);

export const createCategoryThunk = createAsyncThunk<
  ICategory | null,
  IRawCategory
>(
  "categories/createNewCategory",
  async (category: IRawCategory, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.createCategory(category);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk<number, number>(
  "categories/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await CategoryApi.deleteCategory(id);
      return id;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk<
  ICategory,
  IUpdateCategoryPayload
>("categories/updateCategory", async (payload, { rejectWithValue }) => {
  const { id, ...updateData } = payload;
  try {
    const updatedCategory = await CategoryApi.update(id, updateData);
    return updatedCategory;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message || "Ошибка обновления");
  }
});

export const getCategoryByIdThunk = createAsyncThunk<ICategory | null, number>(
  "categories/getOneCategoryById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.getOneCategoryById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
