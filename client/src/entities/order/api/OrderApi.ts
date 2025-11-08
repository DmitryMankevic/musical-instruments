import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IOrder, IRawOrder } from "../model";

export class OrderApi {
  static async createOrder(
    order: Omit<IRawOrder, "user_id">
  ): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.post<IApiResponse<IOrder>>(
      "/orders",
      order
    );
    return data;
  }

  static async getOrders(): Promise<IApiResponse<IOrder[]>> {
    const { data } = await axiosInstance.get<IApiResponse<IOrder[]>>("/orders");
    return data;
  }

  static async getOrderById(id: number): Promise<IApiResponse<IOrder>> {
    const { data } = await axiosInstance.get<IApiResponse<IOrder>>(
      `/orders/${id}`
    );
    return data;
  }

  static async updateOrder(
    id: number,
    order: IRawOrder
  ): Promise<IApiResponse<IOrder>> {
    try {
      const { data } = await axiosInstance.put<IApiResponse<IOrder>>(
        `/orders/${id}`,
        order
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteOrder(id: number): Promise<AxiosResponse> {
    try {
      const { data } = await axiosInstance.delete<AxiosResponse>(
        `/orders/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
