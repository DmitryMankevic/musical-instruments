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
            Terms & Conditions
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Privacy Policy
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Right of Withdrawal
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Online Ordering Process
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Statutory Warranty Rights
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Accessibility Statement
          </NavLink>
        </div>
        <div className={style.centerComponents}>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            About Us
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Jobs & Careers
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Blog
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Classified Ads
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            Whistleblower system
          </NavLink>
        </div>
        <div className={style.rightComponents}>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            APP STORE
          </NavLink>
          <NavLink to={CLIENT_ROUTES.HOME} className="nav-link text-white">
            GOOGLE PLAY
          </NavLink>
          
        </div>
      </div>
    </>
  );
}
