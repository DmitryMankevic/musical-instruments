import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IItem, IRawItem } from "../model";

export class ItemApi {
  static async getAllItems(): Promise<IApiResponse<IItem[]>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IItem[]>>("/items");
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createItem(item: IRawItem): Promise<IApiResponse<IItem>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IItem>>(
        "/items",
        item
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getItemById(id: number): Promise<IApiResponse<IItem>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IItem>>(
        `/items/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateItem(
    id: number,
    item: IRawItem
  ): Promise<IApiResponse<IItem>> {
    try {
      const { data } = await axiosInstance.put<IApiResponse<IItem>>(
        `/items/${id}`,
        item
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteItem(id: number): Promise<AxiosResponse> {
    try {
      const { data } = await axiosInstance.delete<AxiosResponse>(
        `/items/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
