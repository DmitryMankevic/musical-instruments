export interface IRawCategory {
  name: string;
  photo: string; 
}

export interface ICategory extends IRawCategory {
   id: number;
   createdAt: string;
   updatedAt: string;
   items?: {
     id: number;
     title: string;
     desc: string;
     price: string; // string, t.k. бэкенд присылает "999.00" ???
     marker: string;
     stock: number;
     article: string;
     img: string;
     category_id: number;
   }[];
}

export interface IUpdateCategoryPayload extends IRawCategory {
  id: number;
}