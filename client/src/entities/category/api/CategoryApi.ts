// import type { AxiosResponse } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { IApiResponse } from "../../../shared/types";
import type { ICategory } from "../model";

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

//   static async create(advice: IRawAdvice): Promise<IApiResponse<IAdvice>> {
//     try {
//       const { data } = await axiosInstance.post<IApiResponse<IAdvice>>(
//         "/advice",
//         advice
//       );
//       return data; // новый совет из БД
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async delete(id: number): Promise<AxiosResponse> {
//     try {
//       const { data } = await axiosInstance.delete<AxiosResponse>(
//         `/advice/${id}`
//       );
//       return data;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   static async getOne(id: number): Promise<IApiResponse<IAdvice>> {
//     try {
//       const { data } = await axiosInstance.get<IApiResponse<IAdvice>>(
//         `/advice/${id}`
//       );
//       return data;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
}