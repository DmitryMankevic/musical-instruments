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
    <>
    <h1>магазин</h1>
    <Navbar bg="light" className="p-3 flex-column align-items-start">
      <Container fluid>
        <div className="w-100 d-flex justify-content-between mb-5">
          <Navbar.Brand>
            {status === "logged" ? user?.fullName : "Guest"}
          </Navbar.Brand>

          {status === "logged" && (
            <div className="d-flex gap-2">
              <UserCard />
              <Button variant="outline-dark" onClick={logoutHandler}>
                Выход
              </Button>
            </div>
          )}
        </div>
      </Container>

      <div className="w-100 bg-dark border-top pt-2">
        <Container fluid>
          <Nav className="d-flex gap-3">
            <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
              Главная
            </NavLink>
            {status !== "logged" && (
              <>
                <NavLink
                  to={CLIENT_ROUTES.LOGIN}
                  className="nav-link text-white"
                >
                  Вход
                </NavLink>
                <NavLink
                  to={CLIENT_ROUTES.SIGN_UP}
                  className="nav-link text-white"
                >
                  Регистрация
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </div>
    </Navbar>
    </>
  );
}
