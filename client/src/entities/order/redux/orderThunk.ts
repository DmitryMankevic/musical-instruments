import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { OrderApi } from "../api/OrderApi";
import type { IOrder, IRawOrder } from "../model";

export const getAllOrdersThunk = createAsyncThunk<IOrder[] | null, void>(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await OrderApi.getAllOrders();
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createOrderThunk = createAsyncThunk<IOrder | null, IRawOrder>(
  "order/createOrder",
  async (order: IRawOrder, { rejectWithValue }) => {
    try {
      const response = await OrderApi.createOrder(order);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk<IOrder | null, number>(
  "order/getOrderById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await OrderApi.getOrderById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const updateOrderThunk = createAsyncThunk<
  IOrder | null,
  { id: number; order: IRawOrder }
>("order/updateOrder", async ({ id, order }, { rejectWithValue }) => {
  try {
    const response = await OrderApi.updateOrder(id, order);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});
export const deleteOrderThunk = createAsyncThunk<number, number>(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await OrderApi.deleteOrder(id);
      return id;
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
