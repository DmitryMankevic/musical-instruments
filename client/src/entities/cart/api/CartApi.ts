import type { IApiResponse } from "@/shared/types";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { ICart, IRawCart } from "../model";

export class CartApi {
  static async getCart(): Promise<IApiResponse<ICart>> {
    const { data } = await axiosInstance.get<IApiResponse<ICart>>("/cart");
    return data;
  }

  static async addToCart(cart: IRawCart): Promise<IApiResponse<ICart>> {
    const { data } = await axiosInstance.post<IApiResponse<ICart>>(
      "/cart",
      cart
    );
    return data;
  }

  static async updateCartItem(
    itemId: number,
    quantity: number
  ): Promise<IApiResponse<ICart>> {
    const { data } = await axiosInstance.put<IApiResponse<ICart>>(
      `/cart/update/${itemId}`,
      { quantity }
    );
    return data;
  }

  static async deleteFromCart(itemId: number): Promise<IApiResponse<ICart>> {
    const { data } = await axiosInstance.delete<IApiResponse<ICart>>(
      `/cart/remove/${itemId}`
    );
    return data;
  }
}
