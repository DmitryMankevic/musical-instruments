import { type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import {
  LoginPage,
  MainPage,
  SignUpPage,
  FavouritePage,
  ItemCardPage,
  ItemsPage,
  CartPage,
  ProfilePage,
  OrdersPage,
} from "@/pages";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import ProtectedRouter from "@/shared/HOCs/ProtectedRouter/ui/ProtectedRouter";
import { useAppSelector } from "@/shared/hooks/hook";

export default function Router(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 🌍 Общедоступные страницы */}
          <Route path={CLIENT_ROUTES.HOME} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.ITEM_CARD} element={<ItemCardPage />} />
          <Route path={CLIENT_ROUTES.ITEMS} element={<ItemsPage />} />
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />

          {/* 🔒 Защищённые страницы */}
          <Route
            element={
              <ProtectedRouter
                isAllowed={status === "logged"} // ✅ разрешаем только авторизованным
                redirectTo={CLIENT_ROUTES.LOGIN} // если не залогинен — на логин
              />
            }
          >
            <Route path={CLIENT_ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={CLIENT_ROUTES.FAVOURITE} element={<FavouritePage />} />
            <Route path={CLIENT_ROUTES.CART} element={<CartPage />} />
            <Route path={CLIENT_ROUTES.ORDER} element={<OrdersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}