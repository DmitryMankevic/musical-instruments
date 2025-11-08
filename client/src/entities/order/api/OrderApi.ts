import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IOrder, IRawOrder } from "../model";

export class OrderApi {
  // Создать новый заказ (создаётся со статусом "ожидает оплаты")
  static async createOrder(
    order: Omit<IRawOrder, "user_id">
  ): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.post<IApiResponse<IOrder>>(
      "/orders",
      order
    );
    return data;
  }

  // Получить все заказы (сервер сам фильтрует: админ → все, юзер → свои)
  static async getOrders(): Promise<IApiResponse<IOrder[]>> {
    const { data } = await axiosInstance.get<IApiResponse<IOrder[]>>("/orders");
    return data;
  }

  // Получить конкретный заказ по ID
  static async getOrderById(id: number): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.get<IApiResponse<IOrder>>(
      `/orders/${id}`
    );
    return data;
  }

  // Оплатить заказ (меняет статус на "в обработке")
  static async payOrder(id: number): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.put<IApiResponse<IOrder>>(
      `/orders/${id}/pay`
    );
    return data;
  }

  // Обновить заказ (например, админ меняет статус)
  static async updateOrder(
    id: number,
    order: Partial<IRawOrder>
  ): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.put<IApiResponse<IOrder>>(
      `/orders/${id}`,
      order
    );
    return data;
  }

  //  Удалить заказ
  static async deleteOrder(
    id: number
  ): Promise<AxiosResponse<IApiResponse<null>>> {
    return axiosInstance.delete<IApiResponse<null>>(`/orders/${id}`);
  }
}
