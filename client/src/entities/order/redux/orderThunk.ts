import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { IOrder, IRawOrder } from "../model";
import { OrderApi } from "../api/OrderApi";
import type { IApiResponseError } from "@/shared/types";
import type { RootState } from "@/app/store/store";

//
// 🟢 Получить все заказы
//
export const getOrdersThunk = createAsyncThunk<
  IOrder[],
  void,
  { rejectValue: string }
>("order/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await OrderApi.getOrders();
    return response.data!; // 👈 гарантируем, что не null
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Ошибка при загрузке заказов"
    );
  }
});

//
// 🟢 Создать заказ
//
export const createOrderThunk = createAsyncThunk<
  IOrder,
  Omit<IRawOrder, "user_id">,
  { rejectValue: string }
>("order/create", async (order, { rejectWithValue }) => {
  try {
    const response = await OrderApi.createOrder(order);
    return response.data!;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Ошибка при создании заказа"
    );
  }
});

//
// 🟢 Оплатить заказ
//
export const payOrderThunk = createAsyncThunk<
  IOrder,
  number,
  { rejectValue: string }
>("order/pay", async (orderId, { rejectWithValue }) => {
  try {
    const response = await OrderApi.payOrder(orderId);
    return response.data!;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Ошибка при оплате заказа"
    );
  }
});

//
// 🟢 Обновить заказ
//
export const updateOrderThunk = createAsyncThunk<
  IOrder,
  { id: number; order: Partial<IOrder> },
  { rejectValue: string; state: RootState }
>("order/update", async ({ id, order }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const userId = state.user.user?.id;

    const response = await OrderApi.updateOrder(id, {
      ...order,
      user_id: userId,
    });

    return response.data!;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Ошибка при обновлении заказа"
    );
  }
});

//
// 🟢 Удалить заказ
//
export const deleteOrderThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("order/delete", async (orderId, { rejectWithValue }) => {
  try {
    await OrderApi.deleteOrder(orderId);
    return orderId;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Ошибка при удалении заказа"
    );
  }
});
