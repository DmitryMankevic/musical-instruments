import type { IItem } from "@/entities/item/model";

export interface IRawFavourites {
  user_id: number;
  item_id: number;
}

export interface IFavourites extends IRawFavourites {
  id: number;
  createdAt: string;
  updatedAt: string;
  items: IItem[];
}
