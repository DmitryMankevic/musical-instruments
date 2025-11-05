import { type JSX } from "react";
import { NavLink } from "react-router";
import UserCard from "@/entities/user/ui/UserCard";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { logoutAsyncThunk } from "@/entities/user/redux/userThunk";
export default function Navigation(): JSX.Element {
  const { user, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const logoutHandler = async (): Promise<void> => {
    try {
      dispatch(logoutAsyncThunk());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          {status === "logged" ? user?.name : "Guest"}
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link">
            Главная
          </NavLink>
          <NavLink to={CLIENT_ROUTES.ADVICE} className="nav-link">
            Советы
          </NavLink>
          {status !== "logged" && (
            <>
              <NavLink to={CLIENT_ROUTES.LOGIN} className="nav-link">
                Вход
              </NavLink>
              <NavLink to={CLIENT_ROUTES.SIGN_UP} className="nav-link">
                Регистрация
              </NavLink>
            </>
          )}
        </Nav>
        {status === "logged" && (
          <>
            <UserCard />
            <Button variant="outline-dark" onClick={logoutHandler}>
              Выход
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
}
