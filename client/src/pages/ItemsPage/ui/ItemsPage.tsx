import { useLayoutEffect, type JSX } from "react";
import styles from "./ItemsPage.module.css";

export function ItemsPage(): JSX.Element {

  useLayoutEffect(() => {
    document.title = "Страница товаров";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Страница товаров</h1>
    </>
  );
}
