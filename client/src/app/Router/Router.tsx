import { type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
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
  CategoryPage,
  AdminPage,
} from "@/pages";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import ProtectedRouter from "@/shared/HOCs/ProtectedRouter/ui/ProtectedRouter";
import { useAppSelector } from "@/shared/hooks/hook";
import CatalogPage from "@/pages/CatalogPage/ui/CatalogPage";

export default function Router(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);
  const isAdmin = useAppSelector((state) => state.user.user?.isAdmin);

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
          <Route path={CLIENT_ROUTES.CATEGORY} element={<CategoryPage />} />
          <Route path={CLIENT_ROUTES.CATALOG} element={<CatalogPage />} />
          

          {/* 🔒 Защищённые страницы */}
          <Route
            element={
              <ProtectedRouter
                isAllowed={status === "logged"} // ✅ разрешаем только авторизованным
                redirectTo={CLIENT_ROUTES.HOME} // если не залогинен — на главную
              />
            }
          >
            <Route path={CLIENT_ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={CLIENT_ROUTES.FAVOURITE} element={<FavouritePage />} />
            <Route path={CLIENT_ROUTES.CART} element={<CartPage />} />
            <Route path={CLIENT_ROUTES.ORDER} element={<OrdersPage />} />
            {isAdmin ? (
              <Route path={CLIENT_ROUTES.ADMIN} element={<AdminPage />} />
            ) : (
              <Route
                path={CLIENT_ROUTES.ADMIN}
                element={<Navigate to={CLIENT_ROUTES.HOME} replace />}
              />
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
