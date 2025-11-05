import type { IUserLoginData, IUserSignUpData } from "../model";

export class UserValidate {
     static validateSignup(user: IUserSignUpData): { isValid: boolean, error: string |null } {
      const { fullName, email, password } = user;
      if (!fullName || typeof fullName !== 'string' || fullName.trim() === '')
        return { isValid: false, error: 'fullName is required' };
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        password.length < 6
      )
        return { isValid: false, error: 'Password is required and must be at least 6 characters' };
      return { isValid: true, error: null };
    }

    static validateLogin(user: IUserLoginData): { isValid: boolean, error: string |null } {
      const { email, password } = user;
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (!password || typeof password !== 'string' || password.trim() === '')
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }
}