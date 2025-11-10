export interface IRawUserInfo {
  country: string | null;
  city: string | null;
  address: string | null;
  phoneNumber: string | null;
  birthDay: string | null;
}

export interface IUserInfo extends IRawUserInfo {
  id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}
