export interface IRawItem {
  title: string;
  desc: string;
  price: number;
  marker: string | null;  // возможно null
  article: string;
  img: string;
  stock: number; 
  category_id: number; 
}

export interface IItem extends IRawItem {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// От сюда начать