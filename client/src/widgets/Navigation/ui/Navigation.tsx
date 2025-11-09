import { type JSX, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { logoutAsyncThunk } from "@/entities/user/redux/userThunk";
import LoginForm from "@/features/LoginForm/ui/LoginForm";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import style from "./Navigation.module.css";

export default function Navigation(): JSX.Element {
  const { user, status } = useAppSelector((state) => state.user);
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 👉 состояние для Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const logoutHandler = async (): Promise<void> => {
    try {
      dispatch(logoutAsyncThunk());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="light" className="p-3 flex-column align-items-start">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between py-2"
        >
          {/* ЛЕВАЯ ЧАСТЬ */}
          <Nav className="d-flex gap-4 align-items-center">
            <NavLink
              to="/items?marker=Hot deals"
              className="navbar-brand m-0 fw-bold"
            >
              Hot deals
            </NavLink>
            <NavLink
              to="/items?marker=New"
              className="navbar-brand m-0 fw-bold"
            >
              New
            </NavLink>
            <NavLink
              to="/items?marker=Top-Seller"
              className="navbar-brand m-0 fw-bold"
            >
              Top-Seller
            </NavLink>
          </Nav>

          {/* ПОИСК */}
          <InputGroup size="sm" style={{ maxWidth: "300px" }}>
            <InputGroup.Text id="inputGroup-sizing-md">Search</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <div className={style.rightIcons}>
            {/* ПРАВАЯ ЧАСТЬ */}
            {status === "logged" && (
              <img
                src="/icons/cart.svg"
                alt="cart-icon"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(CLIENT_ROUTES.CART)}
              />
            )}
            {status === "logged" && (
              <img
                src="/icons/heart.svg"
                alt="heart-icon"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(CLIENT_ROUTES.CART)}
              />
            )}

            <img
              src="/icons/person-circle.svg"
              alt="user-icon"
              width={30}
              height={30}
              style={{ cursor: "pointer" }}
              onClick={handleShow}
            />
          </div>
        </Container>

        {/* НИЖНЯЯ ЛИНИЯ НАВИГАЦИИ */}
        <div className="w-100 bg-dark border-top pt-2">
          <Container fluid>
            <Nav className="d-flex gap-3">
              {categoriesArr.map((elem) => (
                <NavLink
                  key={elem.id}
                  to={CLIENT_ROUTES.CATEGORY.replace(":id", String(elem.id))}
                  className="nav-link text-white"
                >
                  {elem.name}
                </NavLink>
              ))}
            </Nav>
          </Container>
        </div>
      </Navbar>

      {/* Offcanvas справа */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {status === "logged" ? user?.fullName : "Авторизация"}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {status === "logged" ? (
            <>
              <p>Добро пожаловать, {user?.fullName}!</p>
              <button
                className="btn btn-outline-dark w-100"
                onClick={logoutHandler}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <p>Введите данные для входа:</p>
              <LoginForm />
            </>
          )}
          {status !== "logged" && (
            <Link
              to={CLIENT_ROUTES.SIGN_UP}
              onClick={handleClose}
              className="d-block text-center text-primary text-decoration-none mt-5"
              style={{ fontSize: "16px", marginTop: "150px" }}
            >
              Зарегистрироваться
            </Link>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
