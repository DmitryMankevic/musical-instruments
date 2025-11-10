import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { IUserInfo, IRawUserInfo } from "../model";

export class UserInfoApi {
  static async getUserInfoByUserId(): Promise<IApiResponse<IUserInfo>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IUserInfo>>(`/user-info`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createUserInfo(
    userInfo: IRawUserInfo
  ): Promise<IApiResponse<IUserInfo>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IUserInfo>>(
        `/user-info/add`,
        userInfo
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateUserInfo(
    userInfo: IRawUserInfo
  ): Promise<IApiResponse<IUserInfo>> {
    try {
      const { data } = await axiosInstance.put<IApiResponse<IUserInfo>>(
        `/user-info/update`,
        userInfo
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteUserInfo(): Promise<IApiResponse<void>> {
    try {
    const { data } = await axiosInstance.delete<IApiResponse<void>>(
      `/user-info/delete`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
  }
}
