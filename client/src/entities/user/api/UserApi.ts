import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IUserLoginData, IUserSignUpData, IUserToken } from "../model";
import type { IApiResponse } from "@/shared/types";

export class UserApi {
  static async login(user: IUserLoginData): Promise<IApiResponse<IUserToken>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IUserToken>>(
        "/auth/login",
        user
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async signup(
    user: IUserSignUpData
  ): Promise<IApiResponse<IUserToken>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IUserToken>>(
        "/auth/signup",
        user
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async logout(): Promise<IApiResponse<void>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<void>>(
        "/auth/logout"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async refreshTokens(): Promise<IApiResponse<IUserToken>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IUserToken>>(
        "/auth/refreshTokens"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


