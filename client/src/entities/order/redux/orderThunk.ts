import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { IOrder, IRawOrder } from "../model";
import { OrderApi } from "../api/OrderApi";
import type { IApiResponseError } from "@/shared/types";
import type { RootState } from "@reduxjs/toolkit/query";

//
// 🟢 Получить все заказы (юзер — свои, админ — все)
//
export const getOrdersThunk = createAsyncThunk<
  IOrder[], // ✅ Успешный ответ
  void, // ✅ Аргумент (ничего не передаём)
  { rejectValue: string } // ✅ Тип ошибки
>("order/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await OrderApi.getOrders();
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data.message || "Ошибка при загрузке заказов"
    );
  }
});

//
// 🟢 Создать заказ (ожидает оплаты)
//
export const createOrderThunk = createAsyncThunk<
  IOrder, // ✅ Ответ с созданным заказом
  Omit<IRawOrder, "user_id">, // ✅ Аргумент (без user_id)
  { rejectValue: string } // ✅ Тип ошибки
>("order/create", async (order, { rejectWithValue }) => {
  try {
    const response = await OrderApi.createOrder(order);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data.message || "Ошибка при создании заказа"
    );
  }
});

//
// 🟢 Оплатить заказ (меняет статус на «в обработке»)
//
export const payOrderThunk = createAsyncThunk<
  IOrder, // ✅ Ответ — обновлённый заказ
  number, // ✅ Аргумент — id заказа
  { rejectValue: string } // ✅ Тип ошибки
>("order/pay", async (orderId, { rejectWithValue }) => {
  try {
    const response = await OrderApi.payOrder(orderId);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data.message || "Ошибка при оплате заказа"
    );
  }
});

//
// 🟢 Обновить заказ (админ может менять статус)
//

export const updateOrderThunk = createAsyncThunk<
  IOrder,
  { id: number; order: Partial<IOrder> }
>("order/update", async ({ id, order }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const userId = state.user.user?.id;

    const response = await OrderApi.updateOrder(id, {
      ...order,
      user_id: userId, // добавляем id пользователя
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(err.response?.data.message);
  }
});

//
// 🟢 Удалить заказ (юзер или админ)
//
export const deleteOrderThunk = createAsyncThunk<
  number, // ✅ Возвращаем id удалённого заказа
  number, // ✅ Аргумент — id заказа
  { rejectValue: string } // ✅ Тип ошибки
>("order/delete", async (orderId, { rejectWithValue }) => {
  try {
    await OrderApi.deleteOrder(orderId);
    return orderId;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    return rejectWithValue(
      err.response?.data.message || "Ошибка при удалении заказа"
    );
  }
});
