import type { IItem } from "@/entities/item/model";

export interface IRawCart {
  total: number;
  user_id: number;
}

export interface ICart extends IRawCart {
  id: number;
  createdAt: string;
  updatedAt: string;
  items?: Array<IItem & { CartItem: { quantity: number } }>;
}
