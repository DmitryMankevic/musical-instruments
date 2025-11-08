import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CartApi } from "../api/CartApi";
import type { ICart, IRawCart } from "../model";

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

export const createCartThunk = createAsyncThunk<ICart | null, IRawCart>(
  "cart/createCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await CartApi.addToCart(cart);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

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