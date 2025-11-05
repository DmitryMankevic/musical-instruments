import { type JSX } from "react";
import { Navigate, Outlet } from "react-router";

type Props = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectTo: string;
};

export default function ProtectedRouter({
  children,
  isAllowed,
  redirectTo,
}: Props): JSX.Element {
  return (
    <div>
      {isAllowed ? children || <Outlet /> : <Navigate to={redirectTo} />}
    </div>
  );
}
