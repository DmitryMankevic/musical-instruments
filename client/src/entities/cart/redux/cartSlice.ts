import { createSlice } from "@reduxjs/toolkit";
import type { ICart } from "../model";
import {
  getCartThunk,
  createCartThunk,
  updateCartItemThunk,
  deleteCartThunk,
} from "./cartThunk";

type CartState = {
  cart: ICart | null;
  loading: boolean;
  errorMessage: string;
};

const initialState: CartState = {
  cart: null,
  loading: false,
  errorMessage: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение корзины
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });

    // Добавление товара
    builder
      .addCase(createCartThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(createCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });

    // Обновление количества товара
    builder
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });

    // Удаление товара
    builder
      .addCase(deleteCartThunk.fulfilled, (state) => {
        state.loading = false;
        // Просто обновляем корзину через getCartThunk снаружи
      })
      .addCase(deleteCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
