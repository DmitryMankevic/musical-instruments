import { type JSX } from "react";
import { AxiosError } from "axios";
import { UserValidate } from "@/entities/user/api/UserValidate";
import type { IUserSignUpData } from "@/entities/user/model";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useAppDispatch } from "@/shared/hooks/hook";
import { signupAsyncThunk } from "@/entities/user/redux/userThunk";

export default function SignUpForm(): JSX.Element {
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
      };
      const { isValid, error } = UserValidate.validateSignup(dataForApi);
      if (!isValid) return alert(error);
      console.log(dataForApi);
      dispatch(signupAsyncThunk(dataForApi));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) alert(error?.response?.data.message);
    }
  };
  return (
    <Form onSubmit={signUpHandler}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Имя</InputGroup.Text>
        <Form.Control
          name="fullName"
          type="text"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Почта</InputGroup.Text>
        <Form.Control
          name="email"
          type="email"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="inputGroup-sizing-lg">Пароль</InputGroup.Text>
        <Form.Control
          name="password"
          type="password"
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
