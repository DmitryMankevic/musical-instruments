import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IOrder, IRawOrder } from "../model";

export class OrderApi {
  static async getAllOrders(): Promise<IApiResponse<IOrder[]>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IOrder[]>>(
        "/orders"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createOrder(order: IRawOrder): Promise<IApiResponse<IOrder>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IOrder>>(
        "/orders",
        order
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getOrderById(id: number): Promise<IApiResponse<IOrder>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IOrder>>(
        `/orders/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
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
