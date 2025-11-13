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
import { clearUserInfo } from "@/entities/user-info/redux/userInfoSlice";
import UserForm from "@/features/UserForm/ui/UserForm";
import style from "./Navigation.module.css";
import { Button } from "react-bootstrap";

export default function Navigation(): JSX.Element {
  const { user, status } = useAppSelector((state) => state.user);
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const logoutHandler = async (): Promise<void> => {
    try {
      dispatch(logoutAsyncThunk());
      dispatch(clearUserInfo());
      navigate(CLIENT_ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* ======== ЛОГОТИП ======== */}
      <div className={style.logoWrapper}>
        <img
          src="/logoMuzPortal_rem.png"
          alt="Logo"
          className={style.logo}
          onClick={() => navigate(CLIENT_ROUTES.HOME)}
        />
      </div>

      {/* ======== ВЕРХНИЙ НАВБАР ======== */}
      <Navbar bg="light" className={`p-3 border-bottom ${style.topNavbar}`}>
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* ==== БУРГЕР ==== */}
          <button
            className={style.burgerButton}
            onClick={() => setShowMenu(true)}
          >
            ☰
          </button>

          {/* ==== ЛЕВЫЕ ССЫЛКИ (только десктоп) ==== */}
          <div className={style.topLinks}>
            <NavLink to="/items?marker=Hot deals" className={style.navLink}>
              Горячее предложение
            </NavLink>
            <NavLink to="/items?marker=New" className={style.navLink}>
              Новинка
            </NavLink>
            <NavLink to="/items?marker=Top-Seller" className={style.navLink}>
              Топ-продаж
            </NavLink>
          </div>
          {/* ==== ИКОНКИ ==== */}
          <div className={style.rightIcons}>
            {/* ==== ПОИСК (только десктоп) ==== */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const q = (formData.get("search") as string).trim();
                if (q) {
                  navigate(`/catalog?q=${encodeURIComponent(q)}`);
                  // Закрываем меню, если открыто (для мобильных)
                  setShowMenu(false);
                }
              }}
              className={style.searchForm}
            >
              <div className={style.searchInputWrapper}>
                <input
                  name="search"
                  type="text"
                  placeholder="Поиск товаров..."
                  defaultValue={
                    new URLSearchParams(window.location.search).get("q") || ""
                  }
                  className={style.searchInput}
                />
                <Button
                  variant="outline-dark"
                  type="submit"
                  className={style.searchButton}
                  aria-label="Найти"
                >
                  Найти
                </Button>
              </div>
            </form>

            {status === "logged" && (
              <>
                <img
                  src="/icons/cart.svg"
                  alt="cart"
                  className={style.iconCart}
                  width={28}
                  height={28}
                  onClick={() => navigate(CLIENT_ROUTES.CART)}
                />
                <img
                  src="/icons/heart.svg"
                  alt="heart"
                  className={style.iconHeart}
                  width={28}
                  height={28}
                  onClick={() => navigate(CLIENT_ROUTES.FAVOURITE)}
                />
              </>
            )}
            <img
              src="/icons/person-circle.svg"
              alt="user"
              className={style.iconUser}
              width={28}
              height={28}
              onClick={() => setShowUserPanel(true)}
            />
          </div>
        </Container>
      </Navbar>

      {/* ======== НИЖНИЙ НАВБАР (ТОЛЬКО ДЕСКТОП) ======== */}
      <Navbar
        bg="dark"
        variant="dark"
        className={`${style.bottomNavbarDesktop} border-top`}
      >
        <Container fluid>
          <Nav className="d-flex gap-2 flex-wrap justify-content-center py-0">
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
      </Navbar>

      {/* ======== OFFCANVAS (ОБЩЕЕ МЕНЮ ДЛЯ МОБИЛЬНЫХ) ======== */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Поиск */}
          <div className="mb-4">
            <InputGroup size="sm">
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control placeholder="Введите товар..." />
            </InputGroup>
          </div>

          {/* Раздел 1 — Популярное */}
          <h6 className="fw-bold mt-3">Популярное</h6>
          <Nav className="flex-column mb-3">
            <NavLink
              to="/items?marker=Hot deals"
              className="nav-link"
              onClick={() => setShowMenu(false)}
            >
              Hot deals
            </NavLink>
            <NavLink
              to="/items?marker=New"
              className="nav-link"
              onClick={() => setShowMenu(false)}
            >
              New
            </NavLink>
            <NavLink
              to="/items?marker=Top-Seller"
              className="nav-link"
              onClick={() => setShowMenu(false)}
            >
              Top-Seller
            </NavLink>
          </Nav>

          {/* Раздел 2 — Категории */}
          <h6 className="fw-bold mt-4">Категории</h6>
          <Nav className="flex-column mb-3">
            {categoriesArr.map((elem) => (
              <NavLink
                key={elem.id}
                to={CLIENT_ROUTES.CATEGORY.replace(":id", String(elem.id))}
                className="nav-link"
                onClick={() => setShowMenu(false)}
              >
                {elem.name}
              </NavLink>
            ))}
          </Nav>

          {/* Раздел 3 — Кнопки */}
          {status === "logged" && (
            <div className="mt-4 d-flex flex-column gap-2">
              <button
                className={style.buttons}
                onClick={() => {
                  navigate(CLIENT_ROUTES.CART);
                  setShowMenu(false);
                }}
              >
                Корзина
              </button>
              <button
                className={style.buttons}
                onClick={() => {
                  navigate(CLIENT_ROUTES.FAVOURITE);
                  setShowMenu(false);
                }}
              >
                Избранное
              </button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* ======== ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ ======== */}
      <Offcanvas
        show={showUserPanel}
        onHide={() => setShowUserPanel(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {status === "logged" ? user?.email : "Авторизация"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {status === "logged" ? (
            <>
              <UserForm onClose={() => setShowUserPanel(false)} />
              <br />
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  logoutHandler();
                  setShowUserPanel(false);
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <p>Введите данные для входа:</p>
              <LoginForm />
              <Link
                to={CLIENT_ROUTES.SIGN_UP}
                onClick={() => setShowUserPanel(false)}
                className="d-block text-center text-primary text-decoration-none mt-5"
              >
                Зарегистрироваться
              </Link>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
