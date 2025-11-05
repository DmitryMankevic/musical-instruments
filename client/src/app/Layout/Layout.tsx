import Loader from "@/shared/HOCs/Loader/ui/Loader";
import { useAppSelector } from "@/shared/hooks/hook";
import Navigation from "@/widgets/Navigation/ui/Navigation";
import { type JSX } from "react";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router";

export default function Layout(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);
  return (
    <>
      <Loader isLoading={status === "logging"}>
        <Container>
          <Navigation />
          <br />
          <Outlet />
        </Container>
      </Loader>
    </>
  );
}
