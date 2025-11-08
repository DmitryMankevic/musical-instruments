import { createSlice } from "@reduxjs/toolkit";
import type { IOrder } from "../model";
import {
  getAllOrdersThunk,
  createOrderThunk,
  getOrderByIdThunk,
  updateOrderThunk,
  deleteOrderThunk,
} from "./orderThunk";

type OrderState = {
  orderArr: IOrder[];
  currentOrder: IOrder | null;
  loading: boolean;
  errorMessage: string;
};

const initialState: OrderState = {
  orderArr: [],
  currentOrder: null,
  loading: false,
  errorMessage: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.orderArr = action.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
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
        if (action.payload) state.orderArr.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
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
        if (action.payload) state.currentOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(updateOrderThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.orderArr.findIndex(
            (order) => order.id === action.payload?.id
          );
          if (index !== -1) {
            state.orderArr[index] = action.payload;
          }
        }
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(deleteOrderThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.orderArr = state.orderArr.filter(
            (order) => order.id !== action.payload
          );
        }
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
