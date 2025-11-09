import type { IItem } from "@/entities/item/model";

export interface IRawCategory {
  name: string;
  photo: string;
}

export interface ICategory extends IRawCategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  items: IItem[];
}

export interface IUpdateCategoryPayload extends IRawCategory {
  id: number;
}
