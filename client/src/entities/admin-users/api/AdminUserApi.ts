// AdminUsersApi.ts
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IUser } from "../model";

export class AdminUsersApi {
  static async getAllUsers(): Promise<IApiResponse<IUser[]>> {
    const { data } = await axiosInstance.get<IApiResponse<IUser[]>>(
      "/admin/users"
    );
    return data;
  }

  static async deleteUser(id: number): Promise<IApiResponse<void>> {
    const { data } = await axiosInstance.delete<IApiResponse<void>>(
      `/admin/users/${id}`
    );
    return data;
  }
}
