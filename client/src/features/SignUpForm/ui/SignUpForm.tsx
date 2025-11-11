import { type JSX } from "react";
import { AxiosError } from "axios";
import { UserValidate } from "@/entities/user/api/UserValidate";
import type { IUserSignUpData } from "@/entities/user/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { signupAsyncThunk } from "@/entities/user/redux/userThunk";
import styles from "./SignUpForm.module.css";
import { useNavigate } from "react-router";

export default function SignUpForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signUpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const dataForApi: IUserSignUpData = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      };
      const { isValid, error } = UserValidate.validateSignup(dataForApi);
      if (!isValid) return alert(error);
      console.log(dataForApi);
      dispatch(signupAsyncThunk(dataForApi));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) alert(error?.response?.data.message);
    }
  };
  return (

 <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Имя</div>
          <input className={styles.input} name="fullName" type="text" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Пароль</div>
          <input className={styles.input} name="password" type="password" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Повтор пароля</div>
          <input className={styles.input} name="confirmPassword" type="password" required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
