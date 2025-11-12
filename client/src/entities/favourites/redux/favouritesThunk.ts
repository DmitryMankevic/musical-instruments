import { createAsyncThunk } from "@reduxjs/toolkit";
import { FavouritesApi } from "../api/FavouritesApi";
import type { IItem } from "@/entities/item/model";
import type { IApiResponseError } from "@/shared/types";
import type { AxiosError } from "axios";

export const getAllByUserIdThunk = createAsyncThunk<
  IItem[],
  void,
  { rejectValue: string }
>("favourites/getAllByUserId", async (_, { rejectWithValue }) => {
  try {
    const response = await FavouritesApi.getAllByUserId();
    if (!response.data || !Array.isArray(response.data)) {
      return rejectWithValue("Некорректный ответ от сервера");
    }
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Не удалось загрузить избранное"
    );
  }
});

export const deleteFavouriteThunk = createAsyncThunk<void, number, { rejectValue: string }>(
  "favourites/deleteFavourite",
  async (id: number, { rejectWithValue }) => {
    try {
      await FavouritesApi.deleteFavourite(id);
      // return id;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message || "Не удалось удалить из избранного");
    }
  }
);

export const addItemToFavouritesThunk = createAsyncThunk<void, IItem, { rejectValue: string }>(
  "favourites/addItemInFavourites",
  async (item, { rejectWithValue }) => {
    try {
      await FavouritesApi.addItemToFavourites(item.id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Не удалось добавить в избранное");
    }
  }
);