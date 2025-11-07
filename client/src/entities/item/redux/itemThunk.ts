import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ItemApi } from "../api/ItemApi";
import type { IItem, IRawItem } from "../model";

export const getAllItemsThunk = createAsyncThunk<IItem[] | null, void>(
  "item/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ItemApi.getAllItems();
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createItemThunk = createAsyncThunk<IItem | null, IRawItem>(
  "item/createItem",
  async (item: IRawItem, { rejectWithValue }) => {
    try {
      const response = await ItemApi.createItem(item);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const getItemByIdThunk = createAsyncThunk<IItem | null, number>(
  "item/getItemById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ItemApi.getItemById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const updateItemThunk = createAsyncThunk<
  IItem | null,
  { id: number; item: IRawItem }
>("item/updateItem", async ({ id, item }, { rejectWithValue }) => {
  try {
    const response = await ItemApi.updateItem(id, item);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});
export const deleteItemThunk = createAsyncThunk<number, number>(
  "item/deleteItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ItemApi.deleteItem(id);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

