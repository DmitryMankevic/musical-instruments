import { useLayoutEffect, type JSX } from "react";
import styles from "./CartPage.module.css";

export function CartPage(): JSX.Element {

  useLayoutEffect(() => {
    document.title = "Страница корзины";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Страница корзины</h1>
    </>
  );
}
