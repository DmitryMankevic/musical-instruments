import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CartApi } from "../api/CartApi";
import type { ICart } from "../model";

/**
 * Получение корзины
 */
export const getCartThunk = createAsyncThunk<ICart | null, void>(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CartApi.getCart();
      return response.data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

/**
 * Добавление товара в корзину
 * Если товара нет — сервер добавляет его,
 * если есть — увеличивает количество.
 */
export const addToCartThunk = createAsyncThunk<
  ICart | null,
  { itemId: number; quantity?: number }
>("cart/addToCart", async ({ itemId, quantity = 1 }, { rejectWithValue }) => {
  try {
    const response = await CartApi.updateCartItem(itemId, quantity);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});

/**
 * Обновление количества товара в корзине
 */
export const updateCartItemThunk = createAsyncThunk<
  ICart | null,
  { itemId: number; quantity: number }
>("cart/updateItem", async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await CartApi.updateCartItem(itemId, quantity);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});

/**
 * Удаление товара из корзины
 */
export const deleteCartThunk = createAsyncThunk<void, number>(
  "cart/deleteCart",
  async (itemId, { rejectWithValue }) => {
    try {
      await CartApi.deleteFromCart(itemId);
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
