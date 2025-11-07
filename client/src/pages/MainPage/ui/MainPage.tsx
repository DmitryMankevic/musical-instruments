import { useLayoutEffect, type JSX } from "react";
import styles from "./MainPage.module.css";

export function MainPage(): JSX.Element {

  useLayoutEffect(() => {
    document.title = "Главная страница";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Главная страница</h1>
    </>
  );
}
