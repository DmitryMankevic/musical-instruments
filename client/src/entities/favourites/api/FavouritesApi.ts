import type { IItem } from "@/entities/item/model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";


export class FavouritesApi {
  static async getAllByUserId(): Promise<IApiResponse<IItem[]>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IItem[]>>(
        "/favourites"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteFavourite(id: number): Promise<void> {
  await axiosInstance.delete(`/favourites/${id}`);
}


static async addItemToFavourites(itemId: number): Promise<void> {
      await axiosInstance.post(`/favourites/${itemId}`);
  }
}
