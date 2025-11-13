export interface IRawOrder {
  total: number;
  status: string;
  decs: string;
  user_id: number;
}

export interface IOrder extends IRawOrder {
  id: number;
  createdAt: string;
  updatedAt: string;

  items: {
    id: number;
    title: string;
    price: number;
    img: string;
    article: string;
    OrderItem: {
      quantity: number;
    };
  }[];
}
