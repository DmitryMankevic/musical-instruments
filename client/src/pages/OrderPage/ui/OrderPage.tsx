import { useLayoutEffect, type JSX } from "react";
import styles from "./OrderPage.module.css";

export function OrderPage(): JSX.Element {

  useLayoutEffect(() => {
    document.title = "Страница заказа";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Страница Заказа</h1>
    </>
  );
}
