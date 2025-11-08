// import type { AxiosResponse } from "axios";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { IApiResponse } from "../../../shared/types";
import type { ICategory, IRawCategory } from "../model";

export class CategoryApi {
  static async getAll(): Promise<IApiResponse<ICategory[]>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<ICategory[]>>(
        "/categories"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createCategory(category: IRawCategory): Promise<IApiResponse<ICategory>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<ICategory>>(
        "/categories",
        category
      );
      return data; // новая категория из БД
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteCategory(id: number): Promise<AxiosResponse> {
    try {
      const { data } = await axiosInstance.delete<AxiosResponse>(
        `/categories/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

static async update(id: number, data: IRawCategory): Promise<ICategory> {
    try {
      const responce = await axiosInstance.put<ICategory>(
        `/categories/${id}`, data);
      return responce.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
}