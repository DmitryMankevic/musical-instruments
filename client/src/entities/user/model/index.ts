export interface IUserLoginData {
  email: string;
  password?: string;
}

export interface IUserSignUpData extends IUserLoginData {
  fullName: string;
  confirmPassword?: string;
}

export interface IUserDB extends IUserSignUpData {
  id: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserToken {
  user: IUserDB;
  accessToken: string;
}
