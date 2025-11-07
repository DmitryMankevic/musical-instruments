export interface IRawCategory {
  name: string;
  photo: string; 
}

export interface ICategory extends IRawCategory {
   id: number;
   createdAt: string;
   updatedAt: string;
}