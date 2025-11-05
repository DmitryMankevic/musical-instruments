import { UserValidate } from "@/entities/user/api/UserValidate";
import type { IUserLoginData } from "@/entities/user/model";
import { loginAsyncThunk } from "@/entities/user/redux/userThunk";
import { useAppDispatch } from "@/shared/hooks/hook";
import { AxiosError } from "axios";
import { type JSX } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const dataForApi: IUserLoginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const { isValid, error } = UserValidate.validateLogin(dataForApi);
      if (!isValid) return alert(error);
      dispatch(loginAsyncThunk(dataForApi));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) alert(error?.response?.data.message);
    }
  };
  return (
    <Form onSubmit={loginHandler}>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Почта</InputGroup.Text>
        <Form.Control
          name="email"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="inputGroup-sizing-lg">Пароль</InputGroup.Text>
        <Form.Control
          name="password"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <br />
      <Button variant="dark" type="submit">
        Подтвердить
      </Button>
    </Form>
  );
}
