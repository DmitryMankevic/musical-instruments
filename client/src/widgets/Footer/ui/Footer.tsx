import { type JSX } from "react";
import { NavLink } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import style from "./Footer.module.css";
export default function Footer(): JSX.Element {
  return (
    <>
      <div className={style.footerContainer}>
        <div className={style.leftComponents}>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Главная
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Новинки
          </NavLink>
        </div>
      </div>
    </>
  );
}
