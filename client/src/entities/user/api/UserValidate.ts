import type { IUserLoginData, IUserSignUpData } from "../model";

export class UserValidate {
     static validateSignup(user: IUserSignUpData): { isValid: boolean, error: string |null } {
      const { fullName, email, password, confirmPassword } = user;
      if (!fullName || typeof fullName !== 'string' || fullName.trim() === '')
        return { isValid: false, error: "Введите ваше имя" };
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: "Введите пароль" };
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        password.length < 6
      )
        return { isValid: false, error: "Пароль не может быть меньше 6 символов" };
       if (password !== confirmPassword) {
      return {
        isValid: false,
        error: "Введённые пароли не совпадают",
      };
    } 
      return { isValid: true, error: null };
    }

    static validateLogin(user: IUserLoginData): { isValid: boolean, error: string |null } {
      const { email, password } = user;
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: "Введите ваш е-mail" };
      if (!password || typeof password !== 'string' || password.trim() === '')
        return { isValid: false, error: "Введите пароль" };
      return { isValid: true, error: null };
    }
}