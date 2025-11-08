import { createSlice } from "@reduxjs/toolkit";
import type { IOrder } from "../model";
import {
  createOrderThunk,
  getOrdersThunk,
  getOrderByIdThunk,
} from "./orderThunk";

type OrderState = {
  order: IOrder | null;
  orders: IOrder[];
  loading: boolean;
  errorMessage: string;
};

const initialState: OrderState = {
  order: null,
  orders: [],
  loading: false,
  errorMessage: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload ?? [];
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });

    builder
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
