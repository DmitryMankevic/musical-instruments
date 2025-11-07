import { type JSX } from "react";
import { NavLink } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function Navigation(): JSX.Element {
  return (
    <>
      <h1>FOOTER</h1>
      <Navbar bg="light" className="p-3 flex-column align-items-start">
        <Container fluid>
          <div className="w-100 d-flex justify-content-between mb-5"></div>
        </Container>

        <div className="w-100 bg-dark border-top pt-2">
          <Container fluid>
            <Nav className="d-flex gap-3">
              <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
                Главная
              </NavLink>
              <NavLink to={CLIENT_ROUTES.LOGIN} className="nav-link text-white">
                Вход
              </NavLink>
              <NavLink
                to={CLIENT_ROUTES.SIGN_UP}
                className="nav-link text-white"
              >
                Регистрация
              </NavLink>
            </Nav>
          </Container>
        </div>
      </Navbar>
    </>
  );
}
