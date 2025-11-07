import { useLayoutEffect, type JSX } from "react";

export function MainPage(): JSX.Element {


  useLayoutEffect(() => {
    document.title = "Главная страница";
  }, []);

  return (
    <>
      <h1>Главная страница</h1>
    </>
  );
}
