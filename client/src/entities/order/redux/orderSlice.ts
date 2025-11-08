import { createSlice } from "@reduxjs/toolkit";
import {
  getOrdersThunk,
  createOrderThunk,
  payOrderThunk,
  updateOrderThunk,
  deleteOrderThunk,
} from "./orderThunk";
import type { IOrder } from "../model";

type OrderState = {
  orders: IOrder[];
  loading: boolean;
  errorMessage: string | null;
};

const initialState: OrderState = {
  orders: [],
  loading: false,
  errorMessage: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение заказов
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })

      // Создание заказа
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })

      // Оплата заказа
      .addCase(payOrderThunk.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })

      // Обновление (админ)
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })

      // Удаление заказа
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      });
  },
});

export default orderSlice.reducer;
