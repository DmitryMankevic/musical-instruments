export interface IUserInfo {
  country: string | null;
  city: string | null;
  address: string | null;
  phoneNumber: string | null;
  birthDay: string | null;
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  userInfo?: IUserInfo;
}
